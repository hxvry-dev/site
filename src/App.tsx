import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import TopBar from './components/TopBar';

const Layout = () => {
	return (
		<div>
			<TopBar />
			<Outlet />
		</div>
	);
};

const App = () => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</MantineProvider>
	);
};

export default App;
