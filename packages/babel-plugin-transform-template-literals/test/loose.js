import { testLooseAssumptions } from "$repo-utils";
import plugin from "../lib/index.js";

testLooseAssumptions(
  plugin,
  ["ignoreToPrimitiveHint", "mutableTemplateObject"],
  "`${a}`; b`c`;",
);
