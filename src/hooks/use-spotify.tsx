import { useEffect, useState } from 'react';

interface UseSpotifyResult<T> {
	data: T | null;
	error: Error | null;
}

export const useSpotify = <T,>(query: string | null): UseSpotifyResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		if (!query) return;
		const cacheKey = `spotify-cache:${query}`;
		const cached = sessionStorage.getItem(cacheKey);

		if (cached) {
			setData(JSON.parse(cached));
			return;
		}

		const token = sessionStorage.getItem('access_token');
		fetch(`https://api.spotify.com/v1${query}`, {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				if (!res.ok) throw new Error(`Spotify error: ${res.status}`);
				return res.json();
			})
			.then((data) => {
				sessionStorage.setItem(cacheKey, JSON.stringify(data));
				setData(data);
			})
			.catch((err) => {
				setError(err);
			});
	}, []);

	return { data, error };
};
