import { DropdownMenu, DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { FC } from 'react';
import { DropdownMenuSubTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';

interface ThemeDropdownProps {}

export const ThemeDropdown: FC<ThemeDropdownProps> = () => {
	return (
		<DropdownMenu>
			<DropdownMenuSubTrigger asChild>
				<Button variant="outline">Open</Button>
			</DropdownMenuSubTrigger>
			<DropdownMenuContent className="w-56" align="start"></DropdownMenuContent>
		</DropdownMenu>
	);
};
