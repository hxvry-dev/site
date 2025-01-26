import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import UISwitch from './UISwitch';

import { Button } from '@/components/ui/button';

const Navbar: FC = () => {
	return (
		<div className="font-bold font-mono grid grid-cols-5 gap-0">
			<Button
				asChild
				size="icon"
				className={`bg-background text-foreground hover:bg-accent hover:text-accent-foreground`}
			>
				<NavLink to="/">[HO]</NavLink>
			</Button>
			<h1 className="place-self-center col-span-3">hxvry</h1>
			<UISwitch />
		</div>
	);
};

export default Navbar;
