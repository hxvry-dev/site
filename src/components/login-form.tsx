import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';
import supabase from '@/db/supabase';
import { useNavigate } from 'react-router-dom';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	const nav = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [signupFlow, setSignupFlow] = useState(false);

	async function handleLogin(e: FormEvent) {
		e.preventDefault();
		await supabase().auth.signInWithPassword({
			email: email,
			password: password,
		});
		nav('/incremental');
	}

	async function handleSignup(e: FormEvent) {
		e.preventDefault();
		await supabase().auth.signUp({
			email: email,
			password: password,
		});
		setSignupFlow(false);
		nav('/incremental');
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
						<h1 className="text-xl font-bold">Welcome to the Game!</h1>
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
