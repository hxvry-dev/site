import { createContext, useContext, useEffect, useState } from 'react';

export type Theme =
	| 'system'
	| 'dark'
	| 'light'
	| 'claude'
	| 'claude-dark'
	| 'bubblegum'
	| 'bubblegum-dark'
	| 'doom'
	| 'doom-dark'
	| 'hoot'
	| 'hoot-dark'
	| 'custom-theme';

type ThemeProviderProps = {
	children: React.ReactNode;
	defaultTheme?: Theme;
	storageKey?: string;
};

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	applyCustomTheme: (css: string) => void;
	getCustomTheme: () => string;
	hasCustomTheme: () => boolean;
};

const initialState: ThemeProviderState = {
	theme: 'system',
	setTheme: () => null,
	applyCustomTheme: () => null,
	getCustomTheme: () => '',
	hasCustomTheme: () => false,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

	const applyCustomTheme = (css: string): void => {
		try {
			const existingStyle = document.getElementById(`custom-theme`);
			if (existingStyle) existingStyle.remove();

			const styleElement = document.createElement('style', { is: 'text/css' });
			styleElement.id = 'custom-theme';
			styleElement.textContent = `:root { ${css} }`;
			document.head.appendChild(styleElement);

			localStorage.setItem('vite-ui-theme', 'custom-theme');
			localStorage.setItem(`${storageKey}-custom`, css);
		} catch (e) {
			console.error(`Failed to apply custom theme:`, e);
			setTheme(defaultTheme);
		}
	};

	const getCustomTheme = (): string => {
		return localStorage.getItem(`${storageKey}-custom`) || '';
	};

	const hasCustomTheme = (): boolean => {
		const customTheme = getCustomTheme();
		return customTheme !== '' && customTheme !== ':root {  }';
	};

	useEffect(() => {
		if (theme === 'custom-theme' && hasCustomTheme()) {
			applyCustomTheme(getCustomTheme());
		}
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(
			'light',
			'dark',
			'claude',
			'claude-dark',
			'bubblegum',
			'bubblegum-dark',
			'doom',
			'doom-dark',
			'hoot',
			'hoot-dark',
			'custom-theme',
		);

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

			root.classList.add(systemTheme);
			const customStyle = document.getElementById(`custom-theme`);
			if (customStyle) customStyle.remove();
			return;
		}

		if (theme === 'custom-theme') {
			if (hasCustomTheme()) {
				applyCustomTheme(getCustomTheme());
			}
			return;
		}

		root.classList.add(theme);

		const customStyle = document.getElementById(`custom-theme`);
		if (customStyle) customStyle.remove();
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
		applyCustomTheme,
		getCustomTheme,
		hasCustomTheme,
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeProviderContext);

	if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

	return context;
};
