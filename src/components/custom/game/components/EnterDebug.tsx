import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-react';
import { FC, useState } from 'react';
import { debugModeAtom } from '../atomFactory';
import { useAtom } from 'jotai';
import { useToast } from '@/hooks/use-toast';

export const EnterDebug: FC = () => {
	const { toast } = useToast();
	const [showPassword, setShowPassword] = useState(false);
	const [_, setDebugMode] = useAtom(debugModeAtom);

	const handleShowPassword = () => setShowPassword(!showPassword);

	const [debugCreds, setDebugCreds] = useState('');

	type ToastVariants = 'default' | 'destructive';

	const sendToast = (variant: ToastVariants, title: string, description?: string) => {
		if (title && description) {
			return toast({
				variant: variant,
				title: title,
				description: description,
			});
		} else if (title && !description) {
			return toast({
				variant: variant,
				title: title,
			});
		}
	};

	return (
		<div className="w-[240px] justify-self-center mt-8">
			<legend className="justify-self-center">Enter Debug Mode?</legend>
			<div className="grid">
				<Input
					type={showPassword ? 'text' : 'password'}
					placeholder="Enter Debug Credentials..."
					value={debugCreds}
					onChange={(e) => setDebugCreds(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							if (debugCreds.toLowerCase() === 'debug') {
								setDebugMode(true);
								sendToast('default', 'Successfully signed into Debug Mode!');
								setDebugCreds('');
							} else {
								sendToast('destructive', 'Incorrect Debug Credentials Provided', 'Please try again.');
								setDebugCreds('');
							}
						}
					}}
					className="rounded-xs"
				/>
				<Button
					size="icon"
					variant="ghost"
					onClick={handleShowPassword}
					className="absolute justify-self-end rounded-md"
				>
					{showPassword ? <Eye /> : <EyeClosed />}
				</Button>
			</div>
		</div>
	);
};
