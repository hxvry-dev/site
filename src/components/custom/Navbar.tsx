import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ThemeDropdown } from './ThemeDropdown';

const Navbar: FC = () => {
	return (
		<div className="font-bold font-mono grid grid-cols-5 gap-2">
			<Button
				asChild
				size="icon"
				className={`bg-background text-foreground hover:bg-accent hover:text-accent-foreground`}
			>
				<NavLink to="/" className="rounded-none">
					[HO]
				</NavLink>
			</Button>
			<h1 className="place-self-center col-span-3">hxvry</h1>
			<ThemeDropdown />
		</div>
	);
};

export default Navbar;
