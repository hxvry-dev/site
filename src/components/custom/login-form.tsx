import { Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';

import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

import { supabase } from '@/db/supabaseClient';

const zSignInSchema = z.object({
	email: z.email(),
	password: z.string().min(6, 'Password must be at least 6 characters long!'),
});

export const LoginForm = () => {
	const nav = useNavigate();
	const signInForm = useForm<z.infer<typeof zSignInSchema>>({
		resolver: zodResolver(zSignInSchema),
		defaultValues: { email: '', password: '' },
		mode: 'onChange',
	});

	const onSubmit = async () => {
		const { data, error } = await supabase!.auth.signInWithPassword({
			email: signInForm.getValues('email'),
			password: signInForm.getValues('password'),
		});
		if (error) {
			toast.error(`Something went wrong! ${error.message}`);
		} else if (data) {
			toast.success('Signed In!');
			return nav('/incremental');
		}
		console.log(signInForm.getValues());
	};

	return (
		<Card className="max-w-md mx-auto mt-64">
			<CardHeader>
				<CardTitle className="justify-self-center">Welcome Back!</CardTitle>
				<CardDescription className="font-mono mx-auto">Sign In Form</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="sign-in-form" onSubmit={signInForm.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="email"
							control={signInForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="sign-in-form">Email Address</FieldLabel>
									<Input
										{...field}
										id="sign-in-form"
										aria-invalid={fieldState.invalid}
										placeholder="me@example.com"
										autoComplete="off"
										className="rounded-none"
									/>
									{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
								</Field>
							)}
						/>
						<Controller
							name="password"
							control={signInForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="sign-in-form">Password</FieldLabel>
									<Input
										{...field}
										id="sign-in-form"
										aria-invalid={fieldState.invalid}
										placeholder="hunter2"
										autoComplete="off"
										type="password"
										className="rounded-none"
									/>
									<FieldDescription>
										<NavLink to="/test/reset-password" className="underline">
											Forgot Password?
										</NavLink>
									</FieldDescription>
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
						<Button type="submit" form="sign-in-form" disabled={!signInForm.formState.isValid}>
							Submit
						</Button>
						<Button type="reset" asChild variant="link">
							<NavLink to="/">Clear and Go Home</NavLink>
						</Button>
					</div>
				</Field>
				<Field orientation="horizontal">
					<small className="text-muted-foreground mx-auto">
						Don&apos;t have an account?{' '}
						<NavLink to="/sign-up" className="underline">
							Sign Up
						</NavLink>
					</small>
				</Field>
			</CardFooter>
		</Card>
	);
};
