import { FC } from 'react';
import { gameStateV2Atom } from './IncrementalV2';
import { useAtom } from 'jotai';
import { Button } from '@/components/ui/button';
import { upsertUserUpgrades } from '@/db/functions';

interface CartProps {}

export const Cart: FC<CartProps> = ({}) => {
	const [gameStateV2] = useAtom(gameStateV2Atom);

	return (
		<div className="font-mono pt-5 justify-self-center">
			<div className="pb-5">Your Cart</div>
			<div className="w-fit h-[350px] overflow-y-scroll">
				{gameStateV2.userUpgrades.map((u) => (
					<div className="border-2 rounded-none p-5" key={u.id}>
						{gameStateV2.upgrades
							.filter((e) => e.upgrade_id === u.upgrade_id)
							.map((f) => <div key={f.upgrade_id}>{f.upgrade_name}</div>)
							.slice(-10)}
					</div>
				))}
			</div>
			<Button onClick={() => upsertUserUpgrades(gameStateV2)}>Upsert!</Button>
		</div>
	);
};
