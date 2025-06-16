import { calculateLocalLevel } from '@/db/functions';
import { Upgrade, GameStateV2 } from './v2-schema';

export const getCostV2 = (upgrade: Upgrade, gameStateV2: GameStateV2, purchasePower: number): number => {
	let cost = upgrade.cost;
	let current_level: number = calculateLocalLevel(upgrade, gameStateV2);
	if (current_level === 0 && purchasePower === 1) {
		return cost;
	} else {
		for (let i = 0; i < current_level; i++) {
			cost *= upgrade.cost_mult;
		}
		cost = cost * purchasePower;
	}
	return cost;
};
export const handleNewPrestigePoints = (gameStateV2: GameStateV2) => {
	return Math.floor(gameStateV2.user.currency_balance / gameStateV2.user.prestige_cost);
};
