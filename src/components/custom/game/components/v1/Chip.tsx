import { FC } from 'react';
import { useAtom } from 'jotai';
import { Badge } from '@/components/ui/badge';
import { gameStateAtom } from './util/atomFactory';
import { zUpgrade } from './util/schema';
import { getCost } from './util/util';

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
				<Badge variant="maxLevelChip" className={`opacity-85 bg-accent`}>
					Max Level
				</Badge>
			);
		}
		// Can Purchase this upgrade
		return (
			<Badge variant="canBuyChip" className={`opacity-85 bg-green-800 hover:bg-green-800`}>
				Can Purchase!
			</Badge>
		);
	} else {
		// Cannot purchase this upgrade
		return (
			<Badge variant="cannotBuyChip" className={`opacity-85 bg-destructive`}>
				Can&apos;t Afford!
			</Badge>
		);
	}
};
