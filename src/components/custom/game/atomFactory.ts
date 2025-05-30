import { atomWithStorage, createJSONStorage, unstable_withStorageValidator as withStorageValidator } from 'jotai/utils';

import { GameState, GameStateV2, zGameStateSchema } from './schema';
import { PrestigeUpgrades, Upgrades } from './upgrades';
import { atom } from 'jotai';
import { loadUserFromDB, userUpgrades, getUpgradesFromDB } from '@/db/functions';

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

// V2 Here

export const purchasePowerAtom = atom<number>(1);

const defaultGameStateV2 = async (): Promise<GameStateV2> => {
	const [user, user_upgrades, upgrades] = await Promise.all([loadUserFromDB(), userUpgrades(), getUpgradesFromDB()]);
	const gsv2: GameStateV2 = {
		user: user!,
		userUpgrades: user_upgrades!,
		upgrades: upgrades!,
	};
	return gsv2 as GameStateV2;
};
const createGameStateV2 = (initialState: GameStateV2) => {
	return atom(initialState);
};
export const fetchDefaultGameStateV2: GameStateV2 = await defaultGameStateV2();
export const gameStateV2Atom = createGameStateV2(await defaultGameStateV2());
