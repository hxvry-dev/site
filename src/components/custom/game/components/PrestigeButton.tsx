import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, initialGameState } from '../atomFactory';
import { newPrestigePoints } from '../util/util';

import { Button } from '@/components/ui/button';

export const PrestigeButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);

	const handlePrestige = () => {
		if (gameState.resources.currencyBalance.prestige >= 0 && newPrestigePoints(gameState) >= 1) {
			return setGameState((state) => ({
				...state,
				resources: {
					...initialGameState.resources,
					currencyBalance: {
						...initialGameState.resources.currencyBalance,
						prestige: gameState.resources.currencyBalance.prestige + newPrestigePoints(gameState),
					},
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
		<Button onClick={handlePrestige} disabled={newPrestigePoints(gameState) <= 0} className="flex w-full font-mono">
			Prestige?
		</Button>
	);
};
