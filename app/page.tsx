import { Box } from '@/components/custom/Box/box';
import GithubRepoTable from '@/components/custom/GithubRepoTable/github-repo-table';
import Link from 'next/link';

interface Links {
	name: string;
	href: string;
	styles: string;
}

const links: Links[] = [
	{
		name: 'Github',
		href: 'https://www.github.com/hxvry-dev/',
		styles: 'place-self-center col-span-2',
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com/in/henry-ouellette-8a3b36201/',
		styles: 'place-self-center',
	},
	{
		name: 'Resume',
		href: '/resume',
		styles: 'place-self-center col-span-2',
	},
];

export default function Home() {
	return (
		<>
			<div className="grid grid-cols-5 gap-0">
				{links.map((link) => (
					<Box key={link.name} className={link.styles}>
						<Link href={link.href}>{link.name}</Link>
					</Box>
				))}
			</div>
			<GithubRepoTable />
			<br />
			<small>
				<p className="font-bold text-accent-foreground place-self-center">Please Pardon Our Dust</p>
				<p className="font-bold text-accent-foreground place-self-center">
					This site is under <span className="font-bold text-red-700">ACTIVE CONSTRUCTION</span>, and will
					change with future commits to the <span className="code">site</span> repository.
				</p>
			</small>
		</>
	);
}
