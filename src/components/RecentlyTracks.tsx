import { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { type LastFMGetRecent } from '../server/last-fm';
import nowPlaying from '../../public/assets/image/gif/now_playing_grey.gif'
import images from '../../public/assets/image'

function RecentlyTracks({
	tracks,
}: { tracks: LastFMGetRecent[] }) {
	const [isReady, setIsReady] = useState(false);
	const onLoadCallback = () => {
		setIsReady(true);
	};

	return (
		<div className="mt-2">
			<div className="grid w-full grid-cols-1 gap-4 overflow-x-auto">
				<table className="min-w-full">
					<tbody>
						{tracks.map((track, index) => (
							<tr key={index} className={`flex items-center justify-evenly bg-gray-300/5 p-2
							${Boolean(track['@attr']?.nowplaying) ? 'rounded-md bg-white/70 dark:bg-black/30' : ''} table-border relative 
							border-collapse`}>
								<td className="mx-2 flex w-auto items-center">
									<Image
										className={`pointer-events-none rounded-md object-cover px-2
										transition duration-700 ${isReady
												? 'scale-100 bg-gray-200 blur-0'
												: 'scale-110 blur-2xl'}`}
										src={track.image[3]['#text'] || images.defaultImage}
										width={60}
										height={60}
										alt={track.name}
										onLoadingComplete={onLoadCallback}

									/>
								</td>
								<td className="flex h-8 w-8 items-center justify-center">
									{
										track.loved === '1' ?
											<span className="heart-before relative h-5 w-5" />
											: <span className="heart-after relative h-5 w-5" />
									}
								</td>
								<td className="mx-2 grid w-[60%] truncate">
									<span className="font-bold">{track.name}</span>
									<span className="block md:hidden">{track.artist.name}</span>
								</td>
								<td className="hidden w-[25%] truncate sm:block">
									{track.artist.name}
								</td>
								<td className="flex w-36 items-center justify-end text-right  text-black/70 dark:text-white/75">
									{track.date ? (
										<span className="truncate">
											{dayjs(Number(track.date?.uts) * 1000).fromNow()}
										</span>
									) : (
										<>
											<Image
												src={nowPlaying}
												className="pointer-events-none bg-cover"
												alt={'nowPlaying'}
												width={16}
												height={16} />
											<span className="ml-2 truncate text-sm leading-none">Scrobbling now</span>
										</>
									)
									}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}


export default RecentlyTracks;