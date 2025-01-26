import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from './components/theme-provider.tsx';
import App from './App.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StrictMode>
	</ThemeProvider>,
);
