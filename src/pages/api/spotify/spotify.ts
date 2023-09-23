import { getCookie, getCookies } from 'cookies-next';
import SpotifyWebApi from 'spotify-web-api-node';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../../server/constants';
import { api } from '../../../server/api';
import UserSpotify from '../../../models/UserSpotify';

const apiSpotify = new SpotifyWebApi({
	clientId: SPOTIFY_CLIENT_ID,
	clientSecret: SPOTIFY_CLIENT_SECRET,
});
function waiting(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
async function setAccessToken() {
	let accessToken = getCookie('accessToken');
	apiSpotify.setAccessToken(accessToken as string);
}
export async function getMe() {
	await setAccessToken();
	const getMe = await apiSpotify.getMe();
	const user: UserSpotify = (({ country, email, product, ...rest }: any) => rest)(getMe.body);
	/* Get following artist */
	const follow = await apiSpotify.getFollowedArtists();
	user.following = follow.body.artists.total as number;

	/* Get user playlists */
	const playlists = await apiSpotify.getUserPlaylists(user?.id);
	user.playlists = playlists.body.total as number;
	return user;
}

export async function getRecentlyPlayed(limit: number) {
	await setAccessToken();
	return await apiSpotify.getMyRecentlyPlayedTracks({ limit: limit });
}

export async function getMyTopTracks(limit: number, skip: number) {
	if (skip < 0 || isNaN(skip)) return undefined;
	await setAccessToken();
	await waiting(1000);
	return await apiSpotify.getMyTopTracks({ time_range: 'short_term', limit: limit, offset: skip });
}
export default api({
	async GET({ req, res }) {
		return res.throw(403, 'You are not permitted to access!');
	},
});
