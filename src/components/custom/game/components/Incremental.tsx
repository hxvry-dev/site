import { FC, useEffect, useRef, useState } from 'react';

import { Session } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchAndValidateGameState, upsertUserUpgrades } from '@/db/functions';
import { NavLink, useNavigate } from 'react-router-dom';
import { BuySingleUpgrade } from './BuySingleUpgrade';
import { supabase } from '@/db/supabaseClient';

import { ClickerButton } from './ClickerButton';
import { GameStats } from './GameStats';
import { PrestigeBar } from './PrestigeBar';
import { PrestigeButton } from './PrestigeButton';
import { Version } from './version';
import { GameState } from './util/schema';
import { OfflineProgressModal } from './OfflineProgressModal';
import { toast } from 'sonner';
import { TotalBonusDialog } from './dialogs/TotalBonusDialog';
import { PrestigeSelect } from './PrestigeSelect';
import { BuyMultiple } from './BuyMultiple';

const defaultGameState = async (): Promise<GameState> => {
	const result = await fetchAndValidateGameState().then((data) => {
		const gsv2: GameState = {
			user: data!.user,
			userUpgrades: data!.userUpgrades,
			upgrades: data!.upgrades,
		};
		return gsv2;
	});
	return result;
};

const createGameStateV2 = (initialState: GameState) => {
	return atom(initialState);
};

export const purchasePowerAtom = atom<number>(1);
export const gameStateAtom = createGameStateV2(await defaultGameState());
export const prestigeFilterAtom = atom<number>(0);

const Incremental = () => {
	const nav = useNavigate();
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [prestigeFilter, setPrestigeFilter] = useAtom(prestigeFilterAtom);
	const [session, setSession] = useState<Session | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const lastUpdateRef = useRef(Date.now());

	const gameStateRef = useRef<GameState>(gameState);
	gameStateRef.current = gameState;

	const [showOfflineModal, setShowOfflineModal] = useState(false);
	const [offlineData, setOfflineData] = useState({
		timeAway: 0,
		currencyEarned: 0,
		currencyPerSecond: 0,
	});

	const checkOfflineProgress = () => {
		let _lastSeen: string;
		if (sessionStorage.getItem('last_seen')) {
			_lastSeen = sessionStorage.getItem('last_seen')!;
		} else {
			_lastSeen = gameState.user.last_seen;
		}
		const lastSeen: number = Date.parse(_lastSeen);
		if (!lastSeen || !gameState?.user) return;
		const now: number = Date.now();
		const timeAway: number = (now - lastSeen) / 1000;
		if (timeAway < 30) return;
		const maxOfflineHours: number = 24;
		const cappedTimeAway: number = Math.min(timeAway, maxOfflineHours * 3600);
		const currencyEarned: number =
			gameState.user.currency_per_second * cappedTimeAway * gameState.user.offline_progress_mult;

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
			currencyPerSecond: gameState.user.currency_per_second,
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
		document.title = 'Idle Game';
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
			upsertUserUpgrades(gameStateRef.current)
				.then((msg) => {
					console.info('Auto-save success:', msg);
					toast.success('Auto-saved');
				})
				.catch((error) => {
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
					</div>
					<GameStats />
					<div className="mb-4 mt-4 font-mono justify-self-center">
						<TotalBonusDialog state={gameStateRef.current} />
					</div>
					<div className="mt-5 px-5 max-w-fit justify-self-center">
						<div className="justify-self-center max-w-[375px] font-mono mb-4">
							<p className="justify-self-center mb-2">Buy Multiple Upgrades!</p>
							<BuyMultiple />
						</div>
						<Tabs defaultValue="base" className="border-2 rounded-sm p-5">
							<TabsList className="self-center bg-background font-mono">
								<TabsTrigger value="base" className="rounded-none">
									Base
								</TabsTrigger>
								<TabsTrigger value="prestige" className="rounded-none">
									Prestige
								</TabsTrigger>
								<TabsTrigger value="mult" className="rounded-none">
									Multipliers
								</TabsTrigger>
							</TabsList>
							<div className="max-w-md self-center grid gap-5">
								<ClickerButton />
								<PrestigeButton initialState={gameState} />
								<div className="col-span-2">{<PrestigeBar />}</div>
							</div>
							<div className="justify-items-center">
								<p>Filter Upgrades by Prestige</p>
								<PrestigeSelect
									currentPrestige={gameState.user.num_times_prestiged}
									prestigeFilter={prestigeFilter}
									setPrestigeFilter={setPrestigeFilter}
								/>
							</div>
							<TabsContent value="base">
								{<BuySingleUpgrade upgradeType="base" prestigeFilter={prestigeFilter} />}
							</TabsContent>
							<TabsContent value="prestige">
								{<BuySingleUpgrade upgradeType="prestige" prestigeFilter={prestigeFilter} />}
							</TabsContent>
							<TabsContent value="mult">
								{<BuySingleUpgrade upgradeType="mult" prestigeFilter={prestigeFilter} />}
							</TabsContent>
						</Tabs>
					</div>
					<div className="mt-8">
						<Version />
					</div>
					<OfflineProgressModal
						isOpen={showOfflineModal}
						onClose={closeOfflineModal}
						offlineTime={offlineData.timeAway}
						offlineProgressMult={gameState.user.offline_progress_mult}
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

export default Incremental;
