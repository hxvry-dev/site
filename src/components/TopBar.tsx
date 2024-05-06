import { Center, Container, Space, Text } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import classes from './css/TopBar.module.css';

const TopBar = () => {
	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<Text component="a" href="/">
					<Center>
						<IconCode size={28} />
						<Space w="xs" />
						Henry Ouellette
					</Center>
				</Text>
			</Container>
		</header>
	);
};

export default TopBar;
