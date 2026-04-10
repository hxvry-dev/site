import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';

export const Version = () => {
	const changelogByTag = `https://github.com/hxvry-dev/site/compare/${__APP_VERSION__}...main`;

	return (
		<div className="justify-self-center mt-5">
			<Button variant="link" asChild>
				<NavLink to={changelogByTag} target="_blank">
					<small className="code mb-2 p-1">Version: {__APP_VERSION__}</small>
				</NavLink>
			</Button>
		</div>
	);
};
