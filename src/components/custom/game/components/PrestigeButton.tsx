import { useAtom } from 'jotai';

import { gameStateAtom, initialGameState } from '../atomFactory';

import { Button } from '@/components/ui/button';
import { FC } from 'react';

const PrestigeButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const newPrestigePoints = Math.floor(gameState.resources.amount / gameState.prestige.cost);

	const handlePrestige = () => {
		if (gameState.prestige.points >= 0 && newPrestigePoints >= 1) {
			return setGameState((state) => ({
				...state,
				resources: initialGameState.resources,
				upgrades: initialGameState.upgrades,
				prestige: {
					...state.prestige,
					count: gameState.prestige.count + 1,
					cost: gameState.prestige.cost * gameState.prestige.costMultiplier,
					costMultiplier: gameState.prestige.costMultiplier * 1.01,
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

export default PrestigeButton;
