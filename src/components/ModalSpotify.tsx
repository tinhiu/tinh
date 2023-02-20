import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { HiExternalLink } from 'react-icons/hi';
const ModalSpotify = ({ user }: UserObjectPublic) => {
	//console.log(JSON.stringify(user,null,4));
	if (!user || !user.spotify) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
				className="my-4 h-40 relative "
			>
				<span
					className="absolute w-full h-full scale-[0.96] hover:scale-[0.99] rounded-2xl
                transition duration-500 hover:ease-out shadow-lg brightness-100 hover:brightness-110"
				>
					<a
						href="https://open.spotify.com/user/31lhz6y3u5ootzbuxbnkndz4x2ea"
						target="_blank"
						rel="norel"
						className="cursor-pointer"
					>
						<div
							className="
					before:content-['']
					before:bg-noise before:w-full
					before:h-full before:absolute
					before:rounded-2xl before:opacity-80
					"
						>
							<Image
								src="https://i.scdn.co/image/ab6775700000ee85857be609ae822848766e7419"
								className="drop-shadow-md object-cover object-bottom rounded-2xl -z-[10] saturate-150
                            blur-[1px] contrast-75"
								alt={`me`}
								layout="fill"
								loading="lazy"
								decoding="async"
							/>
						</div>
						<div className="flex h-full flex-col justify-between p-6  ">
							<span className="flex justify-between">
								<SiSpotify size={24} />
								<HiExternalLink size={24} />
							</span>
							<span className="flex flex-col">
								<span className="font-extrabold ml-2 text-2xl">tinh`</span>
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
			className="my-4 h-40 relative"
		>
			<span
				className="absolute w-full h-full scale-[0.96] hover:scale-[0.99] bg-slate-50 rounded-2xl
                transition duration-300 hover:ease-out shadow-lg brightness-100 hover:brightness-110 "
			>
				<a
					href={`https://open.spotify.com/track/${user.spotify.track_id}`}
					target="_blank"
					rel="norel"
					className="cursor-pointer"
				>
					<div
						className="
					before:content-['']
					before:bg-noise before:w-full
					before:h-full before:absolute
					before:rounded-2xl before:opacity-60
					"
					>
						<Image
							src={user.spotify.album_art_url}
							className="drop-shadow-md object-cover rounded-2xl -z-[10] opacity-90 saturate-150 "
							alt={`${user.spotify.album}`}
							layout="fill"
							loading="lazy"
							decoding="async"
						/>
					</div>

					<div className="flex h-full flex-col justify-between p-6">
						{/* 	<div>
							<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
								<filter id="noiseFilter">
									<feTurbulence
										type="fractalNoise"
										baseFrequency="0.65"
										numOctaves="3"
										stitchTiles="stitch"
									/>
								</filter>

								<rect width="100%" height="10%" filter="url(#noiseFilter)" />
							</svg>
						</div> */}
						<span className="flex justify-between">
							<SiSpotify size={24} />
							<HiExternalLink size={24} />
						</span>
						<span className="flex flex-col">
							<span className="font-semibold sm:text-base text-sm">
								I'm listening to
								<span className="font-extrabold ml-2 text-lg">{user.spotify.song}</span>
							</span>
							<span className="font-semibold sm:text-base text-sm">
								by
								<span className="font-extrabold ml-2 text-lg">
									{user.spotify.artist.replace(/;/g, ',')}
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
