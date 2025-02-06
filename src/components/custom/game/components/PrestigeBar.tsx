import { Progress } from '@/components/ui/progress';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

export const PrestigeBar: FC = () => {
	const [gameState] = useAtom(gameStateAtom);
	const percentage: string = `${((gameState.resources.balance / gameState.prestige.cost) * 100).toFixed(2)}% of the way to Prestige # ${gameState.prestige.count + 1}`;
	return (
		<div>
			<div>
				<Progress value={(gameState.resources.balance / gameState.prestige.cost) * 100} />
				<div className="justify-self-center">{percentage}</div>
			</div>
		</div>
	);
};
