import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, gameStateV2Atom } from '../atomFactory';

import { Button } from '@/components/ui/button';

export const ClickerButton: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const clickValue: number = gameState.resources.currencyPerClick * gameState.resources.currencyPerClickMultiplier;
	const handleClick = () => {
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				currencyBalance: {
					...state.resources.currencyBalance,
					main:
						state.resources.currencyBalance.main +
						state.resources.currencyPerClick * state.resources.currencyPerClickMultiplier,
				},
			},
		}));
	};

	// V2 Here

	const [gameStateV2, setGameStateV2] = useAtom(gameStateV2Atom);
	const clickValueV2: number = gameStateV2.user.currency_per_click * gameStateV2.user.currency_per_click_mult;

	const handleClickV2 = () => {
		setGameStateV2((state) => {
			return {
				...state,
				user: {
					...state.user,
					currency_balance:
						state.user.currency_balance +
						state.user.currency_per_click * state.user.currency_per_click_mult,
				},
			};
		});
	};

	return (
		<div>
			<Button onClick={handleClick} className="flex w-full font-mono">
				Click me! (+{clickValue.toFixed(2)})
			</Button>
			<Button onClick={handleClickV2} className="flex w-full font-mono">
				v2 Click Me! (+{clickValueV2.toFixed(2)})
			</Button>
		</div>
	);
};
