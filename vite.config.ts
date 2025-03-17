import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
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
						// Group Radix UI components together
						if (id.includes('@radix-ui')) {
							return 'radix-ui';
						}
						// Group Tailwind and related plugins
						if (
							id.includes('tailwindcss') ||
							id.includes('@tailwindcss') ||
							id.includes('tailwind-merge') ||
							id.includes('tailwindcss-animate')
						) {
							return 'tailwind';
						}
						// Group `react-router-dom` in its own chunk
						if (id.includes('react-router-dom')) {
							return 'react-router-dom';
						}
						// Group `@supabase/supabase-js` in its own chunk
						if (id.includes('@supabase/supabase-js')) {
							return 'supabase';
						}
						// Group icon libraries together
						if (id.includes('lucide-react')) {
							return 'icons';
						}
						// Group utilities and helper libraries
						if (id.includes('clsx') || id.includes('date-fns') || id.includes('class-variance-authority')) {
							return 'utilities';
						}
						// Default vendor chunk for all other dependencies
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
