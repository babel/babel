import type Parser from "../parser";
import { tokenIsIdentifier, tt } from "../tokenizer/types";
import * as N from "../types";
import type { ExpressionErrors } from "../parser/util";

export default (superClass: typeof Parser) =>
  class V8IntrinsicMixin extends superClass implements Parser {
    parseV8Intrinsic(): N.Expression {
      if (this.match(tt.modulo)) {
        const v8IntrinsicStartLoc = this.state.startLoc;
        // let the `loc` of Identifier starts from `%`
        const node = this.startNode<N.Identifier>();
        this.next(); // eat '%'
        if (tokenIsIdentifier(this.state.type)) {
          const name = this.parseIdentifierName(this.state.start);
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
