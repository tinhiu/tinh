import { useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import { LastFM, type LastFMGetRecent } from '../server/last-fm';
import nowPlaying from '../../public/assets/image/gif/now_playing_grey.gif'
import images from '../../public/assets/image'
import Link from 'next/link';
import { LAST_FM_API_KEY } from '../server/constants';
const lfm = new LastFM(LAST_FM_API_KEY!);

function RecentlyTracks({
	tracks,
}: { tracks: LastFMGetRecent[] }) {
	const [isReady, setIsReady] = useState(false);
	const onLoadCallback = () => {
		setIsReady(true);
	};
	
	return (
		<div className="mt-2">
			<div className="table-scrollx grid w-full grid-cols-1 gap-4 overflow-x-auto ">
				<table className="min-w-full">
					<tbody>
						{tracks.map((track, index) => (
									<tr key={index}
										className={`table-border relative flex items-center justify-evenly bg-gray-300/5 
										p-2 hover:bg-white/40 dark:hover:bg-black/10
									${Boolean(track['@attr']?.nowplaying) ? 'rounded-t-md bg-white/60 dark:bg-black/20 ' : ''} `}>
										<td className="mx-2 flex w-auto items-center">
										<div
											className="relative flex h-full
										w-full before:absolute
										before:h-full before:w-full
										before:rounded-2xl before:bg-noise
										before:opacity-80 before:content-['']"
										>
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
												loading="eager"
											/>
											</div>
										</td>
										<td className="flex h-8 w-8 items-center justify-center">
											{
												track.loved === '1' ?
													<span className="heart-before relative h-5 w-5" />
													: <span className="heart-after relative h-5 w-5" />
											}
										</td>
										<td className="mx-2 grid w-[50%] truncate">
											<Link href={track.url}>
												<a className="w-fit font-bold hover:underline" target='_blank'>
													{track.name}
												</a>
											</Link>
											<span className="block sm:hidden">{track.artist.name}</span>
										</td>
										<td className="hidden w-[35%] truncate sm:block">
											<Link href={track.artist.url}>
												<a className="hover:underline" target='_blank'>
													{track.artist.name}
												</a>
											</Link>
										</td>
										<td className="flex w-40 items-center justify-end
										 text-right text-black/70 dark:text-white/75">
											{!Boolean(track['@attr']?.nowplaying) ? (
												<span className="truncate" title={track.date['#text']}>
													{dayjs(Number(track.date.uts) * 1000).fromNow()}
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
								)
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	);
}


export default RecentlyTracks;