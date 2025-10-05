import { calculateLocalLevel } from '@/db/functions';
import { useAtom } from 'jotai';
import { gameStateAtom, purchasePowerAtom } from './Incremental';
import { Badge } from '@/components/ui/badge';
import { Upgrade } from './util/schema';
import { getCost } from './util/util';

interface ChipProps {
	upgrade: Upgrade;
	resources: number;
}

export const Chip = ({ upgrade, resources }: ChipProps) => {
	const [gameState] = useAtom(gameStateAtom);
	const [pp] = useAtom(purchasePowerAtom);

	const currentLevel = calculateLocalLevel(upgrade, gameState);
	const maxPossiblePurchase = Math.max(0, upgrade.level_max - currentLevel);
	const actualPurchaseAmount = Math.min(pp, maxPossiblePurchase);

	if (currentLevel >= upgrade.level_max) {
		return <Badge variant="maxLevelChip">Max Level</Badge>;
	}
	if (actualPurchaseAmount > 0 && resources >= getCost(upgrade, gameState, actualPurchaseAmount)) {
		return <Badge variant="canBuyChip">Can Purchase!</Badge>;
	} else {
		// Cannot purchase
		return <Badge variant="cannotBuyChip">Can&apos;t Afford!</Badge>;
	}
};
