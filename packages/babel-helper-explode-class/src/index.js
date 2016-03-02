import bindifyDecorators from "babel-helper-bindify-decorators";
import * as t from "babel-types";

export default function (classPath) {
  classPath.assertClass();

  let memoisedExpressions = [];

  function maybeMemoise(path) {
    if (!path.node || path.isPure()) return;

    let uid = classPath.scope.generateDeclaredUidIdentifier();
    memoisedExpressions.push(t.assignmentExpression("=", uid, path.node));
    path.replaceWith(uid);
  }

  function memoiseDecorators(paths) {
    if (!Array.isArray(paths) || !paths.length) return;

    // ensure correct evaluation order of decorators
    paths = paths.reverse();

    // bind decorators if they're member expressions
    bindifyDecorators(paths);

    for (let path of paths) {
      maybeMemoise(path);
    }
  }

  maybeMemoise(classPath.get("superClass"));
  memoiseDecorators(classPath.get("decorators"), true);

  let methods = classPath.get("body.body");
  for (let methodPath of methods) {
    if (methodPath.is("computed")) {
      maybeMemoise(methodPath.get("key"));
    }

    if (methodPath.has("decorators")) {
      memoiseDecorators(classPath.get("decorators"));
    }
  }

  if (memoisedExpressions) {
    classPath.insertBefore(memoisedExpressions.map((expr) => t.expressionStatement(expr)));
  }
}
