import { UpgradeV2 } from './v2AtomFactoryUpgrades';

export const UpgradesV2: Record<string, UpgradeV2> = {
	forceful_clicking: {
		id: 0,
		type: 'base',
		name: 'Forceful Clicking',
		description: `Maybe if you click harder...`,
		cost: { current: 25, multiplier: 1.75 },
		level: {
			current: 0,
			max: 999,
		},
		stats: {
			clickPowerIncrease: 0.25,
			clickPowerMultiplierIncrease: 0,
			currencyPerSecondIncrease: 0,
		},
	},
	patience: {
		id: 1,
		type: 'base',
		name: 'Patience',
		description: `Just wait...`,
		cost: { current: 60, multiplier: 5.25 },
		level: {
			current: 0,
			max: 99,
		},
		stats: {
			clickPowerIncrease: 0,
			clickPowerMultiplierIncrease: 0,
			currencyPerSecondIncrease: 0.75,
		},
	},
};

export const PrestigeUpgradesV2: Record<string, UpgradeV2> = {
	better_keyboard: {
		id: 0,
		type: 'prestige',
		name: 'Better Keyboard',
		description: `You splurged and bought the newest mechanical keyboard you could find... Let's see if it helps!`,
		cost: { current: 100, multiplier: 5 },
		level: {
			current: 0,
			max: 5,
		},
		stats: {
			clickPowerIncrease: 5,
			clickPowerMultiplierIncrease: 0,
			currencyPerSecondIncrease: 0,
		},
	},
	accidental_mutation: {
		id: 1,
		type: 'prestige',
		name: 'Accidental Mutation',
		description: `You woke up with a few extra fingers today...`,
		cost: { current: 200, multiplier: 5 },
		level: {
			current: 0,
			max: 5,
		},
		stats: {
			clickPowerIncrease: 0,
			clickPowerMultiplierIncrease: 2,
			currencyPerSecondIncrease: 0,
		},
	},
};
