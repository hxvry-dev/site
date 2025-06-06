import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';
import { Upgrade, zUpgrade } from '../schema';
import { getCost, getCostV2 } from '../util/util';

import { Badge } from '@/components/ui/badge';
import { gameStateV2Atom, purchasePowerAtom } from './IncrementalV2';
import { calculateLocalLevel } from '@/db/functions';

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

interface ChipPropsV2 {
	upgrade: Upgrade;
	resources: number;
}

export const ChipV2: FC<ChipPropsV2> = ({ upgrade, resources }) => {
	const [gameState] = useAtom(gameStateV2Atom);
	const [pp] = useAtom(purchasePowerAtom);
	if (resources >= getCostV2(upgrade, pp, gameState)) {
		if (calculateLocalLevel(upgrade, gameState) >= upgrade.level_max) {
			// Max level
			return (
				<Badge variant="chip" className={`opacity-85 bg-stone-800 hover:bg-stone-800/90 text-foreground`}>
					Max Level
				</Badge>
			);
		}
		// Can Purchase
		return (
			<Badge variant="chip" className={`opacity-85 bg-green-800 hover:bg-green-700/90 text-foreground`}>
				Click Me!
			</Badge>
		);
	} else {
		// Cannot purchase
		return (
			<Badge variant="chip" className={`opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground`}>
				Can&apos;t Afford!
			</Badge>
		);
	}
};
