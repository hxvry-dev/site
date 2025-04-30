import { useAtom } from 'jotai';
import { gameStateV2Atom, userIdAtom } from '../atomFactory';
import { tGameStateV2, tUser } from '../schema';
import { getUpgradesFromDB, loadUserFromDB, userUpgrades } from '@/db/functions';

const [gameState, setGameState] = useAtom(gameStateV2Atom);
const [userID] = useAtom(userIdAtom);

const resetUser = (user: tUser, gameState: tGameStateV2) => {
	let result: tUser;
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

const defaultGameStateV2: tGameStateV2 = {
	user: resetUser(await loadUserFromDB(userID), gameState!),
	userUpgrades: await userUpgrades(userID),
	upgrades: await getUpgradesFromDB(),
};

const handlePrestigeV2 = async (gameState: tGameStateV2): Promise<void> => {
	if (gameState.user.prestige_points_balance >= 0 && handleNewPrestigePoints(gameState) >= 1) {
		return setGameState((state) => {
			if (!state) return;
			return {
				...defaultGameStateV2,
			};
		});
	}
};

const handleNewPrestigePoints = (gameState: tGameStateV2): number => {
	return Math.floor(gameState.user.currency_balance / gameState.user.prestige_cost);
};

const handleUpgrade = () => {};

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
