import { atomWithStorage } from 'jotai/utils';

import { PrestigeUpgrades, Upgrades } from './upgrades';

interface Resources {
	balance: number;
	buyPower: number;
	clickPower: number;
	addedClickPower: number;
	clickPowerMultiplier: number;
	perSecond: number;
}

export interface Upgrade {
	id: string;
	isBaseUpgrade: boolean;
	name: string;
	cost: number;
	costMult: number;
	clickPowerIncrease: number;
	clickPowerMultiplierIncrease: number;
	level: number;
	maxLevel: number;
	currencyPerSecond: number;
	firstPurchase: boolean;
	description: string;
	relatedUpgrades?: Record<string, Upgrade>;
}

interface Prestige {
	count: number;
	cost: number;
	prestigeCostMultiplier: number;
	points: number;
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
		balance: 0,
		buyPower: 1,
		clickPower: 1,
		addedClickPower: 0,
		clickPowerMultiplier: 1,
		perSecond: 0,
	},
	upgrades: {
		base: Upgrades,
		prestige: PrestigeUpgrades,
	},
	prestige: {
		count: 0,
		cost: 1e5,
		prestigeCostMultiplier: 500,
		points: 0,
	},
};

export const gameStateAtom = createGameState(initialGameState);
export const toggleAtom = atomWithStorage('upgradesOpen', true);
