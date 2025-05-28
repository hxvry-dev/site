import { FC, useId } from 'react';

import { useAtom } from 'jotai';

import { gameStateAtom, purchasePowerAtom } from '../atomFactory';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
export const BuyMultiple: FC = () => {
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const id = useId();

	interface BuyMultipleItemsProps {
		value: number;
		label: string;
		disabled?: boolean;
	}

	const buyMultipleItems: BuyMultipleItemsProps[] = [
		{
			label: 'x1',
			value: 1,
		},
		{
			label: 'x5',
			value: 5,
		},
		{
			label: 'x10',
			value: 10,
		},
		{
			label: '99x',
			value: 99,
		},
	];

	const handleClick = (v: number) => {
		setGameState((state) => ({
			...state,
			resources: {
				...state.resources,
				purchasePower: v,
			},
		}));
	};

	return (
		<fieldset className="space-y-4">
			<RadioGroup className="grid grid-cols-4 gap-2" value={gameState.resources.purchasePower.toString() || '1'}>
				{buyMultipleItems.map((item) => (
					<label
						key={`${id}-${item.value}`}
						className="relative flex cursor-pointer flex-col items-center gap-3 border-2 border-input px-2 py-3 text-center has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent has-data-disabled:opacity-50"
					>
						<RadioGroupItem
							id={`${id}-${item.value}`}
							value={`${item.value}`}
							className="sr-only after:absolute after:inset-0"
							disabled={item.disabled}
							onClick={() => handleClick(item.value)}
						/>
						<p className="text-sm font-medium leading-none text-foreground">{item.label}</p>
					</label>
				))}
			</RadioGroup>
		</fieldset>
	);
};

// V2 Here

export const BuyMultipleV2: FC = () => {
	const id = useId();
	const [purchasePower, setPurchasePower] = useAtom(purchasePowerAtom);

	interface BuyMultipleItemsProps {
		value: number;
		label: string;
		disabled?: boolean;
	}

	const buyMultipleItems: BuyMultipleItemsProps[] = [
		{
			label: 'x1',
			value: 1,
		},
		{
			label: 'x5',
			value: 5,
		},
		{
			label: 'x10',
			value: 10,
		},
		{
			label: '99x',
			value: 99,
		},
	];

	const handleClick = (pp: number) => {
		setPurchasePower(pp);
	};
	return (
		<fieldset className="space-y-4">
			<RadioGroup className="grid grid-cols-4 gap-2" value={purchasePower.toString() || '1'}>
				{buyMultipleItems.map((item) => (
					<label
						key={`${id}-${item.value}`}
						className="relative flex cursor-pointer flex-col items-center gap-3 border-2 border-input px-2 py-3 text-center has-data-[state=checked]:border-ring has-data-[state=checked]:bg-accent has-data-disabled:opacity-50"
					>
						<RadioGroupItem
							id={`${id}-${item.value}`}
							value={`${item.value}`}
							className="sr-only after:absolute after:inset-0"
							disabled={item.disabled}
							onClick={() => handleClick(item.value)}
						/>
						<p className="text-sm font-medium leading-none text-foreground">{item.label}</p>
					</label>
				))}
			</RadioGroup>
		</fieldset>
	);
};
