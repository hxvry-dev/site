import { FC, useState } from 'react';

import { useAtom } from 'jotai';
import { Eye, EyeClosed } from 'lucide-react';
import { toast } from 'sonner';

import { debugModeAtom } from '../atomFactory';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const EnterDebug: FC = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [, setDebugMode] = useAtom(debugModeAtom);

	const handleShowPassword = () => setShowPassword(!showPassword);

	const [debugCreds, setDebugCreds] = useState('');

	return (
		<div className="w-[240px] justify-self-center mt-8">
			<legend className="justify-self-center">Enter Debug Mode?</legend>
			<div className="grid">
				<Input
					type={showPassword ? 'text' : 'password'}
					placeholder="Enter Debug Credentials"
					value={debugCreds}
					onChange={(e) => setDebugCreds(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							if (debugCreds.toLowerCase() === 'debug') {
								setDebugMode(true);
								toast.success('Successfully signed into Debug Mode!');
								setDebugCreds('');
							} else {
								toast.error('Incorrect Debug Credentials Provided. Please try again.');
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
