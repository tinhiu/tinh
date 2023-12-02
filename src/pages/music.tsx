import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import IORedis from 'ioredis';
import Link from 'next/link';
import Image from 'next/image';
import type { GetStaticProps } from 'next';

import SpotifyWebAPI from 'spotify-web-api-node';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

import TopTracks from '../components/TopTracks';
import ModalSpotify from '../components/Spotify';
import {
	LAST_FM_API_KEY,
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../server/constants';
import type { LastFMGetTrack } from '../server/last-fm';
import { LastFM } from '../server/last-fm';

import { rand } from '../util/types';

type Props = {
	user: any;
	topTracks: TrackObjectFull[];
	playLists: number | any;
	following: number | any;
	userLanyard: any;
	randomLastFMTrack: LastFMGetTrack;
};

dayjs.extend(relativeTime);

export default function MusicPage({
	user,
	topTracks,
	playLists,
	following,
	randomLastFMTrack,
	userLanyard,
}: Props) {
	const image = user.images[1].url;
	// console.log(JSON.stringify(userLanyard, null, 4));
	return (
		<motion.div
			initial={{ opacity: 0, y: 7 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -4 }}
			transition={{ ease: 'easeInOut', duration: 0.4 }}
			className="mb-24 mt-10 w-full"
		>
			<div className="mt-1">
				<div className="flex justify-center ">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -50 }}
						transition={{ ease: 'easeInOut', duration: 1 }}
					>
						<div className="relative transition duration-500 hover:-translate-x-5 hover:scale-105 hover:ease-out">
							<Image
								src={image}
								className="pointer-events-none h-auto rounded-full drop-shadow-md"
								alt={`${user.display_name}`}
								width={150}
								height={150}
								loading="lazy"
								decoding="async"
							/>
						</div>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 50 }}
						transition={{ ease: 'easeInOut', duration: 1 }}
						className="whitespace-nowrap px-2 sm:px-4"
					>
						<span>PROFILE</span>
						<a
							href={user.external_urls.spotify}
							target="_blank"
							className="w-full truncate font-bold text-gray-900 dark:text-[#e1eafd]"
							rel="noreferrer"
						>
							<h1 className="text-6xl">{user.display_name}</h1>
						</a>
						<a
							href={`${user.external_urls.spotify}/followers`}
							target="_blank"
							className="w-full truncate font-medium text-gray-900 hover:underline dark:text-[#e1eafd]"
							rel="noreferrer"
						>
							<p>● {user.followers?.total} Followers</p>
						</a>
						<a
							href={`${user.external_urls.spotify}/following`}
							target="_blank"
							className="w-full truncate font-medium text-gray-900 hover:underline dark:text-[#e1eafd]"
							rel="noreferrer"
						>
							<p>● {following} Following</p>
						</a>
						<a
							href={`${user.external_urls.spotify}/playlists`}
							target="_blank"
							className="w-full truncate font-medium text-gray-900 hover:underline dark:text-[#e1eafd]"
							rel="noreferrer"
						>
							<p>● {playLists} Public Playlists</p>
						</a>
					</motion.div>
				</div>
				<div className="w-full">
					<ModalSpotify user={user} spotify={userLanyard} />
				</div>
				<div className="mx-4">
					<div className="mb-2 mt-4 ">
						Listening to music is my cup of tea. I listen to many different kinds of music. Most of
						the time, I love listening to music. Here are some of the songs I listen to the most in
						recent months.
						<br />
						I've listened to{' '}
						<div className="inline-block scale-100 text-lg font-bold transition duration-200 hover:scale-95 hover:ease-out">
							<a className="" href={randomLastFMTrack.url} target="_blank" rel="noreferrer">
								{randomLastFMTrack.name}
							</a>
						</div>{' '}
						by{' '}
						<div className="inline-block scale-100 text-lg font-bold transition duration-200 hover:scale-95 hover:ease-out">
							<a href={randomLastFMTrack.artist.url} target="_blank" rel="noreferrer">
								{randomLastFMTrack.artist.name}
							</a>
						</div>{' '}
						about <span className="text-lg font-bold underline">{randomLastFMTrack.playcount}</span>{' '}
						times a month!
					</div>
				</div>
			</div>
			<div className="px-2 text-white">
				<Link href='/music2'>
					<a className="rounded-md bg-gray-500 px-2 py-1 focus:outline-0 dark:bg-black/30 ">
						Pagination {">"}
					</a>
				</Link>
			</div>
			<TopTracks music={topTracks} />
		</motion.div>
	);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
	const redis = new IORedis(REDIS_URL || '');
	const [token, refresh] = await redis.mget(
		SPOTIFY_REDIS_KEYS.AccessToken,
		SPOTIFY_REDIS_KEYS.RefreshToken
	);

	let api: SpotifyWebAPI;
	let revalidate = 120;

	if (!token && refresh) {
		// If we don't have a token but we do have a refresh token
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			refreshToken: refresh,
		});

		const result = await api.refreshAccessToken();

		await redis.set(
			SPOTIFY_REDIS_KEYS.AccessToken,
			result.body.access_token,
			'EX',
			// Expires is in seconds as per https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
			result.body.expires_in
		);

		// We should revalidate when the token expires
		// but we can do it slightly before
		revalidate = result.body.expires_in - 30;

		// If spotify wants us to use a new refresh token, we'll need to update it
		if (result.body.refresh_token) {
			await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, result.body.refresh_token);
		}
	} else if (token) {
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			accessToken: token,
		});
	} else {
		return {
			notFound: true,
		};
	}

	/* Top tracks playing */
	const tracks = await api.getMyTopTracks({ time_range: 'short_term', limit: 42 });
	/* Get me */
	const getMe = await api.getMe();
	const user = (({ country, email, product, ...rest }: any) => rest)(getMe.body);

	/* Get getMyCurrentPlayingTrack*/

	/* const track = await api.getMyCurrentPlayingTrack(); */

	/* getUserPlaylists */
	const playlists = await api.getUserPlaylists(user?.id);
	const followings = await api.getFollowedArtists();
	/* const song = await api.getMyCurrentPlayingTrack(); */
	/* RecentlyPlayedTracks */
	//const tracks = await api.getMyRecentlyPlayedTracks({ limit: 20, after: 1484811043508 });

	await redis.quit();
	const lfm = new LastFM(LAST_FM_API_KEY!);
	let topLFMTracks = await lfm.getTopTracks('loonailysm', '1month', '6');
	topLFMTracks = topLFMTracks.map((item) => ({
		mbid: item.mbid,
		name: item.name,
		url: item.url,
		artist: item.artist,
		'@attr': item['@attr'],
		playcount: item.playcount,
		duration: item.duration,
	}));
	return {
		props: {
			user: user,
			topTracks: tracks.body.items,
			playLists: playlists.body.total,
			following: followings.body.artists.total,
			randomLastFMTrack: rand(topLFMTracks),
			userLanyard: null,
		},
		revalidate,
	};
};
