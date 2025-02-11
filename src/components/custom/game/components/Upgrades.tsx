import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom, toggleAtom, Upgrade } from '../atomFactory';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UpgradeItem } from './UpgradeItem';

export type UpgradeTypes = 'base' | 'prestige';
interface UpgradeProps {
	upgradeType: UpgradeTypes;
}

export const Upgrades: FC<UpgradeProps> = ({ upgradeType }) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [toggle] = useAtom(toggleAtom);
	const upgrades = gameState.upgrades[upgradeType];

	const getCost = (upgrade: Upgrade, numUpgrades: number) => {
		let cost = upgrade.cost;
		if (numUpgrades === 1 && upgrade.firstPurchase) {
			cost *= upgrade.costMult;
			return cost;
		} else {
			for (let i = 1; i < numUpgrades; i++) {
				cost *= upgrade.costMult;
			}
		}
		return cost;
	};

	const handleUpgrade = (upgradeName: string) => {
		const upgrade = gameState.upgrades[upgradeType][upgradeName];
		const balance = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;

		setGameState((state) => {
			if (balance - getCost(upgrade, gameState.resources.buyPower) < 0) {
				return state;
			}
			return {
				...state,
				resources: {
					...state.resources,
					balance: state.resources.balance - getCost(upgrade, gameState.resources.buyPower),
					perSecond: state.resources.perSecond + upgrade.currencyPerSecond * gameState.resources.buyPower,
					clickPower:
						gameState.resources.clickPower + upgrade.clickPowerIncrease * gameState.resources.buyPower,
					addedClickPower:
						gameState.resources.addedClickPower + upgrade.clickPowerIncrease * gameState.resources.buyPower,
					clickPowerMultiplier:
						state.resources.clickPowerMultiplier +
						upgrade.clickPowerMultiplierIncrease * gameState.resources.buyPower,
				},
				upgrades: {
					...state.upgrades,
					[upgradeType]: {
						...state.upgrades[upgradeType],
						[upgradeName]: {
							...upgrade,
							level: upgrade.level + gameState.resources.buyPower,
							cost: getCost(upgrade, gameState.resources.buyPower),
							firstPurchase: true,
						},
					},
				},
			};
		});
	};

	return (
		<>
			<div hidden={toggle}>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Upgrade Name</TableHead>
							<TableHead>Upgrade Level</TableHead>
							<TableHead>Upgrade Cost</TableHead>
							<TableHead>Upgrade Stats</TableHead>
							<TableHead>Purchase?</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Object.keys(upgrades).map((key) => (
							<TableRow key={key}>
								<TableCell>{upgrades[key].name}</TableCell>
								<TableCell>
									{upgrades[key].level}/{upgrades[key].maxLevel}
								</TableCell>
								<TableCell>{getCost(upgrades[key], gameState.resources.buyPower).toFixed(0)}</TableCell>
								<TableCell>
									<div className="grid grid-cols-2 grid-rows-3 gap-0 max-w-[450px]">
										<p>Click Power Increase</p>
										<p>{upgrades[key].clickPowerIncrease * gameState.resources.buyPower}</p>
										<p>Click Power Multiplier Increase</p>
										<p>
											{upgrades[key].clickPowerMultiplierIncrease * gameState.resources.buyPower}
										</p>
										<p>Currency Per Second Increase</p>
										<p>
											{(upgrades[key].currencyPerSecond * gameState.resources.buyPower).toFixed(
												2,
											)}
										</p>
									</div>
								</TableCell>
								<TableCell>
									<div>
										<Button
											disabled={
												gameState.resources.balance! < upgrades[key].cost ||
												upgrades[key].level >= upgrades[key].maxLevel
											}
											onClick={() => handleUpgrade(key)}
										>
											Buy Upgrade
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<UpgradeItem upgradeType={upgradeType} />
			</div>
		</>
	);
};
