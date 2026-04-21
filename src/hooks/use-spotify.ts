import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { atom } from 'jotai';

import { useSpotifyAuth } from '@/context/spotify-auth-context';
import { fetchRefreshToken } from '@/lib/spotify-auth';

interface UseSpotifyResult<T> {
	data: T | null;
	error: Error | null;
}

export const accessTokenAtom = atom<string | null>(null);
export const refreshTokenAtom = atom<string | null>(null);

export const useSpotify = <T>(query: string | null): UseSpotifyResult<T> => {
	const nav = useNavigate();
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useSpotifyAuth();

	useEffect(() => {
		if (!query) return;
		const cacheKey = `spotify-cache:${query}`;
		const cached = sessionStorage.getItem(cacheKey);

		if (cached) {
			setData(JSON.parse(cached));
			return;
		}

		if (!accessToken) {
			if (!refreshToken) {
				nav('/spotify');
				return;
			}
			fetchRefreshToken(refreshToken).then(({ access_token, refresh_token }) => {
				setAccessToken(access_token);
				if (refresh_token) setRefreshToken(refresh_token);
			});
			return;
		}

		fetch(`https://api.spotify.com/v1${query}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})
			.then((res) => {
				if (!res.ok) throw new Error(`Error: ${res.status}`);
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
