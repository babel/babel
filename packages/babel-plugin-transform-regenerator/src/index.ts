import { declare } from "@babel/helper-plugin-utils";
import { getVisitor } from "./regenerator/visit.ts";

export default declare(({ assertVersion }) => {
  assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  return {
    name: "transform-regenerator",

    visitor: getVisitor(),
  };
});
