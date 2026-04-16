import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { fetchAccessToken } from '../../lib/spotify-auth';

export const SpotifyCallback = () => {
	const nav = useNavigate();
	useEffect(() => {
		const code = new URLSearchParams(window.location.search).get('code');
		if (code) {
			fetchAccessToken(code).then(({ access_token }) => {
				sessionStorage.setItem('access_token', access_token);
				nav('/spotify');
			});
		}
	}, [nav]);
	return <p>Signing you in...</p>;
};
