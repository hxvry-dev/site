'use client';
import {
	Menubar,
	MenubarItem,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarSeparator,
} from '@/components/ui/menubar';
import Link from 'next/link';
import UISwitch from '../UISwitch/ui-switch';

const Navbar = () => {
	return (
		<div className="grid grid-cols-5 gap-0">
			<Menubar className="w-fit">
				<MenubarMenu>
					<MenubarTrigger>Menu</MenubarTrigger>
					<MenubarContent sideOffset={5}>
						<MenubarItem asChild>
							<Link href="/">Home</Link>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem asChild>
							<Link href="/about">About Me</Link>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem asChild>
							<Link href="/resume">Resume</Link>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
			<h1 className="place-self-center col-span-3">Henry Ouellette</h1>
			<UISwitch />
		</div>
	);
};

export default Navbar;
