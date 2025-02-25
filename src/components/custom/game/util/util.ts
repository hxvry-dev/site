import { Upgrade, GameState } from '../atomFactory';

export const getCost = (upgrade: Upgrade, gameState: GameState) => {
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
