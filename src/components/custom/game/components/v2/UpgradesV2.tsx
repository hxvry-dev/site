import { FC } from 'react';
import { useAtom } from 'jotai';
import { ChipV2 } from './ChipV2';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { calculateLocalLevel } from '@/db/functions';
import { gameStateV2Atom, purchasePowerAtom } from './IncrementalV2';
import { toast } from 'sonner';
import { v4 } from 'uuid';
import { Upgrades, Upgrade, UserUpgrade } from './util/v2-schema';
import { getCostV2 } from './util/util';

interface UpgradeItemPropsV2 {
	upgradeType: 'base' | 'prestige';
}

interface Cost {
	[key: string]: number;
}

export const UpgradesV2: FC<UpgradeItemPropsV2> = ({ upgradeType }) => {
	const userID: string | void = sessionStorage.getItem('user_id') ?? console.log('userID not defined.');
	const [gameStateV2, setGameState] = useAtom(gameStateV2Atom);
	const [purchasePower] = useAtom(purchasePowerAtom);
	const data: Upgrades = gameStateV2.upgrades.filter((u) => u.upgrade_type === upgradeType);
	const resources: number =
		upgradeType === 'base' ? gameStateV2.user.currency_balance : gameStateV2.user.prestige_points_balance;
	const costs: Cost = {};
	for (let keys of data) {
		costs[keys.upgrade_id] = getCostV2(keys, gameStateV2, purchasePower);
	}

	const getActualPurchaseAmount = (upgrade: Upgrade): number => {
		const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
		const maxPossiblePurchase = upgrade.level_max - currentLevel;
		return Math.min(purchasePower, Math.max(0, maxPossiblePurchase));
	};

	// Helper function to check if an upgrade can be purchased
	const canPurchaseUpgrade = (upgrade: Upgrade): boolean => {
		const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
		const actualPurchaseAmount = getActualPurchaseAmount(upgrade);

		// Can't purchase if already at max level or if actual purchase amount is 0
		if (currentLevel >= upgrade.level_max || actualPurchaseAmount <= 0) {
			return false;
		}

		// Check if can afford the cost
		const cost = getCostV2(upgrade, gameStateV2, actualPurchaseAmount);
		return resources >= cost;
	};

	const handleUpgrade = (upgrade: Upgrade) => {
		const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
		const actualPurchaseAmount = getActualPurchaseAmount(upgrade);

		// Double-check that we can make this purchase
		if (actualPurchaseAmount <= 0 || currentLevel >= upgrade.level_max) {
			toast.error('Cannot purchase: upgrade is already at maximum level!');
			return;
		}

		const actualCost = getCostV2(upgrade, gameStateV2, actualPurchaseAmount);

		if (resources < actualCost) {
			toast.error('Cannot afford this upgrade!');
			return;
		}

		const result: UserUpgrade = {
			id: v4(),
			user_id: sessionStorage.getItem('user_id')!,
			upgrade_id: upgrade.upgrade_id,
			level_current: currentLevel + actualPurchaseAmount,
			prestige_num: gameStateV2.user.num_times_prestiged,
			purchased_at: new Date().toISOString(),
		};

		if (result.user_id === userID) {
			console.log(result);
			toast.success(`Purchased ${actualPurchaseAmount} level(s) of ${upgrade.upgrade_name}!`);
			setGameState((state) => {
				return {
					...state,
					user: {
						...state.user,
						currency_balance:
							upgrade.upgrade_type === 'base'
								? gameStateV2.user.currency_balance - actualCost
								: gameStateV2.user.currency_balance,
						currency_per_second:
							state.user.currency_per_second + upgrade.currency_per_second_inc * actualPurchaseAmount,
						currency_per_click: state.user.currency_per_click + upgrade.cpc_inc * actualPurchaseAmount,
						currency_per_click_mult:
							state.user.currency_per_click_mult + upgrade.cpc_mult_inc * actualPurchaseAmount,
						prestige_points_balance:
							upgrade.upgrade_type === 'prestige'
								? gameStateV2.user.prestige_points_balance - actualCost
								: gameStateV2.user.prestige_points_balance,
						last_seen: new Date().toISOString(),
					},
					userUpgrades: [...state.userUpgrades, result],
				};
			});
		} else {
			toast.warning('Purchase failed!');
		}
	};

	return (
		<div>
			{data.map((upgrade) => {
				const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
				const actualPurchaseAmount = getActualPurchaseAmount(upgrade);
				const actualCost = actualPurchaseAmount > 0 ? getCostV2(upgrade, gameStateV2, actualPurchaseAmount) : 0;

				return (
					<div className="flex grid-flow-col gap-5 font-mono" key={upgrade.upgrade_id}>
						<div>
							<Accordion type="single" collapsible>
								<AccordionItem value={upgrade.upgrade_name}>
									<AccordionTrigger className="hover:bg-muted/50 px-5">
										<div className="grid grid-cols-4 grid-rows-1 gap-2">
											<div className="w-[200px]">{upgrade.upgrade_name}</div>
											<div>
												Level:{' '}
												<span className="code max-w-fit px-2">
													{currentLevel} / {upgrade.level_max}
												</span>
											</div>
											<div>
												Cost:{' '}
												<span className="code max-w-fit px-2">
													{actualCost.toLocaleString('en-us', {
														maximumFractionDigits: 2,
													})}
												</span>
											</div>
											<div>
												<ChipV2
													upgrade={upgrade}
													resources={
														upgrade.upgrade_type === 'base'
															? gameStateV2.user.currency_balance
															: gameStateV2.user.prestige_points_balance
													}
												/>
											</div>
										</div>
									</AccordionTrigger>
									<AccordionContent className="pt-5 px-2 backdrop-brightness-75">
										<div>
											<legend className="font-mono">Upgrade Description</legend>
											<div className="max-w-[550px] border-2 p-2 mt-2 font-mono italic text-xs overflow-y-scroll no-scrollbar">
												{upgrade.upgrade_desc}
											</div>
										</div>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Click Power Increase</TableHead>
													<TableHead>Click Power Multiplier Increase</TableHead>
													<TableHead>Currency Per Second Increase</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow>
													<TableCell>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger asChild>
																	<div className="code max-w-fit px-2">
																		+
																		{(
																			upgrade.cpc_inc * actualPurchaseAmount
																		).toFixed(2)}
																	</div>
																</TooltipTrigger>
																<TooltipContent className="bg-background border-2 text-foreground max-w-[240px]">
																	<div>
																		Current Bonus: +
																		{gameStateV2.user.currency_per_click}{' '}
																		Currency/Click
																	</div>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</TableCell>
													<TableCell>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger asChild>
																	<div className="code max-w-fit px-2">
																		+
																		{(
																			upgrade.cpc_mult_inc * actualPurchaseAmount
																		).toFixed(2)}
																		x
																	</div>
																</TooltipTrigger>
																<TooltipContent className="bg-background border-2 text-foreground max-w-[240px]">
																	<div>
																		Current Bonus:{' '}
																		{gameStateV2.user.currency_per_click_mult}x
																		Currency per Click
																	</div>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</TableCell>
													<TableCell>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger asChild>
																	<div className="code max-w-fit px-2">
																		+
																		{(
																			upgrade.currency_per_second_inc *
																			actualPurchaseAmount
																		).toFixed(2)}
																		/s
																	</div>
																</TooltipTrigger>
																<TooltipContent className="font-medium bg-background border-2 text-foreground">
																	<div>
																		Current Bonus: +
																		{gameStateV2.user.currency_per_second}{' '}
																		Currency/s{' '}
																		<span className="spoiler">
																			this is a rounded value
																		</span>
																	</div>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
						<div className="grid grid-cols-2 gap-5 max-w-fit content-center">
							<Button
								className="px-5"
								disabled={!canPurchaseUpgrade(upgrade)}
								onClick={() => handleUpgrade(upgrade)}
							>
								Buy Upgrade
								{actualPurchaseAmount !== purchasePower && actualPurchaseAmount > 0 && (
									<span className="text-xs ml-1">({actualPurchaseAmount})</span>
								)}
							</Button>
						</div>
					</div>
				);
			})}
		</div>
	);
};
