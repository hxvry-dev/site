import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, upgradesAtom, userIdAtom } from '../atomFactory';
import { DbUpgrade, zUpgrade } from '../schema';
import { getCost } from '../util/util';

import { Chip } from './Chip';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent,TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { purchaseUserUpgrade } from '@/db/functions';

interface UpgradeItemProps {
	upgradeType: 'base' | 'prestige';
}

export const Upgrades: FC<UpgradeItemProps> = ({ upgradeType }) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [userID] = useAtom(userIdAtom);
	const [upgrades] = useAtom(upgradesAtom);
	const data = gameState.upgrades[upgradeType];
	const resources =
		upgradeType === 'base'
			? gameState.resources.currencyBalance.main
			: gameState.resources.currencyBalance.prestige;

	const handleUpgrade = (upgrade: zUpgrade) => {
		let balance;
		if (upgrade.type === 'base') {
			balance = {
				...gameState.resources.currencyBalance,
				main: gameState.resources.currencyBalance.main - getCost(upgrade, gameState),
			};
		} else {
			balance = {
				...gameState.resources.currencyBalance,
				prestige: gameState.resources.currencyBalance.prestige - getCost(upgrade, gameState),
			};
		}
		setGameState((state) => {
			return {
				...state,
				resources: {
					...state.resources,
					currencyBalance: balance,
					currencyPerSecond:
						state.resources.currencyPerSecond +
						upgrade.stats.currencyPerSecondIncrease * state.resources.purchasePower,
					currencyPerClick:
						state.resources.currencyPerClick +
						upgrade.stats.currencyPerClickIncrease * state.resources.purchasePower,
					currencyPerClickMultiplier:
						state.resources.currencyPerClickMultiplier +
						upgrade.stats.currencyPerClickMultiplierIncrease * state.resources.purchasePower,
				},
				upgrades: {
					...state.upgrades,
					[upgradeType]: {
						...state.upgrades[upgradeType],
						[upgrade.id]: {
							...upgrade,
							cost: {
								current: getCost(upgrade, state),
								multiplier: upgrade.cost.multiplier,
							},
							level: {
								...upgrade.level,
								current: upgrade.level.current + state.resources.purchasePower,
							},
						},
					},
				},
			};
		});
	};
	return (
		<div>
			{Object.keys(data).map((key) => (
				<div className="flex grid-flow-col gap-5 font-mono" key={key}>
					<div>
						<Accordion type="single" collapsible>
							<AccordionItem value={key}>
								<AccordionTrigger>
									<div className="grid grid-cols-4 grid-rows-1 gap-2">
										<div className="w-[200px]">{data[key].name}</div>
										<div>
											Level:{' '}
											<span className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
												{data[key].level.current} / {data[key].level.max}
											</span>
										</div>
										<div>
											Cost:{' '}
											<span className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
												{getCost(data[key], gameState).toFixed(2)}
											</span>
										</div>
										<div>
											<Chip upgrade={data[key]} resources={resources} />
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<legend className="font-mono">Upgrade Description</legend>
										<div className="max-w-[550px] border-2 p-2 mt-2 font-mono italic text-xs overflow-scroll">
											{data[key].description}
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
											<TableRow className="hover:bg-background">
												<TableCell>
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger asChild>
																<div className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
																	+
																	{(
																		data[key].stats.currencyPerClickIncrease *
																		gameState.resources.purchasePower
																	).toFixed(2)}
																</div>
															</TooltipTrigger>
															<TooltipContent className="bg-background border-2 text-foreground max-w-[240px] overflow-auto">
																<div>
																	Current Bonus: +
																	{gameState.resources.currencyPerClick}{' '}
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
																	+
																	{(
																		data[key].stats
																			.currencyPerClickMultiplierIncrease *
																		gameState.resources.purchasePower
																	).toFixed(2)}
																	x
																</div>
															</TooltipTrigger>
															<TooltipContent className="bg-background border-2 text-foreground max-w-[240px] overflow-auto">
																<div>
																	Current Bonus:{' '}
																	{gameState.resources.currencyPerClickMultiplier}x
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
																<div className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
																	+
																	{(
																		data[key].stats.currencyPerSecondIncrease *
																		gameState.resources.purchasePower
																	).toFixed(2)}
																	/s
																</div>
															</TooltipTrigger>
															<TooltipContent className="font-medium bg-background border-2 text-foreground">
																<div>
																	Current Bonus: +
																	{gameState.resources.currencyPerSecond} Currency/per
																	second (Automatically!!){' '}
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
					<div className="grid grid-cols-2 max-w-fit content-center">
						<Button
							disabled={
								resources < getCost(data[key], gameState) &&
								data[key].level.current != data[key].level.max
							}
							onClick={() => handleUpgrade(data[key])}
						>
							Buy Upgrade
						</Button>

						<Button onClick={() => purchaseUserUpgrade(userID, upgrades[0] as DbUpgrade, 22)}>
							Buy Upgrade v2 *** DON'T SPAM ***
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};
