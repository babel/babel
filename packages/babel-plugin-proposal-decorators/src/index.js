import { declare } from "@babel/helper-plugin-utils";
import syntaxDecorators from "@babel/plugin-syntax-decorators";
import visitor from "./transformer";
import legacyVisitor from "./transformer-legacy";

export default declare((api, options) => {
  api.assertVersion(7);

  const { legacy = false } = options;
  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  if (legacy !== true) {
    throw new Error(
      "The new decorators proposal is not supported yet." +
        ' You must pass the `"legacy": true` option to' +
        " @babel/plugin-proposal-decorators",
    );
  }

  return {
    inherits: syntaxDecorators,

    visitor: legacy ? legacyVisitor : visitor,
  };
});
