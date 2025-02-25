import { atomWithStorage } from 'jotai/utils';

import { PrestigeUpgrades, Upgrades } from './upgrades';
export type UpgradeTypes = 'base' | 'prestige';

interface Resources {
	currencyBalance: number;
	prestigePointsBalance: number;
	purchasePower: number;
	currencyPerClick: number;
	currencyPerClickMultiplier: number;
	currencyPerSecond: number;
}

interface Prestige {
	numTimesPrestiged: number;
	prestigeCost: number;
	prestigeCostMultiplier: number;
}

export interface Upgrade {
	id: string;
	type: UpgradeTypes;
	name: string;
	description: string;
	cost: {
		current: number;
		multiplier: number;
	};
	level: {
		current: number;
		max: number;
	};
	stats: {
		currencyPerClickIncrease: number;
		currencyPerClickMultiplierIncrease: number;
		currencyPerSecondIncrease: number;
	};
}

export interface GameState {
	resources: Resources;
	upgrades: { base: Record<string, Upgrade>; prestige: Record<string, Upgrade> };
	prestige: Prestige;
}

const createGameState = (initialState: GameState) => {
	return atomWithStorage<GameState>('gameState', initialState);
};

export const initialGameState: GameState = {
	resources: {
		currencyBalance: 0,
		prestigePointsBalance: 0,
		purchasePower: 1,
		currencyPerClick: 1,
		currencyPerClickMultiplier: 1,
		currencyPerSecond: 0,
	},
	upgrades: {
		base: Upgrades,
		prestige: PrestigeUpgrades,
	},
	prestige: {
		numTimesPrestiged: 0,
		prestigeCost: 1e5,
		prestigeCostMultiplier: 500,
	},
};

export const gameStateAtom = createGameState(initialGameState);
export const toggleAtom = atomWithStorage('upgradesOpen', true);
