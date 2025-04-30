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
	};
	return result;
};

const defaultGameStateV2: tGameStateV2 = {
	user: resetUser(await loadUserFromDB(userID), gameState!),
	userUpgrades: await userUpgrades(userID),
	upgrades: await getUpgradesFromDB(),
};

const handlePrestige = (gameState: tGameStateV2): void => {
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

const handleToggle = () => {};

const handleClickerButtonClick = () => {};

const handleBuyMultipleButtonClick = () => {};

export {
	handlePrestige,
	handleNewPrestigePoints,
	handleUpgrade,
	handleToggle,
	handleClickerButtonClick,
	handleBuyMultipleButtonClick,
	resetUser,
};
