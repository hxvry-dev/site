import { zUpgrade, GameState } from './schema';

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

export const newPrestigePoints = (gameState: GameState) => {
	return Math.floor(gameState.resources.currencyBalance.main / gameState.prestige.prestigeCost);
};
