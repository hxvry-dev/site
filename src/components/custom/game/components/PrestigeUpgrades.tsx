import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BuyChip from './BuyChip';
import { FC } from 'react';

const PrestigeUpgrades: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const { toast } = useToast();

	const handleUpgrade = (upgradeName: string) => {
		setGameState((state) => {
			const upgrade = state.prestige.upgrades[upgradeName];
			if (!state.prestige) {
				console.error('Resources are undefined', state);
				return state;
			}
			if (upgrade.level > upgrade.maxLevel) {
				toast({
					title: 'Buy Action Failed!',
					description: `Buy Failed!\n\nReason: Max Level Reached!`,
				});
				return state;
			} else if (upgrade.cost > state.prestige.points) {
				toast({
					title: 'Buy Action Failed',
					description: `Buy Failed!\n\nReason: Insufficient Funds!\n\nNeeded: ${upgrade.cost}\n\n Have: ${state.prestige.points}`,
				});
			}
			return {
				...state,
				resources: {
					...state.resources,
					perSecond: state.resources.perSecond + upgrade.currencyPerSecond,
					clickPower: (state.resources.clickPower + upgrade.clickPowerIncrease) * upgrade.clickPowerMult,
				},
				prestige: {
					...state.prestige,
					points: state.prestige.points - upgrade.cost,
					upgrades: {
						...state.prestige.upgrades,
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
		<div className="w-full" hidden={!(gameState.prestige.count >= 1)}>
			<Accordion type="single" collapsible>
				<AccordionItem value="Prestige Upgrades">
					<AccordionTrigger>Prestige Upgrades</AccordionTrigger>
					<AccordionContent>
						{Object.keys(gameState.prestige.upgrades).map((key) => (
							<Accordion type="single" collapsible key={key}>
								<AccordionItem value={key}>
									<AccordionTrigger>
										<div className="w-full grid grid-cols-3">
											<p>{gameState.prestige.upgrades[key].name}</p>
											<p>
												Level: {gameState.prestige.upgrades[key].level}/
												{gameState.prestige.upgrades[key].maxLevel}
											</p>
											{
												<BuyChip
													resourceAmount={gameState.prestige.points}
													upgrade={gameState.prestige.upgrades[key]}
												/>
											}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<p>
											Click Power Increase: +{gameState.prestige.upgrades[key].clickPowerIncrease}
										</p>
										<p>
											Click Power Multiplier Increase: +
											{gameState.prestige.upgrades[key].clickPowerMult}
										</p>
										<p>
											Cost: {gameState.prestige.upgrades[key].cost.toFixed(0)} Prestige Point
											{gameState.prestige.upgrades[key].cost > 1 ? 's' : ''}
										</p>
										<small>{gameState.prestige.upgrades[key].description}</small>
										<div>
											<Button
												onClick={() => handleUpgrade(key)}
												disabled={
													gameState.prestige.points! <
														gameState.prestige.upgrades[key].cost ||
													gameState.prestige.upgrades[key].level >=
														gameState.prestige.upgrades[key].maxLevel
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

export default PrestigeUpgrades;
