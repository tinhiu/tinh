import React, { useState } from 'react';
import Image from 'next/future/image';
import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';
import { HiExternalLink } from 'react-icons/hi';
const ModalSpotify = ({ user }: UserObjectPublic) => {
	//console.log(JSON.stringify(user,null,4));
	const [isReady, setIsReady] = useState(false);

	const onLoadCallback = () => {
		setIsReady(true);
	};
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
					shadow-gray-600/50 dark:shadow-gray-400/50
                	transition duration-500 hover:ease-out shadow-md brightness-100 hover:brightness-110"
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
						before:rounded-2xl before:opacity-80"
						>
							<div className='rounded-2xl overflow-hidden border-0 m-0 p-0 h-full'>
								<Image
									src="https://i.scdn.co/image/ab6775700000ee85857be609ae822848766e7419"
									className={`drop-shadow-md object-cover object-bottom rounded-2xl -z-[10] saturate-150
		                            blur-[1px] contrast-75 bg-gray-400 transition duration-3000 ease-linear h-full
									${isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-sm'}`}
									alt={`me`}
									fill="true"
									sizes="(max-width: 768px) 100vw"
									loading="lazy"
									decoding="async"
									onLoadingComplete={onLoadCallback}
								/>
							</div>
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
				className="absolute w-full h-full scale-[0.96] hover:scale-[0.99] rounded-2xl  overflow-hidden
				 shadow-gray-600/50 dark:shadow-gray-400/50
                transition duration-300 hover:ease-out shadow-md brightness-95 hover:brightness-105 "
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
					<div className='rounded-2xl overflow-hidden border-0 m-0 p-0 h-full'>
						<Image
							style={{ borderRadius: '2rem!important' }}
							src={user.spotify.album_art_url}
							className={`drop-shadow-md object-cover -z-[10] rounded-2xl blur-[1px] 
							opacity-90 saturate-150 bg-gray-400 transition duration-3000 ease-linear
							${isReady ? 'scale-100 bg-gray-400 blur-0' : 'scale-120 blur-md'}`}
							alt={`${user.spotify.album}`}
							fill="true"
							sizes="(max-width: 768px) 100vw"
							loading="lazy"
							decoding="async"
							onLoadingComplete={onLoadCallback}
							
						/>
					</div>
					</div>

					<div className="flex h-full flex-col justify-between p-6 rounded-2xl ">
						<span className="flex justify-between">
							<SiSpotify size={24} />
							<HiExternalLink size={24} />
						</span>
						<span className="flex flex-col w-full text-ellipsis overflow-hidden ">
							<span className="font-semibold sm:text-base text-sm">
								I'm listening to
								<span className=" font-extrabold ml-2 text-lg  ">{user.spotify.song}</span>
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
