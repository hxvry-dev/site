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
			currencyBalance: z.object({
				main: z.number().nonnegative(),
				prestige: z.number().nonnegative(),
			}),
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

export type DbUpgrade = z.infer<typeof zDbUpgradeSchema>;
export const zDbUpgradeSchema = z
	.object({
		upgrade_id: z.string().nonempty(),
		upgrade_type: z.enum(['base', 'prestige', 'temp']),
		upgrade_name: z.string().nonempty(),
		upgrade_desc: z.string().nonempty(),
		cost: z.number().nonnegative(),
		cost_mult: z.number().nonnegative(),
		level_max: z.number().nonnegative(),
		cpc_inc: z.number().nonnegative(),
		cpc_mult_inc: z.number().nonnegative(),
		currency_per_second_inc: z.number().nonnegative(),
	})
	.strict();

export type DbUserUpgrades = z.infer<typeof zDbUserUpgradesSchema>;
export const zDbUserUpgradesSchema = z
	.object({
		upgrade_id: z.string().nonempty(),
		level_current: z.number().nonnegative(),
		purchased_at: z.string().nonempty(),
	})
	.strict();

export type DbGameState = z.infer<typeof zDbGameStateSchema>;
export const zDbGameStateSchema = z
	.object({
		currency_balance: z.number().nonnegative(),
		prestige_points_balance: z.number().nonnegative(),
		num_times_prestiged: z.number().nonnegative(),
		prestige_cost: z.number().nonnegative(),
	})
	.strict();
