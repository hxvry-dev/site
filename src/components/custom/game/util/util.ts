import { calculateLocalLevel } from '@/db/functions';
import { GameState, GameStateV2, Upgrade, zUpgrade } from '../schema';

export const getCost = (upgrade: zUpgrade, gameStateV2: GameState) => {
	let cost = upgrade.cost.current;
	const numUpgrades: number = gameStateV2.resources.purchasePower;
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

export const newPrestigePoints = (gameStateV2: GameState) => {
	return Math.floor(gameStateV2.resources.currencyBalance.main / gameStateV2.prestige.prestigeCost);
};

export const handleNewPrestigePoints = (gameStateV2: GameStateV2) => {
	return Math.floor(gameStateV2.user.currency_balance / gameStateV2.user.prestige_cost);
};
