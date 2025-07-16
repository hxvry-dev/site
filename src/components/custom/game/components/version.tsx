import { FC } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

export const Version: FC = () => {
	const changelogByTag: string = `https://github.com/hxvry-dev/site/compare/${__APP_VERSION__}...main`;

	return (
		<div className="justify-self-center mt-5">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<small className="code mb-2">Version: {__APP_VERSION__}</small>
					</TooltipTrigger>
					<TooltipContent className="bg-background border-2 text-foreground max-w-[240px] overflow-auto">
						<Button asChild variant="ghost" className="rounded-md">
							<NavLink to={changelogByTag} target="_blank">
								Changelog
							</NavLink>
						</Button>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};
