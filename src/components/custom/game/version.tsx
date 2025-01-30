import { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Version: FC = () => {
	return (
		<div className="justify-self-center mt-8">
			<NavLink to="https://github.com/hxvry-dev/site" target="_blank">
				<small className="code">Version: 0.0.2</small>
			</NavLink>
		</div>
	);
};
