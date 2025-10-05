import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { gameStateAtom } from './Incremental';
import { costFormatter } from './util/util';

export const ClickerButton = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const clickValue: number = gameState.user.currency_per_click * gameState.user.currency_per_click_mult;

	const handleClick = () => {
		setGameState((state) => {
			return {
				...state,
				user: {
					...state.user,
					currency_balance:
						state.user.currency_balance +
						state.user.currency_per_click * state.user.currency_per_click_mult,
				},
			};
		});
	};

	return (
		<div className="grid gap-0 font-mono">
			<Button onClick={handleClick} className="flex w-full px-2">
				Click Me! (+{costFormatter.format(clickValue)})
			</Button>
		</div>
	);
};
