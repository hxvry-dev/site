import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
const UISwitch: React.FC = () => {
	const { theme, setTheme } = useTheme();
	const toggleTheme = (_theme?: string) => {
		if (_theme === 'dark') {
			return setTheme('light');
		} else {
			return setTheme('dark');
		}
	};
	return (
		<Button variant="outline" className="w-fit justify-self-end rounded-sm" onClick={() => toggleTheme(theme)}>
			<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle Theme</span>
		</Button>
	);
};

UISwitch.displayName = 'UISwitch';

export default UISwitch;
