import { motion } from 'framer-motion';
import Image from 'next/future/image';

const Song = ({ user }: any) => {
	if (!user || !user.spotify) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: -100 }}
				transition={{ delay: 1, duration: 2, easing: [0, 0.5, 0.28, 2] }}
				className="fixed 
                -bottom-40 left-14 hidden h-[7rem] w-[20rem] flex-col items-start justify-start lg:flex
                "
			>
				<i className="text-sm">*not playing anything 🥲</i>
			</motion.div>
		);
	}

	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: -100 }}
				transition={{ delay: 5, duration: 0.6, easing: [0, 0.5, 0.28, 2] }}
				className="fixed 
                -bottom-16 left-6 hidden h-[7rem] w-[20rem] flex-col items-start justify-start lg:flex
                "
			>
				<div className="move-position">
					<h1 className="mb-2 flex items-center justify-start text-base font-semibold text-black dark:text-gray-100 ">
						Listening to Spotify
						<span className="ml-2 h-2 w-2">
							<span className="absolute h-2 w-2 animate-ping rounded-full bg-green-500" />
							<span className="absolute h-2 w-2 rounded-full bg-green-600" />
						</span>
					</h1>

					<div className="flex h-[6rem] w-full flex-row items-center justify-start">
						<div className="transition duration-500 hover:scale-105 hover:ease-out">
							<Image
								src={user.spotify.album_art_url}
								className="pointer-events-none mr-4 h-[4.5rem] w-[4.5rem] rounded-md bg-cover "
								alt={user.spotify.album}
								width={150}
								height={150}
							/>
						</div>
						<div className="flex h-full w-56 flex-col items-start justify-center">
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
							<p
								className="text-black-900 relative w-full truncate text-sm font-normal dark:text-[#cad2e0]"
								title={user.spotify.album}
							>
								on {user.spotify.album}
							</p>
						</div>
					</div>
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 0 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
				className="fixed bottom-0 flex  w-full flex-col items-start justify-start bg-white/60 px-6 
                py-2  backdrop-blur-lg dark:bg-[#5f5555ad] sm:hidden
                "
			>
				<div className="flex h-[4rem] w-full flex-row items-center justify-start">
					<Image
						src={user.spotify.album_art_url}
						className="pointer-events-none mr-4 h-[3rem] w-[3rem] rounded-md bg-cover "
						alt={user.spotify.album}
						width={150}
						height={150}
					/>
					<div className="flex h-full w-[15rem] flex-col items-center justify-center ">
						<a
							href={`https://open.spotify.com/track/${user.spotify.track_id}`}
							target="_blank"
							rel="noreferrer"
							className="w-full truncate font-medium text-gray-900 hover:underline dark:text-[#e1eafd]"
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
					</div>
				</div>
			</motion.div>
		</>
	);
};
export default Song;
