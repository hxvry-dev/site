import { FC, useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { upsertUserUpgrades } from '@/db/functions';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { GameStateV2 } from './util/v2-schema';
import { gameStateV2Atom } from './IncrementalV2';

interface CartProps {}

export const Cart: FC<CartProps> = ({}) => {
	const [gameStateV2] = useAtom(gameStateV2Atom);
	const gameStateRef = useRef<GameStateV2>(gameStateV2);
	const [cartVisible, setCartVisible] = useState(true);

	gameStateRef.current = gameStateV2;

	// Auto-save every 10 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			upsertUserUpgrades(gameStateRef.current).catch((error) => {
				console.error('Auto-save failed:', error);
				toast.error('Auto-save failed');
			});
		}, 10000); // Saves every 10 seconds.
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="mt-4 p-5 border-2 font-mono justify-self-center">
			<div className="pb-10 justify-self-center">Upgrades Purchased this Prestige:</div>
			{cartVisible ? (
				<div
					className={`${gameStateRef.current.userUpgrades.length > 0 ? 'w-full h-[350px] overflow-y-scroll no-scrollbar' : 'w-full'}`}
				>
					{gameStateV2.userUpgrades
						.filter((f) => f.prestige_num == gameStateV2.user.num_times_prestiged)
						.map((u) => (
							<div key={u.id}>
								{gameStateV2.upgrades
									.filter((f) => u.upgrade_id === f.upgrade_id)
									.map((u) => (
										<Card className="w-full" key={u.upgrade_id}>
											<CardHeader>
												<CardTitle>{u.upgrade_name}</CardTitle>
												<CardDescription>
													<div className="grid grid-cols-2 gap-5">
														<div>{u.upgrade_desc}</div>
														<div className="float-right">
															Purchased during Prestige #:{' '}
															{gameStateV2.user.num_times_prestiged}
														</div>
													</div>
												</CardDescription>
											</CardHeader>
											<CardContent>
												<div>
													{
														<div className="flex grid-flow-col">
															<Table>
																<TableHeader>
																	<TableRow>
																		<TableHead>Click Power Increase</TableHead>
																		<TableHead>
																			Click Power Multiplier Increase
																		</TableHead>
																		<TableHead>
																			Currency Per Second Increase
																		</TableHead>
																	</TableRow>
																</TableHeader>
																<TableBody>
																	<TableRow>
																		<TableCell>+{u.cpc_inc}</TableCell>
																		<TableCell>
																			+{u.cpc_mult_inc}x Currency per click
																		</TableCell>
																		<TableCell>
																			+{u.currency_per_second_inc} Currency per
																			second
																		</TableCell>
																	</TableRow>
																</TableBody>
															</Table>
														</div>
													}
												</div>
											</CardContent>
										</Card>
									))}
							</div>
						))}
				</div>
			) : (
				<></>
			)}
			<div className="flex justify-center pt-5">
				{gameStateRef.current.userUpgrades.length > 0 ? (
					<Button
						variant={cartVisible ? 'destructive' : 'default'}
						onClick={() => setCartVisible((prev) => !prev)}
					>
						Toggle Cart
					</Button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
