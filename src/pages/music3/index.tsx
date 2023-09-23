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
import { useEffect, useRef } from 'react';
import { ParsedUrlQuery } from 'querystring';


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
const getInitialPageFromQuery = (query: ParsedUrlQuery) => {
	const page = Number(query.page)
	if (Number.isNaN(page) || page < 1) {
	  return 1
	}
	return page
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
const TopTracksOverview = ({ topTracks, page }: { topTracks: TrackObjectFull[], page: number }) => {
	const pageTopRef = useRef(null);
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [page]);
	return (
		<div ref={pageTopRef}><ListSong music={topTracks} /></div>
	);
};
export default function MusicPage({
	user,
	randomLastFMTrack,
	userLanyard,
}: Props) {
	const router = useRouter();
	const page = getInitialPageFromQuery(router.query);
	const limit = PER_PAGE;
	const skip = (page - 1) * (limit);

	useEffect(() => {
		fetch('/api/cookie')
	}, []);

	
	const { data: topTracks } = useQuery({
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
				{/* <UserOverview user={user} userLanyard={userLanyard} randomLastFMTrack={randomLastFMTrack} /> */}
				<TopTracksOverview topTracks={topTracks?.body?.items || []} page={page} />
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
