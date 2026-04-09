import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { supabase } from '@/db/supabaseClient';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

const zSetNewPasswordSchema = z
	.object({
		password: z.string().min(6, 'Password must be at least 6 characters long!'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		error: 'Passwords do not match!',
		path: ['confirmPassword'],
	});

export const SetNewPasswordForm = () => {
	const [searchParams] = useSearchParams();
	const nav = useNavigate();
	const setNewPasswordForm = useForm<z.infer<typeof zSetNewPasswordSchema>>({
		resolver: zodResolver(zSetNewPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async () => {
		const code = searchParams.get('code')!;
		await supabase.auth.exchangeCodeForSession(code);
		const { data, error } = await supabase.auth.updateUser({
			password: setNewPasswordForm.getValues('confirmPassword'),
		});
		if (data) {
			toast.success('Password Updated Successfully!');
			nav('/login');
		}
		if (error) {
			toast.error(`There was an error updating your password. ${error.message}`);
		}
	};

	return (
		<Card className="max-w-md mx-auto mt-64">
			<CardHeader>
				<CardTitle className="justify-self-center">Set a new Account Password</CardTitle>
				<CardDescription className="font-mono mx-auto">Account Password (Re-)Set Form</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="set-new-password-form" onSubmit={setNewPasswordForm.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="password"
							control={setNewPasswordForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="set-new-password-form">Email Address</FieldLabel>
									<Input
										{...field}
										id="set-new-password-form"
										aria-invalid={fieldState.invalid}
										placeholder="hunter2"
										autoComplete="off"
										type="password"
										className="rounded-none"
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
						<Controller
							name="confirmPassword"
							control={setNewPasswordForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="set-new-password-form">Password</FieldLabel>
									<Input
										{...field}
										id="set-new-password-form"
										aria-invalid={fieldState.invalid}
										placeholder="*******"
										autoComplete="off"
										type="password"
										className="rounded-none"
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-2">
				<Field orientation="horizontal">
					<div className="mx-auto">
						<Button
							type="submit"
							form="set-new-password-form"
							disabled={!setNewPasswordForm.formState.isValid}
						>
							Submit
						</Button>
						<Button type="reset" asChild variant="link">
							<NavLink to="/">Clear and Go Home</NavLink>
						</Button>
					</div>
				</Field>
			</CardFooter>
		</Card>
	);
};
