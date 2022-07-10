import { declare } from "@babel/helper-plugin-utils";
import ReplaceSupers from "@babel/helper-replace-supers";
import { types as t, type File } from "@babel/core";
import type { NodePath } from "@babel/traverse";

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
  api.assertVersion(7);

  return {
    name: "transform-object-super",

    visitor: {
      ObjectExpression(path, state) {
        let objectRef: t.Identifier;
        const getObjectRef = () =>
          (objectRef = objectRef || path.scope.generateUidIdentifier("obj"));

        path.get("properties").forEach(propPath => {
          if (!propPath.isMethod()) return;

          replacePropertySuper(propPath, getObjectRef, state.file);
        });

        if (objectRef) {
          path.scope.push({ id: t.cloneNode(objectRef) });
          path.replaceWith(
            t.assignmentExpression("=", t.cloneNode(objectRef), path.node),
          );
        }
      },
    },
  };
});
