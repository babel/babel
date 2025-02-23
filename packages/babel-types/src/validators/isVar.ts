import { isVariableDeclaration } from "./generated/index.ts";
import type * as t from "../index.ts";

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
}

/**
 * Check if the input `node` is a variable declaration.
 */
export default function isVar(node: t.Node): boolean {
  if (process.env.BABEL_8_BREAKING) {
    return isVariableDeclaration(node) && node.kind === "var";
  } else {
    return (
      isVariableDeclaration(node, { kind: "var" }) &&
      !(
        // @ts-expect-error document private properties
        node[BLOCK_SCOPED_SYMBOL]
      )
    );
  }
}
