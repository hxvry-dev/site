import { calculateLocalLevel } from '@/db/functions';
import { GameState, GameStateV2, Upgrade, zUpgrade } from '../schema';

export const getCost = (upgrade: zUpgrade, gameState: GameState) => {
	let cost = upgrade.cost.current;
	const numUpgrades: number = gameState.resources.purchasePower;
	if (numUpgrades === 1 && upgrade.level.current > 0) {
		cost *= upgrade.cost.multiplier;
		return cost;
	} else {
		for (let i = 1; i < numUpgrades; i++) {
			cost *= upgrade.cost.multiplier;
		}
	}
	return cost;
};

export const getCostV2 = (upgrade: Upgrade, gameState: GameStateV2, purchasePower: number): number => {
	let cost = upgrade.cost;
	let current_level: number = calculateLocalLevel(upgrade, gameState);
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

export const newPrestigePoints = (gameState: GameState) => {
	return Math.floor(gameState.resources.currencyBalance.main / gameState.prestige.prestigeCost);
};

export const handleNewPrestigePoints = (gameState: GameStateV2) => {
	return Math.floor(gameState.user.currency_balance / gameState.user.prestige_cost);
};
