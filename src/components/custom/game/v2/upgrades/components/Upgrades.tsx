import { FC } from 'react';
import { UpgradeTypes } from '../v2AtomFactoryUpgrades';

interface UpgradesV2Props {
	type: UpgradeTypes;
}

export const UpgradesV2: FC<UpgradesV2Props> = ({ type }) => {
	return <>{type}</>;
};
