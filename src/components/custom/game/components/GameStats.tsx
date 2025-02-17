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
				<div className="border-b-2 font-bold">{gameState.resources.balance}</div>
				<div className="border-b-2 w-fit italic">Current Click Power: </div>
				<div className="border-b-2 font-bold">+{gameState.resources.clickPower}</div>
				<div className="border-b-2 w-fit italic">Current Click Power Multiplier: </div>
				<div className="border-b-2 font-bold">{gameState.resources.clickPowerMultiplier}x</div>
				<div className="border-b-2 w-fit italic">Click Power Added From Upgrades: </div>
				<div className="border-b-2 font-bold">{gameState.resources.addedClickPower}</div>
			</div>
			<div className="grid grid-cols-[max-content_max-content] gap-2 px-5">
				<div className="border-b-2 w-fit italic">Prestige Points: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.points}</div>
				<div className="border-b-2 w-fit italic">Cost to Prestige: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.cost}</div>
				<div className="border-b-2 w-fit italic">Prestige Cost Multiplier: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.prestigeCostMultiplier}</div>
				<div className="border-b-2 w-fit italic"># of successful prestiges: </div>
				<div className="border-b-2 font-bold">{gameState.prestige.count}</div>
			</div>
		</div>
	);
};
