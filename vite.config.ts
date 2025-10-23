import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import json from './package.json';

export default defineConfig({
	plugins: [react(), tailwindcss()],
	define: {
		__APP_VERSION__: JSON.stringify(json.version),
	},
	optimizeDeps: {
		include: ['@supabase/supabase-js', '@supabase/gotrue-js', '@supabase/postgrest-js'],
	},
	build: {
		minify: 'terser',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('@radix-ui')) {
							return 'radix-ui';
						}
						if (
							id.includes('tailwindcss') ||
							id.includes('@tailwindcss') ||
							id.includes('tailwind-merge') ||
							id.includes('tailwindcss-animate')
						) {
							return 'tailwind';
						}
						if (id.includes('@supabase')) {
							return 'supabase-utils';
						}
						if (id.includes('lucide-react')) {
							return 'icons';
						}
						if (
							id.includes('clsx') ||
							id.includes('date-fns') ||
							id.includes('class-variance-authority') ||
							id.includes('zod')
						) {
							return 'utilities';
						}
						return 'vendor';
					}
				},
			},
		},
		target: 'ES2022',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
