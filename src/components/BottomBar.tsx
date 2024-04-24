import { Container, Group } from '@mantine/core';
import { IconBrandMantine } from '@tabler/icons-react';
import classes from './css/BottomBar.module.css';
import Links from './shared/links';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomBar = () => {
	const nav = useNavigate();
	const location = useLocation();

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<IconBrandMantine size={28} />
				<Group className={classes.links}>
					{Links.map((link) => (
						<a
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
						</a>
					))}
				</Group>
			</Container>
		</div>
	);
};

export default BottomBar;
