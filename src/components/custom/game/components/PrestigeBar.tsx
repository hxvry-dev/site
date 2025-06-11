import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Progress } from '@/components/ui/progress';

export const PrestigeBar: FC = () => {
	const [gameState] = useAtom(gameStateAtom);
	const percentage: string = `${((gameState.resources.currencyBalance.main / gameState.prestige.prestigeCost) * 100).toFixed(2)}% of the way to Prestige # ${gameState.prestige.numTimesPrestiged + 1}`;
	return (
		<div>
			<div className="flex-row font-mono">
				<Progress value={(gameState.resources.currencyBalance.main / gameState.prestige.prestigeCost) * 100} />
				<div className="justify-self-center">{percentage}</div>
			</div>
		</div>
	);
};
