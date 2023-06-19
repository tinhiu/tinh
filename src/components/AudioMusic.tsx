import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';

type Props = {
	src: string;
};

function AudioMusic({ src }: Props) {
	const audioRef = useRef(new Audio(src));

	const [playing, setPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(audioRef);
	const [musicinfo, setMusicinfo] = useState({
		currentTime: 0,
		duration: 0,
		progressWidth: 0,
	});
	useEffect(() => {
		if (!src) return; // don't have preview_url
		currentSong.current.volume = 0.15;
	}, [currentSong, src]);
	const handlePausePlayClick = () => {
		if (playing) {
			currentSong.current.pause();
			setPlaying(!playing);
		} else {
			currentSong.current.play();
			setPlaying(!playing);
		}
	};
	const timeUpdatehandler = async (e: any) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		let progressWidth = (current / duration) * 100;

		setMusicinfo({
			currentTime: current, //timeFormat(current),
			duration: duration, //timeFormat(duration),
			progressWidth,
		});
	};

	const formatTime = (currentTime: any) => {
		let minutes = Math.floor(currentTime / 60);
		let seconds = Math.floor(currentTime % 60);
		seconds = seconds >= 10 ? seconds : ((`0` + (seconds % 60)) as any);
		const formatTime = minutes + ':' + seconds;
		return formatTime;
	};

	return (
		<>
			{/* <div className="absolute flex items-center top-[13rem] left-[17rem] ">
				{playing ? (
					<AiOutlinePauseCircle className="justify-center" size={'32px'} onClick={handlePausePlayClick} />
				) : (
					<AiOutlinePlayCircle className="justify-center" size={'32px'} onClick={handlePausePlayClick} />
				)}
			</div> */}
			<div className="flex items-center">
				<span className="">{formatTime(musicinfo.currentTime || 0)}</span>
				<div className="mx-1 h-1 w-full rounded-sm bg-gray-400">
					<div
						className="h-full rounded-sm bg-neutral-700 transition-[width]"
						style={{ width: `${musicinfo.progressWidth}%` }}
					></div>
				</div>
				<div className=" ml-auto flex items-center">
					<div className="group">
						<span className="block group-hover:hidden">{formatTime(musicinfo.duration || 0)}</span>
						<span className="hidden group-hover:block">
							<span className="">-</span>
							{formatTime(musicinfo.duration - musicinfo.currentTime)}
						</span>
					</div>
					{playing ? (
						<AiOutlinePauseCircle className="" size={'24px'} onClick={handlePausePlayClick} />
					) : (
						<AiOutlinePlayCircle className="" size={'24px'} onClick={handlePausePlayClick} />
					)}
				</div>
				<audio
					loop
					src={src}
					ref={audioRef}
					onTimeUpdate={timeUpdatehandler}
					onLoadedMetadata={timeUpdatehandler}
					className="audio"
				></audio>
			</div>
		</>
	);
}

export default AudioMusic;
