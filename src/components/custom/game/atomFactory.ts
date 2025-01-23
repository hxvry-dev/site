import { atomWithStorage } from 'jotai/utils';

interface ResourceAtom {
	amount: number;
	perSecond: number;
}

interface Upgrade {
	cost: number;
	effect: number;
	level: number;
	maxLevel: number;
	purchased: boolean;
}

interface GameState {
	resources: ResourceAtom;
	upgrades: Record<string, Upgrade>;
}

const createGameState = (initialState: GameState) => {
	return atomWithStorage<GameState>('gameState', initialState);
};

export const initialGameState: GameState = {
	resources: { amount: 0, perSecond: 0 },
	upgrades: {
		upgrade1: { cost: 10, effect: 1, level: 1, maxLevel: 99, purchased: false },
		upgrade2: { cost: 25, effect: 2, level: 1, maxLevel: 99, purchased: false },
		upgrade3: { cost: 50, effect: 2, level: 1, maxLevel: 99, purchased: false },
	},
};

export const gameStateAtom = createGameState(initialGameState);
