import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Home = () => {
	const [isHovering, setIsHovering] = useState(false);
	const isMobile = useIsMobile();

	return (
		<div className="grid mx-auto w-fit font-mono">
			<div className={isMobile ? 'mt-32 p-5 min-w-fit max-w-[600px]' : 'mt-64 p-5 min-w-fit max-w-[600px]'}>
				<h1 className="grid mx-auto">Hi, I&apos;m Henry. Welcome to my website.</h1>
				<br />
				<h2>I like to write code, talk about cars, and play video games in my free time.</h2>
			</div>
			<Button asChild size="sm" variant={isMobile ? 'outline' : 'ghost'} className="grid mx-auto max-w-fit px-5">
				<NavLink to="/projects">Personal Projects + Games</NavLink>
			</Button>
			<small className="mx-auto text-stone-700 italic">
				Made with &#9829; by me in the{' '}
				<span onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
					{isHovering ? 'Flour' : 'Flower'}
				</span>{' '}
				City
			</small>
		</div>
	);
};

export default Home;
