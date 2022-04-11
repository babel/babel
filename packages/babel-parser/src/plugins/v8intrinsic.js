import type Parser from "../parser";
import { tokenIsIdentifier, tt } from "../tokenizer/types";
import * as N from "../types";

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    parseV8Intrinsic(): N.Expression {
      if (this.match(tt.modulo)) {
        const v8IntrinsicStartLoc = this.state.startLoc;
        // let the `loc` of Identifier starts from `%`
        const node = this.startNode();
        this.next(); // eat '%'
        if (tokenIsIdentifier(this.state.type)) {
          const name = this.parseIdentifierName(this.state.start);
          const identifier = this.createIdentifier(node, name);
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

    parseExprAtom(): N.Expression {
      return this.parseV8Intrinsic() || super.parseExprAtom(...arguments);
    }
  };
