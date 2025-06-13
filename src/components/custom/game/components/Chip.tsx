import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';
import { zUpgrade } from '../schema';
import { getCost } from '../util/util';

import { Badge } from '@/components/ui/badge';

interface ChipProps {
	upgrade: zUpgrade;
	resources: number;
}

export const Chip: FC<ChipProps> = ({ upgrade, resources }) => {
	const [gameState] = useAtom(gameStateAtom);
	if (resources >= getCost(upgrade, gameState)) {
		if (upgrade.level.current >= upgrade.level.max) {
			// Max Level reached
			return (
				<Badge variant="chip" className={`opacity-85 bg-stone-800 hover:bg-stone-800/90 text-foreground`}>
					Max Level
				</Badge>
			);
		}
		// Can Purchase this upgrade
		return (
			<Badge variant="chip" className={`opacity-85 bg-green-800 hover:bg-green-700/90 text-foreground`}>
				Click Me!
			</Badge>
		);
	} else {
		// Cannot purchase this upgrade
		return (
			<Badge variant="chip" className={`opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground`}>
				Can&apos;t Afford!
			</Badge>
		);
	}
};
