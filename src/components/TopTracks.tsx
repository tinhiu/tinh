import React, { useEffect, useRef, useState } from 'react';
import ColorThief from 'colorthief';
import { HiExternalLink } from 'react-icons/hi';
import { SiSpotify } from 'react-icons/si';
import TailwindColor from '@videsk/tailwind-random-color';
import Image from 'next/image';
import dayjs from 'dayjs';
import ms from 'ms';
import { MdExplicit } from 'react-icons/md';

import Details from './Details';
import Modal from './Modal';

import AlbumObjectFull = SpotifyApi.AlbumObjectFull;
import TrackObjectFull = SpotifyApi.TrackObjectFull;

import AudioMusic from './AudioMusic';

function TopTrack({ track }: { track: TrackObjectFull }) {
	const ref = useRef<HTMLImageElement>(null);
	const [isReady, setIsReady] = useState(false);
	const [statsOpen, setStatsOpen] = useState(false);

	const options = {
		colors: ['yellow', 'orange', 'blue', 'cyan', 'purple', 'emerald'],
		range: [4, 4], // Between 400 and 400,
		prefix: 'shadow',
	};

	const [ranDom, setRanDom] = useState('shadow-blue-400');
	const [color, setColor] = useState([225, 213, 213]);
	const changeRandom = () => {
		const randomColor = new TailwindColor(options).pick();
		setRanDom(randomColor);
	};

	const onLoadCallback = () => {
		setTimeout(() => {
			setIsReady(true);
		}, 900);
	};

	const image = track.album.images[0].url;

	const artists = track.artists.map((artist: { name: string }) => artist.name).join(', ');

	const closeModal = () => {
		setStatsOpen(false);
	};

	const open = () => {
		setStatsOpen(true);
	};

	useEffect(() => {
		const img = ref.current;
		if (!img) return;
		img.crossOrigin = 'Anonymous';
		if (img.complete) {
			setColor(new ColorThief().getColor(img));
		} else {
			img.addEventListener('load', () => {
				setColor(new ColorThief().getColor(img));
			});
		}
	}, []);

	const album = track.album as AlbumObjectFull;

	return (
		<button
			key={track.id}
			type="button"
			className="group flex flex-col space-y-2 p-[2px] text-left align-top no-underline outline-none focus:outline-none focus:ring-4 focus:ring-amber-100 dark:focus:ring-gray-200"
			onClick={open}
			onMouseLeave={changeRandom}
		>
			<Modal
				isOpen={statsOpen}
				onCloseModal={closeModal}
				title={<SiSpotify size={24} />}
				image={image}
			>
				<div className="space-y-4">
					<div className="relative aspect-[1] sm:aspect-[3/2]">
						<Image
							src={image}
							fill
							alt={`${track.album.name} by ${artists}`}
							className={`pointer-events-none h-auto w-full rounded-md bg-gray-200 object-cover transition duration-700`}
							loading="eager"
							decoding="async"
						/>
					</div>
					{track.preview_url ? (
						<AudioMusic src={track.preview_url || ''} />
					) : (
						<p className="flex justify-end font-sans text-sm font-semibold italic dark:text-black">
							*preview not available
						</p>
					)}

					<a
						href={track.external_urls.spotify}
						className="group flex justify-between rounded-md border bg-gray-400 p-3 no-underline dark:border-0 dark:bg-neutral-400"
						target="_blank"
						rel="noreferrer"
					>
						<div className="w-[90%] dark:text-black">
							<h2 className="truncate text-xl font-bold group-hover:underline md:text-2xl">
								{track.name}
							</h2>
							<h3 className="text-sm italic text-gray-800 dark:text-gray-800">by {artists}</h3>
						</div>

						<HiExternalLink size={24} className="dark:text-black" />
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
									value: (
										<span>
											<a
												href={album.external_urls.spotify}
												target="_blank"
												className="hover:underline"
												rel="noreferrer"
											>
												{album.name}
											</a>
										</span>
									),
								},
								{
									name: 'Duration:',
									value: ms(track.duration_ms, { long: true }),
								},
							]}
						/>
					</>

					<button
						onClick={closeModal}
						className="float-right !mt-0 rounded-lg px-2 py-1 hover:bg-slate-400/40 hover:delay-100 dark:text-black"
					>
						Close
					</button>
				</div>
			</Modal>

			<div className={`group-hover:${ranDom} w-full transition-all group-hover:shadow-lg`}>
				<figure
					className="opacity-1 relative m-0 block overflow-hidden border-0 p-0"
					style={{
						backgroundColor: `${!isReady && `rgba(${color.join(',')}, 0.9)`}`,
						borderColor: `${!isReady && `rgba(${color.join(',')}, 0.9 )`}`,
						filter: `${!isReady ? 'blur(1px)' : ''}`,
					}}
				>
					<Image
						ref={ref}
						src={image}
						className={`pointer-events-none scale-100 brightness-105 transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 md:brightness-90 ${isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 opacity-0 blur-2xl'}`}
						alt={`${track.name} by ${artists}`}
						width={400}
						height={400}
						loading="lazy"
						decoding="async"
						sizes="100vw"
						onLoadingComplete={onLoadCallback}
					/>
				</figure>
			</div>
			<div className="w-full truncate">
				<ul className="mt-4 contents items-center py-0.5 text-lg">
					<li className="w-full truncate font-bold">
						{track.explicit && <MdExplicit className="-mt-1 inline" />} {track.name}
					</li>{' '}
					<li className="w-full truncate text-gray-600 dark:text-neutral-200/70">by {artists}</li>
				</ul>
			</div>
		</button>
	);
}

const TopTracks = ({ music }: { music: TrackObjectFull[] }): JSX.Element => {
	return (
		<div className="mt-2 grid grid-cols-2 gap-4 gap-y-8 md:grid-cols-3">
			{music.map((track, i) => {
				return <TopTrack key={track?.id} track={track} />;
			})}
		</div>
	);
};

export default TopTracks;
