import { declare } from "@babel/helper-plugin-utils";
import type { types as t } from "@babel/core";
import { getVisitor } from "./regenerator/visit.ts";

export default declare(({ types: t, traverse, assertVersion }) => {
  assertVersion(REQUIRED_VERSION(7));

  return {
    name: "transform-regenerator",

    visitor: getVisitor(),
  };
});
