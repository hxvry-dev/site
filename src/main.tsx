import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'jotai';

import { ThemeProvider } from './components/theme-provider.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import App from './App.tsx';

/** Fonts */
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<StrictMode>
			<BrowserRouter>
				<Provider>
					<App />
					<Toaster richColors />
				</Provider>
			</BrowserRouter>
		</StrictMode>
	</ThemeProvider>,
);
