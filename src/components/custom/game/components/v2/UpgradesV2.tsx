import { FC } from 'react';
import { useAtom } from 'jotai';
import { ChipV2 } from './ChipV2';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { calculateLocalLevel } from '@/db/functions';
import { gameStateV2Atom, purchasePowerAtom } from './IncrementalV2';
import { toast } from 'sonner';
import { Upgrades, Upgrade, UserUpgrade } from './util/v2-schema';
import { costFormatter, getCostV2 } from './util/util';
import { UpgradeDialog } from './dialogs/UpgradeDialog';

interface UpgradeItemPropsV2 {
	upgradeType: 'base' | 'prestige';
	prestigeFilter: number;
}

interface Cost {
	[key: string]: number;
}

export const UpgradesV2: FC<UpgradeItemPropsV2> = ({ upgradeType, prestigeFilter }) => {
	const userID: string | void = sessionStorage.getItem('user_id') ?? console.log('userID not defined.');
	const [gameStateV2, setGameState] = useAtom(gameStateV2Atom);
	const [purchasePower] = useAtom(purchasePowerAtom);
	const data: Upgrades = gameStateV2.upgrades.filter((u) => u.upgrade_type === upgradeType);
	const resources: number =
		upgradeType === 'base' ? gameStateV2.user.currency_balance : gameStateV2.user.prestige_points_balance;
	const costs: Cost = {};
	for (let keys of data) {
		costs[keys.upgrade_id] = getCostV2(keys, gameStateV2, purchasePower);
	}

	const getActualPurchaseAmount = (upgrade: Upgrade): number => {
		const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
		const maxPossiblePurchase = upgrade.level_max - currentLevel;
		return Math.min(purchasePower, Math.max(0, maxPossiblePurchase));
	};

	// Helper function to check if an upgrade can be purchased
	const canPurchaseUpgrade = (upgrade: Upgrade): boolean => {
		const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
		const actualPurchaseAmount = getActualPurchaseAmount(upgrade);

		// Can't purchase if already at max level or if actual purchase amount is 0
		if (currentLevel >= upgrade.level_max || actualPurchaseAmount <= 0) {
			return false;
		}

		// Check if can afford the cost
		const cost = getCostV2(upgrade, gameStateV2, actualPurchaseAmount);
		return resources >= cost;
	};

	const findOrCreateUserUpgrade = (
		upgrade: Upgrade,
		currentLevel: number,
		actualPurchaseAmount: number,
	): UserUpgrade => {
		const existingUpgrade = gameStateV2.userUpgrades.find((uu) => {
			uu.upgrade_id === upgrade.upgrade_id &&
				uu.prestige_num === gameStateV2.user.num_times_prestiged &&
				uu.user_id === userID;
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
				prestige_num: gameStateV2.user.num_times_prestiged,
				purchased_at: new Date().toISOString(),
			};
		}
	};

	const handleUpgrade = (upgrade: Upgrade) => {
		const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
		const actualPurchaseAmount = getActualPurchaseAmount(upgrade);

		// Double-check that we can make this purchase
		if (actualPurchaseAmount <= 0 || currentLevel >= upgrade.level_max) {
			toast.error('Cannot purchase: Upgrade is already at maximum level!');
			return;
		}

		const actualCost = getCostV2(upgrade, gameStateV2, actualPurchaseAmount);

		if (resources < actualCost) {
			toast.error('Cannot afford this upgrade!');
			return;
		}

		const result: UserUpgrade = findOrCreateUserUpgrade(upgrade, currentLevel, actualPurchaseAmount);

		if (result.user_id === userID) {
			console.log(result);
			toast.success(`Purchased ${actualPurchaseAmount} level(s) of ${upgrade.upgrade_name}!`);
			setGameState((state) => {
				const filteredUpgrades = state.userUpgrades.filter(
					(uu) =>
						!(
							uu.upgrade_id === upgrade.upgrade_id &&
							uu.prestige_num === gameStateV2.user.num_times_prestiged &&
							uu.user_id === userID
						),
				);
				return {
					...state,
					user: {
						...state.user,
						currency_balance:
							upgrade.upgrade_type === 'base'
								? gameStateV2.user.currency_balance - actualCost
								: gameStateV2.user.currency_balance,
						currency_per_second:
							state.user.currency_per_second + upgrade.currency_per_second_inc * actualPurchaseAmount,
						currency_per_click: state.user.currency_per_click + upgrade.cpc_inc * actualPurchaseAmount,
						currency_per_click_mult:
							state.user.currency_per_click_mult + upgrade.cpc_mult_inc * actualPurchaseAmount,
						prestige_points_balance:
							upgrade.upgrade_type === 'prestige'
								? gameStateV2.user.prestige_points_balance - actualCost
								: gameStateV2.user.prestige_points_balance,
						last_seen: new Date().toISOString(),
					},
					userUpgrades: [...filteredUpgrades, result],
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
					{data.map((upgrade) => {
						const currentLevel = calculateLocalLevel(upgrade, gameStateV2);
						const actualPurchaseAmount = getActualPurchaseAmount(upgrade);
						const actualCost =
							actualPurchaseAmount > 0 ? getCostV2(upgrade, gameStateV2, actualPurchaseAmount) : 0;
						return upgrade.min_prestige_required <= prestigeFilter ? (
							<TableRow key={upgrade.upgrade_id}>
								<TableCell>{upgrade.upgrade_name}</TableCell>
								<TableCell>
									<ChipV2
										upgrade={upgrade}
										resources={
											upgrade.upgrade_type === 'base'
												? gameStateV2.user.currency_balance
												: gameStateV2.user.prestige_points_balance
										}
									/>
								</TableCell>
								<TableCell>
									<UpgradeDialog
										upgrade={upgrade}
										currentLevel={currentLevel}
										actualCost={actualCost}
										actualPurchaseAmount={actualPurchaseAmount}
										purchasePower={purchasePower}
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
						) : (
							<></>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};
