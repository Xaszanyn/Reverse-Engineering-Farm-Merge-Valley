Function.prototype.constructor = function () {};

//

backendServices = _0x25af97.services;
worldServices = this.services;
behaviors = _0x5049dc;

//

// worldServices.world.removeGameObject();

//

//

let GridPosition = behaviors.gridPosition,
  gameplayMapScreen = worldServices.world.getAllGameObjects().find((x) => x._blueprintID === "trainstation").parent
    .parent.parent.parent.parent,
  rewardSystem = gameplayMapScreen._systems.find((x) => x._processReward),
  mergeSystem = gameplayMapScreen._systems.find((x) => x._luckyMergeChance),
  upgradeCardSystem = gameplayMapScreen._systems.find((x) => x._updateUpgradeCardObject);

let spawn = (id, column, row) => {
  let object = backendServices.gameObjectFactory.createById(id);

  if (column && row) object.addBehavior(new GridPosition({ column, row }));
  else object.addBehavior(new GridPosition(worldServices.visibleCells.getClosestEmptyToTheCenter()));

  return object;
};

let spawnUpgradeCard = (target, rank, column, row) => {
  if (!(1 <= rank && rank <= 3)) return;
  let object = spawnObject(`upgrade_card_${rank}`, column, row);
  upgradeCardSystem._updateUpgradeCardObject(object, object.getBehavior("upgradeCard"), target);
  return object;
};

let spawnCollectable = (target, amount, column, row) => {
  let object = spawn(`gem_1`, column, row);
  object.getBehavior("collectable")._data.reward = [{ key: target, amount: amount }];
  worldServices.world.addGameObject(object);
  return object;
};

let giveInventoryItem = (target, amount) => {
  return worldServices.rewardService.giveInventoryReward({
    reward: { key: target, amount: amount },
    parent: gameplayMapScreen,
  });
};

let spawnObject = (target, column, row) => {
  let object = spawn(target, column, row);
  worldServices.world.addGameObject(object);
  return object;
};

let spawnBubbledObject = (target) => {
  return worldServices.rewardService.giveObjectReward({
    rewards: [target],
    container: gameplayMapScreen,
    animationEndEvent: null,
    bubblePosition: { x: 0, y: -200 },
  });
};

let setLuckyMergeChance = (percentage) => (mergeSystem._luckyMergeChance = percentage);

// spawnUpgradeCard("coffeebeans", 3, 70, 74);
