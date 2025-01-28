import { FC } from 'react';

import { Upgrade } from '../atomFactory';

import { Badge } from '@/components/ui/badge';

export const BuyChip: FC<{ resourceAmount: number; upgrade: Upgrade }> = ({ resourceAmount, upgrade }) => {
	const TrueChip: FC = () => {
		return <Badge className={`mr-8 clear-left float-right bg-green-700 text-stone-300`}>Click Me!</Badge>;
	};
	const FalseChip: FC = () => {
		return <Badge className={`mr-8 clear-left float-right bg-red-700 text-stone-300`}>Can&apos;t Afford!</Badge>;
	};
	const PurchasedChip: FC = () => {
		return <Badge className={`mr-8 clear-left float-right bg-stone-950 text-stone-300`}>Max Level</Badge>;
	};

	if (resourceAmount >= upgrade.cost) {
		if (upgrade.level >= upgrade.maxLevel) {
			return <div>{<PurchasedChip />}</div>;
		}
		return <div>{<TrueChip />}</div>;
	} else {
		return <div>{<FalseChip />}</div>;
	}
};
