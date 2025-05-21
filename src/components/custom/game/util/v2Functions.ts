import { GameStateV2, Upgrade, User, UserUpgrade } from '../schema';
import supabase from '@/db/supabase';
import { useAtom } from 'jotai';
import { gameStateV2Atom } from '../atomFactory';

const resetUser = (user: User, gameState: GameStateV2): User => {
	let result: User;
	result = {
		...user,
		currency_balance: 0,
		prestige_points_balance: handleNewPrestigePoints(gameState),
		num_times_prestiged: gameState.user.num_times_prestiged + 1,
		prestige_cost: gameState.user.prestige_cost * gameState.user.prestige_cost_mult,
		prestige_cost_mult: gameState.user.prestige_cost_mult * 1.01,
	};
	return result;
};

const handlePrestigeV2 = (): void => {
	const [gameState, setGameState] = useAtom(gameStateV2Atom);
	if (gameState.user.prestige_points_balance >= 0 && handleNewPrestigePoints(gameState) >= 1) {
		setGameState((state) => {
			return {
				...state,
			};
		});
	}
};

const handleNewPrestigePoints = (gameState: GameStateV2): number => {
	return Math.floor(gameState.user.currency_balance / gameState.user.prestige_cost);
};

const calculateLevel = async (upgradeID: string): Promise<number | null> => {
	const { data: LevelData, error: LevelError } = await supabase
		.from('user_upgrades')
		.select('level_current')
		.eq('upgrade_id', upgradeID)
		.order('level_current', { ascending: false })
		.limit(1);

	if (LevelError) {
		console.error(
			`There was a problem grabbing the Upgrade Level... Error code: ${LevelError.code}`,
			LevelError.message,
		);
	} else if (LevelData) {
		console.log('Got Current Upgrade Level');
		return LevelData[0].level_current as number;
	}
	return null;
};

const handleUpgrade = async (userID: string, upgrade: Upgrade, gameState: GameStateV2): Promise<UserUpgrade | null> => {
	const level: number | null = await calculateLevel(upgrade.upgrade_id);
	if (level) {
		return {
			user_id: userID,
			upgrade_id: upgrade.upgrade_id,
			level_current: level,
			prestige_num: gameState.user.num_times_prestiged,
		} as UserUpgrade;
	} else {
		return null;
	}
};

const handleClickerButtonClick = () => {};

const handleBuyMultipleButtonClick = () => {};

const updateResources = () => {};

export {
	handlePrestigeV2,
	handleNewPrestigePoints,
	handleUpgrade,
	handleClickerButtonClick,
	handleBuyMultipleButtonClick,
	resetUser,
	updateResources,
};
