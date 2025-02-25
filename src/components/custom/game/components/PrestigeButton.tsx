import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, initialGameState } from '../atomFactory';

import { Button } from '@/components/ui/button';

export const PrestigeButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const newPrestigePoints = Math.floor(gameState.resources.currencyBalance / gameState.prestige.prestigeCost);

	const handlePrestige = () => {
		if (gameState.resources.prestigePointsBalance >= 0 && newPrestigePoints >= 1) {
			return setGameState((state) => ({
				...state,
				resources: {
					...initialGameState.resources,
					prestigePointsBalance: gameState.resources.prestigePointsBalance + newPrestigePoints,
				},
				upgrades: {
					...state.upgrades,
					base: initialGameState.upgrades.base,
				},
				prestige: {
					...state.prestige,
					numTimesPrestiged: gameState.prestige.numTimesPrestiged + 1,
					prestigeCost: gameState.prestige.prestigeCost * gameState.prestige.prestigeCostMultiplier,
					prestigeCostMultiplier: gameState.prestige.prestigeCostMultiplier * 1.01,
				},
			}));
		}
	};

	return (
		<Button onClick={handlePrestige} disabled={newPrestigePoints <= 0} className="w-full font-mono">
			Prestige?
		</Button>
	);
};
