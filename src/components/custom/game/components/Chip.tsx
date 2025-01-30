import { FC } from 'react';

import { gameStateAtom, Upgrade } from '../atomFactory';

import { Badge } from '@/components/ui/badge';
import { useAtom } from 'jotai';

interface ChipProps {
	upgrade: Upgrade;
}

interface CanBuyProps {
	upgrades: Record<string, Upgrade>;
}

export const Chip: FC<ChipProps> = ({ upgrade }) => {
	const [gameState] = useAtom(gameStateAtom);
	if (gameState.resources.amount >= upgrade.cost) {
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

export const CanBuyChip: FC<CanBuyProps> = ({ upgrades }) => {
	const [gameState] = useAtom(gameStateAtom);
	const upgradesArray = Object.values(upgrades);
	const canBuy = (upgrade: Upgrade) => gameState.resources.amount >= upgrade.cost;
	console.log(upgradesArray.some(canBuy));
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
