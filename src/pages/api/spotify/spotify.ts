import IORedis from 'ioredis';
import SpotifyWebAPI from 'spotify-web-api-node';
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
} from '../../../server/constants';
const api = new SpotifyWebAPI({
	clientId: SPOTIFY_CLIENT_ID,
	clientSecret: SPOTIFY_CLIENT_SECRET,
});

export default api;
