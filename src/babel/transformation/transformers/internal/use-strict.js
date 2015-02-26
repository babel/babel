import t from "../../../types";

export function Program(program, parent, scope, file) {
  if (file.transformers.useStrict.canRun()) {
    program.body.unshift(t.expressionStatement(t.literal("use strict")));
  }
}
