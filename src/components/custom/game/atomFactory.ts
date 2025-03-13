import { atomWithStorage, createJSONStorage, unstable_withStorageValidator as withStorageValidator } from 'jotai/utils';

import { PrestigeUpgrades, Upgrades } from './upgrades';
import { GameState, zGameStateSchema } from './schema';
import { atom } from 'jotai';
import { Database } from '@/db/api';

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

export type dbUpgrade = {
	upgrade_id: string;
	upgrade_type: Database['public']['Enums']['upgrade_types'];
	upgrade_name: string;
	upgrade_desc: string;
	cost: number;
	cost_mult: number;
	level_max: number;
	cpc_inc: number;
	cpc_mult_inc: number;
	currency_per_second_inc: number;
};
export type DbGameState = {
	currency_balance: number;
	prestige_points_balance: number;
	num_times_prestiged: number;
	prestige_cost: number;
};
export type DbUserUpgrades = {
	upgrade_id: string;
	level_current: number;
	purchased_at: string;
};
export const upgradesAtom = atom<dbUpgrade[]>([]);
export const userAtom = atom<DbGameState[]>([]);
export const userUpgradesAtom = atom<DbUserUpgrades[]>([]);
