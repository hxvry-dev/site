import { Progress } from '@radix-ui/react-progress';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateV2Atom } from './IncrementalV2';

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
