import { calculateLocalLevel } from '@/db/functions';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { Upgrade } from '../schema';
import { getCostV2 } from '../util/util';
import { gameStateV2Atom, purchasePowerAtom } from './IncrementalV2';
import { Badge } from '@/components/ui/badge';

interface ChipPropsV2 {
	upgrade: Upgrade;
	resources: number;
}

export const ChipV2: FC<ChipPropsV2> = ({ upgrade, resources }) => {
	const [gameStateV2] = useAtom(gameStateV2Atom);
	const [pp] = useAtom(purchasePowerAtom);
	if (resources >= getCostV2(upgrade, gameStateV2, pp)) {
		if (calculateLocalLevel(upgrade, gameStateV2) >= upgrade.level_max) {
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
