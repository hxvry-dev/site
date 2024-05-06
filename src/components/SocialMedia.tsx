import { Center, Container, Space, Text, useMantineTheme } from '@mantine/core';
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
import { useNavigate } from 'react-router-dom';

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
	const nav = useNavigate();
	const theme = useMantineTheme();
	return (
		<footer className={classes.footer}>
			<Container className={classes.inner}>
				{Socials.map((social) => (
					<Center
						inline
						component="a"
						href={social.link}
						onClick={(event) => {
							nav(social.link);
							event.preventDefault();
						}}
						className={classes.link}
					>
						{<social.icon />}
						<Space w="xs" />
						<Text>{social.name}</Text>
					</Center>
				))}
			</Container>
			<Text size="xs" className={classes.footerText}>
				<Center inline>
					Made with
					<Space w="xs" />
					<IconHeartCode color={theme.colors.red[5]} size={25} />
					<Space w="xs" />
					by Henry
				</Center>
			</Text>
		</footer>
	);
};

export default SocialMedia;
