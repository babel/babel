import ReplaceSupers from "../../helpers/replace-supers";
import * as t from "../../../types";

export var check = t.isSuper;

function Property(path, node, scope, getObjectRef, file) {
  if (!node.method) return;

  var value = node.value;
  var thisExpr = scope.generateUidIdentifier("this");

  var replaceSupers = new ReplaceSupers({
    topLevelThisReference: thisExpr,
    getObjectRef:          getObjectRef,
    methodNode:            node,
    methodPath:            path,
    isStatic:              true,
    scope:                 scope,
    file:                  file
  });

  replaceSupers.replace();

  if (replaceSupers.hasSuper) {
    value.body.body.unshift(
      t.variableDeclaration("var", [
        t.variableDeclarator(thisExpr, t.thisExpression())
      ])
    );
  }
}

export function ObjectExpression(node, parent, scope, file) {
  var objectRef;
  var getObjectRef = () => objectRef ||= scope.generateUidIdentifier("obj");

  var propPaths = this.get("properties");
  for (var i = 0; i < node.properties.length; i++) {
    Property(propPaths[i], node.properties[i], scope, getObjectRef, file);
  }

  if (objectRef) {
    scope.push({ id: objectRef });
    return t.assignmentExpression("=", objectRef, node);
  }
}
