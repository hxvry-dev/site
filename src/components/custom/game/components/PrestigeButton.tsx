import { useAtom } from 'jotai';
import { gameStateAtom } from '../atomFactory';
import { Button } from '@/components/ui/button';

const PrestigeButton = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const newPrestigePoints = Math.floor(gameState.resources.amount / 1e7);

	const handlePrestige = () => {
		if (gameState.prestigePoints > 0 && newPrestigePoints > 1) {
			setGameState((state) => ({
				...state,
				resources: { perSecond: 0, amount: 0 },
				upgrades: gameState.defaultUpgrades,
				prestigePoints: state.prestigePoints + newPrestigePoints,
			}));
		}
	};

	return (
		<>
			<Button onClick={handlePrestige} disabled={newPrestigePoints <= 0}>
				Prestige? (Prestige Points {gameState.prestigePoints} New Prestige Points {newPrestigePoints})
			</Button>
		</>
	);
};

export default PrestigeButton;
