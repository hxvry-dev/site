import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateV2Atom } from './IncrementalV2';
import { calculateLocalLevel } from '@/db/functions';
import { handleNewPrestigePoints } from './util/util';
import { GameStateV2 } from './util/v2-schema';

interface PrestigeButtonV2Props {
	initialState: GameStateV2;
}

interface Bonuses {
	cpc_inc: number;
	cpc_mult_inc: number;
	currency_per_second_inc: number;
}

export const PrestigeButtonV2: FC<PrestigeButtonV2Props> = ({ initialState }) => {
	const [gameStateV2, setGameState] = useAtom(gameStateV2Atom);

	const getBonuses = () => {
		let bonuses: Bonuses = { cpc_inc: 0, cpc_mult_inc: 0, currency_per_second_inc: 0 };
		gameStateV2.upgrades.forEach((u) => {
			if (u.upgrade_type === 'base') {
				const level_current = calculateLocalLevel(u, gameStateV2);
				bonuses = {
					cpc_inc: bonuses.cpc_inc + (u.cpc_inc >= 0 ? u.cpc_inc * level_current : 0),
					cpc_mult_inc: bonuses.cpc_mult_inc + (u.cpc_mult_inc >= 0 ? u.cpc_mult_inc * level_current : 0),
					currency_per_second_inc:
						bonuses.currency_per_second_inc +
						(u.currency_per_second_inc >= 0 ? u.currency_per_second_inc * level_current : 0),
				};
			}
			console.log(bonuses);
		});
		return bonuses;
	};

	const handlePrestige = () => {
		const bonuses: Bonuses = getBonuses();
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
						currency_per_click: gameStateV2.user.currency_per_click - bonuses.cpc_inc,
						currency_per_second: gameStateV2.user.currency_per_second - bonuses.currency_per_second_inc,
						currency_per_click_mult: gameStateV2.user.currency_per_click_mult - bonuses.cpc_mult_inc,
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
