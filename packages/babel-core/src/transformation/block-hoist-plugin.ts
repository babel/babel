import loadConfig from "../config";

import type { Plugin } from "../config";

let LOADED_PLUGIN: Plugin | void;

export default function loadBlockHoistPlugin(): Plugin {
  if (!LOADED_PLUGIN) {
    // Lazy-init the internal plugin to remove the init-time circular
    // dependency between plugins being passed @babel/core's export object,
    // which loads this file, and this 'loadConfig' loading plugins.
    const config = loadConfig.sync({
      babelrc: false,
      configFile: false,
      plugins: [blockHoistPlugin],
    });
    LOADED_PLUGIN = config ? config.passes[0][0] : undefined;
    if (!LOADED_PLUGIN) throw new Error("Assertion failure");
  }

  return LOADED_PLUGIN;
}
function priority(bodyNode) {
  const priority = bodyNode?._blockHoist;
  if (priority == null) return 1;
  if (priority === true) return 2;
  return priority;
}

function stableSort(body) {
  // By default, we use priorities of 0-4.
  const buckets = Object.create(null);

  // By collecting into buckets, we can guarantee a stable sort.
  for (let i = 0; i < body.length; i++) {
    const n = body[i];
    const p = priority(n);

    // In case some plugin is setting an unexpected priority.
    const bucket = buckets[p] || (buckets[p] = []);
    bucket.push(n);
  }

  // Sort our keys in descending order. Keys are unique, so we don't have to
  // worry about stability.
  const keys = Object.keys(buckets)
    .map(k => +k)
    .sort((a, b) => b - a);

  let index = 0;
  for (const key of keys) {
    const bucket = buckets[key];
    for (const n of bucket) {
      body[index++] = n;
    }
  }
  return body;
}

const blockHoistPlugin = {
  /**
   * [Please add a description.]
   *
   * Priority:
   *
   *  - 0 We want this to be at the **very** bottom
   *  - 1 Default node position
   *  - 2 Priority over normal nodes
   *  - 3 We want this to be at the **very** top
   *  - 4 Reserved for the helpers used to implement module imports.
   */

  name: "internal.blockHoist",

  visitor: {
    Block: {
      exit({ node }) {
        const { body } = node;

        // Largest SMI
        let max = 2 ** 30 - 1;
        let hasChange = false;
        for (let i = 0; i < body.length; i++) {
          const n = body[i];
          const p = priority(n);
          if (p > max) {
            hasChange = true;
            break;
          }
          max = p;
        }
        if (!hasChange) return;

        // My kingdom for a stable sort!
        node.body = stableSort(body.slice());
      },
    },
  },
};
