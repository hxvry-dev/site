import { Controller, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import { supabase } from '@/db/supabaseClient';

const zSetNewPasswordSchema = z.object({
	email: z.email(),
});

export const PasswordResetForm = () => {
	const setNewPasswordForm = useForm<z.infer<typeof zSetNewPasswordSchema>>({
		resolver: zodResolver(zSetNewPasswordSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async () => {
		if (setNewPasswordForm.getValues('email') == '' || !setNewPasswordForm.getValues('email'))
			return toast.error('You need to provide your email to reset your password');
		const { data, error } = await supabase!.auth.resetPasswordForEmail(setNewPasswordForm.getValues('email'), {
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
		<Card className="max-w-md mx-auto mt-64">
			<CardHeader>
				<CardTitle className="justify-self-center text-2xl font-serif">Reset your Account Password</CardTitle>
				<CardDescription className="font-mono mx-auto">Password Reset Request Form</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="request-pw-reset-form" onSubmit={setNewPasswordForm.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="email"
							control={setNewPasswordForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="request-pw-reset-form">Email Address</FieldLabel>
									<Input
										{...field}
										id="request-pw-reset-form"
										aria-invalid={fieldState.invalid}
										placeholder="me@hxvry.com"
										autoComplete="off"
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
							form="request-pw-reset-form"
							disabled={!setNewPasswordForm.formState.isValid}
						>
							Submit
						</Button>
						<Button type="reset" asChild variant="link">
							<NavLink to="/login">Clear and go back to Login</NavLink>
						</Button>
					</div>
				</Field>
			</CardFooter>
		</Card>
	);
};
