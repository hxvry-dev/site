import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
	focusRing: 'never',
	fontSmoothing: true,
	colors: {},
	primaryShade: {
		light: 4,
		dark: 7,
	},
	autoContrast: true,
	headings: {
		fontFamily: 'monospace',
		fontWeight: '700',
		textWrap: 'pretty',
		sizes: {
			h1: { fontSize: rem(36) },
		},
	},
});
