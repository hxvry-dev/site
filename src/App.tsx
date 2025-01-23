import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/custom/Home';
import Navbar from './components/custom/Navbar';
import NotFound from './components/custom/NotFound';
import Resume from './components/custom/Resume';
import IncrementalLayout from './components/custom/game/components/IncrementalLayout';

const App: FC = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/resume" element={<Resume />} />
				<Route path="/incremental" element={<IncrementalLayout />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
