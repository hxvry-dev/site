import { createContext, useContext, useState } from 'react';

interface SpotifyAuthState {
	accessToken: string | null;
	refreshToken: string | null;
	setAccessToken: (token: string) => void;
	setRefreshToken: (token: string) => void;
}

const SpotifyAuthContext = createContext<SpotifyAuthState | null>(null);

export const SpotifyAuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	return (
		<SpotifyAuthContext.Provider value={{ accessToken, refreshToken, setAccessToken, setRefreshToken }}>
			{children}
		</SpotifyAuthContext.Provider>
	);
};

export const useSpotifyAuth = () => {
	const ctx = useContext(SpotifyAuthContext);
	if (!ctx) throw new Error('useSpotifyAuth must be used within a SpotifyAuthProvider');
	return ctx;
};
