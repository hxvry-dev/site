import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DateTime } from 'luxon';
import { FC } from 'react';

interface JobCardProps {
	id: number;
	jobName: string;
	jobTitle: string;
	jobStartDate: DateTime;
	jobSecondStartDate?: DateTime;
	jobEndDate?: DateTime | string;
	jobSecondEndDate?: DateTime | string;
	disclaimer?: string;
	responsibilities?: string[];
}

const jobs: JobCardProps[] = [
	{
		id: 0,
		jobName: 'Camden Central School District',
		jobTitle: 'IT Support Technician',
		jobStartDate: DateTime.fromObject({ month: 6, year: 2017 }, { zone: 'America/New_York' }),
		jobSecondStartDate: DateTime.fromObject({ month: 8, year: 2018 }, { zone: 'America/New_York' }),
		jobEndDate: 'To End of Summer',
		jobSecondEndDate: 'To End of Summer',
		disclaimer: 'I worked here twice, once in 2017, and again in 2018, as it was a seasonal job.',
		responsibilities: [
			'Performed repairs on laptops, including repairing screens, motherboards, fans, batteries, and data ports.',
			'Responsible for installation and removal of classroom computers.',
			'Managed inventory of electronic devices for CCSD.',
			'Handled client work orders.',
		],
	},
	{
		id: 1,
		jobName: 'Chiropassion Consulting',
		jobTitle: 'Data Analyst/Social Media Manager',
		jobStartDate: DateTime.fromObject({ month: 3, year: 2021 }, { zone: 'America/New_York' }),
		jobEndDate: DateTime.fromObject({ month: 6, year: 2021 }, { zone: 'America/New_York' }),
		disclaimer: 'This role was temporary, and was filled after 3 months.',
		responsibilities: [
			'Study Google Analytics trends pertaining to sales and enrollments in a course.',
			'Optimization of Google AdWords, including negative keywords.',
			'Improved CTR and SEO using Google AdWords.',
		],
	},
	{
		id: 2,
		jobName: 'Bryx',
		jobTitle: 'Customer Support Engineer',
		jobStartDate: DateTime.fromObject({ month: 5, year: 2022 }, { zone: 'America/New_York' }),
		jobEndDate: 'to present',
		responsibilities: [
			'Triage customer questions and concerns as they relate to Bryx Mobile and Bryx Station Alerting.',
			'Remote and on-site troubleshooting of rack-mounted hardware and software.',
			'Write code to enhance the customer experience as it relates to Bryx Mobile and Bryx Station Alerting.',
		],
	},
];

const Resume: FC = () => {
	const pdf: string = '/pdfs/Resume.pdf';
	return (
		<div className="justify-items-center font-mono">
			<div className="grid grid-cols-3 gap-3 pt-16 pb-8 pl-8 pr-8">
				{jobs.map((job) => (
					<Card key={job.id} className="w-fit">
						<CardHeader>
							<CardTitle>{job.jobName}</CardTitle>
							<CardDescription>{job.jobTitle}</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-5 pr-5">
								{job.responsibilities?.map((r) => <li key={r.length}>{r}</li>)}
							</ul>
						</CardContent>
					</Card>
				))}
			</div>
			<Dialog>
				<DialogTitle hidden>My Resume</DialogTitle>
				<DialogTrigger asChild>
					<Button size="sm" variant="ghost">
						View Resume
					</Button>
				</DialogTrigger>
				<DialogContent className="p-5 min-w-fit">
					<embed src={pdf} type="application/pdf" width="600px" height="800px" />
				</DialogContent>
			</Dialog>
			<div className="text-stone-700">
				<small>Click the {`[HO]`} to go home when you&apos;re done!</small>
			</div>
		</div>
	);
};

export default Resume;
