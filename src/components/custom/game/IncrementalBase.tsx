import { GameEngine } from '@/components/custom/game/engine';
import { FC, useEffect, useState } from 'react';

const ge: GameEngine = new GameEngine();

const IncrementalBase: FC = () => {
	let frameID: number;
	const [gold, setGold] = useState(ge.getResource('gold'));

	useEffect(() => {
		const gameLoop = () => {
			ge.update();
			setGold(ge.getResource('gold'));
			frameID = requestAnimationFrame(gameLoop);
		};

		gameLoop();

		return () => {
			cancelAnimationFrame(frameID);
		};
	}, []);

	return (
		<div className="justify-items-center">
			<h1>Idle Game</h1>
			<p>Gold: {gold.toFixed(1)}</p>
		</div>
	);
};

export default IncrementalBase;
