import {
	Badge,
	Card,
	Code,
	Container,
	Group,
	Image,
	Text,
	rem,
	useMantineTheme,
} from '@mantine/core';
import { formatDuration, intervalToDuration } from 'date-fns';
import Experience from './shared/exp';

const XPCard = () => {
	const theme = useMantineTheme();
	const timeEmployed = (date1: Date, date2: Date) => {
		const duration = intervalToDuration({
			start: date1,
			end: date2,
		});
		return formatDuration(duration, { delimiter: ', ' });
	};
	return (
		<Container>
			{Experience.map((exp) => (
				<Card key={exp.label} pt={rem(15)}>
					<Card.Section>
						<Image src={exp.imageSlug}></Image>
					</Card.Section>
					<Group>
						<Badge color={theme.colors.orange[5]}>
							{exp.companyName}
						</Badge>
						<Text>
							{exp.jobTitle} -{' '}
							<Code>
								{timeEmployed(exp.startDate, exp.endDate)}
							</Code>
						</Text>

						<Text>{exp.jobDescription}</Text>
					</Group>
				</Card>
			))}
		</Container>
	);
};

export default XPCard;
