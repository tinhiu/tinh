import IORedis from 'ioredis';
import dayjs from 'dayjs';
import Image from 'next/image';
import relativeTime from 'dayjs/plugin/relativeTime';
import SpotifyWebAPI from 'spotify-web-api-node';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { getCookie, setCookie } from 'cookies-next';
import { Data } from 'use-lanyard';
import type { GetServerSideProps } from 'next';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

import { getMyTopTracks, getRecentlyPlayed } from '../api/spotify/spotify';
import ModalSpotify from '../../components/Spotify';
import { LastFM } from '../../server/last-fm';
import {
	LAST_FM_API_KEY,
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../../server/constants';
import { rand } from '../../util/types';
import Pagination from '../../components/Pagination';
import UserSpotify from '../../models/UserSpotify'
import ListSong from '../../components/ListSong';
import type { LastFMGetTrack } from '../../server/last-fm';


const PER_PAGE = 6;
type Props = {
	user: UserSpotify;
	userLanyard: Data | any;
	randomLastFMTrack: LastFMGetTrack;
	//topTracks: PlayHistoryObject[];
};

type UserOverView = {
	user: UserSpotify,
	userLanyard: Data | any,
	randomLastFMTrack: LastFMGetTrack
}
dayjs.extend(relativeTime);

const UserOverview = ({ user, userLanyard, randomLastFMTrack }: UserOverView) => {
	const image: string = user?.images?.[1].url as string;
	return (
		<div className="mt-0">
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
						<p>● {user.following} Following</p>
					</a>
					<a
						href={`${user?.external_urls.spotify}/playlists`}
						target="_blank"
						className="w-full truncate font-medium text-gray-900 hover:underline dark:text-[#e1eafd]"
						rel="noreferrer"
					>
						<p>● {user.playlists} Public Playlists</p>
					</a>
				</motion.div>
			</div>
			<div className="w-full">
				<ModalSpotify user={user} spotify={userLanyard} />
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
	);
};
const TopTracksOverview = ({ topTracks }: { topTracks: TrackObjectFull[] }) => {
	return (
		<ListSong music={topTracks} />
	);
};
export default function MusicPage({
	user,
	randomLastFMTrack,
	userLanyard,
}: Props) {
	// console.log(JSON.stringify(userLanyard, null, 4));
	const router = useRouter();
	const query = router.query;
	const page = Number(query.page || 1);
	const limit = PER_PAGE;
	const skip = (page - 1) * (limit);
	// const recentlyQuery = useQuery({
	// 	queryKey: ['recently'],
	// 	queryFn: () => getRecentlyPlayed(limit),
	// 	keepPreviousData: true,
	// })
	const { data: topTracks } = useQuery({
		queryKey: ['getMyTopTracks', page],
		queryFn: () => getMyTopTracks(limit, skip, ''),
		keepPreviousData: true,
	})
	// console.log('topTracks: ', topTracks);
	// return <h1>Musicc..</h1>
	return (
		<div className='mb-14 mt-16 w-full'>
			<motion.div
				initial={{ opacity: 0, y: 7 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ ease: 'easeInOut', duration: 0.4 }}
				className="w-full"
			>
				{/* <UserOverview user={user} userLanyard={userLanyard} randomLastFMTrack={randomLastFMTrack} /> */}
				<TopTracksOverview topTracks={topTracks?.body?.items || []} />
				<Pagination
					totalItems={Number(topTracks?.body?.total) || 0}
					currentPage={page}
					itemsPerPage={PER_PAGE}
					renderPageLink={(page) => `/music3?page=${page}`}
				/>
			</motion.div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
	const page = Number(query.page);
	const limit = PER_PAGE;
	const skip = (page - 1) * (limit);
	const queryClient = new QueryClient();

	const redis = new IORedis(REDIS_URL || '');
	const [token, refresh] = await redis.mget(
		SPOTIFY_REDIS_KEYS.AccessToken,
		SPOTIFY_REDIS_KEYS.RefreshToken
	);
	let api: SpotifyWebAPI;

	if (!token && refresh) {
		// If we don't have a token but we do have a refresh token
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			refreshToken: refresh,
		});
		const result = await api.refreshAccessToken();
		setCookie('accessToken', result.body.access_token, { req, res, maxAge: 60 * 6 * 6, path: '/' });

		await redis.set(
			SPOTIFY_REDIS_KEYS.AccessToken,
			result.body.access_token,
			'EX',
			// Expires is in seconds as per https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
			result.body.expires_in
		);


		// If spotify wants us to use a new refresh token, we'll need to update it
		if (result.body.refresh_token) {
			await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, result.body.refresh_token);
			setCookie('refreshToken', result.body.refresh_token, { req, res, maxAge: 60 * 6 * 6, path: '/' });
		}

	} else if (token) {
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			accessToken: token,
		});
		setCookie('accessToken', token, { req, res, maxAge: 60 * 6 * 24, path: '/' });

	} else {
		// throw new Error(
		// 	'No Spotify tokens available! Please manually add them to the Redis store to allow tokens to refresh in the future.'
		// );
		return {
			notFound: true,
		}
	}

	let accessToken = getCookie('accessToken', { req, res });
	const data = await queryClient.prefetchQuery(
		["getMyTopTracks", page],
		async () => getMyTopTracks(limit, skip, accessToken as string).then((result) => {
			return result?.body.items;
		}));
	/* Get me */
	// const getMe = await api.getMe();
	// const user: UserSpotify = (({ country, email, product, ...rest }: any) => rest)(getMe.body);
	// /* Get following artist */
	// const follow = await api.getFollowedArtists();
	// user.following = follow.body.artists.total as number;

	// /* Get user playlists */
	// const playlists = await api.getUserPlaylists(user?.id);
	// user.playlists = playlists.body.total as number;

	/* Get getMyCurrentPlayingTrack*/
	// /* const track = await api.getMyCurrentPlayingTrack(); */


	/* RecentlyPlayedTracks */
	// const tracks = await api.getMyRecentlyPlayedTracks({ limit: 20, after: 1484811043508 });

	await redis.quit();

	/* Lastfm */
	// const lfm = new LastFM(LAST_FM_API_KEY!);
	// let topLFMTracks = await lfm.getTopTracks('loonailysm', '1month', '6');
	// topLFMTracks = topLFMTracks.map((item) => ({
	// 	mbid: item.mbid,
	// 	name: item.name,
	// 	url: item.url,
	// 	artist: item.artist,
	// 	'@attr': item['@attr'],
	// 	playcount: item.playcount,
	// 	duration: item.duration,
	// }));
	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		},
	};
};
