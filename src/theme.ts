import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
	focusRing: 'never',
	fontSmoothing: true,
	colors: {
		gray: [
			'#f5f5f5',
			'#e7e7e7',
			'#cdcdcd',
			'#b2b2b2',
			'#9a9a9a',
			'#8b8b8b',
			'#848484',
			'#717171',
			'#656565',
			'#575757',
		],
		orange: [
			'#ffefe4',
			'#ffdecd',
			'#ffbb9b',
			'#ff9664',
			'#fe7737',
			'#fe621a',
			'#ff5709',
			'#e44700',
			'#cb3e00',
			'#b13200',
		],
	},
	primaryColor: 'orange',
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
