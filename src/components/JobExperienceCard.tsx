import {
	Card,
	Grid,
	Group,
	Image,
	List,
	Space,
	Spoiler,
	Table,
	Title,
} from '@mantine/core';
import { formatDuration, intervalToDuration } from 'date-fns';

interface JobExperienceProps {
	label: string;
	imageSlug: string;
	jobTitle: string;
	jobDescription: Array<React.ReactNode>;
	companyName: string;

	startDate: Date;
	endDate: Date;
}

const JobExperience: Array<JobExperienceProps> = [
	{
		label: 'chiropassion',
		imageSlug: 'src/assets/chiropassion.jpeg',
		jobTitle: 'Data Analyst/Social Media Manager',
		jobDescription: [
			'Study Google Analytics trends pertaining to sales and enrollments in a course.',
			'Optimization of Google AdWords, including negative keywords.',
			'Improved CTR and SEO using Google AdWords.',
		],
		companyName: 'Chiropassion Consulting',

		startDate: new Date('3/1/2021'),
		endDate: new Date('6/1/2021'),
	},
];

const JobExperienceCard = () => {
	const timeEmployed = (date1: Date, date2: Date): string => {
		const duration = intervalToDuration({
			start: date1,
			end: date2,
		});
		return formatDuration(duration, { delimiter: ', ' });
	};
	const makeBullets = (desc: Array<React.ReactNode>) => {
		const items = desc.map((item) => <List.Item>{item}</List.Item>);
		return <List spacing="md">{items}</List>;
	};
	return (
		<Grid>
			{JobExperience.map((exp, index) => (
				<Grid.Col span={4} key={index}>
					<Card key={index} shadow="sm" padding="lg" radius="xs">
						<Image
							src={exp.imageSlug}
							alt={exp.companyName}
							h={250}
							w="100%"
							radius="xs"
							fallbackSrc="https://placehold.co/600x400?text=Placeholder"
						/>
						<Space h={15} />
						<Table>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Company Name</Table.Th>
									<Table.Td c="dimmed">
										{exp.companyName}
									</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Th>Job Title</Table.Th>
									<Table.Td c="dimmed">
										{exp.jobTitle}
									</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Th>Time Employed</Table.Th>
									<Table.Td c="dimmed">
										{timeEmployed(
											exp.startDate,
											exp.endDate,
										)}
									</Table.Td>
								</Table.Tr>
							</Table.Thead>
						</Table>
						<Space h={15} />
						<Group>
							<Title size="sm" pt={15} pb={15}>
								Job Description
							</Title>
							<Spoiler
								maxHeight={120}
								showLabel="Read More"
								hideLabel="Hide"
							>
								{makeBullets(exp.jobDescription)}
							</Spoiler>
						</Group>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	);
};

export default JobExperienceCard;
