import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Button } from '@/components/ui/button';

export const ClickerButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const clickValue: number = gameState.resources.clickPower * gameState.resources.clickPowerMultiplier;
	const handleClick = () => {
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				balance: state.resources.balance + state.resources.clickPower * state.resources.clickPowerMultiplier,
			},
		}));
	};
	return (
		<Button onClick={handleClick} size="default" className="w-full font-mono">
			Click me! (+{clickValue.toFixed(2)})
		</Button>
	);
};
