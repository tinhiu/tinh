import { api } from "../../../server/api";
import { LAST_FM_API_KEY } from "../../../server/constants";
import { LastFM } from "../../../server/last-fm";
import { rand } from "../../../util/types";

export default api({
	async GET({ req, res }) {
		return res.throw(403, 'You are not permitted to access!');
	},
});


export async function getRandomTopTracksFM() {
    const lfm = new LastFM(LAST_FM_API_KEY!);
	let topLFMTracks = await lfm.getTopTracks('loonailysm', '1month', '6');
	topLFMTracks = topLFMTracks.map((item) => ({
		mbid: item.mbid,
		name: item.name,
		url: item.url,
		artist: item.artist,
		'@attr': item['@attr'],
		playcount: item.playcount,
		duration: item.duration,
	}));
    return rand(topLFMTracks);
}