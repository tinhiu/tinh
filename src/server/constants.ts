// Generic in case NodeJS.ProcessEnv is ever extended in the future
function env<Key extends keyof NodeJS.ProcessEnv>(key: Key) {
	const value = process.env[key];
	

	if (!value) {
		throw new Error(`Missing environment variable ${key}`);
	}

	return value;
}

//export const DISCORD_WEBHOOK = env('DISCORD_WEBHOOK');
//export const LAST_FM_API_KEY = process.env.NEXT_PUBLIC_LAST_FM_API_KEY;
export const SPOTIFY_CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
export const SPOTIFY_CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

// Whilst I use upstash, I didn't want anybody else
// using this to be locked into using upstash.
// So you can use any redis server here - just remember
// that you can't use it serverlessly! I only use it inside
// of revalidations and at build time (no risk of breaking)
export const REDIS_URL = process.env.NEXT_PUBLIC_REDIS_URL;

// This is local and not an environment variable because I just connect to
// the production redis instance.
//export const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/api/spotify/oauth';
// product
export const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

export const SPOTIFY_REDIS_KEYS = {
	AccessToken: 'AccessToken',
	RefreshToken: 'RefreshToken',
};
