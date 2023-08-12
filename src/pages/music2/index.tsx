import IORedis from 'ioredis';
import dayjs from 'dayjs';
import ms from 'ms';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useLanyardWS } from 'use-lanyard';
import { useCallback, useEffect, useState } from 'react';
import SpotifyWebAPI from 'spotify-web-api-node';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import ModalSpotify from '../../components/Spotify';
import UserObjectPublic = SpotifyApi.UserObjectPublic;
import type { LastFMGetTrack } from '../../server/last-fm';
import { LastFM } from '../../server/last-fm';
import {
	LAST_FM_API_KEY,
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../../server/constants';

import { rand } from '../../util/types';
import getProducts from '../../lib/getProducts';
import PaginationPage from '../../components/PaginatedPage';
import { PER_PAGE } from './[page]';
import { useRouter } from 'next/router';
type Props = {
	user: UserObjectPublic | any;
	music: any[];
	currentPage: number | any;
	totalProducts: number | any;
	playLists: number | any;
	following: number | any;
	userLanyard: any;
	randomLastFMTrack: LastFMGetTrack;
	//topTracks: PlayHistoryObject[];
};

dayjs.extend(relativeTime);

export default function MusicPage({
	user,
	music,
	currentPage,
	totalProducts,
	playLists,
	following,
	randomLastFMTrack,
	userLanyard,
}: Props) {
	const image = user.images[1].url;
	// console.log(JSON.stringify(userLanyard, null, 4));
	const router = useRouter();
	const query = router.query;
	const page = (query.page as string) ?? '1';
	const perPage = (query.perPage as string) ?? '12';
	// console.log('perPage: ', perPage);
	// console.log('page: ', page);
	// useCallback(async () => {
	// 	const userTopTracks = await api.getMyTopTracks({
	// 		time_range: 'short_term',
	// 		limit: 12,
	// 		offset: 6,
	// 	});
	// 	console.log(JSON.stringify(profiles));
	// }, []);
	return (
		<motion.div
			initial={{ opacity: 0, y: 7 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -4 }}
			transition={{ ease: 'easeInOut', duration: 0.4 }}
			className="mb-32 mt-24 w-full"
		>
			<div className="mt-36 ">
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
					<ModalSpotify user={userLanyard} spotify={user} />
				</div>
				<div className="mx-4">
					<div className="mb-6 mt-4 ">
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

			{/* <div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
				{userTopTracks.items.map((track) => (
					//<Track key={track.id} track={track} />
					<Track key={track.id} track={track} />
				))}
			</div> */}
			<PaginationPage
				music={music}
				currentPage={currentPage}
				totalProducts={totalProducts}
				perPage={PER_PAGE}
			/>
		</motion.div>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query: { page = 1 } }) => {
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
		throw new Error(
			'No Spotify tokens available! Please manually add them to the Redis store to allow tokens to refresh in the future.'
		);
	}

	/* Top tracks playing */
	/* const tracks = await api.getMyTopTracks({ time_range: 'short_term' }); */
	const { body: userTopTracks } = await api.getMyTopTracks({
		time_range: 'short_term',
		limit: 60,
		offset: 0,
	});
	const { music, total } = await getProducts({
		music: userTopTracks.items,
		limit: PER_PAGE,
		page: page as number,
	});
	/* Get me */
	const getMe = await api.getMe();
	const user = (({ country, email, product, ...rest }: any) => rest)(getMe.body);

	/* Get getMyCurrentPlayingTrack*/

	/* const track = await api.getMyCurrentPlayingTrack(); */

	/* getUserPlaylists */
	const playlists = await api.getUserPlaylists(user?.id);
	const followings = await api.getFollowedArtists();

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
			music: music,
			currentPage: page as number,
			totalProducts: total,
			playLists: playlists.body.total,
			following: followings.body.artists.total,
			randomLastFMTrack: rand(topLFMTracks),
			userLanyard: null,
		},
	};
};
