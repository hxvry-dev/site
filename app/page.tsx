import Box from '@/components/custom/Box/box';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
	return (
		<>
			<Box className="w-[650px] mt-64 justify-self-center p-5 border-2 rounded-xs">
				<h1>Hi, I&apos;m Henry!</h1>
				<br />
				<h2>
					I like to write code, talk about cars, and play video games in my free time. Welcome to my website.
				</h2>
				<br />
				<small className="text-stone-700 font-mono">
					Click the <span className="code">[HO]</span> to go back home.
					<span className="text-stone-800"> Any time.</span>
				</small>
			</Box>
			<h4 className="justify-self-center pt-5">Okay, now that we&apos;ve gotten that out of the way...</h4>
			<h4 className="justify-self-center pb-5">Check out these links!</h4>
			<div className="w-[650px] justify-self-center grid grid-cols-3 grid-rows-1 gap-5">
				<Button asChild size="sm" variant="ghost">
					<Link href="https://www.linkedin.com/in/henry-ouellette-8a3b36201/" target="_blank">
						My LinkedIn
					</Link>
				</Button>
				<Button asChild size="sm" variant="ghost">
					<Link href="/resume">My Resume</Link>
				</Button>
				<Button asChild size="sm" variant="ghost">
					<Link href="/">Link #1</Link>
				</Button>
			</div>
			<div className="pb-5" />
		</>
	);
}
