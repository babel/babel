import { declare } from "@babel/helper-plugin-utils";
import ReplaceSupers from "@babel/helper-replace-supers";
import { types as t } from "@babel/core";

function replacePropertySuper(path, node, scope, getObjectRef, file) {
  const replaceSupers = new ReplaceSupers({
    getObjectRef: getObjectRef,
    methodNode: node,
    methodPath: path,
    isStatic: true,
    scope: scope,
    file: file,
  });

  replaceSupers.replace();
}

export default declare(api => {
  api.assertVersion(7);

  return {
    visitor: {
      ObjectExpression(path, state) {
        let objectRef;
        const getObjectRef = () =>
          (objectRef = objectRef || path.scope.generateUidIdentifier("obj"));

        path.get("properties").forEach(propPath => {
          if (!propPath.isMethod()) return;

          replacePropertySuper(
            propPath,
            propPath.node,
            path.scope,
            getObjectRef,
            state,
          );
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
