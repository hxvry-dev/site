import { FC } from 'react';

import { costFormatter } from './util/util';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface OfflineProgressModalProps {
	isOpen: boolean;
	onClose: () => void;
	offlineTime: number; // in seconds
	offlineProgressMult: number;
	currencyEarned: number;
	currencyPerSecond: number;
}

export const OfflineProgressModal: FC<OfflineProgressModalProps> = ({
	isOpen,
	onClose,
	offlineTime,
	offlineProgressMult,
	currencyEarned,
	currencyPerSecond,
}) => {
	const formatTime = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = Math.floor(seconds % 60);

		if (hours > 0) {
			return `${hours} hour(s) ${minutes} minute(s) ${secs} second(s)`;
		} else if (minutes > 0) {
			return `${minutes} minutes ${secs} seconds`;
		} else {
			return `${secs} seconds`;
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="font-mono rounded-sm min-w-fit">
				<DialogHeader>
					<DialogTitle className="grid mx-auto gap-2 text-2xl">Welcome Back!</DialogTitle>
					<DialogDescription className="mx-auto mt-4">You&apos;ve been away for a while!</DialogDescription>
					<DialogDescription className="mx-auto mb-4">
						Here&apos;s what you earned while offline:
					</DialogDescription>
				</DialogHeader>
				<div className="space-y-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Time Away</TableHead>
								<TableHead>Earnings</TableHead>
								<TableHead>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>{formatTime(offlineTime)}</TableCell>
								<TableCell>+{costFormatter.format(currencyEarned)}</TableCell>
								<TableCell>
									(from {costFormatter.format(currencyPerSecond)}/s x{' '}
									{costFormatter.format(offlineProgressMult)})
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</div>
				<Button onClick={onClose} variant="default" className="w-full mt-4">
					Collect Rewards
				</Button>
			</DialogContent>
		</Dialog>
	);
};
