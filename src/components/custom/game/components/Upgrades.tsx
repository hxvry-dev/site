import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom, Upgrade } from '../atomFactory';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Chip } from './Chip';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export type UpgradeTypes = 'base' | 'prestige';

interface UpgradeItemProps {
	upgradeType: UpgradeTypes;
}

export const Upgrades: FC<UpgradeItemProps> = ({ upgradeType }) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const data = gameState.upgrades[upgradeType];

	const getCost = (upgrade: Upgrade) => {
		let cost = upgrade.cost;
		const numUpgrades: number = gameState.resources.buyPower;
		if (numUpgrades === 1 && upgrade.firstPurchase) {
			cost *= upgrade.costMult;
			return cost;
		} else {
			for (let i = 1; i < numUpgrades; i++) {
				cost *= upgrade.costMult;
			}
		}
		return cost;
	};

	const handleUpgrade = (upgrade: Upgrade) => {
		setGameState((state) => {
			return {
				...state,
				resources: {
					...state.resources,
					balance: state.resources.balance - getCost(upgrade),
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
							cost: getCost(upgrade),
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
				<div className="flex grid-flow-col gap-5" key={key}>
					<div>
						<Accordion type="single" collapsible>
							<AccordionItem value={key}>
								<AccordionTrigger>
									<div className="grid grid-cols-3 grid-rows-1 gap-4">
										<div className="w-[200px]">{data[key].name}</div>
										<div className="code max-w-fit px-2 hover:bg-primary-foreground hover:text-foreground">
											Level: {data[key].level} / {data[key].maxLevel}
										</div>
										<div className="justify-self-center">
											<Chip upgrade={data[key]} upgradeType={upgradeType} />
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
								gameState.resources.balance! < data[key].cost || data[key].level >= data[key].maxLevel
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
