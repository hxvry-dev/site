import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom } from '../atomFactory';

interface StatsProps {}

export const Stats: FC<StatsProps> = () => {
	const [gameState] = useAtom(gameStateAtom);
	return (
		<div className="w-fit">
			<Card className="p-5">
				<CardHeader>
					<CardTitle>Current Game Stats</CardTitle>
					<CardDescription>Real-Time Game Stats!</CardDescription>
				</CardHeader>
				<CardContent className="w-fit">
					<div className="grid grid-cols-2 gap-5">
						<div className="grid grid-rows-4 gap-2">
							<p>Resources: {gameState.resources.balance}</p>
							<p>Current Click Power: +{gameState.resources.clickPower}</p>
							<p>Current Click Power Multiplier: {gameState.resources.clickPowerMultiplier}x</p>
							<p>Click Power Added From Upgrades: {gameState.resources.addedClickPower}</p>
						</div>
						<div className="grid grid-rows-4 gap-2 justify-self-end float-right">
							<p>Prestige Points: 0</p>
							<p>Cost to Prestige: 100000</p>
							<p>Prestige Cost Multiplier: 500</p>
							<p># of successful prestiges: 0</p>
						</div>
					</div>
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	);
};
