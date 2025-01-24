import { useAtom } from 'jotai';
import { gameStateAtom } from '../atomFactory';
import { Button } from '@/components/ui/button';

const PrestigeButton = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const handlePrestige = () => {
		const newPrestigePoints = Math.floor(gameState.resources.amount / 1e7);
		setGameState((state) => ({
			...state,
			resources: { perSecond: 0, amount: 0 },
			upgrades: gameState.defaultUpgrades,
			prestigePoints: state.prestigePoints + newPrestigePoints,
		}));
	};

	return (
		<>
			<Button onClick={handlePrestige}>Prestige? (Prestige Points {gameState.prestigePoints})</Button>
		</>
	);
};

export default PrestigeButton;
