import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

const ClickerButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const handleClick = () => {
		const clickValue = 1 + Object.values(gameState.upgrades).reduce((acc, upgrade) => acc + upgrade.effect, 0);
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				amount: state.resources.amount + clickValue,
			},
		}));
	};
	return (
		<Button onClick={handleClick}>
			Click me! (Resource count: +
			{1 + Object.values(gameState.upgrades).reduce((acc, upgrade) => acc + upgrade.effect, 0)})
		</Button>
	);
};

export default ClickerButton;
