import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom, Upgrade } from '../atomFactory';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Chip } from './Chip';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { UpgradeTypes } from '../util/types';
import { getCost } from '../util/util';

interface UpgradeItemProps {
	upgradeType: UpgradeTypes;
}

export const Upgrades: FC<UpgradeItemProps> = ({ upgradeType }) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const data = gameState.upgrades[upgradeType];
	const resources = upgradeType === 'base' ? gameState.resources.balance : gameState.prestige.points;

	const handleUpgrade = (upgrade: Upgrade) => {
		setGameState((state) => {
			return {
				...state,
				resources: {
					...state.resources,
					balance: resources - getCost(upgrade, gameState),
					perSecond: state.resources.perSecond + upgrade.currencyPerSecond * state.resources.buyPower,
					clickPower: state.resources.clickPower + upgrade.clickPowerIncrease * state.resources.buyPower,
					addedClickPower:
						state.resources.addedClickPower + upgrade.clickPowerIncrease * state.resources.buyPower,
					clickPowerMultiplier:
						state.resources.clickPowerMultiplier +
						upgrade.clickPowerMultiplierIncrease * state.resources.buyPower,
				},
				upgrades: {
					...state.upgrades,
					[upgradeType]: {
						...state.upgrades[upgradeType],
						[upgrade.id]: {
							...upgrade,
							level: upgrade.level + gameState.resources.buyPower,
							cost: getCost(upgrade, gameState),
							firstPurchase: true,
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
												{data[key].level} / {data[key].maxLevel}
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
																		data[key].clickPowerIncrease *
																		gameState.resources.buyPower
																	).toFixed(2)}
																</div>
															</TooltipTrigger>
															<TooltipContent className="bg-background border-2 text-foreground">
																<div>
																	Current Bonus: +{gameState.resources.clickPower}{' '}
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
																		data[key].clickPowerMultiplierIncrease *
																		gameState.resources.buyPower
																	).toFixed(2)}
																	x
																</div>
															</TooltipTrigger>
															<TooltipContent className="bg-background border-2 text-foreground">
																<div>
																	Current Bonus:{' '}
																	{gameState.resources.clickPowerMultiplier}x Currency
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
																		data[key].currencyPerSecond *
																		gameState.resources.buyPower
																	).toFixed(2)}
																	/s
																</div>
															</TooltipTrigger>
															<TooltipContent className="font-medium bg-background border-2 text-foreground">
																<div>
																	Current Bonus: +{gameState.resources.perSecond}{' '}
																	Currency/per second (Automatically!!){' '}
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
					<div className="max-w-fit content-center">
						<Button
							disabled={
								resources < getCost(data[key], gameState) && data[key].level != data[key].maxLevel
							}
							onClick={() => handleUpgrade(data[key])}
						>
							Buy Upgrade
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};
