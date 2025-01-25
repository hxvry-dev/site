import { atomWithStorage } from 'jotai/utils';

interface ResourceAtom {
	amount: number;
	clickPower: number;
	perSecond: number;
}

interface Upgrade {
	cost: number;
	effect: number;
	level: number;
	maxLevel: number;
	currencyPerSecond: number;
	firstPurchase: boolean;
}

interface GameState {
	resources: ResourceAtom;
	upgrades: Record<string, Upgrade>;
	defaultUpgrades: Record<string, Upgrade>;
	prestigePoints: number;
}

const createGameState = (initialState: GameState) => {
	return atomWithStorage<GameState>('gameState', initialState);
};

export const initialGameState: GameState = {
	resources: { amount: 0, clickPower: 1, perSecond: 0 },
	upgrades: {
		upgrade1: { cost: 10, effect: 1, level: 1, maxLevel: 99, currencyPerSecond: 0, firstPurchase: false },
		upgrade2: { cost: 25, effect: 2, level: 1, maxLevel: 99, currencyPerSecond: 2.5, firstPurchase: false },
		upgrade3: { cost: 50, effect: 5, level: 1, maxLevel: 99, currencyPerSecond: 5, firstPurchase: false },
	},
	defaultUpgrades: {
		upgrade1: { cost: 10, effect: 1, level: 1, maxLevel: 99, currencyPerSecond: 0, firstPurchase: false },
		upgrade2: { cost: 25, effect: 2, level: 1, maxLevel: 99, currencyPerSecond: 2.5, firstPurchase: false },
		upgrade3: { cost: 50, effect: 5, level: 1, maxLevel: 99, currencyPerSecond: 5, firstPurchase: false },
	},
	prestigePoints: 0,
};

export const gameStateAtom = createGameState(initialGameState);
