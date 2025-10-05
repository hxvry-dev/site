import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { GameState } from '../util/schema';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { costFormatter } from '../util/util';

interface TotalBonusDialogProps {
	state: GameState;
}

export const TotalBonusDialog = ({ state }: TotalBonusDialogProps) => {
	const totalUpgradesPurchased = (): number => {
		let total: number = 0;
		state.userUpgrades.forEach((u) => {
			total += u.level_current;
		});
		return total;
	};
	return (
		<Dialog>
			<DialogTrigger className="hover:underline cursor-pointer font-bold">Game Details</DialogTrigger>
			<DialogContent className="min-w-fit">
				<DialogHeader>
					<DialogTitle>Idle Game Stats</DialogTitle>
					<DialogDescription className="font-mono max-w-sm wrap-anywhere">
						Some general stats about your playtime
					</DialogDescription>
				</DialogHeader>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Total Number of Upgrades Purchased</TableCell>
							<TableCell>{costFormatter.format(totalUpgradesPurchased())}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Number of Prestiges</TableCell>
							<TableCell>{state.user.num_times_prestiged}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};
