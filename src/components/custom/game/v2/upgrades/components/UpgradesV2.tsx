import { FC } from 'react';
import { gameStateAtom, Upgrade, UpgradeTypes } from '../v2AtomFactoryUpgrades';
import { useAtom } from 'jotai';

interface UpgradesV2Props {
	type: UpgradeTypes;
}

export const UpgradesV2: FC<UpgradesV2Props> = ({ type }) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const data = gameState.upgrades[type];
	const resources = type === 'base' ? gameState.resources.currencyBalance : gameState.resources.prestigePointsBalance;

	const handleUpgrade = (upgrade: Upgrade) => {
		setGameState((state) => {
			return {
				...state,
			};
		});
	};
	return <div></div>;
};
