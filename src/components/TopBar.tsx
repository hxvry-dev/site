import { Center, Space } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import classes from './css/TopBar.module.css';

const TopBar = () => {
	return (
		<header className={classes.header}>
			<Center className={classes.inner}>
				<IconCode size={25} />
				<Space w="xs" />
				Henry Ouellette
			</Center>
		</header>
	);
};

export default TopBar;
