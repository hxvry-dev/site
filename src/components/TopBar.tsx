import { Container, Group, Text } from '@mantine/core';
import { IconBread } from '@tabler/icons-react';
import classes from './css/TopBar.module.css';
import Links from './shared/links';
import { useLocation, useNavigate } from 'react-router-dom';

const TopBar = () => {
	const nav = useNavigate();
	const location = useLocation();

	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<IconBread size={28} />
				<Group gap={5} visibleFrom="xs">
					{Links.map((link) => (
						<Text
							component="a"
							key={link.label}
							href={link.link}
							className={classes.link}
							data-active={
								location.pathname === link.link || undefined
							}
							onClick={(event) => {
								nav(link.link);
								event.preventDefault();
							}}
						>
							{link.label}
						</Text>
					))}
				</Group>
			</Container>
		</header>
	);
};

export default TopBar;
