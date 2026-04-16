import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home } from './components/custom/Home';
import { LoginForm } from './components/custom/login-form';
import { Navbar } from './components/custom/Navbar';
import { NotFound } from './components/custom/NotFound';
import { PasswordResetForm } from './components/custom/password-reset-form';
import { Projects } from './components/custom/Projects';
import { Resume } from './components/custom/Resume';
import { SetNewPasswordForm } from './components/custom/set-new-password';
import { SignUpForm } from './components/custom/sign-up-form';
import { ThemeProvider } from './components/theme-provider';

const Incremental = lazy(() => import('./components/custom/game/components/Incremental'));

const App = () => {
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

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Suspense>
		</ThemeProvider>
	);
};

export default App;
