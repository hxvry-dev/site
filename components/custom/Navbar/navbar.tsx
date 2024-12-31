'use client';
import Link from 'next/link';
import UISwitch from '../UISwitch/ui-switch';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
	return (
		<div className="grid grid-cols-5 gap-0">
			<Button
				asChild
				size="icon"
				className={`bg-background text-foreground font-mono font-bold hover:bg-accent hover:text-accent-foreground`}
			>
				<Link href="/">[HO]</Link>
			</Button>
			<h1 className="place-self-center col-span-3">hxvry</h1>
			<UISwitch />
		</div>
	);
};
Navbar.displayName = 'Navbar';

export default Navbar;
