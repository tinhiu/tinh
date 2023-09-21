import React, { useState } from 'react';
import Details from './Details';
import { HiExternalLink } from 'react-icons/hi';
import Modal from './Modal';
import { SiSpotify } from 'react-icons/si';
import TailwindColor from '@videsk/tailwind-random-color';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ms from 'ms';
import { MdExplicit } from 'react-icons/md';

import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;

import AudioMusic from './AudioMusic';
type PageProps = {
	music: TrackObjectFull[];
	// currentPage: number;
	// url: string;
	// totalProducts: number;
	// perPage: number;
};
dayjs.extend(relativeTime);

function Track({ track }: { track: TrackObjectFull }) {
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
	const artists = track.artists.map((artist: { name: any; }) => artist.name).join(', ');

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
			<Modal isOpen={statsOpen} setIsOpen={close} title={<SiSpotify size={24} />} image={image}>
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
						className="float-right !mt-0 rounded-lg px-2 py-1 hover:bg-slate-400/40 hover:delay-100"
					>
						Close
					</button>
				</div>
			</Modal>

			<div className={`group-hover:${ranDom} w-full transition-all group-hover:shadow-lg`}>
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
const ListSong = ({
	music,
}: PageProps): JSX.Element => {
	return (
		<>
			<div className="grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
				{music.map((track) => (
					<Track key={track.id} track={track} />
				))}
			</div>
		</>
	);
};

export default ListSong;
