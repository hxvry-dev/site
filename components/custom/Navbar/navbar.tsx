'use client';
import './styles.css';
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
		<Menubar>
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
			<UISwitch />
		</Menubar>
	);
};

export default Navbar;
