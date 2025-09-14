import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { TableBody, TableRow, TableCell, Table } from '@/components/ui/table';
import { FC } from 'react';
import { costFormatter } from '../util/util';
import { Upgrade } from '../util/v2-schema';

interface UpgradeDialogPropsV2 {
	upgrade: Upgrade;
	currentLevel: number;
	actualCost: number;
	actualPurchaseAmount: number;
	purchasePower: number;
}

export const UpgradeDialog: FC<UpgradeDialogPropsV2> = ({
	upgrade,
	currentLevel,
	actualCost,
	actualPurchaseAmount,
	purchasePower,
}) => {
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
				</Table>
				<Table>
					<h1 className="font-bold">Buffs</h1>
					<hr />
					<TableBody>
						<TableRow>
							<TableCell className="font-bold font-mono">Click Power Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									+{costFormatter.format(upgrade.cpc_inc * actualPurchaseAmount)}
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Click Power Multiplier Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									+{costFormatter.format(upgrade.cpc_mult_inc * actualPurchaseAmount)}x
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-bold font-mono">Currency Per Second Increase</TableCell>
							<TableCell>
								<div className="code max-w-fit px-2">
									+{costFormatter.format(upgrade.currency_per_second_inc * actualPurchaseAmount)}
									/s
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};
