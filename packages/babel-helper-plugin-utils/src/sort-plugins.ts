import type { PluginObject } from "@babel/core";

const sortedLists = new WeakSet();

const pluginOrders: Record<string, string[]> = {
  "transform-block-scoping": ["transform-block-scoped-functions"],
};

export default function (
  internalPlugins: { origin: PluginObject }[],
  orders = pluginOrders,
) {
  if (sortedLists.has(internalPlugins)) {
    return;
  }
  sortedLists.add(internalPlugins);

  sort(internalPlugins, (a, b) => {
    const aName = a.origin.name;
    const bName = b.origin.name;
    if (!aName || !bName || aName === bName) {
      return 0;
    }
    if (orders[bName]?.includes(aName)) {
      return 1;
    }
    return 0;
  });
}

function sort<T>(arr: T[], callback: (a: T, b: T) => number): void {
  let changed;
  do {
    changed = false;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        const a = arr[i];
        const b = arr[j];
        const result = callback(a, b);
        if (result > 0) {
          arr.splice(j, 1);
          arr.splice(i, 0, b);
          changed = true;
        }
      }
    }
  } while (changed);
}
