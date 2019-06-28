import type Parser from "../parser";
import { types as tt } from "../tokenizer/types";
import * as N from "../types";

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    markV8IntrinsicStart(): void {
      if (this.match(tt.modulo)) {
        this.state.V8IntrinsicStart = this.state.start;
        this.eat(tt.modulo);
      }
    }

    /* ============================================================ *
     * parser/expression.js                                         *
     * ============================================================ */

    createIdentifier(): N.Identifier {
      const identifier = super.createIdentifier(...arguments);
      if (this.state.V8IntrinsicStart !== undefined) {
        identifier.type = "V8IntrinsicIdentifier";
      }
      return identifier;
    }

    parseExprSubscripts(): N.Expression {
      this.markV8IntrinsicStart();
      return super.parseExprSubscripts(...arguments);
    }

    parseSubscripts(): N.Expression {
      const expression = super.parseSubscripts(...arguments);
      // The V8IntrinsicIdentifier is valid only when it is immediately followed
      // by a call expression. If so the state should be reset in
      // parseCallExpressionArguments. Therefore raise error if not reset
      if (this.state.V8IntrinsicStart !== undefined) {
        this.unexpected(this.state.V8IntrinsicStart);
      }
      return expression;
    }

    parseCallExpressionArguments(): $ReadOnlyArray<?N.Expression> {
      if (this.state.V8IntrinsicStart !== undefined) {
        this.state.V8IntrinsicStart = undefined;
      }
      return super.parseCallExpressionArguments(...arguments);
    }
  };
