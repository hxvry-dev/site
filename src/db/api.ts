export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: '13.0.4';
	};
	public: {
		Tables: {
			upgrades: {
				Row: {
					cost: number;
					cost_mult: number;
					cpc_inc: number;
					cpc_mult_inc: number;
					currency_per_second_inc: number;
					level_max: number;
					min_prestige_required: number;
					upgrade_desc: string;
					upgrade_id: string;
					upgrade_name: string;
					upgrade_type: Database['public']['Enums']['upgradeTypes'];
				};
				Insert: {
					cost?: number;
					cost_mult?: number;
					cpc_inc?: number;
					cpc_mult_inc?: number;
					currency_per_second_inc?: number;
					level_max?: number;
					min_prestige_required?: number;
					upgrade_desc?: string;
					upgrade_id?: string;
					upgrade_name?: string;
					upgrade_type: Database['public']['Enums']['upgradeTypes'];
				};
				Update: {
					cost?: number;
					cost_mult?: number;
					cpc_inc?: number;
					cpc_mult_inc?: number;
					currency_per_second_inc?: number;
					level_max?: number;
					min_prestige_required?: number;
					upgrade_desc?: string;
					upgrade_id?: string;
					upgrade_name?: string;
					upgrade_type?: Database['public']['Enums']['upgradeTypes'];
				};
				Relationships: [];
			};
			user_upgrades: {
				Row: {
					id: string;
					level_current: number;
					prestige_num: number;
					purchased_at: string;
					upgrade_id: string;
					user_id: string;
				};
				Insert: {
					id: string;
					level_current: number;
					prestige_num: number;
					purchased_at?: string;
					upgrade_id?: string;
					user_id: string;
				};
				Update: {
					id?: string;
					level_current?: number;
					prestige_num?: number;
					purchased_at?: string;
					upgrade_id?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'user_upgrades_upgrade_id_fkey';
						columns: ['upgrade_id'];
						isOneToOne: false;
						referencedRelation: 'upgrades';
						referencedColumns: ['upgrade_id'];
					},
					{
						foreignKeyName: 'user_upgrades_user_id_fkey';
						columns: ['user_id'];
						isOneToOne: false;
						referencedRelation: 'users';
						referencedColumns: ['user_id'];
					},
				];
			};
			users: {
				Row: {
					created_at: string;
					currency_balance: number;
					currency_per_click: number;
					currency_per_click_mult: number;
					currency_per_second: number;
					last_seen: string;
					num_times_prestiged: number;
					prestige_cost: number;
					prestige_cost_mult: number;
					prestige_points_balance: number;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					currency_balance?: number;
					currency_per_click?: number;
					currency_per_click_mult?: number;
					currency_per_second?: number;
					last_seen?: string;
					num_times_prestiged?: number;
					prestige_cost?: number;
					prestige_cost_mult?: number;
					prestige_points_balance?: number;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					currency_balance?: number;
					currency_per_click?: number;
					currency_per_click_mult?: number;
					currency_per_second?: number;
					last_seen?: string;
					num_times_prestiged?: number;
					prestige_cost?: number;
					prestige_cost_mult?: number;
					prestige_points_balance?: number;
					user_id?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			upgrade_types: 'base' | 'prestige' | 'temp';
			upgradeTypes: 'base' | 'prestige';
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
		? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema['CompositeTypes']
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {
			upgrade_types: ['base', 'prestige', 'temp'],
			upgradeTypes: ['base', 'prestige'],
		},
	},
} as const;
