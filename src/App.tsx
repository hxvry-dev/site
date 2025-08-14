import { FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Incremental from './components/custom/game/components/v1/incremental';
import Home from './components/custom/Home';
import Navbar from './components/custom/Navbar';
import NotFound from './components/custom/NotFound';
import Projects from './components/custom/Projects';
import Resume from './components/custom/Resume';
import { ThemeProvider } from './components/theme-provider';
import SetNewPasswordForm from './components/custom/set-new-password';

const PasswordResetForm = lazy(() => import('./components/custom/password-reset-form'));
const SignUpForm = lazy(() => import('./components/custom/sign-up-form'));
const LoginForm = lazy(() => import('./components/custom/login-form'));
const IncrementalV2 = lazy(() => import('./components/custom/game/components/v2/IncrementalV2'));

const App: FC = () => {
	return (
		<ThemeProvider defaultTheme="dark">
			<Navbar />
			<Suspense fallback={<NotFound />}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/resume" element={<Resume />} />
					<Route path="/projects" element={<Projects />} />

					<Route path="/login" element={<LoginForm />} />
					<Route path="/password-reset" element={<PasswordResetForm />} />
					<Route path="/set-new-password" element={<SetNewPasswordForm />} />
					<Route path="/sign-up" element={<SignUpForm />} />

					<Route path="/incremental" element={<Incremental />} />
					<Route path="/incremental/v2" element={<IncrementalV2 />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
