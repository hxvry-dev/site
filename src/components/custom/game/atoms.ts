import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { loadState } from './localStorage';
import { type Upgrade, UPGRADES } from './upgrades';

const savedState = loadState();

export const currencyAtom = atomWithStorage('currency', savedState?.counter || 0);
export const multiplierAtom = atomWithStorage('multiplier', savedState?.multiplier || 1);

export const upgradesAtom = atomWithStorage('upgrades', savedState?.upgrades || UPGRADES);

export const incrementAtom = atom(
	(get) => get(currencyAtom),
	(get, set) => set(currencyAtom, get(currencyAtom) + get(multiplierAtom)),
);

export const buyUpgradeAtom = atom(null, (get, set, upgradeID: number) => {
	const upgrades = get(upgradesAtom).map((upgrade: Upgrade) =>
		upgrade.id === upgradeID && !upgrade.purchased && get(currencyAtom) >= upgrade.cost
			? { ...upgrade, purchased: true }
			: upgrade,
	);
	const totalMultiplier = upgrades.reduce(
		(acc: number, upgrade: Upgrade) => acc + (upgrade.purchased ? upgrade.effect : 0),
		1,
	);

	const upgradeCost = upgrades.find((u: Upgrade) => u.id === upgradeID)?.cost ?? 0;
	if (get(currencyAtom) >= upgradeCost) {
		set(upgradesAtom, upgrades);
		set(multiplierAtom, totalMultiplier);
		set(currencyAtom, get(currencyAtom) - upgradeCost);
	}
});
