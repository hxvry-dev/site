import { FC } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, gameStateV2Atom } from '../atomFactory';
import { handleNewPrestigePoints, newPrestigePoints } from '../util/util';

export const GameStats: FC = () => {
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

// V2 Here

export const GameStatsV2: FC = () => {
	const [gameState] = useAtom(gameStateV2Atom);
	return (
		<div className="mt-4 p-5 border-2 font-mono justify-self-center grid grid-cols-2 gap-4">
			<div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 mt-4">
				<div className="text-sm border-b-2 italic w-fit">Resources: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.user.currency_balance.toFixed(2)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Current Click Power: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					+{gameState.user.currency_per_click.toFixed(2)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Current Click Power Multiplier:</div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.user.currency_per_click_mult.toFixed(2)}x
				</div>
				<div className="text-sm border-b-2 italic w-fit">Currency Per Second: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.user.currency_per_second.toFixed(2)}
				</div>
			</div>
			<div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 mt-4">
				<div className="text-sm border-b-2 italic w-fit">Prestige Points: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{gameState.user.prestige_points_balance}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Prestige Points Gained on Next Prestige: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{handleNewPrestigePoints(gameState)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Cost to Prestige: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">{gameState.user.prestige_cost}</div>
			</div>
		</div>
	);
};
