import * as t from "@babel/types";
import { IS_BABEL_8 } from "$repo-utils";

import * as generators from "../lib/generators/index.js";

describe("Printer", () => {
  it("completeness", function () {
    Object.keys(t.VISITOR_KEYS).forEach(function (type) {
      if (!IS_BABEL_8()) {
        // Babel 7 AST
        if (
          type === "DecimalLiteral" ||
          type === "TSExpressionWithTypeArguments" ||
          type === "RecordExpression" ||
          type === "TupleExpression" ||
          type === "Noop"
        ) {
          return;
        }
      }

      expect(generators).toHaveProperty(type);
    });

    Object.keys(generators).forEach(function (type) {
      if (!IS_BABEL_8()) {
        // Babel 8 AST
        if (
          type === "TSClassImplements" ||
          type === "TSEnumBody" ||
          type === "TSInterfaceHeritage" ||
          type === "TSTemplateLiteralType"
        ) {
          return;
        }
      }

      if (!/[A-Z]/.test(type[0])) return;

      expect(t.VISITOR_KEYS).toHaveProperty(type);
    });
  });
});
