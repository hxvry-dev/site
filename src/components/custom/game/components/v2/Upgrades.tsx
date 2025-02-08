import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../../atomFactory';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type UpgradeTypes = 'base' | 'prestige';

export const Upgrades: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const handleUpgrade = (upgradeName: string, upgradeType: UpgradeTypes) => {
		const upgrade = gameState.upgrades[upgradeType][upgradeName];
		const balance = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;

		const numUpgrades = gameState.resources.buyPower;
		let cost = upgrade.cost;
		if (!upgrade.firstPurchase || numUpgrades >= 1) cost = cost * upgrade.costMult;
		for (let i = 0; i < numUpgrades; i++) {
			cost += cost * upgrade.costMult;
		}
		if (cost >= balance) {
			return;
		}
	};
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Upgrade Name</TableHead>
					<TableHead>Upgrade Cost</TableHead>
					<TableHead>Upgrade Stats</TableHead>
					<TableHead>Purchase?</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody></TableBody>
		</Table>
	);
};
