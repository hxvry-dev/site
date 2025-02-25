import { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { IconBrandGithub } from '@tabler/icons-react';

const linkGenerator = (slug: string, desc: string) => {
	return (
		<Button asChild>
			<NavLink to={`/${slug}`}>{desc}</NavLink>
		</Button>
	);
};

interface ProjectDataProps {
	id: number;
	name: string;
	description: string;
	link: JSX.Element;
	src: string;
	tools: Array<string>;
}

const ProjectData: ProjectDataProps[] = [
	{
		id: 0,
		name: 'Idle Game [BETA]',
		description:
			'Simple Idle game that I threw together in a few days and refined over the course of a few weeks. It has 2 upgrades and a Prestige system implemented, with plans to expand upgrades further in the future. The code is available on my GitHub.',
		link: linkGenerator('incremental', 'Idle Game'),
		src: 'https://github.com/hxvry-dev/site/tree/main/src/components/custom/game',
		tools: ['Jotai', 'React', 'TypeScript', 'ShadCN/UI'],
	},
];

const Projects: FC = () => {
	return (
		<>
			<div className="justify-self-center mt-5 p-5 font-mono border-2 w-fit">My Projects</div>
			<div className="justify-self-center mt-2 p-5 font-mono border-2 w-fit">
				<div>
					{ProjectData.map((project) => (
						<Card key={project.id}>
							<CardHeader>
								<CardTitle>{project.name}</CardTitle>
								<CardDescription>
									<p className="w-[250px]">{project.description}</p>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 gap-0">
									<div>{project.link}</div>
									<div>
										<Button asChild>
											<NavLink to={project.src} target="_blank">
												{<IconBrandGithub />} Source
											</NavLink>
										</Button>
									</div>
								</div>
							</CardContent>
							<CardFooter></CardFooter>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default Projects;
