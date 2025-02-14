import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

interface StatsProps {}

export const Stats: FC<StatsProps> = () => {
	const [gameState] = useAtom(gameStateAtom);
	return (
		<div className="justify-self-center border-solid border-foreground">
			<div className="grid grid-cols-2 gap-2 font-mono">
				<div className="grid grid-rows-4 gap-2">
					<div className="grid grid-cols-2 gap-2">
						<div>Resources: </div>
						<div>{gameState.resources.balance}</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>Current Click Power: </div>
						<div>+{gameState.resources.clickPower}</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>Current Click Power Multiplier: </div>
						<div>{gameState.resources.clickPowerMultiplier}x</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>Click Power Added From Upgrades: </div>
						<div>{gameState.resources.addedClickPower}</div>
					</div>
				</div>
				<div className="grid grid-rows-4 gap-2">
					<div className="grid grid-cols-2 gap-2">
						<div>Prestige Points: </div>
						<div>{gameState.prestige.points}</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>Cost to Prestige: </div>
						<div>{gameState.prestige.cost}</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div>Prestige Cost Multiplier: </div>
						<div>{gameState.prestige.prestigeCostMultiplier}</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div># of successful prestiges: </div>
						<div>{gameState.prestige.count}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
