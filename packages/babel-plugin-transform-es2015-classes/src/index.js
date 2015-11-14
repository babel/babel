import LooseTransformer from "./loose";
import VanillaTransformer from "./vanilla";
import nameFunction from "babel-helper-function-name";

export default function ({ types: t }) {
  // todo: investigate traversal requeueing
  let VISITED = Symbol();

  return {
    visitor: {
      ClassDeclaration(path) {
        let { node } = path;

        let ref = node.id || path.scope.generateUidIdentifier("class");

        if (path.parentPath.isExportDefaultDeclaration()) {
          path = path.parentPath;
          path.insertAfter(t.exportDefaultDeclaration(ref));
        }

        path.replaceWith(t.variableDeclaration("let", [
          t.variableDeclarator(ref, t.toExpression(node))
        ]));
      },

      ClassExpression(path, state) {
        let { node } = path;
        if (node[VISITED]) return;

        let inferred = nameFunction(path);
        if (inferred && inferred !== node) return path.replaceWith(inferred);

        node[VISITED] = true;

        let Constructor = VanillaTransformer;
        if (state.opts.loose) Constructor = LooseTransformer;

        path.replaceWith(new Constructor(path, state.file).run());
      }
    }
  };
}
