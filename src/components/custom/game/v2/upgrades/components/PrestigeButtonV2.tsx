import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../v2AtomFactoryUpgrades';

interface PrestigeButtonV2Props {}

export const PrestigeButtonV2: FC<PrestigeButtonV2Props> = ({}) => {
	const [gameState, setGameState] = useAtom(gameStateAtom);

	const handleClick = () => {
		setGameState((state) => {
			return {
				...state,
			};
		});
	};

	return (
		<Button size="sm" onClick={() => handleClick()}>
			Prestige? Num Times Prestiged: {gameState.prestige.numTimesPrestiged}
		</Button>
	);
};
