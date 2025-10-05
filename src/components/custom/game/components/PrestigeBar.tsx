import { useAtom } from 'jotai';
import { gameStateAtom } from './Incremental';
import { Progress } from '@/components/ui/progress';

export const PrestigeBar = () => {
	const [gameState] = useAtom(gameStateAtom);
	const percentage: string = `${((gameState.user.currency_balance / gameState.user.prestige_cost) * 100).toFixed(2)}% of the way to Prestige # ${gameState.user.num_times_prestiged + 1}`;
	return (
		<div className="font-mono">
			<Progress value={(gameState.user.currency_balance / gameState.user.prestige_cost) * 100} />
			<div className="justify-self-center">{percentage}</div>
		</div>
	);
};
