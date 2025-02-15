import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

interface StatsProps {}

export const GameStats: FC<StatsProps> = () => {
	const [gameState] = useAtom(gameStateAtom);
	return (
		<div className="mt-4 p-5 border-2 font-mono justify-self-center grid grid-cols-2 gap-4">
			<div className="grid grid-cols-[max-content_max-content] gap-2 px-5">
				<div>Resources: </div>
				<div>{gameState.resources.balance}</div>
				<div>Current Click Power: </div>
				<div>+{gameState.resources.clickPower}</div>
				<div>Current Click Power Multiplier: </div>
				<div>{gameState.resources.clickPowerMultiplier}x</div>
				<div>Click Power Added From Upgrades: </div>
				<div>{gameState.resources.addedClickPower}</div>
			</div>
			<div className="grid grid-cols-[max-content_max-content] gap-2 px-5">
				<div>Prestige Points: </div>
				<div>{gameState.prestige.points}</div>
				<div>Cost to Prestige: </div>
				<div>{gameState.prestige.cost}</div>
				<div>Prestige Cost Multiplier: </div>
				<div>{gameState.prestige.prestigeCostMultiplier}</div>
				<div># of successful prestiges: </div>
				<div>{gameState.prestige.count}</div>
			</div>
		</div>
	);
};
