import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { GameStateV2 } from '../schema';
import { handleNewPrestigePoints } from '../util/util';
import { gameStateV2Atom } from './IncrementalV2';

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
						currency_balance: 0,
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
