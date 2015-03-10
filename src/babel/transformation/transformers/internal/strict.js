import * as t from "../../../types";

export function Program(program, parent, scope, file) {
  if (file.transformers.strict.canRun()) {
    program.body.unshift(t.expressionStatement(t.literal("use strict")));
  }
}
