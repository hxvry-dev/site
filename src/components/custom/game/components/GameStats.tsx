import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';
import { newPrestigePoints } from '../util/util';

interface StatsProps {}

export const GameStats: FC<StatsProps> = () => {
	const [gameState] = useAtom(gameStateAtom);
	return (
		<div className="mt-4 p-5 border-2 font-mono justify-self-center grid grid-cols-2 gap-4">
			<div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 mt-4">
				<div className="text-sm border-b-2 italic w-fit">Resources: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.resources.currencyBalance.main.toFixed(2)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Current Click Power: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					+{gameState.resources.currencyPerClick.toFixed(2)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Current Click Power Multiplier:</div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.resources.currencyPerClickMultiplier.toFixed(2)}x
				</div>
				<div className="text-sm border-b-2 italic w-fit">Currency Per Second: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.resources.currencyPerSecond.toFixed(2)}
				</div>
			</div>
			<div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 mt-4">
				<div className="text-sm border-b-2 italic w-fit">Prestige Points: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.resources.currencyBalance.prestige}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Prestige Points Gained on Next Prestige: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">{newPrestigePoints(gameState)}</div>
				<div className="text-sm border-b-2 italic w-fit">Cost to Prestige: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.prestige.prestigeCost}
				</div>
			</div>
		</div>
	);
};

//max-w-[250px] overflow-scroll
