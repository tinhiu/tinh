import IORedis from 'ioredis';
import dayjs from 'dayjs';
import ms from 'ms';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import SpotifyWebAPI from 'spotify-web-api-node';
import type { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { HiExternalLink } from 'react-icons/hi';
import { MdExplicit } from 'react-icons/md';
import { SiSpotify } from 'react-icons/si';
import Image from 'next/image';
import TrackObjectFull = SpotifyApi.TrackObjectFull;
import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import PlayHistoryObject = SpotifyApi.PlayHistoryObject;
import {
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../server/constants';


type Props = {
	topTracks: TrackObjectFull[],
	//topTracks: PlayHistoryObject[],
	
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
						Listening to music is my cup of tea. I listen to many different kinds of music.
						Most of the time, I love listening to music. You can find some kind of music that i love below
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
					{topTracks.map((track) => (
						<Track key={track.id} track={track} />
					))}
				</div>
		</motion.div>
	);
}
function Track({ track }: { track: TrackObjectFull /* PlayHistoryObject */ }) {
	const [openModel, setopenModel] = useState(false);

	const image = track.album.images[0].url;
	const artists = track.artists.map((artist) => artist.name).join(', ');

	const close = () => {
		setopenModel(false);
	};

	const open = () => {
		setopenModel(true);
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
			
			<div className="image-span-block w-full overflow-hidden rounded-lg">
				<Image
					src={image}
					className="rounded-lg brightness-75 transition-all duration-300 group-hover:scale-110 group-hover:brightness-100"
					alt={`${track.name} by ${artists}`}
					width={400}
					height={400}
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
	const tracks = await api.getMyTopTracks({time_range: 'long_term',});

	/* RecentlyPlayedTracks */
	//const tracks = await api.getMyRecentlyPlayedTracks({limit: 20, after: 1484811043508});


	await redis.quit();
	return {
		props: {
			topTracks: tracks.body.items,
		},
		revalidate,
	};
};
