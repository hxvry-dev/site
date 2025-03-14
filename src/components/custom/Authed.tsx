import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../ui/button';

const Authed: FC = () => {
	return (
		<div className="justify-self-center mt-64">
			<p className="text-2xl text-center">Successfully Authenticated!</p>
			<div className="justify-self-center">
				<Button variant="link" asChild>
					<NavLink to="/">Head Home</NavLink>
				</Button>
			</div>
		</div>
	);
};

export default Authed;
