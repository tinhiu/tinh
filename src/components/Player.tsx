import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';

import { LrcLyrics, parse } from '../util/lrcParser';
import Lyrics from './Lyrics';
import { LittleVi } from '../pages/_app';

const Player = () => {
	const [playing, setPlaying] = useState(false);

	const [lrc, setLrc] = useState<LrcLyrics | null>();
	const [audioUrl, setAudioUrl] = useState<string>();
	const audioRef = useRef<HTMLAudioElement>(null);
	useEffect(() => {
		fetch('/ocean.lrc')
			.then((r) => r.text())
			.then((text) => {
				setLrc(parse(text));
			});
		setAudioUrl('/ocean.mp3');
	}, []);
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = 0.25;
		}
	}, [audioRef.current]);

	if (!lrc) return <h1>Loading...</h1>;
	const handlePausePlayClick = () => {
		if (playing) {
			audioRef.current!.pause();
			setPlaying(!playing);
		} else {
			audioRef.current!.play();
			setPlaying(!playing);
		}
	};
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-black/5 px-6 py-10 shadow-xl sm:h-fit sm:py-12">
			<div className="flex w-full items-center justify-between">
				<p className="text-4xl font-semibold" style={LittleVi.style}>
					Ocean - Ghostly Kisses
				</p>
				{playing ? (
					<AiOutlinePauseCircle className="" size={'24px'} onClick={handlePausePlayClick} />
				) : (
					<AiOutlinePlayCircle className="" size={'24px'} onClick={handlePausePlayClick} />
				)}
			</div>
			{Boolean(lrc && audioUrl) ? (
				<Lyrics
					lrc={lrc}
					audioRef={audioRef}
					wordLevel
					readScrollRatio={1}
					setPlaying={setPlaying}
					playing={playing}
				/>
			) : null}
			{Boolean(audioUrl) && (
				<audio ref={audioRef} controls src={audioUrl} autoPlay={false} className="hidden" />
			)}
		</div>
	);
};

export default Player;
// source: https://github.com/bouzidanas/lyr-ix && https://github.com/mikezzb/lrc-player
