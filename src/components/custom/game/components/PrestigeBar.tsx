import { Progress } from '@/components/ui/progress';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

export const PrestigeBar: FC = () => {
	const [gameState] = useAtom(gameStateAtom);
	const percentage: string = `${((gameState.resources.currencyBalance / gameState.prestige.prestigeCost) * 100).toFixed(2)}% of the way to Prestige # ${gameState.prestige.numTimesPrestiged + 1}`;
	return (
		<div>
			<div className="font-mono">
				<Progress value={(gameState.resources.currencyBalance / gameState.prestige.prestigeCost) * 100} />
				<div className="justify-self-center">{percentage}</div>
			</div>
		</div>
	);
};
