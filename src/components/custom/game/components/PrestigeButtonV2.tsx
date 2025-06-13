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
	const [gameStateV2, setGameState] = useAtom(gameStateV2Atom);

	const handlePrestige = () => {
		if (gameStateV2.user.prestige_points_balance >= 0 && handleNewPrestigePoints(gameStateV2) >= 1) {
			return setGameState((state) => {
				return {
					...state,
					user: {
						...initialState.user,
						currency_balance: 0,
						prestige_points_balance:
							gameStateV2.user.prestige_points_balance + handleNewPrestigePoints(gameStateV2),
						num_times_prestiged: gameStateV2.user.num_times_prestiged + 1,
						prestige_cost: gameStateV2.user.prestige_cost * gameStateV2.user.prestige_cost_mult,
						prestige_cost_mult: gameStateV2.user.prestige_cost_mult * 1.01,
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
			disabled={handleNewPrestigePoints(gameStateV2) <= 0}
			className="flex w-full font-mono"
		>
			Prestige?
		</Button>
	);
};
