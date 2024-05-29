import { Card, Grid, Image, Spoiler, Table, Text, Title } from '@mantine/core';
import { formatDuration, intervalToDuration } from 'date-fns';

interface JobExperienceProps {
	label: string;
	imageSlug: string;
	jobTitle: string;
	jobDescription: string;
	companyName: string;

	startDate: Date;
	endDate: Date;
}

const JobExperience: Array<JobExperienceProps> = [
	{
		label: 'exp-1',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE',
		jobDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar. Enim neque volutpat ac tincidunt vitae semper quis lectus. Sed nisi lacus sed viverra tellus in hac. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Congue nisi vitae suscipit tellus. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Molestie at elementum eu facilisis sed odio. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Eget arcu dictum varius duis at consectetur lorem. Augue ut lectus arcu bibendum at varius vel pharetra. Egestas integer eget aliquet nibh praesent tristique.',
		companyName: 'Company',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2010'),
	},
	{
		label: 'exp-2',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE-2',
		jobDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar. Enim neque volutpat ac tincidunt vitae semper quis lectus. Sed nisi lacus sed viverra tellus in hac. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Congue nisi vitae suscipit tellus. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Molestie at elementum eu facilisis sed odio. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Eget arcu dictum varius duis at consectetur lorem. Augue ut lectus arcu bibendum at varius vel pharetra. Egestas integer eget aliquet nibh praesent tristique.',
		companyName: 'Company 2',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2020'),
	},
	{
		label: 'exp-2',
		imageSlug: 'src/assets/roundry.png',
		jobTitle: 'SWE-2',
		jobDescription:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Mi quis hendrerit dolor magna eget. Praesent semper feugiat nibh sed pulvinar. Enim neque volutpat ac tincidunt vitae semper quis lectus. Sed nisi lacus sed viverra tellus in hac. Pellentesque id nibh tortor id aliquet lectus proin nibh nisl. Congue nisi vitae suscipit tellus. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Molestie at elementum eu facilisis sed odio. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Eget arcu dictum varius duis at consectetur lorem. Augue ut lectus arcu bibendum at varius vel pharetra. Egestas integer eget aliquet nibh praesent tristique.',
		companyName: 'Company 2',

		startDate: new Date('1/1/2000'),
		endDate: new Date('2/1/2020'),
	},
];

const JobExperienceCard = () => {
	const timeEmployed = (date1: Date, date2: Date) => {
		const duration = intervalToDuration({
			start: date1,
			end: date2,
		});
		return formatDuration(duration, { delimiter: ', ' });
	};
	return (
		<Grid justify="flex-start" align="stretch">
			{JobExperience.map((exp) => (
				<Grid.Col span={4}>
					<Card key={exp.label} shadow="sm" padding="lg" radius="xs">
						<Image
							src={exp.imageSlug}
							alt={exp.jobDescription}
							h={250}
							w="100%"
							radius="xs"
							fallbackSrc="https://placehold.co/600x400?text=Placeholder"
						/>
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
						<Title size="sm" pt={15} pb={15} c="dimmed">
							Job Description
						</Title>
						<Spoiler
							maxHeight={120}
							showLabel="Read More"
							hideLabel="Hide"
						>
							<Text>{exp.jobDescription}</Text>
						</Spoiler>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	);
};

export default JobExperienceCard;
