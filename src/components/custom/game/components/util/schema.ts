import z from 'zod';

const upgradeTypeEnum = z.enum(['base', 'prestige', 'mult']);

export const UserUpgradeSchema = z.object({
	user_id: z.string().uuid(),
	upgrade_id: z.string().uuid(),
	level_current: z.number().int().min(0),
	purchased_at: z.string().optional(),
	prestige_num: z.number(),
	id: z.string(),
});
export type UserUpgrade = z.infer<typeof UserUpgradeSchema>;
export type UserUpgrades = z.infer<typeof GameState.shape.userUpgrades>;

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
	min_prestige_required: z.number().nonnegative(),
	offline_progress_mult_inc: z.number().nonnegative(),
});
export type Upgrade = z.infer<typeof GameUpgradeSchema>;
export type Upgrades = z.infer<typeof GameState.shape.upgrades>;

export const UserSchema = z.object({
	user_id: z.string().uuid(),
	created_at: z.string(),
	last_seen: z.string(),
	currency_balance: z.number().nonnegative(),
	currency_per_second: z.number().nonnegative(),
	currency_per_click: z.number().nonnegative(),
	currency_per_click_mult: z.number().nonnegative(),
	num_times_prestiged: z.number().nonnegative(),
	prestige_cost: z.number().nonnegative(),
	prestige_cost_mult: z.number().nonnegative(),
	prestige_points_balance: z.number().nonnegative(),
	offline_progress_mult: z.number().nonnegative(),
});
export type User = z.infer<typeof UserSchema>;

export const GameState = z.object({
	user: UserSchema,
	userUpgrades: z.array(UserUpgradeSchema),
	upgrades: z.array(GameUpgradeSchema),
});
export type GameState = z.infer<typeof GameState>;
