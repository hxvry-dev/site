import { useAtom } from 'jotai';
import { gameStateAtom, initialGameState } from '../atomFactory';
import { useEffect, useRef } from 'react';
import ClickerButton from './ClickerButton';
import PrestigeButton from './PrestigeButton';
import { Button } from '@/components/ui/button';
import Upgrades from './upgrades';
import PrestigeUpgrades from './PrestigeUpgrades';

export const Incremental = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
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

	return (
		<div>
			<h1 className="font-incremental text-2xl justify-self-center">Idle Game</h1>
			<div className="grid grid-cols-3 grid-rows-1 gap-0 justify-between">
				<div className="grid float-left">
					<p className="mb-1">Resources: {gameState.resources.amount.toFixed(2)}</p>
					<p className="mb-1">Current Click Power: {gameState.resources.clickPower}</p>
					<p className="mb-1">Resources/second: {gameState.resources.perSecond.toFixed(2)}</p>
					<ClickerButton />
				</div>
				<div className="col-span-1" />
				<div className="grid clear-left float-right">
					<p className="mb-1 text-right">Prestige Points: {gameState.prestige.points}</p>
					<p className="mb-1 text-right">Cost to Prestige: {gameState.prestige.cost}</p>
					<p className="mb-1 text-right"># of successful prestiges: {gameState.prestige.count}</p>
					<PrestigeButton />
				</div>
			</div>
			<div className="flex flex-col flex-grow w-[450px] float-start">
				<Upgrades />
			</div>
			<div className="flex flex-col flex-grow w-[450px] float-right" hidden={!(gameState.prestige.points >= 1)}>
				<PrestigeUpgrades />
			</div>
			<div className="justify-self-center">
				<Button onClick={() => setGameState(initialGameState)} variant="destructive">
					Reset Game?
				</Button>
			</div>
		</div>
	);
};

export default Incremental;
