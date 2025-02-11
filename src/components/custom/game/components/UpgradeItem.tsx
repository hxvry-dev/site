import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { FC } from 'react';
import { gameStateAtom, toggleAtom, Upgrade } from '../atomFactory';
import { UpgradeTypes } from './Upgrades';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Chip } from './Chip';

interface UpgradeItemProps {
	upgradeType: UpgradeTypes;
}

export const UpgradeItem: FC<UpgradeItemProps> = ({ upgradeType }) => {
	const [toggle] = useAtom(toggleAtom);
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const data = gameState.upgrades[upgradeType];

	const handleUpgrade = (upgrade: Upgrade) => {
		console.log('got here', upgrade.name);
		setGameState((state) => {
			return {
				...state,
			};
		});
	};
	return (
		<div hidden={toggle}>
			{Object.keys(data).map((key) => (
				<div className="grid grid-cols-2 gap-5" key={key}>
					<div>
						<Accordion type="single" collapsible>
							<AccordionItem value={key}>
								<AccordionTrigger>
									<div className="grid grid-cols-2 gap-5">
										<div className="w-[120px]">{data[key].name}</div>
										<div className="w-full">
											<Chip upgrade={data[key]} upgradeType={upgradeType} />
										</div>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									<div>
										<legend className="font-mono grid grid-cols-2 gap-5">
											<p>Upgrade Description</p>
											<div>
												Level: {data[key].level}/
												<span className="font-heavy">{data[key].maxLevel}</span>
											</div>
										</legend>

										<div className="border-2 p-2 mt-2 font-mono italic text-xs overflow-scroll">
											{data[key].description}
										</div>
									</div>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Click Power Increase</TableHead>
												<TableHead>Click Power Multiplier Increase</TableHead>
												<TableHead>Currency Per Second Increase</TableHead>
												<TableHead></TableHead>
											</TableRow>
										</TableHeader>
									</Table>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
					<div className="content-center text-sm font-mono">
						<Button
							disabled={
								gameState.resources.balance! < data[key].cost || data[key].level >= data[key].maxLevel
							}
							onClick={() => handleUpgrade(data[key])}
						>
							Buy Upgrade
						</Button>
					</div>
				</div>
			))}
		</div>
	);
};

/*
	<div className="grid grid-cols-2 grid-rows-3 gap-0">
		<p>Click Power Increase</p>
		<p>{data[key].clickPowerIncrease * gameState.resources.buyPower}</p>
		<p>Click Power Multiplier Increase</p>
		<p>{data[key].clickPowerMultiplierIncrease * gameState.resources.buyPower}</p>
		<p>Currency Per Second Increase</p>
		<p>{(data[key].currencyPerSecond * gameState.resources.buyPower).toFixed(2)}</p>
	</div>
 */
