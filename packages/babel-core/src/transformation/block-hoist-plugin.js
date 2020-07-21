// @flow
import loadConfig, { type Plugin } from "../config";

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

const blockHoistPlugin = {
  /**
   * When hoisted blocks are present, sort node elements by priority order
   * (highest priority first)
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
        if (!node.body.find(node => node?._blockHoist != null)) return;
        // TODO: Babel 9 (?) - remove stabilityMap once Node >= 12 is guaranteed
        // Array sorting is not stable in earlier Node releases
        // See: https://v8.dev/blog/array-sort for details
        const nodeVersion =
          typeof process !== "undefined"
            ? process.versions.node.split(".")[0]
            : undefined;
        const stabilityMap =
          nodeVersion && nodeVersion < 12
            ? new Map(node.body.map((n, idx) => [n, idx]))
            : null;
        const priority = node => {
          if (node?._blockHoist == null) return -1;
          if (node?._blockHoist === true) return -2;
          return -1 * node?._blockHoist;
        };
        node.body.sort((a, b) => {
          const result = priority(a) - priority(b);
          if (stabilityMap) {
            return result || stabilityMap.get(a) - stabilityMap.get(b);
          }
          return result;
        });
      },
    },
  },
};
