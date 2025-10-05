import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GalleryVerticalEnd } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { supabase } from '@/db/supabaseClient';

const LoginForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const nav = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();
		const { data, error } = await supabase!.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			toast.error(`Something went wrong! ${error.message}`);
		} else if (data) {
			toast.success('Signed In!');
			return nav('/incremental');
		}
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn('flex flex-col gap-6', className)} {...props}>
					<form onSubmit={handleLogin}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-2">
								<a href="#" className="flex flex-col items-center gap-2 font-medium">
									<div className="flex size-8 items-center justify-center rounded-md">
										<GalleryVerticalEnd className="size-6" />
									</div>
									<span className="sr-only">Idle Game</span>
								</a>
								<h1 className="text-xl font-bold">Welcome back to the Game!</h1>
								<div className="text-center text-sm cursor-pointer">
									Don&apos;t have an account?{' '}
									<a onClick={() => nav('/sign-up')} className="underline underline-offset-4">
										Sign up
									</a>
								</div>
							</div>
							<div className="flex flex-col gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="me@example.com"
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="me@example.com"
										required
									/>
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="hunter2"
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="hunter2"
										required
									/>
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
								<div className="text-center text-sm cursor-pointer my-2">
									<a onClick={() => nav('/password-reset')} className="underline underline-offset-4">
										Forgot Password?
									</a>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
