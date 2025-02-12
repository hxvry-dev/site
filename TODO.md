# TO-DO

- [ ] Need to update `Upgrades.tsx` to use related `Upgrades` somehow.
  - [ ] Implement some sort of threshold with leveling where the next "tier" unlocks after x levels.
  - [ ] Implement multiple layers of this mechanic. For replayability (lol)
- [ ] Update the main stat screen
  - [ ] Change the layout/UX of the top 1/3 of the screen to allow for easier reading.
  - [ ] Add a stats page/widget.
  - [ ] Add a formal "Save" option.
- [ ] Prevent real-time editing of the state to prevent cheating.
- [ ] Balance upgrades.
- [ ] Add new upgrades.
- [ ] Add graphics?

---

### Completed

- [x] The logic for upgrade cost scaling is wrong for UpgradePanel and PrestigeUpgrades.
  - [x] I need to re-write this to be upgradeType agnostic.
  - [x] Don't scale the price with the costMult, unless firstPurchase is set to true.