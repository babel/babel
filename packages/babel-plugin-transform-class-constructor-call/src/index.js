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

let buildSuperWrapper = template(`
  let CLASS_REF = CLASS;
  var WRAPPER_REF = function (...args) {
    if (this instanceof WRAPPER_REF) {
      return Reflect.construct(CLASS_REF, args);
    } else {
      return SUPER_REF.apply(this, args);
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
    let ref = classPath.node.id || classPath.scope.generateUidIdentifier("class");

    classPath.replaceWithMultiple(buildWrapper({
      CLASS_REF: classPath.scope.generateUidIdentifier(ref.name),
      CALL_REF: classPath.scope.generateUidIdentifier(`${ref.name}Call`),
      CALL: t.functionExpression(null, constructorCall.node.params, constructorCall.node.body),
      CLASS: t.toExpression(classPath.node),
      WRAPPER_REF: ref
    }));

    constructorCall.remove();
  }

  function handleClassWithSuper(path) {
    // we could be inheriting from a class that has a call handler
    let ref = path.node.id || path.scope.generateUidIdentifier("class");

    let nodes = [];
    let superRef;

    // we're going to be duplicating the reference to the super class so memoise it
    // if necessary
    if (path.get("superClass").isStatic()) {
      superRef = path.node.superClass;
    } else {
      superRef = path.scope.generateUidIdentifier("super");
      nodes.push(t.variableDeclaration("var", [
        t.variableDeclarator(superRef, path.node.superClass)
      ]));
      path.node.superClass = superRef;
    }

    path.replaceWithMultiple(nodes.concat(buildSuperWrapper({
      CLASS_REF: path.scope.generateUidIdentifier(ref.name),
      SUPER_REF: superRef,
      CLASS: t.toExpression(path.node),
      WRAPPER_REF: ref
    })));
  }

  return {
    inherits: require("babel-plugin-syntax-class-constructor-call"),

    visitor: {
      Class(path) {
        if (path.node[ALREADY_VISITED]) return;
        path.node[ALREADY_VISITED] = true;

        let constructorCall = findConstructorCall(path);

        if (constructorCall) {
          handleClassWithCall(constructorCall, path);
        } else if (path.has("superClass")) {
          handleClassWithSuper(path);
        } else {
          return;
        }
      }
    }
  };
}
