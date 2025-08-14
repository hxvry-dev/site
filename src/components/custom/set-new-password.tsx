import { supabase } from '@/db/supabaseClient';
import { cn } from '@/lib/utils';
import { GalleryVerticalEnd } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const SetNewPasswordForm: FC = ({ className, ...props }: React.ComponentProps<'div'>) => {
	const nav = useNavigate();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event) => {
			if (event == 'PASSWORD_RECOVERY') {
				const { data, error } = await supabase.auth.updateUser(
					{ password: confirmPassword },
					{ emailRedirectTo: 'https://hxvry.com/login' },
				);
				if (data) {
					toast.success('Password Updated Successfully!');
				}
				if (error) {
					toast.error(`There was an error updating your password. ${error.message}`);
				}
			}
		});
	}, []);

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className={cn('flex flex-col gap-6', className)} {...props}>
					<form>
						<div className="flex flex-col gap-6">
							<div className="flex flex-col items-center gap-2">
								<a href="#" className="flex flex-col items-center gap-2 font-medium">
									<div className="flex size-8 items-center justify-center rounded-md">
										<GalleryVerticalEnd className="size-6" />
									</div>
									<span className="sr-only">Idle Game</span>
								</a>
								<h1 className="text-xl font-bold">Welcome to the Game!</h1>
							</div>
							<div className="flex flex-col gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">New Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="*******"
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="password"
										required
									/>
									<Label htmlFor="password">Confirm New Password</Label>
									<Input
										id="confirm_password"
										type="password"
										placeholder="hunter2"
										onChange={(e) => setConfirmPassword(e.target.value)}
										autoComplete="new-password"
										required
									/>
								</div>
								<div className="grid grid-cols-2 gap-5">
									<Button variant="outline" className="w-full" onClick={() => nav('/login')}>
										Go Back to Login
									</Button>
									<Button type="submit" className="w-full" disabled={!(password === confirmPassword)}>
										Set New Password
									</Button>
									{password !== confirmPassword ? <small>Passwords need to match!</small> : <></>}
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SetNewPasswordForm;
