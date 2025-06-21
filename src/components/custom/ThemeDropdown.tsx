import { FC, useState } from 'react';
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
import { AxeIcon, Bird, BoldIcon, Check, ChevronDown, DropletIcon, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

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
		description: 'Inspired by the AI Chatbot, but dark! [DARK]',
	},
	{
		value: 'bubblegum',
		label: 'Bubblegum',
		icon: BoldIcon,
		description: `This doesn't lose flavor in 5 minutes ;)`,
	},
	{
		value: 'bubblegum-dark',
		label: 'Bubblegum (Dark)',
		icon: BoldIcon,
		description: `This doesn't lose flavor in 5 minutes ;) [DARK]`,
	},
	{
		value: 'doom',
		label: 'DOOM',
		icon: AxeIcon,
	},
	{
		value: 'doom-dark',
		label: 'DOOM [DARK]',
		icon: AxeIcon,
	},
	{
		value: 'hoot',
		label: 'Hoot Theme',
		icon: Bird,
		description: 'Theme for Hoots',
	},
	{ value: 'hoot-dark', label: 'Hoot (Dark)', icon: Bird, description: 'Theme for Hoots [DARK]' },
	{ value: 'custom-theme', label: 'Custom Theme', icon: Palette },
];

export const ThemeDropdown: FC<ThemeDropdownProps> = ({
	variant = 'outline',
	size = 'default',
	showLabel = true,
	align = 'end',
}) => {
	const { theme, setTheme, applyCustomTheme, getCustomTheme, hasCustomTheme } = useTheme();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [customCss, setCustomCss] = useState('');

	const handleCustomThemeConfirm = () => {
		if (customCss.trim()) {
			applyCustomTheme(customCss.trim());
		}
		setIsDialogOpen(false);
	};

	const handleCustomThemeCancel = () => {
		setIsDialogOpen(false);
		setCustomCss(getCustomTheme());
	};

	const handleThemeSelect = (selected: Theme) => {
		if (selected === 'custom-theme') {
			if (!hasCustomTheme()) {
				setIsDialogOpen(true);
			} else {
				setTheme(selected);
			}
		} else {
			setTheme(selected);
		}
	};

	const handleCustomThemeEdit = () => {
		setCustomCss(getCustomTheme());
		setIsDialogOpen(true);
		setTheme('custom-theme');
	};

	const getCurrentTheme = () => {
		const t = localStorage.getItem('vite-ui-theme') as Theme;
		const currentTheme = themeOptions.find((o) => o.value === t);
		return currentTheme;
	};

	const CurrentIcon = getCurrentTheme()?.icon || Monitor;

	return (
		<>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button variant={variant} size={size} className="w-full float-right rounded-none">
						<CurrentIcon className={`w-4 h-4`} />
						{showLabel && <>{getCurrentTheme()?.label || 'Theme'}</>}
						<ChevronDown className="h-3 w-3 opacity-50" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align={align} sideOffset={4}>
					<DropdownMenuLabel>
						<p>Themes</p>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						{themeOptions.map((t) => {
							const Icon = t.icon;
							const isSelected = theme === t.value;

							if (t.value === 'custom-theme') {
								return (
									<div key={'safe-key-lol'}>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											key={t.value}
											onClick={() =>
												hasCustomTheme() ? handleCustomThemeEdit() : handleThemeSelect(t.value)
											}
											className="flex items-center gap-3 px-2 py-2.5 cursor-pointer"
										>
											<Icon className="h-4 w-4" />
											<div className="flex flex-col flex-1 gap-0.5">
												<span className="text-sm font-medium">{t.label}</span>
												<span className="text-xs text-muted-foreground">
													{hasCustomTheme()
														? 'Edit your custom theme'
														: 'Create your own theme'}
												</span>
											</div>
											{isSelected && <Check className="h-4 w-4 text-primary" />}
										</DropdownMenuItem>
									</div>
								);
							} else {
								return (
									<DropdownMenuItem
										key={t.value}
										onClick={() => handleThemeSelect(t.value)}
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
							}
						})}
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Custom Theme Editor</DialogTitle>{' '}
						<DialogDescription>
							Enter CSS variables to customize your theme. You can use any valid CSS properties.
						</DialogDescription>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Button className="w-full" asChild>
								<a href="https://tweakcn.com/editor/theme" target="_blank" rel="noopener noreferrer">
									Open TweakCN
								</a>
							</Button>
						</div>
						<div>
							<label htmlFor="custom-css" className="text-sm font-medium block mb-2">
								CSS Variables:
							</label>
							<Textarea
								id="custom-css"
								className="min-h-[200px] max-h-[350px] font-mono text-sm"
								placeholder={`--primary: 220 14% 93%;\n--primary-foreground: 220 9% 9%;\n--secondary: 220 14% 96%;\n--secondary-foreground: 220 9% 9%;\n--accent: 220 14% 96%;\n--accent-foreground: 220 9% 9%;\n--background: 0 0% 100%;\n--foreground: 220 9% 9%;`}
								value={customCss}
								onChange={(e) => setCustomCss(e.target.value)}
							/>
						</div>
						<div className="text-xs text-muted-foreground">
							<p>
								Example format: <code>--primary: 220 14% 93%; --background: 0 0% 100%;</code>
							</p>
							<p>
								Don&apos;t include the curly braces or the <code>:root</code> selector from TweakCN -
								just the variable declarations, please!
							</p>
						</div>
					</div>
					<DialogFooter className="gap-2">
						<Button variant="outline" onClick={handleCustomThemeCancel}>
							Cancel
						</Button>
						<Button onClick={handleCustomThemeConfirm} disabled={!customCss.trim()}>
							Apply Theme
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};
