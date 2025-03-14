import { FC, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Authed from './components/custom/Authed';
import Incremental from './components/custom/game/components/incremental';
import Home from './components/custom/Home';
import Navbar from './components/custom/Navbar';
import NotFound from './components/custom/NotFound';
import Projects from './components/custom/Projects';
import Resume from './components/custom/Resume';

const App: FC = () => {
	return (
		<>
			<Navbar />
			<Suspense fallback={<NotFound />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/authed" element={<Authed />} />
					<Route path="/resume" element={<Resume />} />
					<Route path="/projects" element={<Projects />} />

					<Route path="/incremental" element={<Incremental />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</>
	);
};

export default App;
