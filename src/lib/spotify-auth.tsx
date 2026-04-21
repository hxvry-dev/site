interface TokenResponse {
	access_token: string;
	refresh_token?: string;
}

const generateCodeVerifier = (): string => {
	const array = new Uint8Array(64);
	crypto.getRandomValues(array);
	return btoa(String.fromCharCode(...array))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
};

const generateCodeChallenge = async (verifier: string): Promise<string> => {
	const data = new TextEncoder().encode(verifier);
	const digest = await crypto.subtle.digest('SHA-256', data);
	return btoa(String.fromCharCode(...new Uint8Array(digest)))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=/g, '');
};

export const loginWithSpotify = async (): Promise<void> => {
	const verifier = generateCodeVerifier();
	const challenge = await generateCodeChallenge(verifier);
	sessionStorage.setItem('code_verifier', verifier);

	const params = new URLSearchParams({
		client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
		response_type: 'code',
		redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
		scope: 'user-read-playback-state user-top-read',
		code_challenge_method: 'S256',
		code_challenge: challenge,
	});

	window.location.href = `https://accounts.spotify.com/authorize?${params}`;
};

export const fetchAccessToken = async (code: string): Promise<TokenResponse> => {
	const verifier = sessionStorage.getItem('code_verifier')!;
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			grant_type: 'authorization_code',
			code,
			redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
			code_verifier: verifier,
		}),
	});
	return response.json();
};

export const fetchRefreshToken = async (refreshToken: string): Promise<TokenResponse> => {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken,
			client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
		}),
	});
	return response.json();
};
