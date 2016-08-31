import { default as syntaxClassConstructorCall } from "babel-plugin-syntax-class-constructor-call";
import template from "babel-template";

let buildWrapper = template(`
  let CLASS_REF = CLASS;
  var CALL_REF = CALL;
  var WRAPPER_REF = function (...args) {
    if (this instanceof WRAPPER_REF) {
      return Reflect.construct(CLASS_REF, args);
    } else {
      return CALL_REF.apply(this, args);
    }
  };
  WRAPPER_REF.__proto__ = CLASS_REF;
  WRAPPER_REF;
`);

export default function ({ types: t }) {
  let ALREADY_VISITED = Symbol();

  function findConstructorCall(path): ?Object {
    let methods: Array<Object> = path.get("body.body");

    for (let method of methods) {
      if (method.node.kind === "constructorCall") {
        return method;
      }
    }

    return null;
  }

  function handleClassWithCall(constructorCall, classPath) {
    let { node } = classPath;
    let ref = node.id || classPath.scope.generateUidIdentifier("class");

    if (classPath.parentPath.isExportDefaultDeclaration()) {
      classPath = classPath.parentPath;
      classPath.insertAfter(t.exportDefaultDeclaration(ref));
    }

    classPath.replaceWithMultiple(buildWrapper({
      CLASS_REF: classPath.scope.generateUidIdentifier(ref.name),
      CALL_REF: classPath.scope.generateUidIdentifier(`${ref.name}Call`),
      CALL: t.functionExpression(null, constructorCall.node.params, constructorCall.node.body),
      CLASS: t.toExpression(node),
      WRAPPER_REF: ref
    }));

    constructorCall.remove();
  }

  return {
    inherits: syntaxClassConstructorCall,

    visitor: {
      Class(path) {
        if (path.node[ALREADY_VISITED]) return;
        path.node[ALREADY_VISITED] = true;

        let constructorCall = findConstructorCall(path);

        if (constructorCall) {
          handleClassWithCall(constructorCall, path);
        } else {
          return;
        }
      }
    }
  };
}
