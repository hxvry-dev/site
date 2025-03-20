import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react(), tailwindcss()],
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
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
