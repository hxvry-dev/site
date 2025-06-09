import { FC } from 'react';

import { useAtom } from 'jotai';

import { ChipV2 } from './Chip';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upgrade, Upgrades, UserUpgrade } from '../schema';
import { calculateLocalLevel } from '@/db/functions';
import { getCostV2 } from '../util/util';
import { gameStateV2Atom, purchasePowerAtom } from './IncrementalV2';
import { toast } from 'sonner';

interface UpgradeItemPropsV2 {
	upgradeType: 'base' | 'prestige';
}

interface Cost {
	[key: string]: number;
}

const userID: string | void | null =
	sessionStorage.getItem('user_gotten') === 'true'
		? sessionStorage.getItem('user_id')
		: console.log('userID not defined.');

export const UpgradesV2: FC<UpgradeItemPropsV2> = ({ upgradeType }) => {
	const [gameState, setGameState] = useAtom(gameStateV2Atom);
	const [purchasePower] = useAtom(purchasePowerAtom);
	const data: Upgrades = gameState.upgrades.filter((u) => u.upgrade_type === upgradeType);
	const resources: number =
		upgradeType === 'base' ? gameState.user.currency_balance : gameState.user.prestige_points_balance;
	const costs: Cost = {};
	for (let keys of data) {
		costs[keys.upgrade_id] = getCostV2(keys, gameState, purchasePower);
	}
	const handleUpgrade = (upgrade: Upgrade) => {
		let result: UserUpgrade;
		result = {
			user_id: userID!.toString(),
			upgrade_id: upgrade.upgrade_id,
			level_current: calculateLocalLevel(upgrade, gameState) + purchasePower,
			prestige_num: gameState.user.num_times_prestiged,
		};
		costs[upgrade.upgrade_id] = getCostV2(upgrade, gameState, purchasePower);
		if (costs[upgrade.upgrade_id] >= gameState.user.currency_balance) return;
		console.log(costs);
		if (result.user_id === userID) {
			gameState.userUpgrades.push(result);
			toast.success('Purchased Upgrade(s)!');
			console.log(gameState.userUpgrades);
			setGameState((state) => {
				return {
					...state,
					user: {
						...state.user,
						currency_balance: state.user.currency_balance - costs[upgrade.upgrade_id],
						currency_per_second:
							state.user.currency_per_second + upgrade.currency_per_second_inc * purchasePower,
						currency_per_click: state.user.currency_per_click + upgrade.cpc_inc * purchasePower,
						currency_per_click_mult:
							state.user.currency_per_click_mult + upgrade.cpc_mult_inc * purchasePower,
					},
				};
			});
		} else {
			toast.warning('Purchase failed!');
		}
	};
	return (
		<div>
			{data.map((upgrade) => (
				<div className="flex grid-flow-col gap-5 font-mono" key={upgrade.upgrade_id}>
					<div>
						<Accordion type="single" collapsible>
							<AccordionItem value={upgrade.upgrade_name}>
								<AccordionTrigger className="hover:bg-muted/50 px-5">
									<div className="grid grid-cols-4 grid-rows-1 gap-2">
										<div className="w-[200px]">{upgrade.upgrade_name}</div>
										<div>
											Level:{' '}
											<span className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
												{calculateLocalLevel(upgrade, gameState)} / {upgrade.level_max}
											</span>
										</div>
										<div>
											Cost:{' '}
											<span className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
												{costs[upgrade.upgrade_id].toLocaleString('en-us', {
													maximumFractionDigits: 2,
												})}
											</span>
										</div>
										<div>
											<ChipV2 upgrade={upgrade} resources={gameState.user.currency_balance} />
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent className="pt-5">
									<div>
										<legend className="font-mono">Upgrade Description</legend>
										<div className="max-w-[550px] border-2 p-2 mt-2 font-mono italic text-xs overflow-scroll">
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
																<div className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
																	+{(upgrade.cpc_inc * purchasePower).toFixed(2)}
																</div>
															</TooltipTrigger>
															<TooltipContent className="bg-background border-2 text-foreground max-w-[240px]">
																<div>
																	Current Bonus: +{gameState.user.currency_per_click}{' '}
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
																<div className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
																	+{(upgrade.cpc_mult_inc * purchasePower).toFixed(2)}
																	x
																</div>
															</TooltipTrigger>
															<TooltipContent className="bg-background border-2 text-foreground max-w-[240px]">
																<div>
																	Current Bonus:{' '}
																	{gameState.user.currency_per_click_mult}x Currency
																	per Click
																</div>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</TableCell>
												<TableCell>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<div className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
																	+
																	{(
																		upgrade.currency_per_second_inc * purchasePower
																	).toFixed(2)}
																	/s
																</div>
															</TooltipTrigger>
															<TooltipContent className="font-medium bg-background border-2 text-foreground">
																<div>
																	Current Bonus: +{gameState.user.currency_per_second}{' '}
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
							disabled={
								resources < getCostV2(upgrade, gameState, purchasePower) &&
								calculateLocalLevel(upgrade, gameState) != upgrade.level_max
							}
							onClick={() => handleUpgrade(upgrade)}
						>
							Buy Upgrade
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};
