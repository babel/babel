import { declare } from "@babel/helper-plugin-utils";
import ReplaceSupers from "@babel/helper-replace-supers";
import { types as t } from "@babel/core";
import type { File, NodePath } from "@babel/core";

function replacePropertySuper(
  path: NodePath<t.ObjectMethod>,
  getObjectRef: () => t.Identifier,
  file: File,
) {
  // @ts-expect-error todo(flow->ts):
  const replaceSupers = new ReplaceSupers({
    getObjectRef: getObjectRef,
    methodPath: path,
    file: file,
  });

  replaceSupers.replace();
}

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));
  const newLets = new Set<{
    scopePath: NodePath;
    id: t.Identifier;
  }>();

  return {
    name: "transform-object-super",

    visitor: {
      Loop: {
        exit(path) {
          newLets.forEach(v => {
            if (v.scopePath === path) {
              path.scope.push({
                id: v.id,
                kind: "let",
              });
              path.scope.crawl();
              path.requeue();
              newLets.delete(v);
            }
          });
        },
      },
      ObjectExpression(path, state) {
        let objectRef: t.Identifier;
        const getObjectRef = () =>
          (objectRef = objectRef || path.scope.generateUidIdentifier("obj"));

        path.get("properties").forEach(propPath => {
          if (!propPath.isMethod()) return;

          replacePropertySuper(propPath, getObjectRef, state.file);
        });

        if (objectRef) {
          const scopePath = path.findParent(
            p => p.isFunction() || p.isProgram() || p.isLoop(),
          );
          const useLet = scopePath.isLoop();
          // For transform-block-scoping
          if (useLet) {
            newLets.add({ scopePath, id: t.cloneNode(objectRef) });
          } else {
            path.scope.push({
              id: t.cloneNode(objectRef),
              kind: "var",
            });
          }

          path.replaceWith(
            t.assignmentExpression("=", t.cloneNode(objectRef), path.node),
          );
        }
      },
    },
  };
});
