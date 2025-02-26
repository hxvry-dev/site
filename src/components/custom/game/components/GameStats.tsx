import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

interface StatsProps {}

export const GameStats: FC<StatsProps> = () => {
	const [gameState] = useAtom(gameStateAtom);
	return (
		<div className="mt-4 p-5 border-2 font-mono justify-self-center grid grid-cols-2 gap-4">
			<div className="grid grid-cols-[max-content_max-content] gap-2 px-5">
				<div className="border-b-2 w-fit italic">Resources: </div>
				<div className="border-b-2 font-bold">{gameState.resources.currencyBalance.toFixed(2)}</div>
				<div className="border-b-2 w-fit italic">Current Click Power: </div>
				<div className="border-b-2 font-bold">+{gameState.resources.currencyPerClick.toFixed(2)}</div>
				<div className="border-b-2 w-fit italic pr-5">Current Click Power Multiplier: </div>
				<div className="border-b-2 font-bold">{gameState.resources.currencyPerClickMultiplier.toFixed(2)}x</div>
				<div className="border-b-2 w-fit italic">Currency Per Second: </div>
				<div className="border-b-2 font-bold">{gameState.resources.currencyPerSecond.toFixed(2)}</div>
			</div>
			<div className="grid grid-cols-[max-content_max-content] gap-2 px-5">
				<div className="border-b-2 w-fit italic">Prestige Points: </div>
				<div className="border-b-2 font-bold">{gameState.resources.prestigePointsBalance}</div>
				<div className="border-b-2 w-fit italic">Cost to Prestige: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.prestigeCost}</div>
				<div className="border-b-2 w-fit italic">Prestige Cost Multiplier: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.prestigeCostMultiplier}</div>
				<div className="border-b-2 w-fit italic"># of successful prestiges: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.numTimesPrestiged}</div>
			</div>
		</div>
	);
};
