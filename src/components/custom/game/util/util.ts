import { Upgrade, GameState } from '../atomFactory';

export const getCost = (upgrade: Upgrade, gameState: GameState) => {
	let cost = upgrade.cost;
	const numUpgrades: number = gameState.resources.buyPower;
	if (numUpgrades === 1 && upgrade.firstPurchase) {
		cost *= upgrade.costMult;
		return cost;
	} else {
		for (let i = 1; i < numUpgrades; i++) {
			cost *= upgrade.costMult;
		}
	}
	return cost;
};
