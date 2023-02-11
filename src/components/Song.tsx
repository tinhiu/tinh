import {useLanyardWS} from 'use-lanyard';
import { motion } from 'framer-motion';
import { SiSpotify } from 'react-icons/si';


export const DISCORD_ID = '885439540268003338';
const Song = () => {

	const user = useLanyardWS(DISCORD_ID);
	
	if (!user || !user.spotify) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: -100 }}
				transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
				className="fixed 
                left-14 -bottom-40 w-[20rem] h-[7rem] hidden lg:flex flex-col items-start justify-start
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
				transition={{ duration: 0.8, easing: [0, 0.5, 0.28, 2] }}
				className="fixed 
                left-6 -bottom-16 w-[20rem] h-[7rem] hidden lg:flex flex-col items-start justify-start
                "
			>
				<div className="move-position">
					<h1 className="text-black dark:text-gray-100 font-semibold text-base mb-2 flex items-center justify-start ">
						Listening to Spotify
						<span className="ml-2 w-2 h-2">
							<span className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping" />
							<span className="absolute w-2 h-2 bg-green-600 rounded-full" />
						</span>
					</h1>

					<div className="w-full h-[6rem] flex flex-row items-center justify-start">
						<div className="hover:scale-125 transition duration-500 hover:ease-out">
							<img
								src={user.spotify.album_art_url || undefined}
								className="w-[4.5rem] h-[4.5rem] rounded-md mr-4 pointer-events-none bg-cover "
								alt={user.spotify.album}
							/>
						</div>
						<div className="w-56 h-full flex flex-col items-start justify-center">
							<a
								href={`https://open.spotify.com/track/${user.spotify.track_id || undefined}`}
								target="_blank"
								rel="noreferrer"
								className="w-full font-medium text-black-900 dark:text-[#e1eafd] hover:underline truncate"
								title={user.spotify.song || undefined}
							>
								{user.spotify.song}
							</a>
							<p
								className="w-full text-gray-800 dark:text-[#cad2e0] font-normal text-sm truncate relative"
								title={user.spotify.artist.replace(/;/g, ',')}
							>
								by {user.spotify.artist.replace(/;/g, ',')}
							</p>
							<p
								className="w-full text-black-900 dark:text-[#cad2e0] font-normal text-sm truncate relative"
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
				className="fixed flex sm:hidden  bottom-0 py-2 px-6 bg-white/60 dark:bg-[#5f5555ad] backdrop-blur-lg 
                w-full  flex-col items-start justify-start
                "
			>
				<div className="w-full h-[4rem] flex flex-row items-center justify-start">
					<img
						src={user.spotify.album_art_url}
						className="w-[3rem] h-[3rem] rounded-md mr-4 pointer-events-none bg-cover "
						alt={user.spotify.album}
					/>
					<div className="w-[15rem] h-full flex flex-col items-center justify-center ">
						<a
							href={`https://open.spotify.com/track/${user.spotify.track_id}`}
							target="_blank"
							rel="noreferrer"
							className="w-full font-medium text-gray-900 dark:text-[#e1eafd] hover:underline truncate"
							title={user.spotify.song}
						>
							{user.spotify.song}
						</a>
						<p
							className="w-full text-gray-800 dark:text-[#cad2e0] font-normal text-sm truncate relative"
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
