import { Upgrade, GameState } from '../atomFactory';
import { GameStateV2, UpgradeV2 } from '../v2/upgrades/v2AtomFactoryUpgrades';

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

export const getCostV2 = (upgrade: UpgradeV2, gameState: GameStateV2) => {
	let cost = upgrade.cost.current;
	const numUpgrades: number = gameState.resources.purchasePower;
	if (numUpgrades === 1 && upgrade.level.current > 1) {
		cost *= upgrade.cost.multiplier;
		return cost;
	} else {
		for (let i = 1; i < numUpgrades; i++) {
			cost *= upgrade.cost.multiplier;
		}
	}
	return cost;
};
