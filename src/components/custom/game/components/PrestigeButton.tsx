import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { gameStateAtom } from './Incremental';
import { calculateLocalLevel } from '@/db/functions';
import { handleNewPrestigePoints } from './util/util';
import { GameState } from './util/schema';

interface PrestigeButtonProps {
	initialState: GameState;
}

interface Bonuses {
	cpc_inc: number;
	cpc_mult_inc: number;
	currency_per_second_inc: number;
}

export const PrestigeButton = ({ initialState }: PrestigeButtonProps) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);

	const getBonuses = () => {
		let bonuses: Bonuses = { cpc_inc: 0, cpc_mult_inc: 0, currency_per_second_inc: 0 };
		gameState.upgrades.forEach((u) => {
			if (u.upgrade_type === 'base') {
				const level_current = calculateLocalLevel(u, gameState);
				bonuses = {
					cpc_inc: bonuses.cpc_inc + (u.cpc_inc >= 0 ? u.cpc_inc * level_current : 0),
					cpc_mult_inc: bonuses.cpc_mult_inc + (u.cpc_mult_inc >= 0 ? u.cpc_mult_inc * level_current : 0),
					currency_per_second_inc:
						bonuses.currency_per_second_inc +
						(u.currency_per_second_inc >= 0 ? u.currency_per_second_inc * level_current : 0),
				};
			}
		});
		return bonuses;
	};

	const handlePrestige = () => {
		const bonuses: Bonuses = getBonuses();
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
						currency_per_click: gameState.user.currency_per_click - bonuses.cpc_inc,
						currency_per_second: gameState.user.currency_per_second - bonuses.currency_per_second_inc,
						currency_per_click_mult: gameState.user.currency_per_click_mult - bonuses.cpc_mult_inc,
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
