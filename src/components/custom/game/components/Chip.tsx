import { FC } from 'react';

import { gameStateAtom, Upgrade } from '../atomFactory';

import { Badge } from '@/components/ui/badge';
import { useAtom } from 'jotai';
import { getCost } from '../util/util';

interface ChipProps {
	upgrade: Upgrade;
	resources: number;
}

export const Chip: FC<ChipProps> = ({ upgrade, resources }) => {
	const [gameState] = useAtom(gameStateAtom);
	if (resources > getCost(upgrade, gameState)) {
		if (upgrade.level >= upgrade.maxLevel) {
			// Max Level reached
			return <Badge className={`opacity-85 bg-stone-800 hover:bg-stone-800/90 text-foreground`}>Max Level</Badge>;
		}
		// Can Purchase this upgrade
		return <Badge className={`opacity-85 bg-green-800 hover:bg-green-700/90 text-foreground`}>Click Me!</Badge>;
	} else {
		// Cannot purchase this upgrade
		return (
			<Badge className={`opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground`}>Can&apos;t Afford!</Badge>
		);
	}
};
