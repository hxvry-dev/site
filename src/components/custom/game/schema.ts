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

export type GameStateV2 = z.infer<typeof zGameStateV2>;
export type zUsers = z.infer<typeof zUserSchema>;
export type zUserUpgrades = z.infer<typeof zUserUpgradesSchema>;
export type GameUpgrade = z.infer<typeof zGameUpgrade>;

const zUserSchema = z.object({
	currency_balance: z.number().nonnegative(),
	prestige_points_balance: z.number().nonnegative(),
	times_prestiged: z.number().nonnegative(),
	prestige_cost: z.number().nonnegative(),
});
const zUserUpgradesSchema = z.object({
	upgrade_id: z.string().nonempty(),
	level_max: z.number().nonnegative().default(123),
});
const zGameUpgrade = z.object({
	upgrade_id: z.string().nonempty(),
	upgrade_type: z.string().nonempty(),
	upgrade_name: z.string().nonempty(),
	upgrade_desc: z.string().nonempty(),
	cost: z.number().nonnegative(),
	cost_mult: z.number().nonnegative(),
	level_max: z.number().nonnegative(),
	// Currency per click increase
	cpc_inc: z.number().nonnegative(),
	cpc_mult_inc: z.number().nonnegative(),
	currency_per_second_inc: z.number().nonnegative(),
});
export const zGameStateV2 = z
	.object({
		user: zUserSchema,
		userUpgrades: z.array(zUserUpgradesSchema),
		upgrades: z.array(zGameUpgrade),
	})
	.strict();
