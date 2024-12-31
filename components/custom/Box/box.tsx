import * as React from 'react';

import { cn } from '@/lib/utils';

const Box: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children, ...props }) => {
	return (
		<div className={cn('w-fit p-2 bg-primary-foreground', className)} {...props}>
			{children}
		</div>
	);
};
Box.displayName = 'Box';

export default Box;
