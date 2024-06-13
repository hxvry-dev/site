import { ActionIcon, Anchor, Center, Container, Group } from '@mantine/core';
import {
	Icon,
	IconBrandInstagram,
	IconBrandX,
	IconCode,
	IconProps,
} from '@tabler/icons-react';
import react from 'react';
import classes from './css/SocialMedia.module.css';

interface SocialMediaProps {
	label: string;
	href: string;
	icon: react.ForwardRefExoticComponent<
		Omit<IconProps, 'ref'> & react.RefAttributes<Icon>
	>;
}

const Socials: Array<SocialMediaProps> = [
	{
		label: 'GitHub',
		href: 'https://www.github.com/hxvry-dev',
		icon: IconCode,
	},
	{
		label: 'Instagram',
		href: 'https://www.instagram.com/hxvry',
		icon: IconBrandInstagram,
	},
	{
		label: 'Twitter / X',
		href: 'https://www.x.com/hxvry_',
		icon: IconBrandX,
	},
];

const SocialMedia = () => {
	return (
		<footer className={classes.footer}>
			<Container className={classes.inner}>
				<Group>
					{Socials.map((social, index) => (
						<Anchor
							href={social.href}
							key={index}
							className={classes.links}
						>
							<Center inline>
								<ActionIcon
									size="lg"
									color="dimmed"
									variant="subtle"
								>
									<social.icon stroke={1.5} />
								</ActionIcon>
								{social.label}
							</Center>
						</Anchor>
					))}
				</Group>
			</Container>
		</footer>
	);
};

export default SocialMedia;
