import {
	Anchor,
	Center,
	Container,
	Space,
	useMantineTheme,
} from '@mantine/core';
import {
	Icon,
	IconBrandInstagram,
	IconBrandX,
	IconCode,
	IconHeartCode,
	IconProps,
} from '@tabler/icons-react';
import react from 'react';
import classes from './css/SocialMedia.module.css';

interface SocialMediaProps {
	key: string;
	name: string;
	link: string;
	icon: react.ForwardRefExoticComponent<
		Omit<IconProps, 'ref'> & react.RefAttributes<Icon>
	>;
}

const Socials: Array<SocialMediaProps> = [
	{
		key: 'social-1',
		name: 'GitHub',
		link: 'https://www.github.com/hxvry-dev',
		icon: IconCode,
	},
	{
		key: 'social-2',
		name: 'Instagram',
		link: 'https://www.instagram.com/hxvry',
		icon: IconBrandInstagram,
	},
	{
		key: 'social-3',
		name: 'Twitter / X',
		link: 'https://www.x.com/hxvry_',
		icon: IconBrandX,
	},
];

const SocialMedia = () => {
	const theme = useMantineTheme();
	return (
		<footer className={classes.footer}>
			<Container size="md" className={classes.inner}>
				{Socials.map((social) => (
					<Anchor
						href={social.link}
						className={classes.link}
						key={social.key}
					>
						<Center inline>
							{<social.icon />}
							<Space w="xs" />
							{social.name}
						</Center>
					</Anchor>
				))}
			</Container>
			<Center className={classes.blurb}>
				Made with
				<Space w="xs" />
				<IconHeartCode size={15} color={theme.colors.red[5]} />
				<Space w="xs" />
				by Henry
			</Center>
		</footer>
	);
};

export default SocialMedia;
