import { useEffect, useId } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

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

interface LinkProps {
	href: string;
	desc: string;
	key: string;
	target?: boolean;
}

interface ProjectDataProps {
	id: number;
	name: string;
	description: string;
	link: Array<LinkProps>;
	src: string;
	tools: Array<string>;
}

const ProjectData: ProjectDataProps[] = [
	{
		id: 0,
		name: 'Idle Game [BETA]',
		description:
			'Simple Idle game that I threw together in a few days and refined over the course of a few weeks. It has since grown a mind of its own, and now has a Supabase-powered backend, and handles offline progression. Plenty more upgrades are planned for the future. Drop an Issue in the Github with your suggestions for features/upgrades! The code is available on my GitHub.',
		link: [{ href: '/login', desc: 'Idle Game', key: 'Incremental' }],
		src: 'https://github.com/hxvry-dev/site/tree/main/src/components/custom/game/components',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI', 'Vite'],
	},
	{
		id: 1,
		name: 'Bitburner Scripts',
		description:
			'A collection of my TypeScript-based scripts for Bitburner. Some of the code was taken from other repositories, and I tried to credit the author(s) when possible.',
		link: [
			{
				href: 'https://github.com/hxvry-dev/bitburner-scripts',
				desc: 'Bitburner Scripts',
				key: 'bb',
				target: true,
			},
		],
		src: 'https://github.com/hxvry-dev/bitburner-scripts',
		tools: ['TypeScript', 'Vite'],
	},
];

const Projects = () => {
	useEffect(() => {
		document.title = `The Projects Page`;
	}, []);
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
							<div className="no-scrollbar overflow-scroll whitespace-normal border p-3 h-[150px] content-center">
								<p>{project.description}</p>
							</div>
							<div className="pt-5 justify-self-center grid grid-flow-col gap-2">
								<legend>Tools Used:</legend>
								{project.tools.map((tool) => (
									<Badge variant="secondaryChip" key={tool.toLowerCase().replace('/', '-')}>
										{tool}
									</Badge>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<div className="grid grid-cols-2 gap-5">
								<div className="grid grid-flow-col-dense gap-2">
									{project.link.map((p) => (
										<Button asChild key={p.key}>
											<NavLink to={p.href} target={p.target ? '_blank' : ''}>
												{p.desc}
											</NavLink>
										</Button>
									))}
								</div>
								<div>
									<Button asChild variant="link" key={useId()}>
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
		</>
	);
};

export default Projects;
