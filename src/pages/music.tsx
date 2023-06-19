import IORedis from 'ioredis';
import dayjs from 'dayjs';
import ms from 'ms';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useLanyardWS } from 'use-lanyard';
import { useState } from 'react';
import SpotifyWebAPI from 'spotify-web-api-node';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';

// @ts-ignore
import TailwindColor from '@videsk/tailwind-random-color';
import { MdExplicit } from 'react-icons/md';
import { SiSpotify } from 'react-icons/si';
import Modal from '../components/Modal';
import ModalSpotify from '../components/Spotify';
import api from '../pages/api/spotify/oauth';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import PlayHistoryObject = SpotifyApi.PlayHistoryObject;
import UserObjectPublic = SpotifyApi.UserObjectPublic;
import ListOfUsersPlaylist = SpotifyApi.ListOfUsersPlaylistsResponse;
import FollowedArtists = SpotifyApi.UsersFollowedArtistsResponse;
import CurrentPlayingTrack = SpotifyApi.CurrentlyPlayingResponse;
import type { LastFMGetTrack } from '../server/last-fm';
import { LastFM } from '../server/last-fm';
import {
	LAST_FM_API_KEY,
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../server/constants';
import Details from '../components/Details';
import AudioMusic from '../components/AudioMusic';

import { rand } from '../util/types';
type Props = {
	user: UserObjectPublic | any;
	topTracks: TrackObjectFull[];
	playLists: number | any;
	following: number | any;
	userLanyard: any;
	randomLastFMTrack: LastFMGetTrack;
	//topTracks: PlayHistoryObject[];
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
	const image = user.images[0].url;

	// console.log(JSON.stringify(userLanyard, null, 4));

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
					<ModalSpotify user={userLanyard} />
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

			<div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
				{topTracks.map((track) => (
					//<Track key={track.id} track={track} />
					<Track key={track.id} track={track} />
				))}
			</div>
		</motion.div>
	);
}
function Track({ track }: { track: TrackObjectFull /* PlayHistoryObject */ }) {
	const [statsOpen, setStatsOpen] = useState(false);
	const [isReady, setIsReady] = useState(false);
	const options = {
		colors: ['yellow', 'orange', 'blue', 'cyan', 'purple', 'emerald'],
		range: [4, 4], // Between 400 and 400,
		prefix: 'shadow',
	};
	const [ranDom, setRanDom] = useState('shadow-blue-400');
	const onLoadCallback = () => {
		setIsReady(true);
	};

	const image = track.album.images[0].url;
	const artists = track.artists.map((artist) => artist.name).join(', ');

	const close = () => {
		setStatsOpen(false);
	};

	const open = () => {
		setStatsOpen(true);
	};

	const changeRandom = () => {
		const randomColor = new TailwindColor(options).pick();
		// const randomColor = Math.floor(Math.random() * 16777215).toString(16);
		//console.log(randomColor);
		setRanDom(randomColor);
	};
	const album = track.album as AlbumObjectFull;

	return (
		<button
			key={track.id}
			type="button"
			className="group flex flex-col space-y-2 p-[2px] text-left align-top no-underline
			outline-none focus:outline-none focus:ring-4 
			focus:ring-amber-100 dark:focus:ring-gray-200"
			onClick={open}
			onMouseLeave={changeRandom}
		>
			<Modal isOpen={statsOpen} setIsOpen={close} title={<SiSpotify size={24} />}>
				<div className="space-y-4">
					<div className="relative aspect-[3/2] ">
						<Image
							src={image}
							layout="fill"
							alt={`${track.album.name} by ${artists}`}
							className={`pointer-events-none z-[-10] h-auto w-full rounded-md  bg-gray-200 object-cover
							transition 
							duration-700 ${isReady ? 'scale-100 bg-gray-200 blur-0' : 'scale-110 blur-2xl'}`}
							loading="lazy"
							decoding="async"
							onLoadingComplete={onLoadCallback}
						/>
					</div>
					{track.preview_url ? (
						<AudioMusic src={track.preview_url || ''} />
					) : (
						<p className="flex justify-end text-sm italic">*preview not available</p>
					)}

					<a
						href={track.external_urls.spotify}
						className="group flex justify-between rounded-md border 
						bg-gray-400  p-3 no-underline dark:border-0 dark:bg-neutral-400"
						target="_blank"
						rel="noreferrer"
					>
						<div className="w-[90%]">
							<h2 className="truncate text-xl font-bold group-hover:underline md:text-2xl">
								{track.name}
							</h2>
							<h3 className="text-sm italic text-gray-800 dark:text-gray-800">by {artists}</h3>
						</div>

						<HiExternalLink size={24} />
					</a>

					<>
						<Details
							details={[
								{
									name: 'Released:',
									value: (
										<span>
											{dayjs(album.release_date).fromNow()} (
											{dayjs(album.release_date).format('MMM D, YYYY')})
										</span>
									),
								},
								{
									name: 'Album:',
									value: album.name,
								},
								{
									name: 'Duration:',
									value: ms(track.duration_ms, { long: true }),
								},
							]}
						/>
					</>

					<button
						onClick={close}
						className="float-right !mt-0 rounded-lg px-2 py-1 hover:bg-slate-400"
					>
						Close
					</button>
				</div>
			</Modal>

			<div className={`group-hover: w-full transition-all group-hover:shadow-lg${ranDom}`}>
				<Image
					src={image}
					className={`pointer-events-none scale-100 rounded-lg brightness-105 transition-all 
					duration-300 group-hover:scale-110 group-hover:brightness-110 md:brightness-90 
					${isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-2xl'}
					`}
					alt={`${track.name} by ${artists}`}
					width={400}
					height={400}
					loading="lazy"
					decoding="async"
					sizes="100vw"
					onLoadingComplete={onLoadCallback}
				/>
			</div>

			<div className="w-full truncate">
				<ul className="mt-4 contents items-center py-0.5 text-lg">
					<li className="w-full truncate font-bold ">
						{track.explicit && <MdExplicit className="-mt-1 inline" />} {track.name}
					</li>{' '}
					<li className="w-full truncate text-gray-600 dark:text-neutral-200/70">by {artists}</li>
				</ul>
			</div>
		</button>
	);
}
export const getStaticProps: GetStaticProps<Props> = async ({ userLanyard }: any) => {
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
		//console.log(api);
	} else {
		throw new Error(
			'No Spotify tokens available! Please manually add them to the Redis store to allow tokens to refresh in the future.'
		);
	}

	/* Top tracks playing */
	const tracks = await api.getMyTopTracks({ time_range: 'short_term', limit: 42 });
	/* Get me */
	const user = await api.getMe();

	/* Get getMyCurrentPlayingTrack*/

	/* const track = await api.getMyCurrentPlayingTrack(); */

	/* getUserPlaylists */
	const playlists = await api.getUserPlaylists(user.body.id);
	const followings = await api.getFollowedArtists();

	/* RecentlyPlayedTracks */
	//const tracks = await api.getMyRecentlyPlayedTracks({ limit: 20, after: 1484811043508 });

	await redis.quit();
	const lfm = new LastFM(LAST_FM_API_KEY);
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
			user: user.body,
			topTracks: tracks.body.items,
			playLists: playlists.body.total,
			following: followings.body.artists.total,
			randomLastFMTrack: rand(topLFMTracks),
			userLanyard: userLanyard || null,
		},
		revalidate,
	};
};
