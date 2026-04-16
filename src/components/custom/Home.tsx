import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { loginWithSpotify } from '../../lib/spotify-auth';
import { Marquee } from '../marquee';
import { Button } from '../ui/button';
import { ButtonGroup } from '../ui/button-group';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

import { ResumeDrawer } from './Resume';
import { SpotifyTopArtistsCard, TopTracksResponse } from './spotify-card';

import { useIsMobile } from '@/hooks/use-mobile';
import { useSpotify } from '@/hooks/use-spotify';
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
	const [isHovering, setIsHovering] = useState({ flower: false, banner: false });
	const isMobile = useIsMobile();

	const { data } = useSpotify<TopTracksResponse>('/me/top/tracks?limit=5');
	const code = sessionStorage.getItem('access_token');

	if (!data) return;

	return (
		<div className="flex flex-col">
			<div
				className="w-full py-5 font-incremental font-bold text-3xl bg-red-700"
				onMouseEnter={() => setIsHovering({ ...isHovering, banner: true })}
				onMouseLeave={() => setIsHovering({ ...isHovering, banner: false })}
			>
				<Marquee speed={75} speedFactor={isHovering.banner ? 0 : 0.5} direction={1} autoClone>
					<ResumeDrawer altButtonText="Click here to view my resume!" buttonStyles="text-3xl font-bold" />
					<p>
						Greetings, fellow Internet user! I am currently looking for a job! Check out some of the things
						I've worked on recently/am working on right now by visiting my
						<span>
							{' '}
							<NavLink to="/projects" className="underline">
								Projects
							</NavLink>{' '}
						</span>
						page!
					</p>
					<p>
						Check out my
						<span>
							{' '}
							<NavLink to="/resume" className="underline">
								Resume
							</NavLink>{' '}
						</span>
						for my professional experience/background.
					</p>
					<ResumeDrawer altButtonText="Click here to view my resume!" buttonStyles="text-3xl font-bold" />
				</Marquee>
			</div>
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
							<ul className="list-disc px-5">
								{aboutMe.facts.map((i) => (
									<li key={i.length} className="mb-5 last:mb-0">
										{i}
									</li>
								))}
							</ul>
						</CardContent>
						<Separator />
						<CardFooter>
							<div className="flex flex-col gap-5">
								<strong className="text-center">
									Check out the links below to get a better idea of what I've been up to:
								</strong>
								<div className="mx-auto">
									<Button
										asChild
										size={isMobile ? 'xl' : 'sm'}
										variant="outline"
										className="px-5 w-full"
									>
										<NavLink to="/projects">Personal Projects + Games</NavLink>
									</Button>
									<Button
										size={isMobile ? 'xl' : 'sm'}
										variant="outline"
										className="px-5 w-full"
										onClick={loginWithSpotify}
										disabled={code !== null}
									>
										{code !== null ? `You're Signed In!` : `View Your Spotify Stats (Req. Login)`}
									</Button>
									<ButtonGroup
										className={isMobile ? 'flex-col w-full mt-5 gap-5' : 'flex flex-row min-w-full'}
									>
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
									</ButtonGroup>
								</div>
							</div>
						</CardFooter>
					</Card>
					<div className="text-center">
						<small
							className="font-mono text-muted-foreground italic"
							onMouseEnter={() => setIsHovering({ ...isHovering, flower: true })}
							onMouseLeave={() => setIsHovering({ ...isHovering, flower: false })}
						>
							Made with &#9829; by me in the <strong>{isHovering.flower ? 'Flour' : 'Flower'}</strong>{' '}
							City
						</small>
					</div>
				</div>
			</div>
			<div className="w-full pt-5 flex flex-col gap-5 max-w-md mx-auto font-mono">
				{code ? <SpotifyTopArtistsCard data={data} /> : ''}
			</div>
		</div>
	);
};
