import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  [
    "ignoreFunctionLength",
    "objectRestNoSymbols",
    "pureGetters",
    "setSpreadProperties",
  ],
  `
var { a, ...b } = c;
d = { ...e, f };
function g({ ...h }, i = h) {}
`,
);
