import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FC } from 'react';

interface PrestigeSelectPropsV2 {
	currentPrestige: number;
	prestigeFilter: number;
	setPrestigeFilter: (value: number) => void;
}

export const PrestigeSelect: FC<PrestigeSelectPropsV2> = ({ currentPrestige, prestigeFilter, setPrestigeFilter }) => {
	const handleValueChange = (value: string) => {
		setPrestigeFilter(parseInt(value, 10));
	};
	return (
		<div className="justify-self-center">
			<Select onValueChange={handleValueChange} value={prestigeFilter.toString()}>
				<SelectTrigger className="w-[150px]">
					<SelectValue placeholder={`Filter Upgrades...`} />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: currentPrestige + 1 }, (_, idx) => (
						<SelectItem value={idx.toString()} key={idx}>
							{idx.toString()}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};
