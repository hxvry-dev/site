import { FC } from 'react';

import { gameStateAtom, Upgrade } from '../atomFactory';

import { Badge } from '@/components/ui/badge';
import { useAtom } from 'jotai';

interface ChipProps {
	upgrade: Upgrade;
	upgradeType: 'base' | 'prestige';
}

interface CanBuyProps {
	upgrades: Record<string, Upgrade>;
	upgradeType: 'base' | 'prestige';
}

export const Chip: FC<ChipProps> = ({ upgrade, upgradeType }) => {
	const [gameState] = useAtom(gameStateAtom);
	const resources = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;
	if (resources >= upgrade.cost * gameState.resources.buyPower) {
		if (upgrade.level >= upgrade.maxLevel) {
			// Max Level reached
			return (
				<div>
					<Badge className={`mr-8 clear-left float-right bg-stone-950 text-stone-300 hover:bg-stone-950`}>
						Max Level
					</Badge>
				</div>
			);
		}
		// Can Purchase this upgrade
		return (
			<div>
				<Badge className={`mr-8 clear-left float-right bg-green-700 text-stone-300 hover:bg-green-700`}>
					Click Me!
				</Badge>
			</div>
		);
	} else {
		// Cannot purchase this upgrade
		return (
			<div>
				<Badge className={`mr-8 clear-left float-right bg-red-700 text-stone-300 hover:bg-red-700`}>
					Can&apos;t Afford!
				</Badge>
			</div>
		);
	}
};

export const CanBuyChip: FC<CanBuyProps> = ({ upgrades, upgradeType }) => {
	const [gameState] = useAtom(gameStateAtom);
	const upgradesArray = Object.values(upgrades);
	const resources = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;
	const canBuy = (upgrade: Upgrade) => resources >= upgrade.cost * gameState.resources.buyPower;
	if (upgradesArray.some(canBuy) === true) {
		return (
			<div>
				<Badge className={`mr-8 clear-left float-right bg-green-700 text-stone-300 hover:bg-green-700`}>
					Upgrade Available!
				</Badge>
			</div>
		);
	} else {
		return (
			<div>
				<Badge className={`mr-8 clear-left float-right bg-red-700 text-stone-300 hover:bg-red-700`}>
					Can&apos;t Afford!
				</Badge>
			</div>
		);
	}
};
