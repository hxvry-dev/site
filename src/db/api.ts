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
					id?: string;
					level_current: number;
					purchased_at: string;
					upgrade_id: string;
					user_id: string;
				};
				Insert: {
					id?: string;
					level_current?: number;
					purchased_at?: string;
					upgrade_id?: string;
					user_id?: string;
				};
				Update: {
					id?: string;
					level_current?: number;
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
					num_times_prestiged: number;
					prestige_cost: number;
					prestige_points_balance: number;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					currency_balance?: number;
					num_times_prestiged?: number;
					prestige_cost?: number;
					prestige_points_balance?: number;
					user_id?: string;
				};
				Update: {
					created_at?: string;
					currency_balance?: number;
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

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
				Database[PublicTableNameOrOptions['schema']]['Views'])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
			Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
		? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema['Tables']
		? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
		? PublicSchema['Enums'][PublicEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes'] | { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
		? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
		: never;
