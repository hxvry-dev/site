import { Button } from '@/components/ui/button';
import { ArrowBigRightDash } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
	const [isHovering, setIsHovering] = useState(false);
	const [isHoveringIncremental, setIsHoveringIncremental] = useState(false);

	return (
		<div className="justify-items-center font-mono">
			<div className="w-[650px] mt-64 p-5 border-2 rounded-xs">
				<h1>Hi, I&apos;m Henry!</h1>
				<br />
				<h2>
					I like to write code, talk about cars, doom scroll social media, and play video games in my free
					time. Welcome to my website.
				</h2>
				<br />
			</div>
			<h4 className="pt-5">Okay, now that we&apos;ve gotten that out of the way...</h4>
			<h4 className="pb-5">Check out these links!</h4>
			<div className="w-[650px] grid grid-cols-4 grid-rows-2 gap-5">
				<Button asChild size="sm" variant="ghost">
					<NavLink to="https://www.linkedin.com/in/henry-ouellette-8a3b36201/" target="_blank">
						My LinkedIn
					</NavLink>
				</Button>
				<Button asChild size="sm" variant="ghost">
					<NavLink to="/resume">My Resume</NavLink>
				</Button>
				<Button asChild size="sm" variant="ghost">
					<NavLink to="https://github.com/hxvry-dev" target="_blank">
						My Github
					</NavLink>
				</Button>
				<Button asChild size="sm" variant="ghost">
					<NavLink to="https://bsky.app/profile/hxvry.com" target="_blank">
						Bluesky
					</NavLink>
				</Button>
				<Button asChild size="sm" variant="ghost" className="col-span-4">
					<NavLink to="/incremental">
						<span
							onMouseEnter={() => setIsHoveringIncremental(true)}
							onMouseLeave={() => setIsHoveringIncremental(false)}
						>
							{isHoveringIncremental
								? `I'm building a simple Incremental game! Check it out here `
								: `Take a peek at what I'm building next `}
						</span>
						<ArrowBigRightDash />
					</NavLink>
				</Button>
			</div>
			<div className="pt-5">
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
