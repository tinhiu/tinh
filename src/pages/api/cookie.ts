import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import SpotifyWebApi from 'spotify-web-api-node';
import IORedis from 'ioredis';

import {
	REDIS_URL,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REDIS_KEYS,
} from '../../server/constants';
type Data = {
	data: undefined | null;
};
export default async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		// do some server action
		const redis = new IORedis(REDIS_URL || '');
		const [token, refresh] = await redis.mget(
			SPOTIFY_REDIS_KEYS.AccessToken,
			SPOTIFY_REDIS_KEYS.RefreshToken
		);
		let api: SpotifyWebApi;
		if (!token && refresh) {
			// If we don't have a token but we do have a refresh token
			api = new SpotifyWebApi({
				clientId: SPOTIFY_CLIENT_ID,
				clientSecret: SPOTIFY_CLIENT_SECRET,
				refreshToken: refresh,
			});
			const result = await api.refreshAccessToken();
			setCookie('accessToken', result.body.access_token, {
				req,
				res,
				maxAge: 60 * 6 * 6,
				path: '/',
			});
			await redis.set(
				SPOTIFY_REDIS_KEYS.AccessToken,
				result.body.access_token,
				'EX',
				// Expires is in seconds as per https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
				result.body.expires_in
			);

			// If spotify wants us to use a new refresh token, we'll need to update it
			if (result.body.refresh_token) {
				await redis.set(SPOTIFY_REDIS_KEYS.RefreshToken, result.body.refresh_token);
				setCookie('refreshToken', result.body.refresh_token, {
					req,
					res,
					maxAge: 60 * 6 * 6,
					path: '/',
				});
			}
		} else if (token) {
			api = new SpotifyWebApi({
				clientId: SPOTIFY_CLIENT_ID,
				clientSecret: SPOTIFY_CLIENT_SECRET,
				accessToken: token,
			});
			setCookie('accessToken', token, { req, res, maxAge: 60 * 6 * 24, path: '/' });
		} else {
			// throw new Error(
			// 	'No Spotify tokens available! Please manually add them to the Redis store to allow tokens to refresh in the future.'
			// );
			return {
				notFound: true,
			};
		}
		await redis.quit();
		res.status(200).send({ data: undefined });
	} catch (err) {
		res.status(500).send({ data: undefined });
	}
}
export const api = {
	externalResolver: true,
};
