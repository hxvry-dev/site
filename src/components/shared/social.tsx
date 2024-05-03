import { Icon, IconProps } from '@tabler/icons-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface Social {
	brandIcon: ForwardRefExoticComponent<
		Omit<IconProps, 'ref'> & RefAttributes<Icon>
	>;
	brandTitle: string;
	profileLink: string;
}

const Socials: Array<Social> = [];

export default Socials;
