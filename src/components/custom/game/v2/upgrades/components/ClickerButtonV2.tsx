import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../v2AtomFactoryUpgrades';

interface ClickerButtonV2Props {}

export const ClickerButtonV2: FC<ClickerButtonV2Props> = ({}) => {
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
			Click Me! {gameState.resources.currencyPerClick}
		</Button>
	);
};
