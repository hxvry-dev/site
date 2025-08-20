import { calculateLocalLevel } from '@/db/functions';
import { Upgrade, GameStateV2 } from './v2-schema';

export const getCostV2 = (upgrade: Upgrade, gameStateV2: GameStateV2, purchasePower: number): number => {
	const currentLevel = calculateLocalLevel(upgrade, gameStateV2);

	let totalCost = 0;
	let baseCost = upgrade.cost;

	// Calculate base cost at current level
	for (let i = 0; i < currentLevel; i++) {
		baseCost *= upgrade.cost_mult;
	}

	// Calculate cost for each additional level we want to purchase
	for (let i = 0; i < purchasePower; i++) {
		totalCost += baseCost;
		baseCost *= upgrade.cost_mult;
	}

	return totalCost;
};

export const handleNewPrestigePoints = (gameStateV2: GameStateV2) => {
	return Math.floor(gameStateV2.user.currency_balance / gameStateV2.user.prestige_cost);
};

export const costFormatter = new Intl.NumberFormat('en-US');
