import { FC, useEffect, useRef, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';

import { toggleAtom } from '../atomFactory';

import { Version } from './version';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAndValidateGameState } from '@/db/functions';
import { NavLink, useNavigate } from 'react-router-dom';
import { UpgradesV2 } from './UpgradesV2';
import { GameStateV2 } from '../schema';
import { supabase } from '@/db/supabaseClient';

import { BuyMultipleV2 } from './BuyMultipleV2';
import { ClickerButtonV2 } from './ClickerButtonV2';
import { GameStatsV2 } from './GameStatsV2';
import { PrestigeBarV2 } from './PrestigeBarV2';
import { PrestigeButtonV2 } from './PrestigeButtonV2';
import { Cart } from './Cart';

export const purchasePowerAtom = atom<number>(1);

const defaultGameStateV2 = async (): Promise<GameStateV2> => {
	const result = await fetchAndValidateGameState().then((data) => {
		const gsv2: GameStateV2 = {
			user: data!.user,
			userUpgrades: data!.userUpgrades,
			upgrades: data!.upgrades,
		};
		return gsv2;
	});
	return result;
};

const createGameStateV2 = (initialState: GameStateV2) => {
	return atom(initialState);
};

export const gameStateV2Atom = createGameStateV2(await defaultGameStateV2());

const IncrementalV2: FC = () => {
	const nav = useNavigate();
	const [gameStateV2, setGameState] = useAtom(gameStateV2Atom);
	const [session, setSession] = useState<Session | null>(null);
	const [toggle, setToggle] = useAtom(toggleAtom);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	useEffect(() => {
		document.title = 'Idle Game (V2)';
		const fetchSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.refreshSession();
			setSession(session);
		};
		fetchSession();
		const { data: authListener } = supabase!.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		return () => {
			authListener.subscription?.unsubscribe();
		};
	}, []);

	useEffect(() => {
		const updateResources = () => {
			const now = Date.now();
			const elapsedTime = (now - lastUpdateRef.current) / 1000;
			lastUpdateRef.current = now;
			setGameState((state) => {
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
	}, [setGameState]);

	return (
		<>
			{!session ? (
				<div>No Session</div>
			) : (
				<div>
					<h1 className="font-incremental text-2xl justify-self-center mb-16">Idle Game</h1>
					<div className="justify-self-end pt-0">
						<Button
							variant="link"
							onClick={async () => {
								await supabase!.auth.signOut();
								sessionStorage.clear();
								nav('/');
							}}
						>
							Sign Out
						</Button>
						<Button variant="link" asChild>
							<NavLink to="/incremental">Load V1</NavLink>
						</Button>
					</div>
					<div className="justify-self-center font-mono">
						<p className="justify-self-center mb-5">Buy Multiple Upgrades!</p>
						<BuyMultipleV2 />
					</div>
					<GameStatsV2 />
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
								<ClickerButtonV2 />
								<PrestigeButtonV2 initialState={gameStateV2} />
								<div className="col-span-2 grid-row-2">{<PrestigeBarV2 />}</div>
							</div>
							<TabsContent value="base">{<UpgradesV2 upgradeType="base" />}</TabsContent>
							<TabsContent value="prestige">{<UpgradesV2 upgradeType="prestige" />}</TabsContent>
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
						<Cart />
					</div>
				</div>
			)}
		</>
	);
};

export default IncrementalV2;
