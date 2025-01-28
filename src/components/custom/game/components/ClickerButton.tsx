import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Button } from '@/components/ui/button';

export const ClickerButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const handleClick = () => {
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				amount: state.resources.amount + state.resources.clickPower,
			},
		}));
	};
	return (
		<Button onClick={handleClick} size="default" className="w-full">
			Click me! (+{gameState.resources.clickPower.toFixed(0)})
		</Button>
	);
};
