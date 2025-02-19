import { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';

const linkGenerator = (slug: string, desc: string) => {
	return (
		<Button asChild>
			<NavLink to={`/${slug}`}>{desc}</NavLink>
		</Button>
	);
};

const ProjectData = [
	{
		id: 0,
		name: 'Idle Game',
		description:
			'Simple Idle game that I threw together in a few days and refined over the course of a few weeks. It has 2 upgrades and a Prestige system implemented, with plans to expand upgrades further in the future. The code is available on my GitHub.',
		link: linkGenerator('incremental', 'Idle Game'),
	},
];

const Projects: FC = () => {
	return (
		<>
			<div className="justify-self-center mt-5 p-5 font-mono border-2 w-fit">My Projects</div>
			<div className="justify-self-center mt-[-2px] p-5 font-mono border-2 w-fit">
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
										<Button size="icon" variant="ghost">
											{}
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
