import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateV2Atom } from './IncrementalV2';

export const ClickerButtonV2: FC = () => {
	const [gameStateV2, setGameStateV2] = useAtom(gameStateV2Atom);
	const clickValueV2: number = gameStateV2.user.currency_per_click * gameStateV2.user.currency_per_click_mult;

	const handleClickV2 = () => {
		setGameStateV2((state) => {
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
		<Button onClick={handleClickV2} className="flex w-full font-mono">
			Click Me! (+{clickValueV2.toFixed(2)})
		</Button>
	);
};
