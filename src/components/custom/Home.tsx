import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Home = () => {
	const [isHovering, setIsHovering] = useState(false);
	const isMobile = useIsMobile();

	return (
		<div className="justify-items-center font-mono">
			<div
				className={
					isMobile
						? 'mt-32 p-5 border-2 rounded-xs max-w-[650px]'
						: 'mt-64 p-5 border-2 rounded-xs max-w-[650px]'
				}
			>
				<h1>Hi, I&apos;m Henry!</h1>
				<br />
				<h2>
					I like to write code, talk about cars, doom scroll social media, and play video games in my free
					time. Welcome to my website.
				</h2>
			</div>
			<h4 className="pt-5 pb-5 pl-5 pr-5 justify-self-center">
				Okay, now that we&apos;ve gotten that out of the way...
			</h4>
			<h4 className="pb-5 pl-5 pr-5 justify-self-center">Check out these links!</h4>
			<div className={isMobile ? 'grid grid-cols-1 grid-rows-5 gap-5' : 'grid grid-cols-4 grid-rows-2 gap-5'}>
				<Button asChild size="sm" variant={isMobile ? 'outline' : 'ghost'}>
					<NavLink to="https://www.linkedin.com/in/henry-ouellette-8a3b36201/" target="_blank">
						My LinkedIn
					</NavLink>
				</Button>
				<Button asChild size="sm" variant={isMobile ? 'outline' : 'ghost'}>
					<NavLink to="/resume">My Resume</NavLink>
				</Button>
				<Button asChild size="sm" variant={isMobile ? 'outline' : 'ghost'}>
					<NavLink to="https://github.com/hxvry-dev" target="_blank">
						My Github
					</NavLink>
				</Button>
				<Button asChild size="sm" variant={isMobile ? 'outline' : 'ghost'}>
					<NavLink to="https://bsky.app/profile/hxvry.com" target="_blank">
						My Bluesky
					</NavLink>
				</Button>
				<Button
					asChild
					size="sm"
					variant={isMobile ? 'outline' : 'ghost'}
					className={isMobile ? '' : 'col-span-4'}
				>
					<NavLink to="/projects">Projects</NavLink>
				</Button>
			</div>
			<div className="pt-5 justify-self-center">
				<small className="text-stone-700 italic">
					Made with &#9829; by me, in the{' '}
					<span onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
						{isHovering ? 'Flour' : 'Flower'}
					</span>{' '}
					City
				</small>
			</div>
		</div>
	);
};

export default Home;
