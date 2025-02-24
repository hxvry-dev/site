import { Upgrade } from './v2AtomFactoryUpgrades';

export const Upgrades: Record<string, Upgrade> = {
	forceful_clicking: {
		id: 'forceful_clicking',
		type: 'base',
		name: 'Forceful Clicking',
		description: `Maybe if you click harder...`,
		cost: { current: 25, multiplier: 1.75 },
		level: {
			current: 0,
			max: 999,
		},
		stats: {
			currencyPerClickIncrease: 0.25,
			currencyPerClickMultiplierIncrease: 0,
			currencyPerSecondIncrease: 0,
		},
	},
	patience: {
		id: 'patience',
		type: 'base',
		name: 'Patience',
		description: `Just wait...`,
		cost: { current: 60, multiplier: 5.25 },
		level: {
			current: 0,
			max: 99,
		},
		stats: {
			currencyPerClickIncrease: 0,
			currencyPerClickMultiplierIncrease: 0,
			currencyPerSecondIncrease: 0.75,
		},
	},
};

export const PrestigeUpgrades: Record<string, Upgrade> = {
	better_keyboard: {
		id: 'better_keyboard',
		type: 'prestige',
		name: 'Better Keyboard',
		description: `You splurged and bought the newest mechanical keyboard you could find... Let's see if it helps!`,
		cost: { current: 100, multiplier: 5 },
		level: {
			current: 0,
			max: 5,
		},
		stats: {
			currencyPerClickIncrease: 5,
			currencyPerClickMultiplierIncrease: 0,
			currencyPerSecondIncrease: 0,
		},
	},
	accidental_mutation: {
		id: 'accidental_mutation',
		type: 'prestige',
		name: 'Accidental Mutation',
		description: `You woke up with a few extra fingers today...`,
		cost: { current: 200, multiplier: 5 },
		level: {
			current: 0,
			max: 5,
		},
		stats: {
			currencyPerClickIncrease: 0,
			currencyPerClickMultiplierIncrease: 2,
			currencyPerSecondIncrease: 0,
		},
	},
};
