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
			return <Badge className={`bg-stone-950 text-stone-300 hover:bg-stone-950`}>Max Level</Badge>;
		}
		// Can Purchase this upgrade
		return <Badge className={`bg-green-700 text-stone-300 hover:bg-green-700`}>Click Me!</Badge>;
	} else {
		// Cannot purchase this upgrade
		return <Badge className={`bg-red-700 text-stone-300 hover:bg-red-700`}>Can&apos;t Afford!</Badge>;
	}
};
