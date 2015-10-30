import * as t from "babel-types";

export let visitor = {
  Function(path) {
    let params: Array = path.get("params");
    
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      if (param.isArrayPattern() || param.isObjectPattern()) {
        let uid = path.scope.generateUidIdentifier("ref");

        let declar = t.variableDeclaration("let", [
          t.variableDeclarator(param.node, uid)
        ]);
        declar._blockHoist = params.length - i;

        path.ensureBlock();
        path.get("body").unshiftContainer("body", declar);

        param.replaceWith(uid);
      }
    }
  }
};
