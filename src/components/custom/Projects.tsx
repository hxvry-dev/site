import { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { NavLink } from 'react-router-dom';

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
	action?: string;
}

const projectData: ProjectDataProps[] = [
	{
		id: 0,
		name: 'This Site',
		description:
			'The website you are on right now! This is my main side project as of now. I am constantly looking to improve/update things as I come across new technologies and ideologies in the field of Web Design/Development.',
		link: [{ href: '/', desc: 'Home Page', key: 'Home-Page' }],
		src: 'https://github.com/hxvry-dev/site/',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI', 'Vite'],
		action: 'WIP',
	},
	{
		id: 1,
		name: 'Idle Game',
		description:
			'Simple Idle game that I threw together in a few days and refined over the course of a few weeks. It has since grown a mind of its own, and now has a Supabase-powered backend, and handles offline progression. Plenty more upgrades are planned for the future. Drop an Issue in the Github with your suggestions for features/upgrades! The code is available on my GitHub.',
		link: [{ href: '/login', desc: 'Idle Game', key: 'Incremental' }],
		src: 'https://github.com/hxvry-dev/site/tree/main/src/components/custom/game/components',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI', 'Vite'],
		action: 'WIP',
	},
	{
		id: 2,
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

export const Projects = () => {
	useEffect(() => {
		document.title = `The Projects Page`;
	}, []);
	const isMobile = useIsMobile();
	return (
		<div className="font-mono">
			<p className="text-center text-3xl my-5">Projects</p>
			<div className={isMobile ? 'flex flex-col mx-auto gap-5 p-5' : 'grid grid-flow-col mx-auto gap-5 w-fit'}>
				{projectData.map((p) => (
					<Card className="p-5" key={p.id}>
						<CardHeader>
							<CardTitle className="mb-5 text-2xl">
								<u>{p.name}</u>
							</CardTitle>
							<CardDescription>
								<div className="flex flex-col gap-2 items-center">
									<span>Tools Used:</span>
									<div className="grid grid-cols-3 grid-rows-2 gap-1 items-center p-1 border">
										{p.tools.map((tool) => (
											<Badge
												className="w-full"
												variant="secondaryChip"
												key={tool.toLowerCase().replace('/', '-')}
											>
												{tool}
											</Badge>
										))}
									</div>
								</div>
							</CardDescription>
							{p.action ? (
								<CardAction>
									<b>
										<i>{p.action}</i>
									</b>
								</CardAction>
							) : null}
						</CardHeader>
						<CardContent
							className={
								isMobile
									? 'no-scrollbar overflow-scroll whitespace-normal border p-3 grow w-fit'
									: 'no-scrollbar overflow-scroll whitespace-normal border p-3 grow w-md'
							}
						>
							<p>{p.description}</p>
						</CardContent>
						<CardFooter>
							<div className="flex flex-row gap-5 align-bottom">
								{p.link.map((link) => (
									<Button asChild key={link.key}>
										<NavLink to={link.href} target={link.target ? '_blank' : ''}>
											{link.desc}
										</NavLink>
									</Button>
								))}
								<Button asChild variant="link">
									<NavLink to={p.src} target="_blank">
										{<GithubLogo />} Source
									</NavLink>
								</Button>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};
