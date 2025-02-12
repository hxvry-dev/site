import { FC } from 'react';

import { gameStateAtom, Upgrade } from '../atomFactory';

import { Badge } from '@/components/ui/badge';
import { useAtom } from 'jotai';
import { UpgradeTypes } from './Upgrades';

interface ChipProps {
	upgrade: Upgrade;
	upgradeType: UpgradeTypes;
}

interface CanBuyProps {
	upgrades: Record<string, Upgrade>;
	upgradeType: UpgradeTypes;
}

export const Chip: FC<ChipProps> = ({ upgrade, upgradeType }) => {
	const [gameState] = useAtom(gameStateAtom);
	const resources = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;
	if (resources >= upgrade.cost * gameState.resources.buyPower) {
		if (upgrade.level >= upgrade.maxLevel) {
			// Max Level reached
			return <Badge className={`bg-stone-950 text-stone-300 hover:bg-stone-950`}>Max Level</Badge>;
		}
		// Can Purchase this upgrade
		return <Badge className={`bg-green-700 text-stone-300 hover:bg-green-700`}>Click Me!</Badge>;
	} else {
		// Cannot purchase this upgrade
		return <Badge className={`bg-red-700 text-stone-300 hover:bg-red-700`}>Can&apos;t Afford!</Badge>;
	}
};

export const CanBuyChip: FC<CanBuyProps> = ({ upgrades, upgradeType }) => {
	const [gameState] = useAtom(gameStateAtom);
	const upgradesArray = Object.values(upgrades);
	const resources = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;
	const canBuy = (upgrade: Upgrade) => resources >= upgrade.cost * gameState.resources.buyPower;
	if (upgradesArray.some(canBuy) === true) {
		return <Badge className={`bg-green-700 text-stone-300 hover:bg-green-700`}>Upgrade Available!</Badge>;
	} else {
		return <Badge className={`bg-red-700 text-stone-300 hover:bg-red-700`}>Can&apos;t Afford!</Badge>;
	}
};
