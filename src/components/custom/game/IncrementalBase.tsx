import { GameEngine } from '@/components/custom/game/engine';
import { FC, useEffect, useState } from 'react';

const ge: GameEngine = new GameEngine();

const IncrementalBase: FC = () => {
	let frameID: number;
	const [gold, setGold] = useState(ge.getResource('gold'));
	console.log(gold);

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

	return <p>Gold: {gold.toFixed(2)}</p>;
};

export default IncrementalBase;
