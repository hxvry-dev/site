import GithubRepoTable from '@/components/custom/GithubRepoTable/github-repo-table';

export default function Home() {
	return (
		<>
			<h1 className="font-bold text-accent-foreground">Please Pardon Our Dust</h1>
			<h2>
				This site is under <span className="font-bold text-red-700">ACTIVE CONSTRUCTION</span>, and will change
				with future commits to the <span className="code">site</span> repository.
			</h2>
			<br />
			<p>Home Page</p>
			<br />
			<GithubRepoTable />
		</>
	);
}
