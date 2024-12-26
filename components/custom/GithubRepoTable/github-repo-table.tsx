'use client';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Repo {
	id: number;
	name: string;
	url: string | null;
	html_url: string | null;
	language: string | null;
}

const fetchGithubData = async (): Promise<Repo[]> => {
	const res = await fetch('https://api.github.com/users/hxvry-dev/repos');
	const data = await res.json();
	return data;
};

const TableStandalone: React.FC<{ repos: Repo[] }> = ({ repos }) => {
	return (
		<Table>
			<TableCaption>My public Github repositories</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Repo ID</TableHead>
					<TableHead>Repo Name</TableHead>
					<TableHead>Repo Language</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{repos.map((repo) => (
					<TableRow key={repo.id}>
						<TableCell className="font-mono bg-primary-foreground text-center hover:font-bold">
							{repo.id}
						</TableCell>
						<TableCell>
							<Link href={repo.html_url!}>{repo.name}</Link>
						</TableCell>
						<TableCell>
							<Badge variant={repo.language === 'TypeScript' ? 'typescript' : 'default'}>
								{repo.language}
							</Badge>
						</TableCell>
						<TableCell>
							<Link href={repo.url!}>Raw</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

const GithubRepoTable: React.FC = () => {
	const [repos, setRepos] = useState<Repo[]>([]);
	useEffect(() => {
		const getRepos = async () => {
			const data = await fetchGithubData();
			setRepos(data);
		};
		getRepos();
	}, []);
	return (
		<div>
			<h1>Github Repo Table</h1>
			<TableStandalone repos={repos} />
		</div>
	);
};

export default GithubRepoTable;
