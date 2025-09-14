import { FC, useEffect, useRef, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAndValidateGameState, upsertUserUpgrades } from '@/db/functions';
import { NavLink, useNavigate } from 'react-router-dom';
import { UpgradesV2 } from './UpgradesV2';
import { supabase } from '@/db/supabaseClient';

import { BuyMultipleV2 } from './BuyMultipleV2';
import { ClickerButtonV2 } from './ClickerButtonV2';
import { GameStatsV2 } from './GameStatsV2';
import { PrestigeBarV2 } from './PrestigeBarV2';
import { PrestigeButtonV2 } from './PrestigeButtonV2';
import { Version } from '../version';
import { GameStateV2 } from './util/v2-schema';
import { toggleAtom } from '../v1/util/atomFactory';
import { OfflineProgressModal } from './OfflineProgressModal';
import { toast } from 'sonner';
import { TotalBonusDialog } from './dialogs/TotalBonusDialog';
import { PrestigeSelect } from './PrestigeSelect';

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

export const purchasePowerAtom = atom<number>(1);
export const gameStateV2Atom = createGameStateV2(await defaultGameStateV2());
export const prestigeFilterAtom = atom<number>(0);

const IncrementalV2: FC = () => {
	const nav = useNavigate();
	const [gameStateV2, setGameState] = useAtom(gameStateV2Atom);
	const [prestigeFilter, setPrestigeFilter] = useAtom(prestigeFilterAtom);
	const [session, setSession] = useState<Session | null>(null);
	const [toggle, setToggle] = useAtom(toggleAtom);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	const gameStateRef = useRef<GameStateV2>(gameStateV2);
	gameStateRef.current = gameStateV2;

	const [showOfflineModal, setShowOfflineModal] = useState(false);
	const [offlineData, setOfflineData] = useState({
		timeAway: 0,
		currencyEarned: 0,
		currencyPerSecond: 0,
	});

	const handleToggle = () => {
		setToggle((prev) => !prev);
	};

	const checkOfflineProgress = () => {
		let _lastSeen: string;
		if (sessionStorage.getItem('last_seen')) {
			_lastSeen = sessionStorage.getItem('last_seen')!;
		} else {
			_lastSeen = gameStateV2.user.last_seen;
		}
		const lastSeen: number = Date.parse(_lastSeen);
		if (!lastSeen || !gameStateV2?.user) return;
		const now: number = Date.now();
		const timeAway: number = (now - lastSeen) / 1000;
		if (timeAway < 30) return;
		const maxOfflineHours: number = 24;
		const cappedTimeAway: number = Math.min(timeAway, maxOfflineHours * 3600);
		const currencyEarned: number = gameStateV2.user.currency_per_second * cappedTimeAway;

		setGameState((state) => ({
			...state,
			user: {
				...state.user,
				currency_balance: state.user.currency_balance + currencyEarned,
			},
		}));

		setOfflineData({
			timeAway: cappedTimeAway,
			currencyEarned: currencyEarned,
			currencyPerSecond: gameStateV2.user.currency_per_second,
		});

		setShowOfflineModal(true);
	};

	const closeOfflineModal = () => {
		const lastSeen = new Date().toISOString();
		setShowOfflineModal(false);
		sessionStorage.setItem('last_seen', lastSeen);
		setGameState((state) => ({
			...state,
			user: {
				...state.user,
				last_seen: lastSeen,
			},
		}));
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
		const interval = setInterval(() => {
			upsertUserUpgrades(gameStateRef.current).catch((error) => {
				console.error('Auto-save failed:', error);
				toast.error('Auto-save failed');
			});
		}, 10000); // Saves every 10 seconds.
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (document.hidden) {
				const lastSeen = new Date().toISOString();
				sessionStorage.setItem('last_seen', lastSeen);
				setGameState((state) => ({
					...state,
					user: {
						...state.user,
						last_seen: lastSeen,
					},
				}));
			} else {
				checkOfflineProgress();
			}
		};

		const handleBeforeUnload = () => {
			const lastSeen = new Date().toISOString();
			sessionStorage.setItem('last_seen', lastSeen);
			setGameState((state) => ({
				...state,
				user: {
					...state.user,
					last_seen: lastSeen,
				},
			}));
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		window.addEventListener('visibilitychange', handleVisibilityChange);

		checkOfflineProgress();

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
			window.removeEventListener('visibilitychange', handleVisibilityChange);
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
			{session ? (
				<div>
					<h1 className="font-incremental text-2xl justify-self-center mb-8">Idle Game</h1>
					<div className="justify-self-center border-2 px-5 mb-8">
						<Button
							variant="link"
							onClick={async () => {
								await supabase!.auth.signOut();
								nav('/login');
								sessionStorage.clear();
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
						<div className="mb-4 font-mono justify-self-center">
							<TotalBonusDialog state={gameStateRef.current} />
						</div>
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
							<div className="max-w-[350px] self-center my-5 grid grid-cols-2 grid-rows-3 gap-5">
								<ClickerButtonV2 />
								<PrestigeButtonV2 initialState={gameStateV2} />
								<div className="col-span-2 grid-row-2">{<PrestigeBarV2 />}</div>
								<div className="justify-self-center col-span-2 grid-row-3">
									<legend>Filter Upgrades by Prestige</legend>
									{
										<PrestigeSelect
											currentPrestige={gameStateV2.user.num_times_prestiged}
											prestigeFilter={prestigeFilter}
											setPrestigeFilter={setPrestigeFilter}
										/>
									}
								</div>
							</div>
							<TabsContent value="base">
								{<UpgradesV2 upgradeType="base" prestigeFilter={prestigeFilter} />}
							</TabsContent>
							<TabsContent value="prestige">
								{<UpgradesV2 upgradeType="prestige" prestigeFilter={prestigeFilter} />}
							</TabsContent>
						</Tabs>
					</div>
					<div className="justify-self-center font-mono">
						<Button
							onClick={() => handleToggle()}
							variant={toggle ? 'destructive' : 'default'}
							className="mt-5"
						>
							Toggle Upgrades{` ${!toggle ? 'ON' : 'OFF'}`}
						</Button>
					</div>
					<div className="mt-8">
						<Version />
					</div>
					<OfflineProgressModal
						isOpen={showOfflineModal}
						onClose={closeOfflineModal}
						offlineTime={offlineData.timeAway}
						currencyEarned={offlineData.currencyEarned}
						currencyPerSecond={offlineData.currencyPerSecond}
					/>
				</div>
			) : (
				<div>No Session</div>
			)}
		</>
	);
};

export default IncrementalV2;
