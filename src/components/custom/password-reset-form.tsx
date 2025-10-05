import { supabase } from '@/db/supabaseClient';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const PasswordResetForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const nav = useNavigate();
	const [email, setEmail] = useState('');

	const handlePasswordReset = async (e: FormEvent) => {
		e.preventDefault();
		if (email == '' || !email) return toast.error('You need to provide your email to reset your password');
		const { data, error } = await supabase!.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://hxvry.com/set-new-password',
		});
		if (error) {
			toast.error(error.message);
		}
		if (data) {
			toast.success('Successfully sent Password Reset Email. Check your email for the link!');
		}
	};

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn('flex flex-col gap-6', className)} {...props}>
					<form onSubmit={handlePasswordReset}>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-2">
								<a href="#" className="flex flex-col items-center gap-2 font-medium">
									<div className="flex size-8 items-center justify-center rounded-md">
										<Lock className="size-6" />
									</div>
									<span className="sr-only">Idle Game</span>
								</a>
								<h1 className="text-xl font-bold">Reset your Password</h1>
							</div>
							<div className="flex flex-col gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Account Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="person@place.com"
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-5">
									<Button variant="outline" className="w-full" onClick={() => nav('/login')}>
										Go Back to Login
									</Button>
									<Button type="submit" className="w-full" disabled={!(email.length > 0)}>
										Send Password Reset
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PasswordResetForm;
