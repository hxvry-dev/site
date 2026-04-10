import { useState } from 'react';

import { formatDuration, intervalToDuration } from 'date-fns';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '../ui/drawer';

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
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
	responsibilities?: string[];
}

const jobs: JobCardProps[] = [
	{
		id: 0,
		current: true,
		jobName: 'Employee For Hire',
		jobTitle: 'Software Engineer | Customer Support Engineer',
		jobStartDate: new Date('03-27-2026'),
		jobEndDate: new Date(),
	},
	{
		id: 1,
		jobName: 'Bryx',
		jobTitle: 'Customer Support Engineer',
		jobStartDate: new Date('05-01-2022'),
		jobEndDate: new Date('03-01-2026'),
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
	const result = formatDuration(duration, { delimiter: ', ', format: ['years', 'months', 'days'] });
	return result;
};

export const Resume = () => {
	const pdf = '/pdfs/Resume.pdf';
	const isMobile = useIsMobile();
	const [snap, setSnap] = useState<number | string | null>('50%');
	const [open, setOpen] = useState(false);

	return (
		<>
			<div className="font-mono">
				<p className="text-center text-3xl mt-5">Recent Job Experience</p>
				<p className="text-center text-sm underline mb-5">Resume At-A-Glance</p>
				<div
					className={isMobile ? 'flex flex-col mx-auto gap-5 p-5' : 'grid grid-flow-col mx-auto gap-5 w-fit'}
				>
					{jobs.map((j) => (
						<Card className="p-5" key={j.id}>
							<CardHeader>
								<CardTitle className="@container underline">
									<div className="text-[5.5cqw] leading-tight">{j.jobTitle}</div>
								</CardTitle>
								<CardDescription className="italic">{j.jobName}</CardDescription>
								{j.current ? (
									<CardAction>
										<span className="text-3xl font-black text-destructive">*</span>
									</CardAction>
								) : null}
							</CardHeader>
							<CardContent
								className={
									isMobile
										? 'no-scrollbar overflow-scroll border p-2 grow size-fit'
										: 'no-scrollbar overflow-scroll border p-2 grow w-md h-48'
								}
							>
								<div className="px-5">
									<ul className="list-disc">
										{j.responsibilities ? (
											j.responsibilities?.map((r) => <li key={r.length}>{r}</li>)
										) : (
											<li>Currently on-going</li>
										)}
									</ul>
								</div>
							</CardContent>
							<CardFooter
								className={
									isMobile
										? 'no-scrollbar overflow-scroll p-2 grow'
										: 'no-scrollbar overflow-scroll p-2 grow'
								}
							>
								<div className="mb-5 max-w-md">
									Duration of Employment: <Badge>{getDuration(j.jobStartDate, j.jobEndDate!)}</Badge>
									{j.jobSecondStartDate ? (
										<>
											{' '}
											and <Badge>{getDuration(j.jobSecondStartDate, j.jobSecondEndDate!)}</Badge>
										</>
									) : null}
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
				<p className="text-center mt-5">
					<span className="text-3xl font-black text-destructive">*</span> = Denotes Current Means of
					"Employment"
				</p>
			</div>
			<div className="pt-5 w-fit mx-auto">
				<Drawer
					open={open}
					onOpenChange={setOpen}
					snapPoints={[1]}
					activeSnapPoint={snap}
					setActiveSnapPoint={setSnap}
				>
					<DrawerTrigger asChild>
						<Button variant="link" onClick={() => setOpen(true)}>
							View Full Resume
						</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle>Resume</DrawerTitle>
						</DrawerHeader>
						<div className="p-5 overflow-scroll">
							<iframe src={pdf} className="w-full min-h-screen rounded-md border" title="PDF Viewer" />
						</div>
						<DrawerFooter>
							<DrawerClose>Cancel</DrawerClose>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</div>
		</>
	);
};
