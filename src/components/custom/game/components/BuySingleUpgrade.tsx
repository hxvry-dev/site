import { useAtom } from 'jotai';
import { Chip } from './Chip';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { calculateLocalLevel } from '@/db/functions';
import { gameStateAtom, purchasePowerAtom } from './Incremental';
import { toast } from 'sonner';
import { Upgrades, Upgrade, UserUpgrade } from './util/schema';
import { costFormatter, getCost } from './util/util';
import { UpgradeDialog } from './dialogs/UpgradeDialog';

interface UpgradeItemProps {
	upgradeType: 'base' | 'prestige' | 'mult';
	prestigeFilter: number;
}

interface Cost {
	[key: string]: number;
}

export const BuySingleUpgrade = ({ upgradeType, prestigeFilter }: UpgradeItemProps) => {
	const userID: string | void = sessionStorage.getItem('user_id') ?? console.log('userID not defined.');
	const [gameState, setGameState] = useAtom(gameStateAtom);
	const [purchasePower] = useAtom(purchasePowerAtom);
	const data: Upgrades = gameState.upgrades.filter((u) => u.upgrade_type === upgradeType);
	const resources: number =
		upgradeType === 'prestige' ? gameState.user.prestige_points_balance : gameState.user.currency_balance;
	const costs: Cost = {};
	for (let keys of data) {
		costs[keys.upgrade_id] = getCost(keys, gameState, purchasePower);
	}

	const getActualPurchaseAmount = (upgrade: Upgrade): number => {
		const currentLevel = calculateLocalLevel(upgrade, gameState);
		const maxPossiblePurchase = upgrade.level_max - currentLevel;
		return Math.min(purchasePower, Math.max(0, maxPossiblePurchase));
	};

	// Helper function to check if an upgrade can be purchased
	const canPurchaseUpgrade = (upgrade: Upgrade): boolean => {
		const currentLevel = calculateLocalLevel(upgrade, gameState);
		const actualPurchaseAmount = getActualPurchaseAmount(upgrade);

		// Can't purchase if already at max level or if actual purchase amount is 0
		if (currentLevel >= upgrade.level_max || actualPurchaseAmount <= 0) {
			return false;
		}

		// Check if can afford the cost
		const cost = getCost(upgrade, gameState, actualPurchaseAmount);
		return resources >= cost;
	};

	const findOrCreateUserUpgrade = (
		upgrade: Upgrade,
		currentLevel: number,
		actualPurchaseAmount: number,
	): UserUpgrade => {
		const existingUpgrade = gameState.userUpgrades.find((uu) => {
			return (
				uu.upgrade_id === upgrade.upgrade_id &&
				uu.prestige_num === gameState.user.num_times_prestiged &&
				uu.user_id === userID
			);
		});

		if (existingUpgrade) {
			return {
				...existingUpgrade,
				level_current: currentLevel + actualPurchaseAmount,
				purchased_at: new Date().toISOString(),
			};
		} else {
			const upgradeKey = `${userID}-${upgrade.upgrade_name.replace(' ', '-')}`;
			return {
				id: upgradeKey,
				user_id: userID!,
				upgrade_id: upgrade.upgrade_id,
				level_current: currentLevel + actualPurchaseAmount,
				prestige_num: gameState.user.num_times_prestiged,
				purchased_at: new Date().toISOString(),
			};
		}
	};

	const handleUpgrade = (upgrade: Upgrade) => {
		const currentLevel = calculateLocalLevel(upgrade, gameState);
		const actualPurchaseAmount = getActualPurchaseAmount(upgrade);

		// Double-check that we can make this purchase
		if (actualPurchaseAmount <= 0 || currentLevel >= upgrade.level_max) {
			toast.error('Cannot purchase: Upgrade is already at maximum level!');
			return;
		}

		const actualCost = getCost(upgrade, gameState, actualPurchaseAmount);

		if (resources < actualCost) {
			toast.error('Cannot afford this upgrade!');
			return;
		}

		const result: UserUpgrade = findOrCreateUserUpgrade(upgrade, currentLevel, actualPurchaseAmount);

		if (result.user_id === userID) {
			toast.success(`Purchased ${actualPurchaseAmount} level(s) of ${upgrade.upgrade_name}!`);
			setGameState((state) => {
				const filteredUpgrades = state.userUpgrades.filter((uu) => uu.id !== result.id);
				const upgradeMap = new Map<string, UserUpgrade>(filteredUpgrades.map((uu) => [uu.id, uu]));
				upgradeMap.set(result.id, result);
				const deduplicatedUpgrades = Array.from(upgradeMap.values());

				return {
					...state,
					user: {
						...state.user,
						currency_balance:
							upgrade.upgrade_type === 'base'
								? gameState.user.currency_balance - actualCost
								: gameState.user.currency_balance,
						currency_per_second:
							state.user.currency_per_second + upgrade.currency_per_second_inc * actualPurchaseAmount,
						currency_per_click: state.user.currency_per_click + upgrade.cpc_inc * actualPurchaseAmount,
						currency_per_click_mult:
							state.user.currency_per_click_mult + upgrade.cpc_mult_inc * actualPurchaseAmount,
						prestige_points_balance:
							upgrade.upgrade_type === 'prestige'
								? gameState.user.prestige_points_balance - actualCost
								: gameState.user.prestige_points_balance,
						offline_progress_mult:
							state.user.offline_progress_mult + upgrade.offline_progress_mult_inc * actualPurchaseAmount,
						last_seen: new Date().toISOString(),
					},
					userUpgrades: deduplicatedUpgrades,
				};
			});
		} else {
			toast.warning('Purchase failed!');
		}
	};

	return (
		<div>
			<Table className="min-w-lg">
				<TableBody>
					{data
						.sort((a, b) => {
							if (a.upgrade_name > b.upgrade_name) return 1;
							if (a.upgrade_name < b.upgrade_name) return -1;
							return 0;
						})
						.map((upgrade, key) => {
							const currentLevel = calculateLocalLevel(upgrade, gameState);
							const actualPurchaseAmount = getActualPurchaseAmount(upgrade);
							const actualCost =
								actualPurchaseAmount > 0 ? getCost(upgrade, gameState, actualPurchaseAmount) : 0;
							return upgrade.min_prestige_required <= prestigeFilter ? (
								<TableRow key={key}>
									<TableCell>{upgrade.upgrade_name}</TableCell>
									<TableCell>
										<Chip upgrade={upgrade} resources={resources} />
									</TableCell>
									<TableCell>
										<UpgradeDialog
											upgrade={upgrade}
											currentLevel={currentLevel}
											actualCost={actualCost}
											actualPurchaseAmount={actualPurchaseAmount}
											purchasePower={purchasePower}
											gameState={gameState}
										/>
									</TableCell>
									<TableCell>
										<Button
											className="px-5"
											disabled={!canPurchaseUpgrade(upgrade)}
											onClick={() => handleUpgrade(upgrade)}
										>
											Buy Upgrade
											{actualPurchaseAmount !== purchasePower && actualPurchaseAmount > 0 && (
												<span className="text-xs ml-1">
													({costFormatter.format(actualPurchaseAmount)})
												</span>
											)}
										</Button>
									</TableCell>
								</TableRow>
							) : null;
						})}
				</TableBody>
			</Table>
		</div>
	);
};
