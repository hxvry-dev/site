import {
	Badge,
	Card,
	Center,
	Code,
	Flex,
	Group,
	Image,
	Space,
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
		<Flex columnGap={15} align="flex-start">
			{Experience.map((exp) => (
				<Card
					key={exp.label}
					shadow="sm"
					padding="lg"
					radius="md"
					withBorder
				>
					<Image
						src={exp.imageSlug}
						alt={exp.jobDescription}
						h={250}
						w="auto"
						radius="lg"
						fallbackSrc="https://placehold.co/600x400?text=Placeholder"
					/>
					<Group mt="md" mb="xs" justify="space-between">
						<Badge color={theme.colors.orange[5]}>
							{exp.companyName}
						</Badge>
						<Center>
							{exp.jobTitle}
							<Space w="xs" />-<Space w="xs" />
							<Code>
								{timeEmployed(exp.startDate, exp.endDate)}
							</Code>
						</Center>
					</Group>
					<Text>{exp.jobDescription}</Text>
				</Card>
			))}
		</Flex>
	);
};

export default XPCard;
