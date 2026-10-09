import { declare } from "@babel/helper-plugin-utils";
import syntaxPartialApplication from "@babel/plugin-syntax-partial-application";
import type { Options as SyntaxOptions } from "@babel/plugin-syntax-partial-application";
import { createVisitor as createVisitor2018_07 } from "./transform-2018-07.ts";
import { createVisitor as createVisitor2021_10 } from "./transform-2021-10.ts";

export type Options = SyntaxOptions;

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if (options?.version === "2021-10") {
    const visitor = createVisitor2021_10({
      noDocumentAll: api.assumption("noDocumentAll") ?? false,
      pureGetters: api.assumption("pureGetters") ?? false,
    });
    return {
      name: "proposal-partial-application",
      inherits: syntaxPartialApplication,

      visitor: {
        // Run before other plugins, so that optional chains containing
        // partial applications are lowered before they are visited.
        Program(path) {
          path.traverse(visitor);
        },
      },
    };
  }

  return {
    name: "proposal-partial-application",
    inherits: syntaxPartialApplication,

    visitor: createVisitor2018_07(),
  };
});
