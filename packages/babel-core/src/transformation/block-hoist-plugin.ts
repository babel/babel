import traverse from "@babel/traverse";
import type { Statement } from "@babel/types";
import type { PluginObject } from "../config";
import Plugin from "../config/plugin";

let LOADED_PLUGIN: Plugin | void;

const blockHoistPlugin: PluginObject = {
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

export default function loadBlockHoistPlugin(): Plugin {
  if (!LOADED_PLUGIN) {
    // cache the loaded blockHoist plugin plugin
    LOADED_PLUGIN = new Plugin(
      {
        ...blockHoistPlugin,
        visitor: traverse.explode(blockHoistPlugin.visitor),
      },
      {},
    );
  }

  return LOADED_PLUGIN;
}

function priority(bodyNode: Statement & { _blockHoist?: number | true }) {
  const priority = bodyNode?._blockHoist;
  if (priority == null) return 1;
  if (priority === true) return 2;
  return priority;
}

function stableSort(body: Statement[]) {
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
