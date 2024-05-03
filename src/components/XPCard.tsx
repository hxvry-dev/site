import {
	Badge,
	Card,
	Code,
	Flex,
	Group,
	Image,
	Stack,
	Text,
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
		<Flex>
			{Experience.map((exp) => (
				<Card
					key={exp.label}
					shadow="sm"
					padding="lg"
					radius="md"
					withBorder
				>
					<Group gap={5}>
						<Image
							src={exp.imageSlug}
							alt={exp.jobDescription}
							h={250}
							w="auto"
							radius="lg"
							fallbackSrc="https://placehold.co/600x400?text=Placeholder"
						/>

						<Stack mt="md" mb="xs" gap={5}>
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
						</Stack>
					</Group>
				</Card>
			))}
		</Flex>
	);
};

export default XPCard;
