import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Version: FC = () => {
	return (
		<div className="justify-self-center">
			<NavLink to="https://github.com/hxvry-dev/site" target="_blank">
				<small className="code mb-2">Version: 0.1.0</small>
			</NavLink>
		</div>
	);
};
