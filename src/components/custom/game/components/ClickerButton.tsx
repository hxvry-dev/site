import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Button } from '@/components/ui/button';

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
		<Button onClick={handleClick} size="default" className="w-full font-mono">
			Click me! (+{clickValue.toFixed(2)})
		</Button>
	);
};
