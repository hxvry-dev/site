import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, gameStateV2Atom, initialGameState } from '../atomFactory';
import { handleNewPrestigePoints, newPrestigePoints } from '../util/util';

import { Button } from '@/components/ui/button';
import { GameStateV2 } from '../schema';

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

// V2 Here

interface PrestigeButtonV2Props {
	initialState: GameStateV2;
}

export const PrestigeButtonV2: FC<PrestigeButtonV2Props> = ({ initialState }) => {
	const [gameState, setGameState] = useAtom(gameStateV2Atom);

	const handlePrestige = () => {
		if (gameState.user.prestige_points_balance >= 0 && handleNewPrestigePoints(gameState) >= 1) {
			return setGameState((state) => {
				return {
					...state,
					user: {
						...initialState.user,
						prestige_points_balance:
							gameState.user.prestige_points_balance + handleNewPrestigePoints(gameState),
						num_times_prestiged: gameState.user.num_times_prestiged + 1,
						prestige_cost: gameState.user.prestige_cost * gameState.user.prestige_cost_mult,
						prestige_cost_mult: gameState.user.prestige_cost_mult * 1.01,
					},
					upgrades: initialState.upgrades,
					userUpgrades: initialState.userUpgrades,
				};
			});
		}
	};

	return (
		<Button
			onClick={handlePrestige}
			disabled={handleNewPrestigePoints(gameState) <= 0}
			className="flex w-full font-mono"
		>
			Prestige?
		</Button>
	);
};
