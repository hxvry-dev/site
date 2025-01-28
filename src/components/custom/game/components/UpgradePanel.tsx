import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { BuyChip } from './BuyChip';
import { FC } from 'react';

export const UpgradePanel: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);

	const handleUpgrade = (upgradeName: string) => {
		setGameState((state) => {
			const upgrade = state.upgrades.base[upgradeName];
			if (!state.resources) {
				console.error('Resources are undefined', state);
				return state;
			}
			return {
				...state,
				resources: {
					...state.resources,
					amount: state.resources.amount - upgrade.cost,
					perSecond: state.resources.perSecond + upgrade.currencyPerSecond,
					clickPower: gameState.resources.clickPower + upgrade.clickPowerIncrease,
					addedClickPower: gameState.resources.addedClickPower + upgrade.clickPowerIncrease,
					clickPowerMultiplier: state.resources.clickPowerMultiplier + upgrade.clickPowerMultiplierIncrease,
				},
				upgrades: {
					...state.upgrades,
					base: {
						...state.upgrades.base,
						[upgradeName]: {
							...upgrade,
							level: upgrade.level + 1,
							cost: upgrade.cost * upgrade.costMult,
							firstPurchase: true,
						},
					},
				},
			};
		});
	};

	return (
		<div className="w-full">
			<Accordion type="single" collapsible>
				<AccordionItem value="Upgrades">
					<AccordionTrigger>Upgrades</AccordionTrigger>
					<AccordionContent>
						{Object.keys(gameState.upgrades.base).map((key) => (
							<Accordion type="single" collapsible key={key}>
								<AccordionItem value={key}>
									<AccordionTrigger>
										<div className="w-full grid grid-cols-3">
											<p>{gameState.upgrades.base[key].name}</p>
											<p>
												Level: {gameState.upgrades.base[key].level}/
												{gameState.upgrades.base[key].maxLevel}
											</p>
											{
												<BuyChip
													resourceAmount={gameState.resources.amount}
													upgrade={gameState.upgrades.base[key]}
												/>
											}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<small>{gameState.upgrades.base[key].description}</small>
										<p>Click Power Increase: +{gameState.upgrades.base[key].clickPowerIncrease}</p>
										<p>
											Click Power Multiplier Increase: +
											{gameState.upgrades.base[key].clickPowerMultiplierIncrease}x
										</p>
										<p>
											Currency Per Second Increase: +
											{gameState.upgrades.base[key].currencyPerSecond.toFixed(2)}
										</p>
										<p>Cost: {gameState.upgrades.base[key].cost.toFixed(2)}</p>
										<div>
											<Button
												onClick={() => handleUpgrade(key)}
												disabled={
													gameState.resources.amount! < gameState.upgrades.base[key].cost ||
													gameState.upgrades.base[key].level >=
														gameState.upgrades.base[key].maxLevel
												}
											>
												Buy Upgrade
											</Button>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
};
