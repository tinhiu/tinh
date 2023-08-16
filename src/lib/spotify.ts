import IORedis from 'ioredis';
import SpotifyWebAPI from 'spotify-web-api-node';
import {
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../server/constants';
import api from '../pages/api/spotify/spotify';
const delay = () => new Promise<void>(res => setTimeout(() => res(), 800));
export const getMyTopTracks = async (
	token: string,
	refresh: string,
	limit: number,
	offset: number
) => {
	api.setAccessToken(token);
	api.setRefreshToken(refresh);
	await delay();
	const response = await api.getMyTopTracks({
		time_range: 'short_term',
		limit: limit,
		offset: offset,
	});
	return response;
};
