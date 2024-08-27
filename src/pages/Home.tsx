import { Container, Space, Text, Title } from '@mantine/core';
import JobExperienceCard from '../components/JobExperienceCard';
import classes from './css/Home.module.css';

const Home = () => {
	return (
		<Container>
			<Container size="lg" className={classes.about}>
				<Title order={3}>About Me</Title>
				<Space h={15} />
				<Text className={classes.aboutText}>
					Hi! My name is Henry, and welcome to my website!
				</Text>
			</Container>
			<Container>
				<Title order={3}>Jobs I've Had</Title>
				<Space h={15} />
				<JobExperienceCard />
			</Container>
		</Container>
	);
};

export default Home;
