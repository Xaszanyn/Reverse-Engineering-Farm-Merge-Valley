minifyObject = (root, depth = 5, seen = new WeakSet()) => {
  let type = typeof root;
  if (type == "string" || type == "number") return root;
  if (!root || depth < 0) return "-";

  if (type == "object" && Array.isArray(root)) {
    if (seen.has(root)) return "Exists";
    seen.add(root);
    let list = [];
    root.forEach((item) => {
      item = minifyObject(item, depth - 1);
      if (item && item != "-") list.push(item);
    });
    return list;
  } else if (type == "object") {
    let object = {};
    let keys = Object.keys(root);
    if (keys) {
      if (seen.has(root)) return "Exists";
      seen.add(root);
      keys.forEach((key) => {
        let value = minifyObject(root[key], depth - 1);
        if (value && value != "-") object[key] = value;
      });
      return object;
    } else return "-";
  }

  return "-";
};

// VM3982:1 Uncaught Error: BlueprintLibrary.get:: no blueprint with id area_cloud! run call hasBlueprint(area_cloud); first

// WTF = this.parent.parent.children[2].children;

// // 6
// this.parent.parent.children[2].children.find((o) => o._blueprintID == "wood_onboarding");

// splice(6, 1);

// this.parent.parent.children[2].children[6]._behaviorQueue;
