import type { PluginAPI, PluginObject } from "@babel/core";

export default function ({ types: t }: PluginAPI): PluginObject {
  return {
    inherits: USE_ESM
      ? undefined
      : // eslint-disable-next-line no-restricted-globals
        require("@babel/plugin-syntax-optional-catch-binding").default,

    visitor: {
      CatchClause(path) {
        if (path.node.param === null || !t.isIdentifier(path.node.param)) {
          return;
        }
        const binding = path.scope.getOwnBinding(path.node.param.name);
        if (binding.constantViolations.length > 0) {
          return;
        }
        if (!binding.referenced) {
          const paramPath = path.get("param");
          paramPath.remove();
        }
      },
    },
  };
}
