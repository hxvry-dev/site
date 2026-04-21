import { TopArtistsResponse, TopTracksResponse } from './spotify-card';
import { SpotifyTopArtistsCard, SpotifyTopTracksCard } from './spotify-card';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSpotify } from '@/hooks/use-spotify';
import { loginWithSpotify } from '@/lib/spotify-auth';

export const SpotifyLandingPage = () => {
	const { data: trackData } = useSpotify<TopTracksResponse>('/me/top/tracks?limit=5');
	const { data: artistData } = useSpotify<TopArtistsResponse>('/me/top/artists?limit=5');
	const isMobile = useIsMobile();

	return (
		<div className={'grid grid-cols-2 font-mono gap-5 mx-auto max-w-fit'}>
			<div className="mx-auto col-span-2 row-end-1">
				<Button
					size={isMobile ? 'xl' : 'sm'}
					variant="outline"
					className="px-5 max-w-fit"
					onClick={() => {
						sessionStorage.clear();
						loginWithSpotify();
					}}
				>
					Log In To View/Refresh Your Spotify Stats
				</Button>
			</div>
			<div className="col-span-1">
				<h2 className="my-5 text-center">Top Tracks:</h2>
				<SpotifyTopTracksCard data={trackData!} />
			</div>
			<div className="col-span-1">
				<h2 className="my-5 text-center">Top Artists:</h2>
				<SpotifyTopArtistsCard data={artistData!} />
			</div>
		</div>
	);
};
