import IORedis from 'ioredis';
import dayjs from 'dayjs';
import ms from 'ms';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import SpotifyWebAPI from 'spotify-web-api-node';
import Image from 'next/image';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { MdExplicit } from 'react-icons/md';
import { SiSpotify } from 'react-icons/si';
import Modal from '../components/Modal';
import api from '../pages/api/spotify/oauth'
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import PlayHistoryObject = SpotifyApi.PlayHistoryObject;
import {
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../server/constants';
import Details from '../components/Details';
import AudioMusic from '../components/AudioMusic';

type Props = {
	topTracks: TrackObjectFull[];
	//topTracks: PlayHistoryObject[];
};

dayjs.extend(relativeTime);
export default function MusicPage({ topTracks }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 7 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -4 }}
			transition={{ ease: 'easeInOut', duration: 0.4 }}
			className="mt-24 w-full mb-32"
		>
			<div className="mt-36 ">
				<h2 className="text-3xl font-bold">Music 🎧</h2>

				<p className="mt-4 mb-6">
					Listening to music is my cup of tea. I listen to many different kinds of music. Most of
					the time, I love listening to music. Here are some of the songs I listen to the most in
					recent months
				</p>
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

	const image = track.album.images[0].url;
	const artists = track.artists.map((artist) => artist.name).join(', ');

	const close = () => {
		setStatsOpen(false);
	};

	const open = () => {
		setStatsOpen(true);
	};

	const album = track.album as AlbumObjectFull;

	return (
		<button
			key={track.id}
			type="button"
			className="group flex flex-col space-y-2 text-left align-top no-underline outline-none
			focus:outline-none
			focus:ring focus:ring-offset-2 dark:focus:ring-offset-neutral-500"
			onClick={open}
		>
			<Modal isOpen={statsOpen} setIsOpen={close} title={<SiSpotify size={24} />}>
				<div className="space-y-4">
					<div className="relative aspect-[3/2]">
						<Image
							src={image}
							layout="fill"
							alt={`${track.album.name} by ${artists}`}
							className="rounded-md object-cover pointer-events-none"
							loading="lazy"
							decoding="async"
						/>
					</div>
					{track.preview_url ? (
						<AudioMusic src={track.preview_url || ''} />
					) : (
						<p className="text-sm italic flex justify-end">*preview not available</p>
					)}

					<a
						href={track.external_urls.spotify}
						className="group flex justify-between rounded-md border bg-gray-200 p-3 no-underline dark:border-0 dark:bg-neutral-400"
						target="_blank"
						rel="noreferrer"
					>
						<div className="w-[90%]">
							<h2 className="md:text-2xl text-xl font-bold group-hover:underline truncate">
								{track.name}
							</h2>
							<h3 className="text-sm italic text-gray-400 dark:text-gray-800">by {artists}</h3>
						</div>

						<div>
							<HiExternalLink size={24} />
						</div>
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

					<button onClick={close} className="float-right !mt-0">
						Close
					</button>
				</div>
			</Modal>

			<div className="w-full overflow-hidden rounded-lg">
				<Image
					src={image}
					className="pointer-events-none rounded-lg brightness-75 transition-all duration-300 group-hover:scale-110 group-hover:brightness-100"
					alt={`${track.name} by ${artists}`}
					width={400}
					height={400}
					loading="lazy"
					decoding="async"
				/>
			</div>

			<ul className="py-0.5 text-lg contents items-center">
				<li className="truncate font-bold w-full ">
					{track.explicit && <MdExplicit className="-mt-1 inline" />} {track.name}
				</li>{' '}
				<li className="truncate w-full text-gray-600 dark:text-neutral-200/70">by {artists}</li>
			</ul>
		</button>
	);
}
export const getStaticProps: GetStaticProps<Props> = async () => {
	const redis = new IORedis(REDIS_URL || '');
	fetch("https://usw1-logical-tick-33201.upstash.io/set/foo/bar", {
		headers: {
		  Authorization: "Bearer AYGxASQgOTgxNGZmZDItNTQ5Zi00ZDdmLTgxMTYtNTliYTViYTM4YTAzYzhkMTU5ODBhMzViNDM0MWE3MmJjNmQ3OTZkYmI4ODA="
		}
	  }).then(response => response.json())
		.then(data => console.log("data: ", data));
		
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
	const tracks = await api.getMyTopTracks({ time_range: 'medium_term' });
	
	/* RecentlyPlayedTracks */
	//const tracks = await api.getMyRecentlyPlayedTracks({ limit: 20, after: 1484811043508 });

	await redis.quit();
	return {
		props: {
			topTracks: tracks.body.items,
		},
		revalidate,
	};
};