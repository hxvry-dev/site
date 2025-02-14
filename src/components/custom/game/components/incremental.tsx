import { FC, useEffect, useRef } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, initialGameState, toggleAtom } from '../atomFactory';

import { ClickerButton } from './ClickerButton';
import { PrestigeButton } from './PrestigeButton';

import { Button } from '@/components/ui/button';
import { Version } from './version';
import { PrestigeBar } from './PrestigeBar';
import { BuyMultiple } from './BuyMultiple';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upgrades } from './Upgrades';
import { Stats } from './Stats';

export const Incremental: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [toggle, setToggle] = useAtom(toggleAtom);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

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
						balance: state.resources.balance + state.resources.perSecond * elapsedTime,
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
			<h1 className="font-incremental text-2xl justify-self-center mb-16">Idle Game</h1>
			<Stats />
			<div className="mt-4 px-5 max-w-fit justify-self-center" hidden={toggle}>
				<legend className="mb-4 font-mono font-bold italic underline justify-self-center">Upgrades</legend>
				<Tabs defaultValue="base" className="border-2 rounded-sm p-5 justify-items-center">
					<TabsList className="justify-items-center">
						<TabsTrigger value="base">Base</TabsTrigger>
						<TabsTrigger value="prestige">Prestige</TabsTrigger>
					</TabsList>
					<div className="w-[350px] my-5 grid grid-cols-2 grid-rows-2 gap-5">
						<ClickerButton />
						<PrestigeButton />
						<div className="col-span-2 grid-row-2">{<PrestigeBar />}</div>
					</div>
					<TabsContent value="base">{<Upgrades upgradeType="base" />}</TabsContent>
					<TabsContent value="prestige">{<Upgrades upgradeType="prestige" />}</TabsContent>
				</Tabs>
			</div>
			<div className="justify-self-center">
				<Button
					onClick={() => handleToggle()}
					className={
						toggle
							? 'mt-5 opacity-85 bg-green-700 hover:bg-green-700/90 text-foreground'
							: 'mt-5 opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground'
					}
				>
					Toggle Upgrades{` ${toggle ? 'ON' : 'OFF'}`}
				</Button>
			</div>
			<div className="justify-self-center mt-8">
				<Button
					onClick={() => setGameState(initialGameState)}
					className="opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground"
				>
					Reset Game?
				</Button>
			</div>
			<Version />
		</div>
	);
};

export default Incremental;
