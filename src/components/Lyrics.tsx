import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { LrcLyrics, LyricLine } from '../util/lrcParser';
type LyricsProps = {
	lrc: LrcLyrics;
	audioRef: RefObject<HTMLAudioElement>;
	wordLevel?: boolean;
	readScrollRatio: number;
	playing: boolean;
	setPlaying: (playing: boolean) => void;
};
const Lyrics = ({
	lrc,
	audioRef,
	wordLevel,
	readScrollRatio,
	playing,
	setPlaying,
}: LyricsProps) => {
	const lId = useRef<string>('lyric-' + uuidv4().substring(0, 8));
	const [currentLine, setCurrentLine] = useState<number>(0);
	const lineRefs = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const updateLines = () => {
			const currentTime = audioRef.current !== null ? audioRef.current.currentTime : 0;
			const lineIdx = searchTimeBefore(lrc.lines, currentTime);
			const line = lineRefs.current[lineIdx];
			if (!line) return;
			setCurrentLine(lineIdx);
			if (!wordLevel) return;
		};
		if (audioRef.current) {
			audioRef.current.addEventListener('timeupdate', updateLines);
		}
		return () => {
			audioRef.current?.removeEventListener('timeupdate', updateLines);
		};
	}, [audioRef, lrc, wordLevel]);

	/** Binary search to find the LAST element with start time <= time */
	const searchTimeBefore = (arr: LyricLine[], time: number) => {
		let left = 0,
			right = arr.length - 1;
		while (left <= right) {
			const mid = Math.floor((left + right) / 2);
			if (arr[mid].time === time) {
				return mid;
			} else if (arr[mid].time > time) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
		return right;
	};
	const pushToArr = (
		item: HTMLDivElement | null,
		ref: MutableRefObject<HTMLDivElement[]>,
		idx: number
	) => {
		if (idx === 0) {
			ref.current = [];
		}
		if (item && !ref.current.includes(item)) {
			ref.current.push(item);
		}
	};

	const setAudioTime = (time: number) => {
		if (!audioRef.current) return;
		if (audioRef) {
			audioRef.current.currentTime = time;
		}
		if (audioRef.current.paused) audioRef.current.play();
	};
	useEffect(() => {
		const lyricsElement = document.getElementById(lId.current);
		const lineElements = document.getElementsByClassName('line');

		if (
			lyricsElement &&
			lineElements.length > 0 &&
			lineElements.length === lrc.lines.length &&
			currentLine < lrc.lines.length - 1
		) {
			const lyricsClientRects = lyricsElement.getClientRects();
			const lineClientRects = lineElements[currentLine].getClientRects();
			const nextLineClientRects = lineElements[currentLine + 1].getClientRects();
			if (
				nextLineClientRects[0].bottom >
				lyricsClientRects[0].top + readScrollRatio * lyricsClientRects[0].height
			) {
				lyricsElement.scrollTo({
					top:
						lyricsElement.scrollTop +
						(lineClientRects[0].top - lyricsClientRects[0].top) -
						(1.0 - readScrollRatio) * lyricsClientRects[0].height,
					behavior: 'smooth',
				});
			} else if (
				lineClientRects[0].bottom <
				lyricsClientRects[0].top + (1.0 - readScrollRatio) * lyricsClientRects[0].height
			) {
				lyricsElement.scrollTo({
					top:
						lyricsElement.scrollTop +
						(lineClientRects[0].top - lyricsClientRects[0].top) -
						(1.0 - readScrollRatio) * lyricsClientRects[0].height,
					behavior: 'smooth',
				});
			}
		}
	}, [currentLine, lrc.lines.length, readScrollRatio]);
	return (
		<div id={lId.current} className="lyrics max-w-full flex-none">
			<div className="min-h-0"></div>
			{lrc.lines.map((line, lineIdx) => (
				<div
					className={
						'line ' +
						(lineIdx < currentLine ? 'passed' : '') +
						(lineIdx === currentLine ? 'active' : '')
					}
					key={`${line.time}_${lineIdx}`}
					ref={(el) => pushToArr(el, lineRefs, lineIdx)}
					data-time={line.time}
					onClick={(e) => {
						const wordSpan = e.target as HTMLSpanElement;
						if (!wordSpan) return;
						if (!playing) setPlaying(!playing);
						setAudioTime(+wordSpan.attributes.getNamedItem('data-time')!.value);
					}}
				>
					{line.text}
				</div>
			))}
		</div>
	);
};

export default Lyrics;
// source: https://github.com/bouzidanas/lyr-ix && https://github.com/mikezzb/lrc-player
