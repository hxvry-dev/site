import { formatDuration, intervalToDuration } from 'date-fns';

import { Badge } from '../ui/badge';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface JobCardProps {
	id: number;
	current?: boolean;
	jobName: string;
	jobTitle: string;
	jobStartDate: Date;
	jobSecondStartDate?: Date;
	jobEndDate?: Date;
	jobSecondEndDate?: Date;
	disclaimer?: string;
	responsibilities?: string[];
}

const jobs: JobCardProps[] = [
	{
		id: 1,
		jobName: 'Bryx',
		jobTitle: 'Customer Support Engineer',
		jobStartDate: new Date('05-01-2022'),
		jobEndDate: new Date('3-27-2026'),
		responsibilities: [
			'Triaged and resolved customer issues across hardware and software environments, diagnosing root causes and improving resolution times and customer satisfaction.',
			'Collaborated with cross-functional teams to deliver cohesive solutions, aligning efforts to efficiently meet customer needs and achieve shared service goals.',
			'Performed remote and on-site troubleshooting of rack-mounted hardware and associated software, minimizing downtime and ensuring reliable system performance.',
			'Developed high-quality Python code to address customer requests.',
		],
	},
	{
		id: 2,
		jobName: 'Chiropassion Consulting',
		jobTitle: 'Data Analyst/Social Media Manager',
		jobStartDate: new Date('03-01-2021'),
		jobEndDate: new Date('06-01-2021'),
		disclaimer: 'This role was temporary, and was filled after 3 months.',
		responsibilities: [
			'Analyzed Google Analytics data to identify trends in sales and course enrollments, uncovering insights that informed marketing strategies and improved targeting effectiveness.',
			'Optimized Google Ads campaigns by refining keyword strategy and implementing negative keywords, reducing wasted ad spend and increasing campaign efficiency.',
			'Enhanced click-through rates (CTR) and search engine optimization (SEO) by improving ad copy, keyword alignment, and on-site content, driving higher traffic quality and engagement.',
		],
	},
	{
		id: 3,
		jobName: 'Camden Central School District',
		jobTitle: 'IT Support Technician',
		jobStartDate: new Date('06-01-2017'),
		jobSecondStartDate: new Date('08-01-2018'),
		jobEndDate: new Date('09-01-2017'),
		jobSecondEndDate: new Date('09-01-2018'),
		disclaimer: 'I worked here twice, once in 2017, and again in 2018, as it was a seasonal job.',
		responsibilities: [
			'Repaired and restored functionality of 50+ laptops by diagnosing and fixing hardware issues (screens, motherboards, fans, batteries, and data ports), reducing device downtime and extending equipment lifespan.',
			'Performed installation and decommissioning of classroom computer systems, ensuring seamless setup for instructional use and minimizing disruption to daily school operations.',
			'Managed and tracked inventory of electronic devices, helped implement an organized system that improved asset accountability and reduced loss or misplacement.',
			'Processed and fulfilled client work orders efficiently, prioritizing requests and maintaining clear communication to ensure timely resolution.',
		],
	},
];

const getDuration = (startDate: Date, endDate: Date): string => {
	const duration = intervalToDuration({ start: startDate, end: endDate });
	const result = formatDuration(duration, { delimiter: ', ', format: ['years', 'months'] });
	return result;
};

const Resume = () => {
	const pdf: string = '/pdfs/Resume.pdf';
	const isMobile = useIsMobile();
	return (
		<div className="grid w-fit mx-auto font-mono">
			<div
				className={
					isMobile
						? 'grid grid-rows-3 gap-3 pt-16 pb-8 pl-8 pr-8'
						: 'grid grid-cols-3 gap-3 pt-16 pb-8 pl-8 pr-8'
				}
			>
				{jobs.map((job) => (
					<Card key={job.id} className="max-w-162.5 bg-background border-2">
						<CardHeader className="flex flex-row flex-wrap">
							<div className="flex-1">
								<CardTitle>{job.jobName}</CardTitle>
								<CardDescription>{job.jobTitle}</CardDescription>
							</div>
							{job.current ? (
								<Badge className="float-right">Current</Badge>
							) : (
								<Badge className="float-right text-sm">
									I worked here in &apos;
									{job.jobEndDate!.getFullYear().toString().substring(2)}
									{job.jobSecondEndDate ? (
										<>
											{' '}
											and &apos;
											{job.jobSecondEndDate.getFullYear().toString().substring(2)}
										</>
									) : null}
								</Badge>
							)}
						</CardHeader>
						<CardContent>
							<div className="mb-5">
								Duration of Employment: <Badge>{getDuration(job.jobStartDate, job.jobEndDate!)}</Badge>
								{job.jobSecondStartDate ? (
									<>
										, <Badge>{getDuration(job.jobSecondStartDate, job.jobSecondEndDate!)}</Badge>
									</>
								) : null}
							</div>
							<div className="no-scrollbar overflow-scroll border p-3 h-30 max-w-fit content-center">
								<ul className="list-disc pl-5 pr-5">
									{job.responsibilities?.map((r) => (
										<li key={r.length}>{r}</li>
									))}
								</ul>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="grid mx-auto">
				<Dialog>
					<DialogTitle hidden>My Resume</DialogTitle>
					<DialogTrigger asChild>
						<Button size="sm" variant="ghost" className="justify-items-center">
							View Resume
						</Button>
					</DialogTrigger>
					<DialogContent className="p-5 min-w-fit">
						<embed src={pdf} type="application/pdf" width="600px" height="800px" />
					</DialogContent>
				</Dialog>
			</div>
			<small className="grid text-muted-foreground mx-auto">
				Click the {`[HO]`} to go home when you&apos;re done!
			</small>
		</div>
	);
};

export default Resume;
