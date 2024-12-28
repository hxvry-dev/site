import { Box } from '@/components/custom/Box/box';
export default function Home() {
	return (
		<>
			<Box className="w-[650px] mt-64 font-mono justify-self-center p-5 border-2 rounded-xs">
				<h1>Hi, I&apos;m Henry!</h1>
				<br />
				<h2>
					I like to write code, talk about cars, and play video games in my free time. Welcome to my website.
				</h2>
				<br />
				<small className="text-stone-700">
					Click the <span className="code">[HO]</span> to go back home.
					<span className="text-stone-800"> Any time.</span>
				</small>
			</Box>
		</>
	);
}
