import { FC } from 'react';
import { Button } from '../ui/button';
import { NavLink } from 'react-router-dom';

const Authed: FC = () => {
	return (
		<div className="justify-self-center">
			<p className="text-2xl text-center">Successfully Authenticated!</p>
			<Button variant="link" asChild>
				<NavLink to="/">Head Home</NavLink>
			</Button>
		</div>
	);
};

export default Authed;
