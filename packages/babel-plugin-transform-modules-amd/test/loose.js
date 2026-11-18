import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  ["constantReexports", "enumerableModuleMeta"],
  `export { a } from "b";`,
);
