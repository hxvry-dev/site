import { FC, useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, initialGameState } from '../atomFactory';

import { ClickerButton } from './ClickerButton';
import { PrestigeButton } from './PrestigeButton';
import { PrestigeUpgrades } from './PrestigeUpgrades';
import { UpgradePanel } from './UpgradePanel';

import { Button } from '@/components/ui/button';

export const Incremental: FC = () => {
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
					<p className="mb-1">Current Click Power: {gameState.resources.clickPower.toFixed(0)}</p>
					<p className="mb-1">Resources/second: {gameState.resources.perSecond.toFixed(2)}</p>
					<ClickerButton />
				</div>
				<div className="col-span-1" />
				<div className="grid clear-left float-right">
					<p className="mb-1 text-right">Prestige Points: {gameState.prestige.points.toFixed(0)}</p>
					<p className="mb-1 text-right">Cost to Prestige: {gameState.prestige.cost.toFixed(0)}</p>
					<p className="mb-1 text-right"># of successful prestiges: {gameState.prestige.count.toFixed(0)}</p>
					<PrestigeButton />
				</div>
			</div>
			<div className="flex flex-col flex-grow w-[650px] float-start">
				<UpgradePanel />
			</div>
			<div className="flex flex-col flex-grow w-[650px] float-right">
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
