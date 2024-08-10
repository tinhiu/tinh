import React, { useState } from 'react';
import { Data } from 'use-lanyard';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { HiExternalLink } from 'react-icons/hi';
import UserSpotify from '../models/UserSpotify';

type Props = {
	spotify: Data;
	user: UserSpotify;
};
const ModalSpotify = ({ spotify, user }: Props) => {
	// console.log(JSON.stringify(spotify, null, 4));
	const [isReady, setIsReady] = useState(false);
	const image: string = user.images?.[1].url as string;

	const onLoadCallback = () => {
		setIsReady(true);
	};
	if (!spotify || (!spotify.listening_to_spotify && user)) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
				className="relative my-4 h-40"
			>
				<span className="absolute h-full w-full scale-[0.96] rounded-2xl shadow-md shadow-gray-600/50 brightness-100 transition duration-500 hover:scale-[0.99] hover:brightness-110 hover:ease-out dark:shadow-gray-400/50">
					<a
						href={user.external_urls.spotify}
						target="_blank"
						rel="norel noreferrer"
						className="cursor-pointer"
					>
						<div className="before:absolute before:h-full before:w-full before:rounded-2xl before:bg-noise before:opacity-80 before:content-['']">
							<div className="m-0 h-full overflow-hidden rounded-2xl border-0 p-0">
								<Image
									src={image}
									className={`duration-3000 z-[-10] h-full rounded-2xl bg-gray-400 object-cover object-center blur-[1px] contrast-75 drop-shadow-md saturate-150 transition ease-linear ${isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-sm'}`}
									alt={`me`}
									fill={true}
									sizes="(max-width: 768px) 100vw"
									loading="lazy"
									decoding="async"
									onLoad={onLoadCallback}
								/>
							</div>
						</div>
						<div className="flex h-full flex-col justify-between p-6">
							<span className="flex justify-between">
								<SiSpotify size={24} />
								<HiExternalLink size={24} />
							</span>
							<span className="flex flex-col">
								<span className="ml-2 text-2xl font-extrabold">tinh`</span>
							</span>
						</div>
					</a>
				</span>
			</motion.div>
		);
	}
	return (
		<motion.div
			initial={{ opacity: 0, y: 0 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
			className="relative my-4 h-40"
		>
			<span className="absolute h-full w-full scale-[0.96] overflow-hidden rounded-2xl shadow-md shadow-gray-600/50 brightness-95 transition duration-300 hover:scale-[0.99] hover:brightness-105 hover:ease-out dark:shadow-gray-400/50">
				<a
					href={`https://open.spotify.com/track/${spotify.spotify?.track_id}`}
					target="_blank"
					rel="norel noreferrer"
					className="cursor-pointer"
				>
					<div className="before:absolute before:h-full before:w-full before:rounded-2xl before:bg-noise before:opacity-60 before:content-['']">
						<div className="m-0 h-full overflow-hidden rounded-2xl border-0 p-0">
							<Image
								style={{ borderRadius: '2rem!important' }}
								src={spotify.spotify?.album_art_url as string}
								className={`duration-3000 z-[-10] rounded-2xl bg-gray-400 object-cover opacity-90 blur-[1px] drop-shadow-md saturate-150 transition ease-linear ${isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-md'}`}
								alt={`${spotify.spotify?.album}`}
								fill={true}
								sizes="(max-width: 768px) 100vw"
								loading="lazy"
								decoding="async"
								onLoad={onLoadCallback}
								quality={100}
							/>
						</div>
					</div>

					<div className="flex h-full flex-col justify-between rounded-2xl p-6">
						<span className="flex justify-between">
							<SiSpotify size={24} />
							<HiExternalLink size={24} />
						</span>
						<span className="flex w-full flex-col overflow-hidden text-ellipsis">
							<span className="text-sm font-semibold sm:text-base">
								I'm listening to
								<span className="ml-2 text-lg font-extrabold">{spotify.spotify?.song}</span>
							</span>
							<span className="text-sm font-semibold sm:text-base">
								by
								<span className="ml-2 text-lg font-extrabold">
									{spotify.spotify?.artist.replace(/;/g, ',')}
								</span>
							</span>
						</span>
					</div>
				</a>
			</span>
		</motion.div>
	);
};

export default ModalSpotify;
