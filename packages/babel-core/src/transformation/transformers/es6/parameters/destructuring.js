import * as t from "babel-types";

export let visitor = {
  Function(path) {
    let params: Array = path.get("params");
    let body = path.get("body");

    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (param.isArrayPattern() || param.isObjectPattern()) {
        let uid = path.scope.generateUidIdentifierBasedOnNode(param.node);

        let declar = t.variableDeclaration("let", [
          t.variableDeclarator(param.node, uid)
        ]);
        declar._blockHoist = params.length - i;
        body.unshiftContainer("body", declar);

        param.replaceWith(uid);
      }
    }
  }
};
