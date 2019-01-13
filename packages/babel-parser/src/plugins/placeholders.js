// @flow

import * as charCodes from "charcodes";

import { types as tt, TokenType } from "../tokenizer/types";
import type Parser from "../parser";
import * as N from "../types";

tt.placeholder = new TokenType("%%", { startsExpr: true });

export default (superClass: Class<Parser>): Class<Parser> =>
  class extends superClass {
    parsePlaceholder(expectedNode: string): ?N.Placeholder {
      if (this.match(tt.placeholder)) {
        const node = this.startNode();
        node.expectedNode = expectedNode;
        this.next();
        this.assertNoSpace("Unexpected space in placeholder.");

        // We can't use this.parseIdentifier because
        // we don't want nested placeholders.
        node.key = super.parseIdentifier(/* liberal */ true);

        this.assertNoSpace("Unexpected space in placeholder.");
        this.expect(tt.placeholder);
        return this.finishNode(node, "Placeholder");
      }
    }

    /* ============================================================ *
     * tokenizer/index.js                                           *
     * ============================================================ */

    getTokenFromCode(code: number) {
      if (
        code === charCodes.percentSign &&
        this.input.charCodeAt(this.state.pos + 1) === charCodes.percentSign
      ) {
        return this.finishOp(tt.placeholder, 2);
      }

      return super.getTokenFromCode(...arguments);
    }
  };
