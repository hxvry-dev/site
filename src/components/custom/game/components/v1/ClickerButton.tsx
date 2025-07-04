import { FC } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { gameStateAtom } from './util/atomFactory';

export const ClickerButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const clickValue: number = gameState.resources.currencyPerClick * gameState.resources.currencyPerClickMultiplier;
	const handleClick = () => {
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				currencyBalance: {
					...state.resources.currencyBalance,
					main:
						state.resources.currencyBalance.main +
						state.resources.currencyPerClick * state.resources.currencyPerClickMultiplier,
				},
			},
		}));
	};

	return (
		<Button onClick={handleClick} className="flex w-full font-mono px-2">
			Click me! (+{clickValue.toFixed(2)})
		</Button>
	);
};
