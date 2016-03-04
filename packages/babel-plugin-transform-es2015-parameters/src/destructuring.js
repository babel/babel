import * as t from "babel-types";

export let visitor = {
  Function(path) {
    let params: Array = path.get("params");

    // If there's a rest param, no need to loop through it. Also, we need to
    // hoist one more level to get `declar` at the right spot.
    let hoistTweak = t.isRestElement(params[params.length - 1]) ? 1 : 0;
    let outputParamsLength = params.length - hoistTweak;

    for (let i = 0; i < outputParamsLength; i++) {
      let param = params[i];
      if (param.isArrayPattern() || param.isObjectPattern()) {
        let uid = path.scope.generateUidIdentifier("ref");

        let declar = t.variableDeclaration("let", [
          t.variableDeclarator(param.node, uid)
        ]);
        declar._blockHoist = outputParamsLength - i;

        path.ensureBlock();
        path.get("body").unshiftContainer("body", declar);

        param.replaceWith(uid);
      }
    }
  }
};
