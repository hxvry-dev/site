import { FC } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Theme, useTheme } from '../theme-provider';
import { Check, ChevronDown, DropletIcon, Monitor, Moon, Sun } from 'lucide-react';

interface ThemeOption {
	value: Theme;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	description?: string;
}

interface ThemeDropdownProps {
	variant?: 'default' | 'outline' | 'ghost';
	size?: 'default' | 'sm' | 'lg';
	showLabel?: boolean;
	align?: 'start' | 'center' | 'end';
}

const themeOptions: ThemeOption[] = [
	{
		value: 'system',
		label: 'System',
		icon: Monitor,
		description: 'Match device preferences',
	},
	{
		value: 'light',
		label: 'Light',
		icon: Sun,
		description: 'Clean and bright',
	},
	{
		value: 'dark',
		label: 'Dark',
		icon: Moon,
		description: 'Nice and quiet',
	},
	{
		value: 'claude',
		label: 'Claude',
		icon: DropletIcon,
		description: 'Inspired by the AI Chatbot',
	},
	{
		value: 'claude-dark',
		label: 'Claude (Dark)',
		icon: DropletIcon,
		description: 'Inspired by the AI Chatbot, but dark!',
	},
];

export const ThemeDropdown: FC<ThemeDropdownProps> = ({
	variant = 'outline',
	size = 'default',
	showLabel = true,
	align = 'end',
}) => {
	const { theme, setTheme } = useTheme();
	const currentTheme = themeOptions.find((o) => o.value === theme);
	const CurrentIcon = currentTheme?.icon || Monitor;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={variant} size={size} className="w-full float-right rounded-none">
					<CurrentIcon className={`w-4 h-4`} />
					{showLabel && <>{currentTheme?.label || 'Theme'}</>}
					<ChevronDown className="h-3 w-3 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align={align} sideOffset={4}>
				<DropdownMenuLabel>
					<p>Themes</p>
					<p>Current Theme {theme[0].toUpperCase() + theme.substring(1).toLowerCase()}</p>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{themeOptions.map((t) => {
						const Icon = t.icon;
						const isSelected = theme === t.value;

						return (
							<DropdownMenuItem
								key={t.value}
								onClick={() => setTheme(t.value)}
								className="flex items-center gap-3 px-2 py-2.5 cursor-pointer"
							>
								<Icon className="h-4 w-4" />
								<div className="flex flex-col flex-1 gap-0.5">
									<span className="text-sm font-medium">{t.label}</span>
									{t.description && (
										<span className="text-xs text-muted-foreground">{t.description}</span>
									)}
								</div>
								{isSelected && <Check className="h-4 w-4 text-primary" />}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
