import { Upgrade } from './atomFactory';

export const Upgrades: Record<string, Upgrade> = {
	forceful_clicking: {
		name: `Forceful Clicking`,
		description: `Maybe if you click harder...`,
		cost: 10,
		costMult: 1.75,
		clickPowerIncrease: 0.25,
		clickPowerMult: 1,
		level: 0,
		maxLevel: 999,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
	forceful_clicking_ii: {
		name: `Forceful Clicking II`,
		description: `Maybe if you click even harder...`,
		cost: 25,
		costMult: 2.25,
		clickPowerIncrease: 0.35,
		clickPowerMult: 1,
		level: 0,
		maxLevel: 99,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
	forceful_clicking_iii: {
		name: `Forceful Clicking III`,
		description: `Maybe if you click EVEN harder...`,
		cost: 50,
		costMult: 5.25,
		clickPowerIncrease: 0.55,
		clickPowerMult: 1,
		level: 0,
		maxLevel: 99,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
	patience: {
		name: `Patience`,
		description: `
		They say a watched pot never boils... Well, maybe if you buy this upgrade and stare at the screen for long enough, something will happen.
		`,
		cost: 50,
		costMult: 5.25,
		clickPowerIncrease: 0,
		clickPowerMult: 1,
		level: 0,
		maxLevel: 99,
		currencyPerSecond: 0.125,
		firstPurchase: false,
	},
	patience_ii: {
		name: `Patience II`,
		description: `
		They say a watched pot never boils... Well, maybe if you buy this upgrade and stare at the screen for just a little longer, something will happen.
		`,
		cost: 75,
		costMult: 5.25,
		clickPowerIncrease: 0,
		clickPowerMult: 1,
		level: 0,
		maxLevel: 99,
		currencyPerSecond: 0.25,
		firstPurchase: false,
	},
	patience_iii: {
		name: `Patience III`,
		description: `
		They say a watched pot never boils... Well, maybe if you buy this upgrade and stare at the screen for just a tiny bit longer, something will happen.
		`,
		cost: 50,
		costMult: 5.25,
		clickPowerIncrease: 0,
		clickPowerMult: 1,
		level: 0,
		maxLevel: 99,
		currencyPerSecond: 0.5,
		firstPurchase: false,
	},
};

export const PrestigeUpgrades = {
	accidental_mutation: {
		name: 'Accidental Mutation',
		description: `You woke up with a few extra fingers today...`,
		cost: 1,
		costMult: 7.5,
		clickPowerIncrease: 0,
		clickPowerMult: 2,
		level: 0,
		maxLevel: 5,
		currencyPerSecond: 0,
		firstPurchase: false,
	},
};
