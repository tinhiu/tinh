import IORedis from 'ioredis';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { motion } from 'framer-motion';
import { getCookie, setCookie } from 'cookies-next';
import type { GetServerSideProps, GetStaticProps, GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import SpotifyWebAPI from 'spotify-web-api-node';
import { Data } from 'use-lanyard';
import TrackObjectFull = SpotifyApi.TrackObjectFull;

import ListSong from '../../components/ListSong';
import Pagination from '../../components/Pagination';
import ModalSpotify from '../../components/Spotify';
import UserSpotify from '../../models/UserSpotify';
import {
	LAST_FM_API_KEY,
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../../server/constants';
import type { LastFMGetTrack } from '../../server/last-fm';
import { LastFM } from '../../server/last-fm';
import { rand } from '../../util/types';
import { getMe, getMyTopTracks } from '../api/spotify/spotify';
import { getRandomTopTracksFM } from '../api/spotify/last-fm';
import usePagination from '../../hooks/usePagination';

dayjs.extend(relativeTime);

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
	if (topTracks.length == 0) {
		return (
			<>
				<div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className='group flex flex-col space-y-2 p-[2px] '>
							<div className="space-y-5 rounded-lg bg-neutral-400/10 p-4 dark:bg-white/5">
								<div className="h-[194.4px] rounded-lg bg-neutral-400/30 dark:bg-rose-100/10 "></div>
								<div className="space-y-3">
									<div className="h-3 w-4/5 rounded-lg bg-neutral-400/20 dark:bg-rose-100/20"></div>
									<div className="h-3 w-2/5 rounded-lg bg-neutral-400/20 dark:bg-rose-100/20"></div>
								</div>
							</div>
						</div>
					))
					}
				</div>
				<div className="my-8 mt-12 flex items-center justify-center">
					<div className="h-5 w-3/5 rounded-lg bg-neutral-400/20 dark:bg-rose-100/20"></div>
				</div>
			</>
		)
	}
	return (
		<ListSong music={topTracks} />
	);
};
export default function MusicPage({
	user,
	userLanyard,
	randomLastFMTrack
}: Props) {
	const router = useRouter();
	const query = router.query;
	const page = Number(parseInt(query.page as string) < 0 ? 1 : parseInt(query.page as string) || 1);
	const limit = PER_PAGE;
	const skip = (page - 1) * (limit);

	const { data: topTracks, isSuccess, isFetching } = useQuery({
		queryKey: ['getMyTopTracks', page],
		queryFn: () => getMyTopTracks(limit, skip),
		keepPreviousData: true,
		staleTime: 60 * 1000
	})

	return (
		<div className='mb-14 mt-16 w-full'>
			<motion.div
				initial={{ opacity: 0, y: 7 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ ease: 'easeInOut', duration: 0.4 }}
				className="w-full"
			>
				<UserOverview user={user} userLanyard={userLanyard} randomLastFMTrack={randomLastFMTrack} />
				{isFetching ? <TopTracksOverview topTracks={[]} /> : <TopTracksOverview topTracks={topTracks?.body.items || []} />}
				{isSuccess && <Pagination
					totalItems={Number(topTracks?.body.total) || 0}
					currentPage={page}
					itemsPerPage={PER_PAGE}
					renderPageLink={(page) => `/music2?page=${page}`}
				/>}
			</motion.div>
		</div>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

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

	/* Get me */
	const getMe = await api.getMe();
	const user: UserSpotify = (({ country, email, product, ...rest }: any) => rest)(getMe.body);
	/* Get following artist */
	const follow = await api.getFollowedArtists();
	user.following = follow.body.artists.total as number;

	/* Get user playlists */
	const playlists = await api.getUserPlaylists(user?.id);
	user.playlists = playlists.body.total as number;

	await redis.quit();

	/* Lastfm */
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
			userLanyard: null,
			randomLastFMTrack: rand(topLFMTracks)
		},
	};
};