import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
	{
		variants: {
			variant: {
				default: 'border-transparent bg-primary rounded-md text-primary-foreground [a&]:hover:bg-primary/90',
				secondary:
					'border-transparent bg-secondary rounded-md text-secondary-foreground [a&]:hover:bg-secondary/90',
				destructive:
					'border-transparent bg-destructive rounded-md text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70',
				outline: 'text-foreground rounded-md [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
				typescript: 'border-transparent bg-blue-600 rounded-md text-white shadow-sm',
				maxLevelChip: 'border-transparent rounded-none shadow-sm bg-muted text-muted-foreground',
				canBuyChip: 'border-transparent rounded-none shadow-sm bg-accent text-accent-foreground',
				cannotBuyChip: 'border-transparent rounded-none shadow-sm bg-destructive text-destructive-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
