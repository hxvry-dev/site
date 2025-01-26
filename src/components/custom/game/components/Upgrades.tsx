import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { gameStateAtom } from '../atomFactory';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Upgrades = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const { toast } = useToast();

	const handleUpgrade = (upgradeName: string) => {
		setGameState((state) => {
			const upgrade = state.upgrades[upgradeName];
			if (!state.resources) {
				console.error('Resources are undefined', state);
				return state;
			}
			if (upgrade.level > upgrade.maxLevel) {
				toast({
					title: 'Buy Action Failed!',
					description: `Buy Failed!\n\nReason: Max Level Reached!`,
				});
				return state;
			} else if (upgrade.cost > state.resources.amount) {
				toast({
					title: 'Buy Action Failed',
					description: `Buy Failed!\n\nReason: Insufficient Funds!\n\nNeeded: ${upgrade.cost}\n\n Have: ${state.resources.amount}`,
				});
			}
			const newResourceAmount = state.resources.amount - upgrade.cost;
			return {
				...state,
				resources: {
					...state.resources,
					amount: newResourceAmount,
					perSecond: state.resources.perSecond + upgrade.currencyPerSecond,
					clickPower: state.resources.clickPower + upgrade.clickPowerIncrease,
				},
				upgrades: {
					...state.upgrades,
					[upgradeName]: {
						...upgrade,
						level: upgrade.level + 1,
						cost: upgrade.cost * upgrade.costMult,
						firstPurchase: true,
					},
				},
			};
		});
	};

	return (
		<div className="w-[450px]">
			<Accordion type="single" collapsible>
				<AccordionItem value="Upgrades">
					<AccordionTrigger>Upgrades</AccordionTrigger>
					<AccordionContent>
						{Object.keys(gameState.upgrades).map((key) => (
							<Accordion type="single" collapsible key={key}>
								<AccordionItem value={key}>
									<AccordionTrigger>{gameState.upgrades[key].name}</AccordionTrigger>
									<AccordionContent>
										<small>{gameState.upgrades[key].description}</small>
										<p>Click Power Increase: +{gameState.upgrades[key].clickPowerIncrease}</p>
										<p>
											Level: {gameState.upgrades[key].level}/{gameState.upgrades[key].maxLevel}
										</p>
										<p>Cost: {gameState.upgrades[key].cost.toFixed(2)}</p>
										<div>
											<Button
												onClick={() => handleUpgrade(key)}
												disabled={
													gameState.resources.amount! < gameState.upgrades[key].cost ||
													gameState.upgrades[key].level >= gameState.upgrades[key].maxLevel
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

export default Upgrades;
