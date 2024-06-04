import { Card, Grid, Image, Space, Spoiler, Table, Title } from '@mantine/core';
import classes from '../components/css/JobExperienceCard.module.css';
import {
	format,
	formatDistanceToNow,
	formatDuration,
	intervalToDuration,
} from 'date-fns';
import React, { ReactNode } from 'react';

interface JobExperienceProps {
	label: string;
	imageSlug: string;
	jobTitle: string;
	jobDescription: Array<React.ReactNode>;
	companyName: string;

	startDate: Date;
	endDate?: Date;
}

const JobExperience: Array<JobExperienceProps> = [
	{
		label: 'bryx',
		imageSlug: 'src/assets/bryx.png',
		jobTitle: 'Customer Support Engineer',
		jobDescription: [
			'Handled client work requests.',
			'Perform updates to backend infrastructure.',
			'withPadding Provision and configure Bryx-provided hardware',
			'Interface with Linux-based Operating Systems.',
			'withPadding Experience with network troubleshooting.',
		],
		companyName: 'Bryx, Inc.',

		startDate: new Date('5/26/2022'),
	},
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
	{
		label: 'ccsd-it-technician',
		imageSlug: 'src/assets/camden.png',
		jobTitle: 'IT Support Technician',
		jobDescription: [
			'Handled client work orders.',
			'withPadding Managed inventory of electronic devices for CCSD.',
			'Responsible for installation and removal of classroom computers.',
			'Performed repairs on laptops, including repairing screens, motherboards, fans, batteries, and data ports.',
		],
		companyName: 'Camden Central School District',

		startDate: new Date('6/1/2017'),
		endDate: new Date('8/1/2018'),
	},
];

const JobExperienceCard = () => {
	const timeEmployed = (date1: Date, date2?: Date): string => {
		if (date2) {
			const duration = intervalToDuration({
				start: date1,
				end: date2,
			});
			return formatDuration(duration, { delimiter: ', ' });
		} else {
			const duration = formatDistanceToNow(date1);
			return duration;
		}
	};
	const dateFormat = (date?: Date): ReactNode => {
		if (date) {
			return format(date, 'MMMM do, y');
		} else {
			return null;
		}
	};
	const makeBullets = (desc: Array<ReactNode>): ReactNode => {
		const items: Array<ReactNode> = [];
		desc.forEach((description, index) => {
			let item = description as string;
			if (item.includes('withPadding ')) {
				item = item.replace('withPadding ', '');
				items.push(
					<ul key={index}>
						<li key={index}>{item}</li>
					</ul>,
				);
			} else {
				items.push(<li key={index}>{item}</li>);
			}
		});
		return items;
	};
	return (
		<Grid columns={9}>
			{JobExperience.map((exp, index) => (
				<Grid.Col span={3} key={index}>
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
									<Table.Th>Start Date</Table.Th>
									<Table.Td c="dimmed">
										{dateFormat(exp.startDate)}
									</Table.Td>
								</Table.Tr>
								<Table.Tr>
									<Table.Th>End Date</Table.Th>
									<Table.Td c="dimmed">
										{dateFormat(exp.endDate)}
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
						<Title className={classes.title}>Job Description</Title>
						<Spoiler
							maxHeight={120}
							showLabel="Read More"
							hideLabel="Hide"
						>
							<ul className={classes.list} key={index}>
								{makeBullets(exp.jobDescription)}
							</ul>
						</Spoiler>
					</Card>
				</Grid.Col>
			))}
		</Grid>
	);
};

export default JobExperienceCard;
