import { FC } from 'react';
import { Badge } from '@/components/ui/badge';
import { Upgrade } from '../atomFactory';

const BuyChip: FC<{ resourceAmount: number; upgrade: Upgrade }> = ({ resourceAmount, upgrade }) => {
	const TrueChip: FC = () => {
		return <Badge className={`mr-8 clear-left float-right bg-green-600 text-stone-300`}>Click Me!</Badge>;
	};
	const FalseChip: FC = () => {
		return <Badge className={`mr-8 clear-left float-right bg-red-600 text-stone-300`}>Can&apos;t Afford!</Badge>;
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

export default BuyChip;
