import { getCookie, getCookies } from 'cookies-next';
import SpotifyWebApi from 'spotify-web-api-node';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../../server/constants';

const apiSpotify = new SpotifyWebApi({
	clientId: SPOTIFY_CLIENT_ID,
	clientSecret: SPOTIFY_CLIENT_SECRET,
});
function waiting(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function setAccessToken() {
	await waiting(2000);
	let accessToken = getCookie('accessToken');
	apiSpotify.setAccessToken(accessToken as string);
}

export async function getRecentlyPlayed(limit: number) {
	await setAccessToken();
	return await apiSpotify.getMyRecentlyPlayedTracks({ limit: limit });
}

export async function getMyTopTracks(limit: number, skip: number) {
	if(skip < 0 || isNaN(skip)) return undefined;
	await setAccessToken();
	return await apiSpotify.getMyTopTracks({ time_range: 'short_term', limit: limit, offset: skip });
}
export default apiSpotify;