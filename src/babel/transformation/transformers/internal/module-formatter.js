import * as strict from "../../helpers/strict";

export function Program(program, parent, scope, file) {
  strict.wrap(program, function () {
    program.body = file.dynamicImports.concat(program.body);
  });

  if (!file.transformers["es6.modules"].canRun()) return;

  if (file.moduleFormatter.transform) {
    file.moduleFormatter.transform(program);
  }
}
