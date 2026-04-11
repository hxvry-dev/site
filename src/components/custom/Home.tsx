import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Marquee } from '../marquee';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
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
			<div className="w-full py-5 font-incremental font-bold text-3xl bg-red-700">
				<Marquee speed={100} speedFactor={0.5} direction={1}>
					<p>
						ATTENTION RECRUITERS: I AM LOOKING FOR A NEW ROLE. PLEASE REACH OUT TO ME WITH ANY JOB
						OPPORTUNITIES VIA EMAIL AT <code>me@hxvry.com</code>. THANK YOU!
					</p>
				</Marquee>
			</div>
			<div className="mx-auto font-mono max-w-md mt-5">
				<div className="px-5 flex flex-row justify-between">
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
						<ul className="list-disc px-5">
							{aboutMe.facts.map((i) => (
								<li key={i.length}>{i}</li>
							))}
						</ul>
					</CardContent>
					<Separator />
					<CardFooter>
						<div className="flex flex-col gap-5">
							<strong className="text-center">
								Check the links out below to get a better idea of what I've been up to:
							</strong>
							<div className="grid grid-flow-col grid-rows-2 mx-auto">
								<Button asChild size={isMobile ? 'lg' : 'sm'} variant="outline" className="px-5 w-full">
									<NavLink to="/projects">Personal Projects + Games</NavLink>
								</Button>
								<ButtonGroup>
									<Button
										asChild
										size={isMobile ? 'lg' : 'sm'}
										variant="outline"
										className="px-5 min-w-fit"
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
										size={isMobile ? 'lg' : 'sm'}
										variant="outline"
										className="px-5 min-w-fit"
									>
										<NavLink to={'/resume'}>My Resume</NavLink>
									</Button>
									<Button
										asChild
										size={isMobile ? 'lg' : 'sm'}
										variant="outline"
										className="px-5 min-w-fit"
									>
										<NavLink to={'https://github.com/hxvry-dev'} target="_blank">
											My Github
										</NavLink>
									</Button>
								</ButtonGroup>
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
	);
};
