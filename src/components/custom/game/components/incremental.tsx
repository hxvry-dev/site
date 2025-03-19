import { FC, useEffect, useRef, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { useAtom } from 'jotai';

import { debugGameState, debugModeAtom, gameStateAtom, initialGameState, toggleAtom, userIdAtom } from '../atomFactory';

import { BuyMultiple } from './BuyMultiple';
import { ClickerButton } from './ClickerButton';
import { EnterDebug } from './DebugMode';
import { GameStats } from './GameStats';
import { PrestigeBar } from './PrestigeBar';
import { PrestigeButton } from './PrestigeButton';
import { Upgrades } from './Upgrades';
import { Version } from './version';

import { LoginForm } from '@/components/login-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import supabase from '@/db/supabase';
import { fetchAndValidateGameState } from '@/db/functions';

async function handleSignOut() {
	await supabase.auth.signOut();
}

export const Incremental: FC = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [, setGameState] = useAtom(gameStateAtom);
	const [toggle, setToggle] = useAtom(toggleAtom);
	const [debugMode, setDebugMode] = useAtom(debugModeAtom);

	const [userID, setUserID] = useAtom(userIdAtom);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	const handleReset = () => {
		setGameState((state) => {
			return {
				...initialGameState,
				resources: {
					...initialGameState.resources,
					currencyBalance: {
						main: state.resources.currencyBalance.main,
						prestige: state.resources.currencyBalance.prestige,
					},
				},
				upgrades: {
					...initialGameState.upgrades,
				},
				prestige: {
					...initialGameState.prestige,
				},
			};
		});
	};

	useEffect(() => {
		document.title = 'Idle Game';
	}, []);

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
						currencyBalance: {
							...state.resources.currencyBalance,
							main:
								state.resources.currencyBalance.main + state.resources.currencyPerSecond * elapsedTime,
						},
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

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(async ({ data: { session } }) => {
				if (session) {
					setUserID(session.user.id);
					fetchAndValidateGameState(session.user.id).then((state) => {
						console.log(state);
					});
				}
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
					lol this is temporary{' '}
					<p>
						User ID {`=>`} {userID}
					</p>
					<h1 className="font-incremental text-2xl justify-self-center mb-16">Idle Game</h1>
					<div className="justify-self-end pt-0">
						<Button variant="link" onClick={() => handleSignOut()}>
							Sign Out
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
					<EnterDebug />
					{debugMode ? (
						<div className="grid grid-flow-rows gap-4 justify-self-center mt-8 font-mono">
							<div className="max-w-[300px] justify-self-center font-mono overflow-auto">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												onClick={() => setGameState(debugGameState)}
												className="opacity-85 bg-green-800 hover:bg-green-800/90 text-foreground"
											>
												Set Debug State?
											</Button>
										</TooltipTrigger>
										<TooltipContent className="bg-background border-2 text-foreground max-w-[240px] overflow-auto">
											This button will set a{' '}
											<code className="bg-accent text-foreground px-0.5">GameState</code> item
											that makes live debugging and testing easier. Please note that this change
											is destructive as of now, and will require a full state reset to be able to
											play the game again. This <b>will</b> be changed in a future update.
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div className="max-w-[300px] justify-self-center font-mono overflow-auto">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												onClick={() => handleReset()}
												className="opacity-85 bg-red-800 hover:bg-red-800/90 text-foreground"
											>
												Reset Upgrades?
											</Button>
										</TooltipTrigger>
										<TooltipContent className="bg-background border-2 text-foreground max-w-[240px] overflow-auto">
											<p>
												This button will reset the upgrades that you&apos;ve purchased, but will
												not reset the resource balance(s) you have gained.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<div className="max-w-[300px] justify-self-center font-mono overflow-auto">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												onClick={() => {
													setDebugMode(false);
													setGameState(initialGameState);
												}}
												className="opacity-85 bg-yellow-600 hover:bg-yellow-600/90 text-foreground"
											>
												Leave Debug Mode?
											</Button>
										</TooltipTrigger>
										<TooltipContent className="bg-background border-2 text-foreground max-w-[240px] overflow-auto">
											<p>
												This button leaves the debug mode. If you would like to come back, just
												put the password back in :&#41;
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					) : (
						<></>
					)}
					<div className="mt-8">
						<Version />
					</div>
				</div>
			)}
		</>
	);
};

export default Incremental;
