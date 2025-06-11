import { FC, JSX, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

import GithubRepoTable from './GithubRepoTable';
import { Badge } from '../ui/badge';

const linkGenerator = (slug: string, desc: string, key?: string) => {
	return (
		<Button asChild variant="secondary" key={key}>
			<NavLink to={`${slug}`}>{desc}</NavLink>
		</Button>
	);
};

function GithubLogo() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
		>
			<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
		</svg>
	);
}

interface ProjectDataProps {
	id: number;
	name: string;
	description: string;
	link: Array<JSX.Element | string>;
	src: string;
	tools: Array<string>;
}

const ProjectData: ProjectDataProps[] = [
	{
		id: 0,
		name: 'Idle Game [BETA]',
		description:
			'Simple Idle game that I threw together in a few days and refined over the course of a few weeks. It has 2 upgrades and a Prestige system implemented, with plans to expand upgrades further in the future. The code is available on my GitHub.',
		link: [linkGenerator('/incremental', 'Idle Game', `v1`), linkGenerator('/login', 'Idle Game V2 [WIP]', `v2`)],
		src: 'https://github.com/hxvry-dev/site/tree/main/src/components/custom/game',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI', 'Vite'],
	},
	{
		id: 1,
		name: 'Bitburner Scripts',
		description:
			'A collection of my TypeScript-based scripts for Bitburner. Some of the code was taken from other repositories, and I tried to credit the author(s) when possible.',
		link: [linkGenerator('https://github.com/hxvry-dev/bitburner-scripts', 'Bitburner Scripts', `bb`)],
		src: 'https://github.com/hxvry-dev/bitburner-scripts',
		tools: ['TypeScript', 'Vite'],
	},
];

const Projects: FC = () => {
	useEffect(() => {
		document.title = `The Projects Page`;
	});
	return (
		<>
			<div className="justify-self-center mt-5 p-5 font-mono w-fit">My Projects</div>
			<div className="mt-2 p-5 border-2 rounded-xl font-mono w-fit grid grid-flow-col gap-5 justify-self-center max-w-[1280px]">
				{ProjectData.map((project) => (
					<Card key={project.id} className="bg-background">
						<CardHeader>
							<CardTitle>{project.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="overflow-scroll whitespace-normal border p-3 h-[150px] content-center">
								<p>{project.description}</p>
							</div>
							<div className="pt-5 justify-self-center grid grid-flow-col gap-2">
								<legend>Tools Used:</legend>
								{project.tools.map((tool) => (
									<Badge
										className="bg-accent text-white hover:bg-accent hover:text-white"
										key={tool.toLowerCase().replace('/', '-')}
									>
										{tool}
									</Badge>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<div className="grid grid-cols-2 gap-5">
								<div>{project.link}</div>
								<div>
									<Button asChild variant="link">
										<NavLink to={project.src} target="_blank">
											{<GithubLogo />} Source
										</NavLink>
									</Button>
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="justify-self-center w-fit font-mono">
				<Accordion type="single" collapsible>
					<AccordionItem value="proj-repos">
						<AccordionTrigger className="justify-center pl-4 pr-4">Project Repositories</AccordionTrigger>
						<AccordionContent className="w-[550px]">{<GithubRepoTable />}</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	);
};

export default Projects;
