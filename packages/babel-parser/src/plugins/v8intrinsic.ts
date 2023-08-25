import type Parser from "../parser/index.ts";
import { tokenIsIdentifier, tt } from "../tokenizer/types.ts";
import type * as N from "../types.ts";
import type { ExpressionErrors } from "../parser/util.ts";

export default (superClass: typeof Parser) =>
  class V8IntrinsicMixin extends superClass implements Parser {
    parseV8Intrinsic(): N.Expression {
      if (this.match(tt.modulo)) {
        const v8IntrinsicStartLoc = this.state.startLoc;
        // let the `loc` of Identifier starts from `%`
        const node = this.startNode<N.Identifier>();
        this.next(); // eat '%'
        if (tokenIsIdentifier(this.state.type)) {
          const name = this.parseIdentifierName();
          const identifier = this.createIdentifier(node, name);
          // @ts-expect-error: avoid mutating AST types
          identifier.type = "V8IntrinsicIdentifier";
          if (this.match(tt.parenL)) {
            return identifier;
          }
        }
        this.unexpected(v8IntrinsicStartLoc);
      }
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    parseExprAtom(refExpressionErrors?: ExpressionErrors | null): N.Expression {
      return (
        this.parseV8Intrinsic() || super.parseExprAtom(refExpressionErrors)
      );
    }
  };
