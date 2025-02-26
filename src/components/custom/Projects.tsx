import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { IconBrandGithub } from '@tabler/icons-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import GithubRepoTable from './GithubRepoTable';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const linkGenerator = (slug: string, desc: string) => {
	return (
		<Button asChild>
			<NavLink to={`${slug}`}>{desc}</NavLink>
		</Button>
	);
};

interface ProjectDataProps {
	id: number;
	name: string;
	description: string;
	link: JSX.Element | string;
	src: string;
	tools: Array<string>;
}

const ProjectData: ProjectDataProps[] = [
	{
		id: 0,
		name: 'Idle Game [BETA]',
		description:
			'Simple Idle game that I threw together in a few days and refined over the course of a few weeks. It has 2 upgrades and a Prestige system implemented, with plans to expand upgrades further in the future. The code is available on my GitHub.',
		link: linkGenerator('/incremental', 'Idle Game'),
		src: 'https://github.com/hxvry-dev/site/tree/main/src/components/custom/game',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI'],
	},
	{
		id: 1,
		name: 'Bitburner Scripts',
		description:
			'A collection of my TypeScript-based scripts for Bitburner. Some of the code was taken from other repositories, and I tried to credit the author(s) when possible.',
		link: linkGenerator('https://github.com/hxvry-dev/bitburner-scripts', 'Bitburner Scripts'),
		src: 'https://github.com/hxvry-dev/bitburner-scripts',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI'],
	},
];

const Projects: FC = () => {
	return (
		<>
			<div className="justify-self-center mt-5 p-5 font-mono border-2 w-fit">My Projects</div>
			<div className="mt-2 p-5 font-mono border-2 w-fit grid grid-cols-3 grid-rows-3 gap-5 justify-self-center">
				{ProjectData.map((project) => (
					<Card key={project.id}>
						<CardHeader>
							<CardTitle>{project.name}</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="overflow-scroll whitespace-normal border p-3 max-h-[150px] min-w-[410px] content-center">
								<p>{project.description}</p>
							</div>
						</CardContent>
						<CardFooter>
							<div className="grid grid-cols-2 gap-5">
								<div>{project.link}</div>
								<div>
									<Button asChild>
										<NavLink to={project.src} target="_blank">
											{<IconBrandGithub />} Source
										</NavLink>
									</Button>
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
			<div className="justify-self-center w-fit">
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
