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

const zSignUpSchema = z
	.object({
		email: z.email(),
		password: z.string().min(6, 'Password must be at least 6 characters long!'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		error: 'Passwords do not match!',
		path: ['confirmPassword'],
	});

export const SignUpForm = () => {
	const signUpForm = useForm<z.infer<typeof zSignUpSchema>>({
		resolver: zodResolver(zSignUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async () => {
		const { error } = await supabase!.auth.signUp({
			email: signUpForm.getValues('email'),
			password: signUpForm.getValues('password'),
			options: {
				emailRedirectTo: 'https://hxvry.com/login',
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
	};
	return (
		<Card className="max-w-md mx-auto mt-64">
			<CardHeader>
				<CardTitle className="justify-self-center">Welcome to The Game!</CardTitle>
				<CardDescription className="font-mono mx-auto">Sign Up Form</CardDescription>
			</CardHeader>
			<CardContent>
				<form id="sign-up-form" onSubmit={signUpForm.handleSubmit(onSubmit)}>
					<FieldGroup>
						<Controller
							name="email"
							control={signUpForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="sign-up-form">Email Address</FieldLabel>
									<Input
										{...field}
										id="sign-up-form"
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
							control={signUpForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="sign-up-form">Password</FieldLabel>
									<Input
										{...field}
										id="sign-up-form"
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
							control={signUpForm.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="sign-up-form">Confirm Password</FieldLabel>
									<Input
										{...field}
										id="sign-up-form"
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
					</FieldGroup>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col gap-2">
				<Field orientation="horizontal">
					<div className="mx-auto">
						<Button type="submit" form="sign-up-form" disabled={!signUpForm.formState.isValid}>
							Submit
						</Button>
						<Button type="reset" asChild variant="link">
							<NavLink to="/login">Back to Login</NavLink>
						</Button>
					</div>
				</Field>
				<Field orientation="horizontal">
					<small className="text-muted-foreground mx-auto">
						Have an account?{' '}
						<NavLink to="/login" className="underline">
							Sign In
						</NavLink>
					</small>
				</Field>
			</CardFooter>
		</Card>
	);
};
