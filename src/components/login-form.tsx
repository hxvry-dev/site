import { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { GalleryVerticalEnd } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { supabase } from './custom/game/components/IncrementalV2';
import { fetchAndValidateGameState } from '@/db/functions';
import { useAtom } from 'jotai';
import { gameStateV2Atom } from './custom/game/atomFactory';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	const nav = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [, setGameStateV2] = useAtom(gameStateV2Atom);

	const [signupFlow, setSignupFlow] = useState(false);

	async function handleLogin(e: FormEvent) {
		e.preventDefault();
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			console.error(`There was a problem logging you in... Error code: ${error.code}`, error.message);
			toast.error('Something went wrong. Please try again later');
		} else if (data) {
			const gsv2 = await fetchAndValidateGameState();
			if (!gsv2) return;
			setGameStateV2(gsv2);
			toast.success('Signed In!');
		}
		nav('/incremental/v2');
	}

	async function handleSignup(e: FormEvent) {
		e.preventDefault();
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				emailRedirectTo: 'https://hxvry.com/authed',
			},
		});
		if (error) {
			console.error(
				`There was a problem signing you up... Please check back later. Error code: ${error.code}`,
				error.message,
			);
			toast.error('Something went wrong. Please try again later');
		} else {
			toast.success('Signed Up Successfully!');
		}
		setSignupFlow(false);
	}

	const handleSignupFlow = () => {
		setSignupFlow((prev) => !prev);
	};

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<form onSubmit={!signupFlow ? handleLogin : handleSignup}>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Idle Game</span>
						</a>
						<h1 className="text-xl font-bold">Welcome {!signupFlow ? 'back ' : ''} to the Game!</h1>
						{!signupFlow ? (
							<div className="text-center text-sm cursor-pointer">
								Don&apos;t have an account?{' '}
								<a onClick={() => handleSignupFlow()} className="underline underline-offset-4">
									Sign up
								</a>
							</div>
						) : (
							<></>
						)}
					</div>
					{!signupFlow ? (
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="password123"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
							<Button variant="link" asChild>
								<NavLink to="/incremental">Load V1</NavLink>
							</Button>
						</div>
					) : (
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="password123"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<Label htmlFor="password">Password</Label>
								<Input
									id="confirm-password"
									type="password"
									placeholder="Confirm Password..."
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
								/>
							</div>
							<div>
								{signupFlow ? (
									<div className="text-center text-sm cursor-pointer my-2">
										Back to{' '}
										<a onClick={() => handleSignupFlow()} className="underline underline-offset-4">
											Login
										</a>
									</div>
								) : (
									<></>
								)}
								<Button type="submit" className="w-full" disabled={!(password === confirmPassword)}>
									Sign Up
								</Button>
								{password !== confirmPassword ? <small>Passwords need to match!</small> : <></>}
							</div>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
