'use client';
import Link from 'next/link';
import UISwitch from '../UISwitch/ui-switch';
import { BadgeInfo, FileIcon, Home, SlashSquareIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CSSProperties } from 'react';

interface NavButtonProps {
	href: string;
	icon: JSX.Element;
}

const navButtons: NavButtonProps[] = [
	{
		href: '/',
		icon: <SlashSquareIcon />,
	},
];

const Navbar = () => {
	return (
		<div className="grid grid-cols-5 gap-0">
			{navButtons.map((item) => (
				<Button
					asChild
					size="icon"
					className={`bg-background text-foreground font-mono font-bold hover:bg-accent hover:text-accent-foreground`}
				>
					<Link href={item.href}>[HO]</Link>
				</Button>
			))}
			<h1 className="place-self-center col-span-3">hxvry</h1>
			<UISwitch />
		</div>
	);
};

export default Navbar;
