import {
	Badge,
	Card,
	Container,
	Group,
	Image,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { intervalToDuration } from 'date-fns';
import Experience from './shared/exp';

const duration = (date1: Date, date2: Date) => {
	return intervalToDuration(date1.getFullYear() - date2.getFullYear());
};

const XPCard = () => {
	const theme = useMantineTheme();
	console.log(Experience);
	return (
		<Container>
			{Experience.map((exp) => (
				<Card>
					<Card.Section>
						<Image src={exp.imageSlug}></Image>
					</Card.Section>
					<Group>
						<Text>
							{exp.jobTitle} -{' '}
							{duration(exp.startDate - exp.endDate)}
						</Text>
						<Badge color={theme.colors.orange[5]}>
							{exp.companyName}
						</Badge>
					</Group>
				</Card>
			))}
		</Container>
	);
};

export default XPCard;
