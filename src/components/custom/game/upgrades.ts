import { Upgrade } from './atomFactory';

export const Upgrades: Record<string, Upgrade> = {
	forceful_clicking: {
		id: 'forceful_clicking',
		name: `Forceful Clicking`,
		description: `Maybe if you click harder...`,
		cost: 25,
		costMult: 1.75,
		clickPowerIncrease: 0.25,
		clickPowerMultiplierIncrease: 0,
		level: 0,
		maxLevel: 999,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
	patience: {
		id: 'patience',
		name: `Patience`,
		description: `Just wait...`,
		cost: 60,
		costMult: 5.25,
		clickPowerIncrease: 0,
		clickPowerMultiplierIncrease: 0,
		level: 0,
		maxLevel: 99,
		currencyPerSecond: 0.125,
		firstPurchase: false,
	},
};

export const PrestigeUpgrades: Record<string, Upgrade> = {
	better_keyboard: {
		id: 'better_keyboard',
		name: 'Better Keyboard',
		description: `You splurged and bought the newest mechanical keyboard you could find... Let's see if it helps!`,
		cost: 100,
		costMult: 5,
		clickPowerIncrease: 5,
		clickPowerMultiplierIncrease: 0,
		level: 0,
		maxLevel: 5,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
	accidental_mutation: {
		id: 'accidental_mutation',
		name: 'Accidental Mutation',
		description: `You woke up with a few extra fingers today...`,
		cost: 200,
		costMult: 5,
		clickPowerIncrease: 0,
		clickPowerMultiplierIncrease: 2,
		level: 0,
		maxLevel: 5,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
};
