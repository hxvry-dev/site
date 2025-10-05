import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FC } from 'react';
import { costFormatter } from './util/util';

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
		<div className="font-mono">
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="font-mono rounded-sm">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2 text-2xl">Welcome Back!</DialogTitle>
						<DialogDescription>You&apos;ve been away for a while!</DialogDescription>
						<DialogDescription>Here&apos;s what you earned while offline:</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<Card className="rounded-none">
							<CardHeader>
								<CardTitle className="text-2xl grid grid-cols-2">
									<div>Time Away:</div>
									<p className="text-2xl">{formatTime(offlineTime)}</p>
								</CardTitle>
							</CardHeader>
						</Card>
						<Card className="rounded-none">
							<div>
								<CardHeader>
									<CardTitle className="text-2xl">
										<div className="grid col-span-2">Earnings: </div>
										<div className="grid grid-cols-2">
											<p>+{costFormatter.format(currencyEarned)} </p>
											<p>
												(from {costFormatter.format(currencyPerSecond)}/s x{' '}
												{costFormatter.format(offlineProgressMult)})
											</p>
										</div>
									</CardTitle>
								</CardHeader>
							</div>
						</Card>
					</div>

					<Button onClick={onClose} variant="default" className="w-full mt-4">
						Collect Rewards
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};
