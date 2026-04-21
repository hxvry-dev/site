import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchAccessToken } from '../../../lib/spotify-auth';

import { useSpotifyAuth } from '@/context/spotify-auth-context';

export const SpotifyCallback = () => {
	const nav = useNavigate();
	const { setAccessToken, setRefreshToken } = useSpotifyAuth();

	useEffect(() => {
		const code = new URLSearchParams(window.location.search).get('code');
		if (code) {
			fetchAccessToken(code).then(({ access_token, refresh_token }) => {
				setAccessToken(access_token);
				setRefreshToken(refresh_token!);
				nav('/spotify');
			});
		}
	}, [nav]);
	return <p>Signing you in...</p>;
};
