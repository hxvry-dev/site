import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { TableBody, TableRow, TableCell, Table } from '@/components/ui/table';
import { costFormatter } from '../util/util';
import { GameState, Upgrade } from '../util/schema';
import { calculateLocalLevel } from '@/db/functions';

interface UpgradeDialogProps {
	upgrade: Upgrade;
	currentLevel: number;
	actualCost: number;
	actualPurchaseAmount: number;
	purchasePower: number;
	gameState: GameState;
}

export const UpgradeDialog = ({
	upgrade,
	currentLevel,
	actualCost,
	actualPurchaseAmount,
	purchasePower,
	gameState,
}: UpgradeDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger>Details</DialogTrigger>
			<DialogContent className="min-w-fit">
				<DialogHeader>
					<DialogTitle>{upgrade.upgrade_name}</DialogTitle>
					<DialogDescription className="font-mono max-w-sm wrap-anywhere">
						Description: {upgrade.upgrade_desc}
					</DialogDescription>
				</DialogHeader>
				<h2 className="font-bold">
					Buff Summary for the purchase of {purchasePower}x {upgrade.upgrade_name}
				</h2>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="font-bold font-mono">Cost</TableCell>
							<TableCell>
								<span className="code max-w-fit px-2">{costFormatter.format(actualCost)}</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Current Level</TableCell>
							<TableCell>
								<span className="code max-w-fit px-2">
									{currentLevel} / {upgrade.level_max}
								</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Level After Purchase</TableCell>
							<TableCell>
								<span className="code max-w-fit px-2">
									{currentLevel + actualPurchaseAmount} / {upgrade.level_max}
								</span>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Minimum Prestige Required</TableCell>
							<TableCell>
								<span className="code max-w-fit px-2">{upgrade.min_prestige_required}</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<h1 className="font-bold">Buffs</h1>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="font-bold font-mono">Click Power Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									{costFormatter.format(upgrade.cpc_inc * calculateLocalLevel(upgrade, gameState))} +{' '}
									{costFormatter.format(upgrade.cpc_inc * actualPurchaseAmount)}
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Click Power Multiplier Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									{costFormatter.format(
										upgrade.cpc_mult_inc * calculateLocalLevel(upgrade, gameState),
									)}
									x + {costFormatter.format(upgrade.cpc_mult_inc * actualPurchaseAmount)}x
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Currency Per Second Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									{costFormatter.format(
										upgrade.currency_per_second_inc * calculateLocalLevel(upgrade, gameState),
									)}
									/s + {costFormatter.format(upgrade.currency_per_second_inc * actualPurchaseAmount)}
									/s
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Offline Progress Multiplier Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									{costFormatter.format(
										upgrade.offline_progress_mult_inc * calculateLocalLevel(upgrade, gameState),
									)}{' '}
									+ {costFormatter.format(upgrade.offline_progress_mult_inc * actualPurchaseAmount)}
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};
