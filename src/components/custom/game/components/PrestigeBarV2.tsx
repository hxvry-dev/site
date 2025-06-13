import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateV2Atom } from './IncrementalV2';
import { Progress } from '@/components/ui/progress';

export const PrestigeBarV2: FC = () => {
	const [gameStateV2] = useAtom(gameStateV2Atom);
	const percentage: string = `${((gameStateV2.user.currency_balance / gameStateV2.user.prestige_cost) * 100).toFixed(2)}% of the way to Prestige # ${gameStateV2.user.num_times_prestiged + 1}`;
	return (
		<div>
			<div className="flex-row font-mono">
				<Progress value={(gameStateV2.user.currency_balance / gameStateV2.user.prestige_cost) * 100} />
				<div className="justify-self-center">{percentage}</div>
			</div>
		</div>
	);
};
