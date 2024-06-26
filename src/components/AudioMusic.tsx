import { useEffect, useRef, useState } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { HiMinusSm } from 'react-icons/hi'
type Props = {
	src: string;
};

function AudioMusic({ src }: Props) {
	const audioRef = useRef<HTMLAudioElement>(new Audio());


	const [playing, setPlaying] = useState(false);
	const [currentSong, setCurrentSong] = useState(audioRef);
	const [musicinfo, setMusicinfo] = useState({
		currentTime: 0,
		duration: 0,
		progressWidth: 0,
	});
	useEffect(() => {
		if (!src) return; // don't have preview_url

		if (audioRef.current) {
			audioRef.current.src = src;
			audioRef.current.volume = .25;
		}
		setPlaying(false);
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
	const timeUpdatehandler = async (e: React.ChangeEvent<HTMLAudioElement>) => {
		const current = e.target.currentTime;
		const duration = Number(e.target.duration);
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
			{(musicinfo.duration !== 0 && !isNaN(musicinfo.duration)) ? (
				<div className="flex items-center dark:text-black">
					<span className="leading-none">{formatTime(musicinfo.currentTime || 0)}</span>
					<div className="mx-1 h-1 w-full rounded-sm bg-gray-400">
						<div
							className="border-image-clip-path rounded-sm border-2 bg-neutral-700 transition-[width]"
							style={{ width: `${musicinfo.progressWidth}%` }}
						></div>
					</div>
					<div className="ml-auto flex items-center">
						<div className="mr-[2px]">
							<span className="block leading-none">{formatTime(musicinfo.duration || 0)}</span>
							{/* <span className="hidden items-center leading-none group-hover:flex">
								<HiMinusSm size={12} />
								{formatTime(musicinfo.duration - musicinfo.currentTime)}
							</span> */}
						</div>
						{playing ? (
							<AiOutlinePauseCircle className="" size={'24px'} onClick={handlePausePlayClick} />
						) : (
							<AiOutlinePlayCircle className="" size={'24px'} onClick={handlePausePlayClick} />
						)}
					</div>
				</div>
			) : (
				<div className="flex items-center w-full">
					<div className="h-[24px] w-full rounded-lg bg-neutral-400/5 dark:bg-rose-400/5"></div>
				</div>
			)}
			<audio
				loop
				src={src}
				ref={audioRef}
				onTimeUpdate={timeUpdatehandler}
				onLoadedMetadata={timeUpdatehandler}
				className="audio"
			></audio>
		</>
	);
}

export default AudioMusic;
