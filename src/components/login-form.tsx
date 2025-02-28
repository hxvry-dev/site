import { GalleryVerticalEnd } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/App';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

async function handleLogin(email: string, password: string) {
	await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
}

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<form onSubmit={async () => handleLogin(email, password)}>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<a href="#" className="flex flex-col items-center gap-2 font-medium">
							<div className="flex size-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Idle Game</span>
						</a>
						<h1 className="text-xl font-bold">Welcome to the Game!</h1>
						<div className="text-center text-sm">
							Don&apos;t have an account?{' '}
							<NavLink to="/signup" className="underline underline-offset-4">
								Sign up
							</NavLink>
						</div>
					</div>
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
				</div>
			</form>
		</div>
	);
}
