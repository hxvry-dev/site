import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

import { useIsMobile } from '@/hooks/use-mobile';

interface AboutMeProps {
	facts: string[];
}

const aboutMe: AboutMeProps = {
	facts: [
		`I'm a passionate software developer located in the heart of Monroe County, New York.`,
		`I have extensive experience in the Customer Service and Information Technology spaces, and like to think of myself as a self-starting, achievement-based over-achiever.`,
		`I thrive in dynamic and fast-paced work environments where precision and expertise are expected.`,
	],
};

export const Home = () => {
	const [isHovering, setIsHovering] = useState(false);
	const isMobile = useIsMobile();

	return (
		<div className="flex flex-col">
			<div className="px-5">
				<div className={isMobile ? 'flex flex-col mx-auto font-mono' : 'max-w-md mx-auto font-mono'}>
					<div
						className={
							isMobile ? 'flex flex-col items-center mt-5' : 'flex flex-row justify-between mt-5 px-5'
						}
					>
						<p>Hi - I'm Henry!</p>
						<p>Welcome to my website.</p>
					</div>
					<Separator className="my-5" />
					<Card>
						<CardHeader>
							<CardTitle>
								<p>
									A <small>little</small> <b>About Me</b>:
								</p>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc list-inside">
								{aboutMe.facts.map((i) => (
									<li key={i.length} className="mb-5 last:mb-0">
										{i}
									</li>
								))}
							</ul>
						</CardContent>
						<Separator />
						<CardFooter className="flex flex-col space-y-5">
							<strong className="text-center">
								Check out the links below to get a better idea of what I've been up to:
							</strong>
							<div className={isMobile ? 'flex-col space-y-5' : 'mx-auto'}>
								<Button asChild size={isMobile ? 'xl' : 'sm'} variant="outline" className="px-5 w-full">
									<NavLink to="/projects">Personal Projects + Games</NavLink>
								</Button>
								<div className={isMobile ? 'flex flex-col space-y-5 mx-auto w-full' : 'flex flex-row'}>
									<Button
										asChild
										size={isMobile ? 'xl' : 'sm'}
										variant="outline"
										className="px-5 grow"
									>
										<NavLink
											to={'https://www.linkedin.com/in/henry-ouellette-8a3b36201/'}
											target="_blank"
										>
											My LinkedIn
										</NavLink>
									</Button>
									<Button
										asChild
										size={isMobile ? 'xl' : 'sm'}
										variant="outline"
										className="px-5 grow"
									>
										<NavLink to={'/resume'}>My Resume</NavLink>
									</Button>
									<Button
										asChild
										size={isMobile ? 'xl' : 'sm'}
										variant="outline"
										className="px-5 grow"
									>
										<NavLink to={'https://github.com/hxvry-dev'} target="_blank">
											My Github
										</NavLink>
									</Button>
								</div>
							</div>
						</CardFooter>
					</Card>
					<div className="text-center">
						<small
							className="font-mono text-muted-foreground italic"
							onMouseEnter={() => setIsHovering(true)}
							onMouseLeave={() => setIsHovering(false)}
						>
							Made with &#9829; by me in the <strong>{isHovering ? 'Flour' : 'Flower'}</strong> City
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};
