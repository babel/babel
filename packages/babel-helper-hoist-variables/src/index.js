import * as t from "babel-types";

let visitor = {
  Scope(path, state) {
    if (state.kind === "let") path.skip();
  },

  Function(path) {
    path.skip();
  },

  VariableDeclaration(path, state) {
    if (state.kind && path.node.kind !== state.kind) return;

    let nodes = [];

    let declarations: Array<Object> = path.get("declarations");
    let firstId;

    for (let declar of declarations) {
      firstId = declar.node.id;

      if (declar.node.init) {
        nodes.push(t.expressionStatement(
          t.assignmentExpression("=", declar.node.id, declar.node.init)
        ));
      }

      for (let name in declar.getBindingIdentifiers()) {
        state.emit(t.identifier(name), name);
      }
    }

    // for (var i in test)
    if (path.parentPath.isFor({ left: path.node })) {
      path.replaceWith(firstId);
    } else {
      path.replaceWithMultiple(nodes);
    }
  }
};

export default function (path, emit: Function, kind: "var" | "let" = "var") {
  path.traverse(visitor, { kind, emit });
}
