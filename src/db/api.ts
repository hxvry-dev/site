export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	graphql_public: {
		Tables: {
			[_ in never]: never;
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			graphql: {
				Args: {
					operationName?: string;
					query?: string;
					variables?: Json;
					extensions?: Json;
				};
				Returns: Json;
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
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
					upgrade_desc: string;
					upgrade_id: string;
					upgrade_name: string;
					upgrade_type: Database['public']['Enums']['upgrade_types'];
				};
				Insert: {
					cost?: number;
					cost_mult?: number;
					cpc_inc?: number;
					cpc_mult_inc?: number;
					currency_per_second_inc?: number;
					level_max?: number;
					upgrade_desc?: string;
					upgrade_id?: string;
					upgrade_name?: string;
					upgrade_type?: Database['public']['Enums']['upgrade_types'];
				};
				Update: {
					cost?: number;
					cost_mult?: number;
					cpc_inc?: number;
					cpc_mult_inc?: number;
					currency_per_second_inc?: number;
					level_max?: number;
					upgrade_desc?: string;
					upgrade_id?: string;
					upgrade_name?: string;
					upgrade_type?: Database['public']['Enums']['upgrade_types'];
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
					level_current?: number;
					prestige_num?: number;
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
					currency_per_second: number;
					num_times_prestiged: number;
					prestige_cost: number;
					prestige_points_balance: number;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					currency_balance?: number;
					currency_per_second?: number;
					num_times_prestiged?: number;
					prestige_cost?: number;
					prestige_points_balance?: number;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					currency_balance?: number;
					currency_per_second?: number;
					num_times_prestiged?: number;
					prestige_cost?: number;
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
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
				Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
			Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
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
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
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
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables'] | { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
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
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
		? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes'] | { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
		? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	graphql_public: {
		Enums: {},
	},
	public: {
		Enums: {
			upgrade_types: ['base', 'prestige', 'temp'],
		},
	},
} as const;
