import { NavLink } from 'react-router-dom';

import { formatDuration, intervalToDuration } from 'date-fns';

import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

interface Image {
	height: number;
	width: number;
	url: string;
}

interface Track {
	id: string;
	name: string;
	uri: string;
	duration_ms: number;
	artists: { name: string }[];
	album: { name: string; images: Image[] };
}

interface Artist {
	id: string;
	name: string;
	uri: string;
	images: Image[];
}

export interface TopTracksResponse {
	items: Track[];
}

export interface TopArtistsResponse {
	items: Artist[];
}

interface SpotifyTopTracksCardProps {
	data: TopTracksResponse;
}
interface SpotifyTopArtistsCardProps {
	data: TopArtistsResponse;
}

export const SpotifyTopTracksCard = ({ data }: SpotifyTopTracksCardProps) => {
	const formatTrackLength = (trackLength: number): string => {
		const duration = intervalToDuration({ start: 0, end: trackLength });
		return formatDuration(duration, { delimiter: ', ' });
	};
	return (
		<div className="space-y-5">
			{data?.items.map((track) => (
				<Card key={track.id}>
					<CardHeader>
						<img className="mx-auto mb-5" src={track.album.images[0].url} alt={track.album.name} />
						<CardTitle>{track.name}</CardTitle>
						<CardDescription>
							<div className="py-5">
								<div>Artist: {track.artists[0].name}</div>
								<div>Album: {track.album.name}</div>
								<div>Duration: {formatTrackLength(track.duration_ms)}</div>
							</div>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Button asChild>
							<NavLink to={track.uri}>Listen on Spotify</NavLink>
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export const SpotifyTopArtistsCard = ({ data }: SpotifyTopArtistsCardProps) => {
	return (
		<div className="space-y-5">
			{data?.items.map((artist) => (
				<Card key={artist.id}>
					<CardHeader>
						<img className="mx-auto mb-5" src={artist.images[0].url} alt={artist.name} />
						<CardTitle>{artist.name}</CardTitle>
					</CardHeader>
					<CardContent>
						<Button asChild>
							<NavLink to={artist.uri}>View Artist Profile on Spotify</NavLink>
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
