const gameplayMapScreen = worldServices.mapGridView._view.parent.parent.parent;
const mergeSystem = gameplayMapScreen._systems.find((system) => system._luckyMergeChance);
const upgradeCardSystem = gameplayMapScreen._systems.find((system) => system._updateUpgradeCardObject);
const gameObjects = [...worldServices.world._gameObjects];

let spawn = (id, column, row) => {
  let object = backendServices.gameObjectFactory.createById(id);

  if (column && row) object.addBehavior(new behaviors.gridPosition({ column, row }));
  else object.addBehavior(new behaviors.gridPosition(worldServices.visibleCells.getClosestEmptyToTheCenter()));

  return object;
};

let spawnUpgradeCard = (target, rank, column, row) => {
  if (!(1 <= rank && rank <= 3)) return;
  let object = spawnObject(`upgrade_card_${rank}`, column, row);
  upgradeCardSystem._updateUpgradeCardObject(object, object.getBehavior("upgradeCard"), target);
  return object;
};

let spawnCollectable = (target, amount, column, row) => {
  let object = spawn("gem_6", column, row);
  object.getBehavior("collectable")._data.reward = [{ key: target, amount: amount }];
  worldServices.world.addGameObject(object);
  return object;
};

let giveInventoryItem = (target, amount) =>
  worldServices.rewardService.giveInventoryReward({
    reward: { key: target, amount: amount },
    parent: gameplayMapScreen,
  });

let getObject = (columnOrTarget, row) => {
  if (typeof columnOrTarget == "string") return gameObjects.find((gameObject) => gameObject._blueprintID == target);
  else return worldServices.mapGrid.getContent(columnOrTarget, row);
};

let despawnObject = (columnOrTarget, row) => {
  let object;

  if (typeof columnOrTarget == "string") object = getObject(columnOrTarget);
  else object = worldServices.mapGrid.getContent(columnOrTarget, row);

  if (object) worldServices.world.removeGameObject(object);
};

let spawnObject = (target, column, row) => {
  if (column && row) despawnObject(column, row);
  let object = spawn(target, column, row);
  worldServices.world.addGameObject(object);
  return object;
};

let spawnBubbledObject = (target) =>
  worldServices.rewardService.giveObjectReward({
    rewards: [target],
    container: gameplayMapScreen,
    animationEndEvent: null,
    bubblePosition: { x: 0, y: -200 },
  });

let setLuckyMergeChance = (percentage) => (mergeSystem._luckyMergeChance = percentage);

let discoverAll = () =>
  backendServices.discovery._model._discoveryWhiteList.forEach((target) => {
    if (backendServices.discovery._model._discovered.indexOf(target) == -1)
      backendServices.discovery.newUnclaimedDiscoveryMade(target);
  });

let getWorldBlueprints = () => gameObjects.reduce((array, object) => array.concat([object._blueprintID]), []);
