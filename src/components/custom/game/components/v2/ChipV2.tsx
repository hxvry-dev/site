import { calculateLocalLevel } from '@/db/functions';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateV2Atom, purchasePowerAtom } from './IncrementalV2';
import { Badge } from '@/components/ui/badge';
import { Upgrade } from './util/v2-schema';
import { getCostV2 } from './util/util';

interface ChipPropsV2 {
	upgrade: Upgrade;
	resources: number;
}

export const ChipV2: FC<ChipPropsV2> = ({ upgrade, resources }) => {
	const [gameStateV2] = useAtom(gameStateV2Atom);
	const [pp] = useAtom(purchasePowerAtom);

	const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
	const maxPossiblePurchase = Math.max(0, upgrade.level_max - currentLevel);
	const actualPurchaseAmount = Math.min(pp, maxPossiblePurchase);

	// Check if already at max level
	if (currentLevel >= upgrade.level_max) {
		return (
			<Badge variant="chip" className={`opacity-85 bg-stone-800 hover:bg-stone-800/90 text-foreground`}>
				Max Level
			</Badge>
		);
	}

	// Check if can afford the actual purchasable amount
	if (actualPurchaseAmount > 0 && resources >= getCostV2(upgrade, gameStateV2, actualPurchaseAmount)) {
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
