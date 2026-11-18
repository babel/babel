import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(plugin, ["setComputedProperties"], `var o = { [a]: 1 };`);
