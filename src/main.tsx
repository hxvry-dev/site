import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'jotai';

import { ThemeProvider } from './components/theme-provider.tsx';
import App from './App.tsx';

import './index.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<StrictMode>
			<BrowserRouter>
				<Provider>
					<App />
				</Provider>
			</BrowserRouter>
		</StrictMode>
	</ThemeProvider>,
);
