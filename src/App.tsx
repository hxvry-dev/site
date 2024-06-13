import '@mantine/core/styles.css';
import { MantineProvider, Stack } from '@mantine/core';
import { theme } from './theme';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Outlet,
} from 'react-router-dom';

import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import TopBar from './components/TopBar';
import SocialMedia from './components/SocialMedia';
import Resume from './components/pages/Resume';

const Layout = () => {
	return (
		<Stack>
			<TopBar />
			<Outlet />
			<SocialMedia />
		</Stack>
	);
};

const App = () => {
	return (
		<MantineProvider theme={theme} defaultColorScheme="dark">
			<Router>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/resume" element={<Resume />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</MantineProvider>
	);
};

export default App;
