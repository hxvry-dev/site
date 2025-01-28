import { atomWithStorage } from 'jotai/utils';
import { PrestigeUpgrades, Upgrades } from './upgrades';

interface ResourceAtom {
	amount: number;
	clickPower: number;
	perSecond: number;
}

export interface Upgrade {
	name: string;
	cost: number;
	costMult: number;
	clickPowerIncrease: number;
	clickPowerMult: number;
	level: number;
	maxLevel: number;
	currencyPerSecond: number;
	firstPurchase: boolean;
	description: string;
}

interface Prestige {
	count: number;
	cost: number;
	points: number;
	costMultiplier: number;
	upgrades: Record<string, Upgrade>;
}

interface GameState {
	resources: ResourceAtom;
	upgrades: Record<string, Upgrade>;
	prestige: Prestige;
}

const createGameState = (initialState: GameState) => {
	return atomWithStorage<GameState>('gameState', initialState);
};

export const initialGameState: GameState = {
	resources: { amount: 0, clickPower: 1, perSecond: 0 },
	upgrades: Upgrades,
	prestige: {
		count: 0,
		cost: 1e7,
		points: 0,
		costMultiplier: 500,
		upgrades: PrestigeUpgrades,
	},
};

export const gameStateAtom = createGameState(initialGameState);
