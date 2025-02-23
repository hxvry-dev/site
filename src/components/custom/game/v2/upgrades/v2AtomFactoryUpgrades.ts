import { atomWithStorage } from 'jotai/utils';
import { UpgradesV2, PrestigeUpgradesV2 } from './upgradesV2';

export type UpgradeTypes = 'base' | 'prestige';

interface ResourcesV2 {
	currencyBalance: number;
	purchasePower: number;
	currencyPerClick: number;
	currencyPerClickMultiplier: number;
	currencyPerSecond: number;
}

interface PrestigeV2 {
	numTimesPrestiged: number;
	prestigeCost: number;
	prestigeCostMultiplier: number;
	prestigePointsBalance: number;
}

export interface UpgradeV2 {
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

export interface GameStateV2 {
	resources: ResourcesV2;
	upgrades: { base: Record<string, UpgradeV2>; prestige: Record<string, UpgradeV2> };
	prestige: PrestigeV2;
}

const createGameStateV2 = (initialState: GameStateV2) => {
	return atomWithStorage<GameStateV2>('gameState', initialState);
};

export const initialGameStateV2: GameStateV2 = {
	resources: {
		currencyBalance: 0,
		purchasePower: 1,
		currencyPerClick: 1,
		currencyPerClickMultiplier: 1,
		currencyPerSecond: 0,
	},
	upgrades: {
		base: UpgradesV2,
		prestige: PrestigeUpgradesV2,
	},
	prestige: {
		numTimesPrestiged: 0,
		prestigeCost: 1e5,
		prestigeCostMultiplier: 500,
		prestigePointsBalance: 0,
	},
};

export const gameStateAtomV2 = createGameStateV2(initialGameStateV2);
