import { useAtom } from 'jotai';
import { gameStateAtom, initialGameState } from '../atomFactory';
import { useEffect, useRef } from 'react';
import ClickerButton from './ClickerButton';
import { useToast } from '@/hooks/use-toast';
import PrestigeButton from './PrestigeButton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export const Incremental = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const { toast } = useToast();
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	useEffect(() => {
		const updateResources = () => {
			const now = Date.now();
			const elapsedTime = (now - lastUpdateRef.current) / 1000; // convert to seconds
			lastUpdateRef.current = now;

			setGameState((state) => {
				if (!state.resources) {
					console.error('Resources are undefined', state);
					return state;
				}

				return {
					...state,
					resources: {
						...state.resources,
						amount: state.resources.amount + state.resources.perSecond * elapsedTime,
					},
				};
			});
		};

		intervalRef.current = setInterval(updateResources, 1000 / 60);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [setGameState]);

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
		<div>
			<h1 className="font-incremental text-2xl justify-self-center w-fit">Idle Game</h1>
			<div className="grid grid-cols-2 gap-0">
				<div className="flex flex-col flex-grow w-[450px] float-start">
					<p className="mb-1">Resources: {gameState.resources.amount.toFixed(2)}</p>
					<p className="mb-1">Current Click Power: {gameState.resources.clickPower}</p>
					<p className="mb-1">Resources/second: {gameState.resources.perSecond.toFixed(2)}</p>
					<ClickerButton />
				</div>

				<div className="flex flex-col flex-grow w-[450px] float-right">
					<p className="mb-1">Prestige Points: {gameState.prestige.points}</p>
					<p className="mb-1">Cost to Prestige: {gameState.prestige.cost}</p>
					<p className="mb-1"># of successful prestiges: {gameState.prestige.count}</p>
					<PrestigeButton />
				</div>
			</div>

			<div>
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
												Level: {gameState.upgrades[key].level}/
												{gameState.upgrades[key].maxLevel}
											</p>
											<p>Cost: {gameState.upgrades[key].cost.toFixed(2)}</p>
											<div>
												<Button
													onClick={() => handleUpgrade(key)}
													disabled={
														gameState.resources.amount! < gameState.upgrades[key].cost ||
														gameState.upgrades[key].level >=
															gameState.upgrades[key].maxLevel
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
			<Button onClick={() => setGameState(initialGameState)}>Reset Game?</Button>
		</div>
	);
};

export default Incremental;
