import { useAtom } from 'jotai';
import { gameStateAtom } from './Incremental';
import { costFormatter, handleNewPrestigePoints } from './util/util';

export const GameStats = () => {
	const [gameState] = useAtom(gameStateAtom);
	return (
		<div className="mt-4 p-5 border-2 font-mono justify-self-center grid grid-cols-2 gap-4">
			<div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 mt-4">
				<div className="text-sm border-b-2 italic w-fit">Resources: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(gameState.user.currency_balance)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Current Click Power: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					+{costFormatter.format(gameState.user.currency_per_click)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Current Click Power Multiplier:</div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(gameState.user.currency_per_click_mult)}x
				</div>
				<div className="text-sm border-b-2 italic w-fit">Currency Per Second: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(gameState.user.currency_per_second)}
				</div>
			</div>
			<div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 mt-4">
				<div className="text-sm border-b-2 italic w-fit">Prestige Points: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(gameState.user.prestige_points_balance)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Prestige Points Gained on Next Prestige: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(handleNewPrestigePoints(gameState))}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Cost to Prestige: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(gameState.user.prestige_cost)}
				</div>
				<div className="text-sm border-b-2 italic w-fit">Offline Progress Multiplier: </div>
				<div className="text-sm border-b-2 font-bold content-center w-fit">
					{costFormatter.format(gameState.user.offline_progress_mult)}
				</div>
			</div>
		</div>
	);
};
