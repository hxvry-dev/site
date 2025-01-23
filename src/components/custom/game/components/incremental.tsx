import { useAtom } from 'jotai';
import { gameStateAtom } from '../atomFactory';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ClickerButton from './ClickerButton';
import { useToast } from '@/hooks/use-toast';

export const Incremental = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const { toast } = useToast();
	useEffect(() => {
		const interval = setInterval(() => {
			setGameState((state) => {
				if (!state.resources) {
					console.error('Resources are undefined', state);
					return state;
				}
				console.log('Current State:', state); // Debugging log
				return {
					...state,
					resources: {
						...state.resources,
						amount: state.resources.amount + state.resources.perSecond,
					},
				};
			});
		}, 1000);
		return () => clearInterval(interval);
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
				},
				upgrades: {
					...state.upgrades,
					[upgradeName]: {
						...upgrade,
						level: upgrade.level + 1,
						cost: upgrade.cost * 1.5,
						effect: upgrade.effect + upgrade.effect,
						firstPurchase: true,
					},
				},
			};
		});
	};
	return (
		<div>
			<h1>Idle Game</h1>
			<p>Resources: {gameState.resources.amount.toFixed(2)}</p>
			<ClickerButton />
			<div>
				{Object.keys(gameState.upgrades).map((key) => (
					<Button
						key={key}
						onClick={() => handleUpgrade(key)}
						disabled={
							gameState.resources.amount! < gameState.upgrades[key].cost ||
							gameState.upgrades[key].level >= gameState.upgrades[key].maxLevel
						}
					>
						{key} (Cost: {gameState.upgrades[key].cost}, Level: {gameState.upgrades[key].level})
					</Button>
				))}
			</div>
		</div>
	);
};

export default Incremental;
