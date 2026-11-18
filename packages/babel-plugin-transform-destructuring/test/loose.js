import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  ["iterableIsArray", "objectRestNoSymbols"],
  `var [a] = b, { c, ...d } = e;`,
);
