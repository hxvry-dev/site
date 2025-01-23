export type Upgrade = {
	id: number;
	cost: number;
	effect: number;
	description: string;
	purchased: boolean;
};

export const UPGRADES: Upgrade[] = [
	{ id: 1, cost: 10, effect: 1, description: '+1 to click power', purchased: false },
	{ id: 2, cost: 25, effect: 2, description: '+2 to click power', purchased: false },
	{ id: 3, cost: 50, effect: 2, description: '+2 to click power', purchased: false },
];
