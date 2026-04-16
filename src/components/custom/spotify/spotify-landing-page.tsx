import { TopArtistsResponse, TopTracksResponse } from './spotify-card';
import { SpotifyTopArtistsCard, SpotifyTopTracksCard } from './spotify-card';

import { useSpotify } from '@/hooks/use-spotify';

export const SpotifyLandingPage = () => {
	const { data: trackData } = useSpotify<TopTracksResponse>('/me/top/tracks?limit=5');
	const { data: artistData } = useSpotify<TopArtistsResponse>('/me/top/artists?limit=5');

	return (
		<div className="w-full px-5 grid grid-cols-2 gap-5 mx-auto font-mono">
			<div>
				<h2 className="my-5 text-center">Top Tracks:</h2>
				<SpotifyTopTracksCard data={trackData!} />
			</div>
			<div>
				<h2 className="my-5 text-center">Top Artists:</h2>
				<SpotifyTopArtistsCard data={artistData!} />
			</div>
		</div>
	);
};
