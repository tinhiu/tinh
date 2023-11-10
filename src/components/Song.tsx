import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Data } from 'use-lanyard';
import { motion } from 'framer-motion';
import Image from 'next/future/image';
import { SiSpotify } from 'react-icons/si';
import nowPlaying from '../../public/assets/image/gif/now_playing_grey.gif'
import cat from '../../public/assets/image/gif/neon-cat-rainbow.gif'
import cat2 from '../../public/assets/image/gif/cat-pixel2.gif'

const Song = ({ user }: { user: Data | any }) => {
	const [, rerender] = useState({});

	useEffect(() => {
		if (user?.listening_to_spotify) {
			const interval = setInterval(() => {
				rerender({});
			}, 1000);

			return () => clearInterval(interval);
		}
		return;
	}, [user?.listening_to_spotify]);
	if (!user || !user.spotify) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 1, duration: 2, easing: [0, 0.5, 0.28, 2] }}
				className="fixed bottom-11 left-20 hidden flex-col items-start justify-start lg:flex"
			>
				<span className="flex items-center justify-center text-2xl text-black dark:text-white">
					<Image src={cat2} height={120} width={120} alt='cat1' />
				</span>

			</motion.div>
		);
	}
	const total = user.spotify.timestamps.end - user.spotify.timestamps.start;
	const progress = 100 - (100 * (user.spotify.timestamps.end - new Date().getTime())) / total;

	const formatTime = (currentTime: any) => {
		let minutes = Math.floor(currentTime / 60);
		let seconds = Math.floor(currentTime % 60);
		seconds = seconds >= 10 ? seconds : ((`0` + (seconds % 60)) as any);
		const formatTime = minutes + ':' + seconds;
		return formatTime;
	};
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 5, duration: 2, easing: [0, 0.5, 0.28, 2] }}
				className="fixed bottom-8 left-6 hidden h-[7rem] w-[19rem] flex-col items-start justify-start font-sans laptop:flex"
			>
				<div className="move-position">
					<h1 className="mb-2 flex items-center justify-start text-base font-semibold text-black dark:text-gray-100 ">
						Listening to Spotify
						<span className="boxContainer ml-2 h-4 transition-all">
							<div className="box box1 dark:bg-[#00ff00] "></div>
							<div className="box box2 dark:bg-[#00ff00]"></div>
							<div className="box box3 dark:bg-[#00ff00]"></div>
						</span>
						<span className="ml-2">
							<Image
								src={cat}
								className="pointer-events-none bg-cover"
								alt='cat'
								width={40}
								height={40}
							/>
						</span>
					</h1>

					<div className="flex h-[6rem] w-full flex-row items-center justify-start rounded-lg bg-white/60 p-2 backdrop-blur-lg dark:bg-[#5f5555ad]">
						<div className="w-20 scale-95 transition duration-500 hover:scale-100 hover:ease-out">
							<Image
								src={user.spotify.album_art_url}
								className="pointer-events-none mr-4 h-[4.5rem] w-[4.5rem] animate-spin-slow rounded-full bg-cover"
								alt={user.spotify.album}
								width={150}
								height={150}
							/>
						</div>
						<div className="flex h-full w-52 flex-col items-start justify-center inspect:w-64">
							<a
								href={`https://open.spotify.com/track/${user.spotify.track_id}`}
								target="_blank"
								rel="noreferrer"
								className="text-black-900 w-full truncate font-medium hover:underline dark:text-[#e1eafd]"
								title={user.spotify.song}
							>
								{user.spotify.song}
							</a>
							<p
								className="relative w-full truncate text-sm font-normal text-gray-800 dark:text-[#cad2e0]"
								title={user.spotify.artist.replace(/;/g, ',')}
							>
								by {user.spotify.artist.replace(/;/g, ',')}
							</p>
							<div className="mt-2 flex w-full items-center justify-center pr-1 leading-none">
								<div className="h-1 w-full rounded-sm bg-gray-400">
									<div
										className="h-full rounded-sm bg-[#1DB954] dark:bg-[#00ff00]"
										style={{ width: `${progress}%` }}
									></div>
								</div>
								<div className="mx-1">
									{formatTime(dayjs((new Date().getTime() - user.spotify.timestamps.start)).valueOf() / 1000)}</div>
								<div className="ml-1 text-[#1DB954] dark:text-[#00ff00]">
									<SiSpotify size={16} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
				className="fixed bottom-0 z-[1] flex w-full flex-col items-start justify-start bg-white/60 px-6 
                py-2 backdrop-blur-lg dark:bg-[#5f5555ad] laptop:hidden
                "
			>
				<div className="flex h-[4rem] w-full flex-row items-center justify-start">
					<div className="flex w-16 flex-row items-center justify-center">
						<Image
							src={nowPlaying}
							className="pointer-events-none absolute z-[1] bg-cover"
							alt={'nowPlaying'}
							width={16}
							height={16}
						/>
						<Image
							src={user.spotify.album_art_url}
							className="pointer-events-none h-[3rem] w-[3rem] animate-spin-slow rounded-full bg-cover"
							alt={user.spotify.album}
							width={150}
							height={150}
						/>
					</div>
					<div className="ml-4 flex h-full w-full flex-col items-center justify-center truncate">
						<a
							href={`https://open.spotify.com/track/${user.spotify.track_id}`}
							target="_blank"
							rel="noreferrer"
							className="flex w-full truncate font-medium text-gray-900 hover:underline dark:text-[#e1eafd]"
							title={user.spotify.song}
						>

							{user.spotify.song}

						</a>
						<p
							className="relative w-full truncate text-sm font-normal text-gray-800 dark:text-[#cad2e0]"
							title={user.spotify.artist.replace(/;/g, ',')}
						>
							by {user.spotify.artist.replace(/;/g, ',')}
						</p>
						<div className="flex w-full items-center justify-center leading-none">
							<div className="h-1 w-full rounded-sm bg-gray-400">
								<div
									className="h-full rounded-sm bg-[#1DB954] dark:bg-[#00ff00]"
									style={{ width: `${progress}%` }}
								></div>
							</div>
							<div className="mx-1">
								{formatTime(dayjs((new Date().getTime() - user.spotify.timestamps.start)).valueOf() / 1000)}</div>
							<div className="ml-1 text-[#1DB954] dark:text-[#00ff00]">
								<SiSpotify size={16} />
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};
export default Song;
