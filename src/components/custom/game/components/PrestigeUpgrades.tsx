import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Chip, CanBuyChip } from './Chip';

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
					clickPower: state.resources.clickPower + upgrade.clickPowerIncrease,
					addedClickPower: gameState.resources.addedClickPower + upgrade.clickPowerIncrease,
					clickPowerMultiplier: state.resources.clickPowerMultiplier + upgrade.clickPowerMultiplierIncrease,
				},
				upgrades: {
					...state.upgrades,
					prestige: {
						...state.upgrades.prestige,
						[upgradeName]: {
							...upgrade,
							level: upgrade.level + 1 * gameState.resources.buyPower,
							cost: upgrade.cost * upgrade.costMult * gameState.resources.buyPower,
							firstPurchase: true,
						},
					},
				},
				prestige: {
					...state.prestige,
					points: state.prestige.points - upgrade.cost * upgrade.costMult * gameState.resources.buyPower,
				},
			};
		});
	};

	return (
		<div className="w-full" hidden={!(gameState.prestige.count >= 1)}>
			<Accordion type="single" collapsible>
				<AccordionItem value="Prestige Upgrades">
					<AccordionTrigger>
						<div className="w-full grid grid-cols-3">
							<p>Prestige Upgrades</p>
							<p />
							{<CanBuyChip upgrades={gameState.upgrades.prestige} upgradeType="prestige" />}
						</div>
					</AccordionTrigger>
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
											{<Chip upgrade={gameState.upgrades.prestige[key]} upgradeType="prestige" />}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<p>
											Click Power Increase: +{gameState.upgrades.prestige[key].clickPowerIncrease}
										</p>
										<p>
											Click Power Multiplier Increase: +
											{gameState.upgrades.prestige[key].clickPowerMultiplierIncrease}x
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
