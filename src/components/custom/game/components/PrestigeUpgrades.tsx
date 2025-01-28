import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { BuyChip } from './BuyChip';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const PrestigeUpgrades: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);

	const handleUpgrade = (upgradeName: string) => {
		setGameState((state) => {
			const upgrade = state.upgrades.prestige[upgradeName];
			if (!state.prestige) {
				console.error('Resources are undefined', state);
				return state;
			}
			return {
				...state,
				resources: {
					...state.resources,
					perSecond: state.resources.perSecond + upgrade.currencyPerSecond,
					clickPower: (state.resources.clickPower + upgrade.clickPowerIncrease) * upgrade.clickPowerMult,
				},
				upgrades: {
					...state.upgrades,
					prestige: {
						...state.upgrades.prestige,
						[upgradeName]: {
							...upgrade,
							level: upgrade.level + 1,
							cost: upgrade.cost * upgrade.costMult,
							firstPurchase: true,
						},
					},
				},
				prestige: {
					...state.prestige,
					points: state.prestige.points - upgrade.cost,
				},
			};
		});
	};

	return (
		<div className="w-full" hidden={!(gameState.prestige.count >= 1)}>
			<Accordion type="single" collapsible>
				<AccordionItem value="Prestige Upgrades">
					<AccordionTrigger>Prestige Upgrades</AccordionTrigger>
					<AccordionContent>
						{Object.keys(gameState.upgrades.prestige).map((key) => (
							<Accordion type="single" collapsible key={key}>
								<AccordionItem value={key}>
									<AccordionTrigger>
										<div className="w-full grid grid-cols-3">
											<p>{gameState.upgrades.prestige[key].name}</p>
											<p>
												Level: {gameState.upgrades.prestige[key].level}/
												{gameState.upgrades.prestige[key].maxLevel}
											</p>
											{
												<BuyChip
													resourceAmount={gameState.prestige.points}
													upgrade={gameState.upgrades.prestige[key]}
												/>
											}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<p>
											Click Power Increase: +{gameState.upgrades.prestige[key].clickPowerIncrease}
										</p>
										<p>
											Click Power Multiplier Increase: +
											{gameState.upgrades.prestige[key].clickPowerMult}
										</p>
										<p>
											Cost: {gameState.upgrades.prestige[key].cost.toFixed(0)} Prestige Point
											{gameState.upgrades.prestige[key].cost > 1 ? 's' : ''}
										</p>
										<small>{gameState.upgrades.prestige[key].description}</small>
										<div>
											<Button
												onClick={() => handleUpgrade(key)}
												disabled={
													gameState.prestige.points! <
														gameState.upgrades.prestige[key].cost ||
													gameState.upgrades.prestige[key].level >=
														gameState.upgrades.prestige[key].maxLevel
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
