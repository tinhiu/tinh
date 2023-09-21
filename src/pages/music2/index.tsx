import IORedis from 'ioredis';
import PaginationPage from "../../components/ListSong";
import { useEffect, useState } from "react";
import { REDIS_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIS_KEYS } from "../../server/constants";
import SpotifyWebAPI from "spotify-web-api-node";
import { GetServerSideProps } from "next";
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { getMyTopTracks } from '../api/spotify/spotify';
type Props = {
	currentPage: number | any;
	token: string | any;
	refresh: string | any;
};
const PER_PAGE = 12;
function MusicPage3({

}: Props) {
	const { data: topTracks } = useQuery({
		queryKey: ['getMyTopTracks', 1],
		queryFn: () => getMyTopTracks(6, 6),
		keepPreviousData: true,
	})
	console.log('topTracks: ', topTracks);
	return (
		<motion.div
			initial={{ opacity: 0, y: 7 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -4 }}
			transition={{ ease: 'easeInOut', duration: 0.4 }}
			className="mb-32 mt-24 w-full"
		>
			<h1>Music</h1>
			{/* <PaginationPage
				music={music}
				url="music3"
				currentPage={page}
				totalProducts={total}
				perPage={PER_PAGE}
			/> */}
		</motion.div>
	);
}

export default MusicPage3;