import { FC } from 'react';
import { Route,Routes } from 'react-router-dom';

import Incremental from './components/custom/game/Incremental';
import Home from './components/custom/Home';
import Navbar from './components/custom/Navbar';
import NotFound from './components/custom/NotFound';
import Resume from './components/custom/Resume';

const App: FC = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/resume" element={<Resume />} />
				<Route path="/incremental" element={<Incremental />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
