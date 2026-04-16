import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Image {
	height: number;
	width: number;
	url: string;
}

interface Track {
	id: string;
	name: string;
	artists: { name: string }[];
	album: { name: string; images: Image[] };
}

export interface TopTracksResponse {
	items: Track[];
}

interface SpotifyCardProps {
	data: TopTracksResponse;
}
export const SpotifyTopArtistsCard = ({ data }: SpotifyCardProps) => {
	return (
		<>
			{data.items.map((track) => (
				<Card>
					<CardHeader>
						<img src={track.album.images[0].url} alt={track.album.name} />
						<CardTitle>{track.name}</CardTitle>
						<CardDescription>{track.artists[0].name}</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			))}
		</>
	);
};
