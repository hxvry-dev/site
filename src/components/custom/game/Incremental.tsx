import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Incremental: FC = () => {
	return (
		<div className="justify-items-center">
			<p className="mt-16 p-5 code text-2xl">TODO: This page lol</p>
			<Button size="icon" variant="ghost" asChild>
				<Link to="/" className="font-mono">
					{'[HO]'}
				</Link>
			</Button>
		</div>
	);
};

export default Incremental;
