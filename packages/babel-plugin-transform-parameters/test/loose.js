import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  ["ignoreFunctionLength"],
  `function f(a = 1, b) {}`,
);
