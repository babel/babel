import { declare } from "@babel/helper-plugin-utils";
import syntaxPartialApplication from "@babel/plugin-syntax-partial-application";
import { createVisitor as createVisitor2018_07 } from "./transform-2018-07.ts";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  return {
    name: "proposal-partial-application",
    inherits: syntaxPartialApplication,

    visitor: createVisitor2018_07(),
  };
});
