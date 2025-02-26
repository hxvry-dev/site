import { z } from 'zod';

export const zUpgradeSchema = z
	.object({
		id: z.string().nonempty(),
		type: z.enum(['base', 'prestige']),
		name: z.string().nonempty(),
		description: z.string().nonempty(),
		cost: z.object({ current: z.number().nonnegative(), multiplier: z.number().nonnegative() }),
		level: z.object({
			current: z.number().nonnegative(),
			max: z.number().nonnegative(),
		}),
		stats: z.object({
			currencyPerClickIncrease: z.number().nonnegative(),
			currencyPerClickMultiplierIncrease: z.number().nonnegative(),
			currencyPerSecondIncrease: z.number().nonnegative(),
		}),
	})
	.strict();
const zRecordUpgrade = z.record(z.string(), zUpgradeSchema);
export type zUpgrade = z.infer<typeof zUpgradeSchema>;
export type zRecordUpgrade = z.infer<typeof zRecordUpgrade>;

export type GameState = z.infer<typeof zGameStateSchema>;
export const zGameStateSchema = z
	.object({
		resources: z.object({
			currencyBalance: z.number().nonnegative(),
			prestigePointsBalance: z.number().nonnegative(),
			purchasePower: z.number().nonnegative(),
			currencyPerClick: z.number().nonnegative(),
			currencyPerClickMultiplier: z.number().nonnegative(),
			currencyPerSecond: z.number(),
		}),
		prestige: z.object({
			numTimesPrestiged: z.number().nonnegative(),
			prestigeCost: z.number().nonnegative(),
			prestigeCostMultiplier: z.number().nonnegative(),
		}),
		upgrades: z.object({
			base: zRecordUpgrade,
			prestige: zRecordUpgrade,
		}),
	})
	.strict();
