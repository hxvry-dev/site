import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, initialGameState } from '../atomFactory';

import { Button } from '@/components/ui/button';

export const PrestigeButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const newPrestigePoints = Math.floor(gameState.resources.balance / gameState.prestige.cost);

	const handlePrestige = () => {
		if (gameState.prestige.points >= 0 && newPrestigePoints >= 1) {
			return setGameState((state) => ({
				...state,
				resources: initialGameState.resources,
				upgrades: {
					...state.upgrades,
					base: initialGameState.upgrades.base,
				},
				prestige: {
					...state.prestige,
					count: gameState.prestige.count + 1,
					cost: gameState.prestige.cost * gameState.prestige.prestigeCostMultiplier,
					costMultiplier: gameState.prestige.prestigeCostMultiplier * 1.01,
					points: gameState.prestige.points + newPrestigePoints,
				},
			}));
		}
	};

	return (
		<Button onClick={handlePrestige} disabled={newPrestigePoints <= 0} className="w-full">
			Prestige?
		</Button>
	);
};
