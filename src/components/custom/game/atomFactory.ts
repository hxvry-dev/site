import { atomWithStorage } from 'jotai/utils';

interface ResourceAtom {
	amount: number;
	clickPower: number;
	perSecond: number;
}

interface Upgrade {
	name: string;
	cost: number;
	costMult: number;
	clickPowerIncrease: number;
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
	upgrades: {
		better_index_finger: {
			name: 'Better Index Finger',
			cost: 10,
			costMult: 10,
			clickPowerIncrease: 1,
			level: 0,
			maxLevel: 5,
			currencyPerSecond: 0,
			firstPurchase: false,
			description: `You're a gamer, so you know how to spam LMB`,
		},
		better_gpu: {
			name: 'Better GPU',
			cost: 25,
			costMult: 12.5,
			clickPowerIncrease: 0,
			level: 0,
			maxLevel: 99,
			currencyPerSecond: 0.125,
			firstPurchase: false,
			description: `You bought a crappy GPU from one of your buddies. It generates some currency every second. Not much, but it's somethin'.`,
		},
		better_cpu: {
			name: 'Better CPU',
			cost: 50,
			costMult: 15,
			clickPowerIncrease: 0,
			level: 0,
			maxLevel: 99,
			currencyPerSecond: 1,
			firstPurchase: false,
			description: `You were able to save up enough to buy a better CPU for your "mining" rig. This generates more currency per second, but not by much. Maybe if you keep buying them...`,
		},
	},
	prestige: {
		count: 0,
		cost: 1e7,
		points: 0,
		costMultiplier: 500,
		upgrades: {
			pre_carpal_tunnel: {
				name: 'Preemptive Carpal Tunnel Surgery',
				description: `You find it odd that the surgeon wants to charge you per finger.`,
				cost: 1,
				costMult: 150,
				level: 0,
				maxLevel: 10,
				clickPowerIncrease: 0,
				currencyPerSecond: 0,
				firstPurchase: false,
			},
			new_key_caps: {
				name: 'Weighted Keycaps',
				description: `You bought these off of Aluzam because your buddy told you he was able to spam spacebar faster with them once like 5 years ago, and never thought to buy them.`,
				cost: 5,
				costMult: 1,
				level: 0,
				maxLevel: 1,
				clickPowerIncrease: 150,
				currencyPerSecond: 0,
				firstPurchase: false,
			},
			botnet: {
				name: 'Bot Net',
				description: `Leetcode finally paid off.`,
				cost: 10,
				costMult: 1,
				level: 0,
				maxLevel: 3,
				clickPowerIncrease: 250,
				currencyPerSecond: 10,
				firstPurchase: false,
			},
		},
	},
};

export const gameStateAtom = createGameState(initialGameState);
