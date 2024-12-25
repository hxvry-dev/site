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
		<>
			<UISwitch />
			<Menubar className="w-fit">
				<MenubarMenu>
					<MenubarTrigger className="menubar-trigger">Menu</MenubarTrigger>
					<MenubarContent sideOffset={5} className="menubar-content">
						<MenubarItem className="menubar-item" asChild>
							<Link href="/">Home</Link>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem className="menubar-item" asChild>
							<Link href="/resume">Resume</Link>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</>
	);
};

export default Navbar;
