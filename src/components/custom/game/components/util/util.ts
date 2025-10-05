import { calculateLocalLevel } from '@/db/functions';
import { Upgrade, GameState } from './schema';

export const getCost = (upgrade: Upgrade, gameState: GameState, purchasePower: number): number => {
	const currentLevel = calculateLocalLevel(upgrade, gameState);

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

export const handleNewPrestigePoints = (gameState: GameState) => {
	return Math.floor(gameState.user.currency_balance / gameState.user.prestige_cost);
};

export const costFormatter = new Intl.NumberFormat('en-US');
