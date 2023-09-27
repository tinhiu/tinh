import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { Data } from 'use-lanyard';
import type { GetStaticProps } from 'next';


import { LastFM } from '../../server/last-fm';
import {
	LAST_FM_API_KEY,
} from '../../server/constants';
import UserSpotify from '../../models/UserSpotify'
import type { LastFMGetRecent, LastFMGetTrack } from '../../server/last-fm';
import { ParsedUrlQuery } from 'querystring';
import RecentlyTracks from '../../components/RecentlyTracks';


const PER_PAGE = 6;
type Props = {
	user: UserSpotify;
	userLanyard: Data | any;
	randomLastFMTrack: LastFMGetTrack;
	recentlyTracks: LastFMGetRecent[];
};

dayjs.extend(relativeTime);

const getInitialPageFromQuery = (query: ParsedUrlQuery) => {
	const page = Number(query.page)
	if (Number.isNaN(page) || page < 1) {
		return 1
	}
	return page
}

const TopTracksOverview = ({ topTracks }: { topTracks: LastFMGetRecent[] }) => {
	return (
		<RecentlyTracks tracks={topTracks} />
	);
};
export default function MusicPage({
	recentlyTracks: tracks
}: Props) {
	return <TopTracksOverview topTracks={tracks || []} />
}

export const getStaticProps: GetStaticProps = async () => {
	const lfm = new LastFM(LAST_FM_API_KEY as string);

	let recentlyTracks = await lfm.getRecentTracks('20', 'loonailysm', '1');
	recentlyTracks = recentlyTracks.map((track) => ({
		"@attr": track['@attr'] || null,
		image: track.image,
		artist: track.artist,
		album: track.album,
		url: track.url,
		name: track.name,
		date: track.date || null,
		loved: track.loved
	}))

	return {
		props: {
			recentlyTracks: recentlyTracks
		}
	}
}