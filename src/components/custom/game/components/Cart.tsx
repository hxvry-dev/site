import { FC, useState } from 'react';
import { gameStateV2Atom } from './IncrementalV2';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { upsertUserUpgrades } from '@/db/functions';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface CartProps {}

export const Cart: FC<CartProps> = ({}) => {
	const [gameStateV2] = useAtom(gameStateV2Atom);
	const [cartVisible, setCartVisible] = useState(true);

	return (
		<div className="font-mono pt-5 justify-self-center bg-accent/50">
			<div className="pb-10 justify-self-center">Upgrades Purchased this Prestige:</div>
			{cartVisible ? (
				<div className="w-full h-[350px] overflow-y-scroll">
					{gameStateV2.userUpgrades
						.filter((f) => f.prestige_num == gameStateV2.user.num_times_prestiged)
						.map((u) => (
							<div key={u.id}>
								{gameStateV2.upgrades
									.filter((f) => u.upgrade_id === f.upgrade_id)
									.map((u) => (
										<Card className="w-full">
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
			<div className="grid grid-cols-2 gap-5 justify-self-center">
				<Button
					onClick={() => {
						upsertUserUpgrades(gameStateV2).then(() => {
							toast('Upgraded!');
						});
					}}
				>
					Upgrade! (This button is going away soon)
				</Button>
				<Button variant={cartVisible ? 'ghost' : 'destructive'} onClick={() => setCartVisible((prev) => !prev)}>
					Toggle Cart
				</Button>
			</div>
		</div>
	);
};
