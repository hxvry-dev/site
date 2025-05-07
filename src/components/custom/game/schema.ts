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

// V2 Implementation Below

const upgradeTypeEnum = z.enum(['base', 'prestige', 'temp']);

export const UserUpgradeSchema = z.object({
	user_id: z.string().uuid(),
	upgrade_id: z.string().uuid(),
	level_current: z.number().int().min(0),
	purchased_at: z.string().optional(),
	prestige_num: z.number(),
	id: z.string().uuid().optional(),
});
export type UserUpgrade = z.infer<typeof UserUpgradeSchema>;
export type UserUpgrades = z.infer<typeof GameStateV2.shape.userUpgrades>;

export const GameUpgradeSchema = z.object({
	upgrade_id: z.string().uuid(),
	upgrade_type: upgradeTypeEnum,
	upgrade_name: z.string().nonempty(),
	upgrade_desc: z.string().nonempty(),
	cost: z.number().nonnegative(),
	cost_mult: z.number().nonnegative(),
	level_max: z.number().int().min(0).max(999),
	cpc_inc: z.number().nonnegative(),
	cpc_mult_inc: z.number().nonnegative(),
	currency_per_second_inc: z.number().nonnegative(),
});
export type Upgrade = z.infer<typeof GameUpgradeSchema>;
export type Upgrades = z.infer<typeof GameStateV2.shape.upgrades>;

export const UserSchema = z.object({
	user_id: z.string().uuid(),
	created_at: z.string(),
	currency_balance: z.number().nonnegative(),
	currency_per_second: z.number().nonnegative(),
	num_times_prestiged: z.number().nonnegative(),
	prestige_cost: z.number().nonnegative(),
	prestige_cost_mult: z.number().nonnegative(),
	prestige_points_balance: z.number().nonnegative(),
});
export type User = z.infer<typeof UserSchema>;

export const GameStateV2 = z.object({
	user: UserSchema,
	userUpgrades: z.array(UserUpgradeSchema),
	upgrades: z.array(GameUpgradeSchema),
});
export type GameStateV2 = z.infer<typeof GameStateV2>;
