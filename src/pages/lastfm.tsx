import { useEffect, useState } from 'react';
import type { GetServerSideProps } from 'next';
import LyricsClient from 'sync-lyrics';
import Tippy from '@tippyjs/react/';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { MdZoomInMap } from 'react-icons/md';
import { LAST_FM_API_KEY, SPOTIFY_COOKIE } from '../server/constants';
import { LastFM, PixelGrid } from '../server/last-fm';
type Props = {
	data: PixelGrid[];
};
let delay = 0;
let color = 4;
export default function LastFMPage({ data }: Props) {
	console.log('data: ', data);
	const [bigSize, setBigSize] = useState(false);
	const [schema, setSchema] = useState(1);
	const handleZoom = () => {
		setBigSize(!bigSize);
	};
	const handleChange = () => {
		if (schema === 4) {
			setSchema(1);
			return;
		}
		setSchema(schema + 1);
	};

	return (
		<div className="experiment-container mb-16 flex flex-col items-center justify-center">
			<div className="mb-2 flex w-full justify-center">
				<div
					onClick={handleChange}
					className={`schema${schema} h-6 w-1/2 cursor-pointer rounded-md p-2`}
				></div>
				<div onClick={handleZoom} className={`cursor-pointer rounded-md px-6`}>
					{bigSize ? (
						<MdZoomInMap className="rounded-md text-neutral-600 dark:text-white/75" size={21} />
					) : (
						<MdOutlineZoomOutMap
							className="rounded-md text-neutral-600 dark:text-white/75"
							size={21}
						/>
					)}
				</div>
			</div>
			<div className="pixel-grid mb-10 flex justify-center">
				<div className={`pixel-grid-container ${bigSize ? 'big-size' : 'small-size'}`}>
					{data.map((squares: PixelGrid, index: number) => {
						index === 0 ? (delay = 0) : (delay = delay + 0.0006);

						if (squares.value > 130) {
							color = 1;
						} else if (squares.value > 70) {
							color = 2;
						} else if (squares.value > 5) {
							color = 3;
						} else {
							color = 4;
						}
						return (
							<Tippy
								duration={[0, 0]}
								key={squares.date}
								content={
									<div className="pixel-grid-tooltip">
										<div className="tooltip-date">{squares.date}</div>
										<div className="tooltip-scrobbles">{squares.count}</div>
									</div>
								}
								sticky={false}
								placement="bottom-start"
							>
								<button
									data-date={squares.date}
									data-scrobbles={squares.count}
									className={`pixel schema${schema} color${color}`}
									style={{
										transition: `background-color 0.1s ease ${delay.toFixed(4)}s, min-width 0.25s ease, min-height 0.25s ease`,
									}}
								></button>
							</Tippy>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const client = new LyricsClient(SPOTIFY_COOKIE || '');
	// const lyrics = await client.getLyrics('7s9gcI3vON7hpTzQO2PEun');
	// console.log('lyrics: ', lyrics);
	const lfm = new LastFM(LAST_FM_API_KEY!);
	let result = await lfm.getPixelGrid('pixel-grid', '0', '');
	return {
		props: {
			data: result.reverse(),
		},
	};
};
