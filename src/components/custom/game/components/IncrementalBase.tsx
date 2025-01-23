import { useAtom } from 'jotai';
import { FC, useEffect } from 'react';
import { buyUpgradeAtom, currencyAtom, incrementAtom, multiplierAtom, upgradesAtom } from '../atoms';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UPGRADES, type Upgrade } from '../upgrades';
import { saveState } from '../localStorage';

const IncrementalBase: FC = () => {
	const { toast } = useToast();
	const [currency] = useAtom(currencyAtom);
	const [, increment] = useAtom(incrementAtom);

	const [upgrades] = useAtom(upgradesAtom);
	const [, buyUpgrade] = useAtom(buyUpgradeAtom);

	const [multiplier] = useAtom(multiplierAtom);

	useEffect(() => {
		saveState({ currency, multiplier: multiplier, upgrades });
	}, [currency, upgrades]);

	const handleBuyUpgrade = (upgradeID: number) => {
		const upgrade = upgrades.find((u: { id: number }) => u.id === upgradeID);
		if (upgrade && currency < upgrade.cost) {
			toast({
				variant: 'destructive',
				title: 'Insufficient Funds!',
				description: `You don't have enough Currency to make this transaction!\nNeeded: ${upgrade.cost}\nHave: ${currency}`,
			});
		} else {
			buyUpgrade(upgradeID);
		}
	};

	return (
		<div className="justify-items-center">
			<h1>Idle Game</h1>
			<p className="p-5">Currency: {currency}</p>
			<Button size="sm" variant="secondary" onClick={increment}>
				Make Number Get Bigger
			</Button>
			<ul>
				{upgrades.map((u: Upgrade) => (
					<li key={u.id}>
						{u.purchased ? (
							<span>Purchased</span>
						) : (
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button size="sm" variant="secondary" onClick={() => handleBuyUpgrade(u.id)}>
											Buy Upgrade {u.id} (Cost: {u.cost}, Effect: +{u.effect})?
										</Button>
									</TooltipTrigger>
									<TooltipContent className="font-mono bg-background rounded-none text-foreground">
										{u.description}
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</li>
				))}
			</ul>
			<Toaster />
		</div>
	);
};

export default IncrementalBase;
