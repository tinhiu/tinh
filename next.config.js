/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: [
			'i.scdn.co',
			'lastfm.freetls.fastly.net'
		],
		unoptimized: true,
	},
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: false
	},
	experimental: {
		//largePageDataBytes: 128 * 1000, // 128KB by default
		largePageDataBytes: 228 * 1000,
	},
}

module.exports = nextConfig
