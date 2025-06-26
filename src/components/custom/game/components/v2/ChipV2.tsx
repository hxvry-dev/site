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

	if (currentLevel >= upgrade.level_max) {
		return <Badge variant="maxLevelChip">Max Level</Badge>;
	}
	if (actualPurchaseAmount > 0 && resources >= getCostV2(upgrade, gameStateV2, actualPurchaseAmount)) {
		return <Badge variant="canBuyChip">Can Purchase!</Badge>;
	} else {
		// Cannot purchase
		return <Badge variant="cannotBuyChip">Can&apos;t Afford!</Badge>;
	}
};
