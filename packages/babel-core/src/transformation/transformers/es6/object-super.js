import ReplaceSupers from "../../helpers/replace-supers";
import * as t from "babel-types";

function Property(path, node, scope, getObjectRef, file) {
  if (!node.method && node.kind === "init") return;
  if (!t.isFunction(node.value)) return;

  let replaceSupers = new ReplaceSupers({
    getObjectRef: getObjectRef,
    methodNode:   node,
    methodPath:   path,
    isStatic:     true,
    scope:        scope,
    file:         file
  });

  replaceSupers.replace();
}

export let visitor = {
  ObjectExpression(node, parent, scope, file) {
    let objectRef;
    let getObjectRef = () => objectRef = objectRef || scope.generateUidIdentifier("obj");

    let propPaths = this.get("properties");
    for (let i = 0; i < node.properties.length; i++) {
      Property(propPaths[i], node.properties[i], scope, getObjectRef, file);
    }

    if (objectRef) {
      scope.push({ id: objectRef });
      return t.assignmentExpression("=", objectRef, node);
    }
  }
};
