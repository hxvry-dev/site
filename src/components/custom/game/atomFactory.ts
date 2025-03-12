import { atomWithStorage, createJSONStorage, unstable_withStorageValidator as withStorageValidator } from 'jotai/utils';

import { PrestigeUpgrades, Upgrades } from './upgrades';
import { GameState, zGameStateSchema } from './schema';
import { atom } from 'jotai';

const isGameState = (g: unknown): g is GameState => zGameStateSchema.safeParse(g).success;

export const initialGameState: GameState = {
	resources: {
		currencyBalance: {
			main: 0,
			prestige: 0,
		},
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

export const debugGameState: GameState = {
	resources: {
		currencyBalance: {
			main: 1e4,
			prestige: 10,
		},
		purchasePower: 1,
		currencyPerClick: 1,
		currencyPerClickMultiplier: 5,
		currencyPerSecond: 10,
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

const createGameState = (initialState: GameState) => {
	return atomWithStorage('gameState', initialState, withStorageValidator(isGameState)(createJSONStorage()));
};

export const gameStateAtom = createGameState(initialGameState);
export const toggleAtom = atomWithStorage('upgradesOpen', true);
export const debugModeAtom = atomWithStorage('debugMode', false);
export const userIdAtom = atom<string>('');
