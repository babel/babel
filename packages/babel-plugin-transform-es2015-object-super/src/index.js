import ReplaceSupers from "babel-helper-replace-supers";

export default function({ types: t }) {
  function Property(path, node, scope, getObjectRef, file) {
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

  const CONTAINS_SUPER = Symbol();

  return {
    visitor: {
      Super(path) {
        const parentObj = path.findParent(path => path.isObjectExpression());
        if (parentObj) parentObj.node[CONTAINS_SUPER] = true;
      },

      ObjectExpression: {
        exit(path, file) {
          if (!path.node[CONTAINS_SUPER]) return;

          let objectRef;
          const getObjectRef = () =>
            objectRef = objectRef || path.scope.generateUidIdentifier("obj");

          const propPaths: Array = path.get("properties");
          for (let propPath of propPaths) {
            if (propPath.isObjectProperty()) propPath = propPath.get("value");
            Property(propPath, propPath.node, path.scope, getObjectRef, file);
          }

          if (objectRef) {
            path.scope.push({ id: objectRef });
            path.replaceWith(t.assignmentExpression("=", objectRef, path.node));
          }
        },
      },
    },
  };
}
