import LooseTransformer from "./loose";
import VanillaTransformer from "./vanilla";
import nameFunction from "babel-helper-function-name";

export default function ({ types: t }) {
  return {
    visitor: {
      ClassDeclaration(path) {
        let { node } = path;

        if (path.parentPath.isExportDefaultDeclaration()) {
          path = path.parentPath;
          path.insertAfter(t.exportDefaultDeclaration(node.id));
        }

        path.replaceWith(t.variableDeclaration("let", [
          t.variableDeclarator(node.id, t.toExpression(node))
        ]));
      },

      ClassExpression(path, state) {
        let inferred = nameFunction(path);
        if (inferred) return path.replaceWith(inferred);

        let Constructor = VanillaTransformer;
        if (state.opts.loose) Constructor = LooseTransformer;

        path.replaceWith(new Constructor(path, state.file).run());
      }
    }
  };
}
