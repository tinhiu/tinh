import IORedis from 'ioredis';
import PaginationPage from "../../components/PaginatedPage";
import { useEffect, useState } from "react";
import { REDIS_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIS_KEYS } from "../../server/constants";
import SpotifyWebAPI from "spotify-web-api-node";
import { GetServerSideProps } from "next";
import { motion } from 'framer-motion';
import { getMyTopTracks } from '../../lib/spotify';
type Props = {
	currentPage: number | any;
	token: string | any;
	refresh: string | any;
};
const PER_PAGE = 12;
function MusicPage3({
	currentPage,
	token,
	refresh
}: Props) {
	const [page, setPage] = useState(1);
	const [music, setMusic] = useState([]);
	const [total, setTotal] = useState(1);

	useEffect(() => {
		if (currentPage) {
			let p = Number(currentPage) >= 1 ? currentPage : 1;
			setPage(Number(p));
		}
		getMyTopTracks(token, refresh, PER_PAGE, (Number(page || 1) - 1) * PER_PAGE).then(result => {
			setTotal(result.body.total)
			const items: any = result.body.items;
			setMusic(items);
		}).catch(error => console.log(error));
	}, [currentPage, page, token, refresh])
	return (
		<motion.div
			initial={{ opacity: 0, y: 7 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -4 }}
			transition={{ ease: 'easeInOut', duration: 0.4 }}
			className="mb-32 mt-24 w-full"
		>
			<PaginationPage
				music={music}
				url="music3"
				currentPage={page}
				totalProducts={total}
				perPage={PER_PAGE}
			/>
		</motion.div>
	);
}

export default MusicPage3;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const page = context.query.page || 1;
	const redis = new IORedis(REDIS_URL || '');
	const [token, refresh] = await redis.mget(
		SPOTIFY_REDIS_KEYS.AccessToken,
		SPOTIFY_REDIS_KEYS.RefreshToken
	);

	let api: SpotifyWebAPI;
	let revalidate = 120;

	if (!token && refresh) {
		// If we don't have a token but we do have a refresh token
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			refreshToken: refresh,
		});

		const result = await api.refreshAccessToken();

		await redis.set(
			SPOTIFY_REDIS_KEYS.AccessToken,
			result.body.access_token,
			'EX',
			// Expires is in seconds as per https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
			result.body.expires_in
		);

		// We should revalidate when the token expires
		// but we can do it slightly before
		revalidate = result.body.expires_in - 30;

		// If spotify wants us to use a new refresh token, we'll need to update it
		if (result.body.refresh_token) {
			await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, result.body.refresh_token);
		}
	} else if (token) {
		api = new SpotifyWebAPI({
			clientId: SPOTIFY_CLIENT_ID,
			clientSecret: SPOTIFY_CLIENT_SECRET,
			accessToken: token,
		});
	} else {
		throw new Error(
			'No Spotify tokens available! Please manually add them to the Redis store to allow tokens to refresh in the future.'
		);
	}
	await redis.quit();
	return {
		props: {
			token: token,
			refresh: refresh,
			currentPage: page || 1,
			userLanyard: null,
			revalidate,
		},
	};
};
