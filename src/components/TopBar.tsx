import { Anchor, Burger, Center, Container, Group, Space } from '@mantine/core';
import {
	Icon,
	IconCode,
	IconHome,
	IconLineDashed,
	IconPaperclip,
	IconProps,
} from '@tabler/icons-react';
import classes from './css/TopBar.module.css';
import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

interface LinkProps {
	href: string;
	label: string;
	icon: react.ForwardRefExoticComponent<
		IconProps & react.RefAttributes<Icon>
	>;
}

const Links: Array<LinkProps> = [
	{
		href: '/',
		label: 'Home',
		icon: IconHome,
	},
	{
		href: '/resume',
		label: 'Job Experience / Resume',
		icon: IconPaperclip,
	},
	{
		href: '/formatters',
		label: 'Formatters',
		icon: IconLineDashed,
	},
];

const TopBar = () => {
	const [active, setActive] = useState(Links[0].href);
	const [opened, { toggle }] = useDisclosure(false);
	const nav = useNavigate();
	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<Center>
					<IconCode size={25} />
					<Space w="xs" />
					Henry Ouellette
				</Center>
				<Group>
					{Links.map((link, index) => (
						<Anchor
							href={link.href}
							key={index}
							className={classes.links}
							data-active={active === link.href || undefined}
							onClick={(event) => {
								event.preventDefault();
								setActive(link.href);
								nav(link.href);
							}}
						>
							<Center inline>
								<link.icon stroke={1.5} />
								<Space w="xs" />
								{link.label}
							</Center>
						</Anchor>
					))}
				</Group>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="xs"
					size="sm"
				/>
			</Container>
		</header>
	);
};

export default TopBar;
