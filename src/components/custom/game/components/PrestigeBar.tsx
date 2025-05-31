import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Progress } from '@/components/ui/progress';
import { gameStateV2Atom } from './IncrementalV2';

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

// V2 Here

export const PrestigeBarV2: FC = () => {
	const [gameState] = useAtom(gameStateV2Atom);
	const percentage: string = `${((gameState.user.currency_balance / gameState.user.prestige_cost) * 100).toFixed(2)}% of the way to Prestige # ${gameState.user.num_times_prestiged + 1}`;
	return (
		<div>
			<div className="flex-row font-mono">
				<Progress value={(gameState.user.currency_balance / gameState.user.prestige_cost) * 100} />
				<div className="justify-self-center">{percentage}</div>
			</div>
		</div>
	);
};
