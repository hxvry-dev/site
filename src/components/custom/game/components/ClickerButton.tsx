import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom } from '../atomFactory';

import { Button } from '@/components/ui/button';

const ClickerButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const handleClick = () => {
		const clickValue =
			1 +
			Object.values(gameState.upgrades).reduce(
				(acc, upgrade) => acc + (upgrade.firstPurchase ? upgrade.clickPowerIncrease! : 0),
				0,
			);
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				amount: state.resources.amount + clickValue,
			},
		}));
	};
	return (
		<Button onClick={handleClick} size="default" className="w-full">
			Click me! (+{gameState.resources.clickPower})
		</Button>
	);
};

export default ClickerButton;
