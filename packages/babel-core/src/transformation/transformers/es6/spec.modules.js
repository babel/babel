import * as t from "babel-types";

export let metadata = {
  group: "builtin-pre",
  optional: true
};

export let visitor = {
  Program() {
    let id = this.scope.generateUidIdentifier("null");
    this.unshiftContainer("body", [
      t.variableDeclaration("var", [
        t.variableDeclarator(id, t.nullLiteral())
      ]),
      t.exportNamedDeclaration(null, [
        t.exportSpecifier(id, t.identifier("__proto__"))
      ])
    ]);
  }
};
