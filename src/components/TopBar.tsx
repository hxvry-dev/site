import { Center, Container, Space } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import classes from './css/TopBar.module.css';

const TopBar = () => {
	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<Center>
					<IconCode size={25} />
					<Space w="xs" />
					Henry Ouellette
				</Center>
			</Container>
		</header>
	);
};

export default TopBar;
