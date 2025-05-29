import { FC, useEffect, useRef, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { useAtom } from 'jotai';

import { gameStateV2Atom, toggleAtom } from '../atomFactory';

import { BuyMultiple } from './BuyMultiple';
import { ClickerButton } from './ClickerButton';
import { GameStats } from './GameStats';
import { PrestigeBar } from './PrestigeBar';
import { PrestigeButton } from './PrestigeButton';
import { Upgrades } from './Upgrades';
import { Version } from './version';

import { LoginForm } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import supabase from '@/db/supabase';
import { fetchAndValidateGameState } from '@/db/functions';
import { NavLink } from 'react-router-dom';

async function handleSignOut() {
	await supabase.auth.signOut();
}

export const IncrementalV2: FC = () => {
	const [gameStateV2, setGameStateV2] = useAtom(gameStateV2Atom);
	const [session, setSession] = useState<Session | null>(null);
	const [toggle, setToggle] = useAtom(toggleAtom);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	useEffect(() => {
		const updateResources = () => {
			const now = Date.now();
			const elapsedTime = (now - lastUpdateRef.current) / 1000;
			lastUpdateRef.current = now;

			setGameStateV2((state) => {
				return {
					...state,
					user: {
						...state.user,
						currency_balance: state.user.currency_balance + state.user.currency_per_second * elapsedTime,
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
	}, [setGameStateV2]);

	useEffect(() => {
		document.title = 'Idle Game';
		supabase.auth
			.getSession()
			.then(async ({ data: { session } }) => {
				if (!session) return;
				const gsv2 = await fetchAndValidateGameState();
				if (!gsv2) return;
				setGameStateV2(gsv2);
				return setSession(session);
			})
			.catch((error) => {
				console.error('Failed to fetch game state:', error);
			});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			return setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<>
			{!session ? (
				<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
					<div className="w-full max-w-sm">
						<LoginForm />
					</div>
				</div>
			) : (
				<div>
					<h1 className="font-incremental text-2xl justify-self-center mb-16">Idle Game</h1>
					<div className="justify-self-end pt-0">
						<Button variant="link" onClick={() => handleSignOut()}>
							Sign Out
						</Button>
						<Button variant="link" asChild>
							<NavLink to="/incremental">Load V1</NavLink>
						</Button>
					</div>
					<div className="justify-self-center font-mono">
						<p className="justify-self-center mb-5">Buy Multiple Upgrades!</p>
						<BuyMultiple />
					</div>
					<GameStats />
					<div className="mt-5 px-5 max-w-fit justify-self-center" hidden={!toggle}>
						<legend className="mb-4 font-mono justify-self-center">Upgrades</legend>
						<Tabs defaultValue="base" className="border-2 rounded-sm p-5">
							<TabsList className="self-center bg-background font-mono">
								<TabsTrigger value="base" className="rounded-none">
									Base
								</TabsTrigger>
								<TabsTrigger value="prestige" className="rounded-none">
									Prestige
								</TabsTrigger>
							</TabsList>
							<div className="max-w-[350px] self-center my-5 grid grid-cols-2 grid-rows-2 gap-5">
								<ClickerButton />
								<PrestigeButton />
								<div className="col-span-2 grid-row-2">{<PrestigeBar />}</div>
							</div>
							<TabsContent value="base">{<Upgrades upgradeType="base" />}</TabsContent>
							<TabsContent value="prestige">{<Upgrades upgradeType="prestige" />}</TabsContent>
						</Tabs>
					</div>
					<div className="justify-self-center font-mono">
						<Button
							onClick={() => handleToggle()}
							className={
								!toggle
									? 'mt-5 opacity-85 bg-green-700 hover:bg-green-700/90 text-foreground'
									: 'mt-5 opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground'
							}
						>
							Toggle Upgrades{` ${!toggle ? 'ON' : 'OFF'}`}
						</Button>
					</div>
					<div className="mt-8">
						<Version />
						<div>{JSON.stringify(gameStateV2)}</div>
					</div>
				</div>
			)}
		</>
	);
};

export default IncrementalV2;
