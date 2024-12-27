import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const boxVariants = cva('w-fit p-2', {
	variants: {
		variant: {
			default: 'bg-primary-foreground',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {}

function Box({ className, variant, ...props }: BoxProps) {
	return <div className={cn(boxVariants({ variant }), className)} {...props} />;
}

export { Box, boxVariants };
