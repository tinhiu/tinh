import { NextApiRequest, NextApiResponse } from 'next';
import { LIMIT, LastFM, LastFMGetRecent, PixelGrid } from '../../server/last-fm';
import { LAST_FM_API_KEY } from '../../server/constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

type Data = {
	data: LastFMGetRecent[] | [];
	lastfm: PixelGrid[] | [];
};
export default async function GET(req: NextApiRequest, res: NextApiResponse<Data>) {
	try {
		const lfm = new LastFM(LAST_FM_API_KEY!);

		let recentlyTracks = await lfm.getRecentTracks(LIMIT.toString(), 'loonailysm', '1');

		const resultRecentlyTracks = recentlyTracks.map((track) => ({
			date: {
				uts: track.date ? track.date.uts : '',
				'#text': track.date
					? dayjs(track?.date['#text'])
							.set('hour', dayjs(track.date['#text']).hour() + 7)
							.format('DD MMM YYYY, HH:mm')
					: '',
			},
			'@attr': track['@attr'] || null,
			image: track.image,
			artist: {
				url: track.artist.url,
				name: track.artist.name,
			},
			album: track.album,
			url: track.url,
			name: track.name,
			loved: track.loved,
		}));
		let result = await lfm.getPixelGrid('pixel-grid', '0', '');

		res.status(200).send({ data: resultRecentlyTracks, lastfm: result.reverse() });
	} catch (err) {
		res.status(500).send({ data: [], lastfm: [] });
	}
}
export const api = {
	externalResolver: true,
};
