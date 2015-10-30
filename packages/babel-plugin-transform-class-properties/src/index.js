// todo: define instead of assign

export default function ({ types: t }) {
  let findBareSupers = {
    Super(path) {
      if (path.parentPath.isCallExpression({ callee: path.node })) {
        this.push(path.parentPath);
      }
    }
  };

  let referenceVisitor = {
    ReferencedIdentifier(path) {
      if (this.scope.hasOwnBinding(path.node.name)) {
        this.collision = true;
        path.skip();
      }
    }
  };

  return {
    inherits: require("babel-plugin-syntax-class-properties"),

    visitor: {
      Class(path) {
        let isDerived = !!path.node.superClass;
        let constructor;
        let props = [];
        let body = path.get("body");

        for (let path of body.get("body")) {
          if (path.isClassProperty()) {
            props.push(path);
          } else if (path.isClassMethod({ kind: "constructor" })) {
            constructor = path;
          }
        }

        if (!props.length) return;

        let nodes = [];
        let ref;

        if (path.isClassExpression()) {
          ref = path.scope.generateUidIdentifier();
        } else { // path.isClassDeclaration()
          ref = path.node.id;
        }

        let instanceBody = [];

        for (let prop of props) {
          let propNode = prop.node;
          if (propNode.decorators) continue;
          if (!propNode.value) continue;

          let isStatic = propNode.static;

          if (isStatic) {
            nodes.push(t.expressionStatement(
              t.assignmentExpression("=", t.memberExpression(ref, propNode.key), propNode.value)
            ));
          } else {
            instanceBody.push(t.expressionStatement(
              t.assignmentExpression("=", t.memberExpression(t.thisExpression(), propNode.key), propNode.value)
            ));
          }
        }

        if (instanceBody.length) {
          if (!constructor) {
            let newConstructor = t.classMethod("constructor", t.identifier("constructor"), [], t.blockStatement([]));
            if (isDerived) {
              newConstructor.params = [t.restElement(t.identifier("args"))];
              newConstructor.body.body.push(
                t.returnStatement(
                  t.callExpression(
                    t.super(),
                    [t.spreadElement(t.identifier("args"))]
                  )
                )
              );
            }
            [constructor] = body.unshiftContainer("body", newConstructor);
          }

          let collisionState = {
            collision: false,
            scope: constructor.scope
          };

          for (let prop of props) {
            prop.traverse(referenceVisitor, collisionState);
            if (collisionState.collision) break;
          }

          if (collisionState.collision) {
            let initialisePropsRef = path.scope.generateUidIdentifier("initialiseProps");

            nodes.push(t.variableDeclaration("var", [
              t.variableDeclarator(
                initialisePropsRef,
                t.functionExpression(null, [], t.blockStatement(instanceBody))
              )
            ]));

            instanceBody = [
              t.expressionStatement(
                t.callExpression(t.memberExpression(initialisePropsRef, t.identifier("call")), [t.thisExpression()])
              )
            ];
          }

          //

          if (isDerived) {
            let bareSupers = []
            constructor.traverse(findBareSupers, bareSupers);
            for (let bareSuper of bareSupers) {
              bareSuper.insertAfter(instanceBody);
            }
          } else {
            constructor.get("body").unshiftContainer("body", instanceBody);
          }
        }

        for (let prop of props) {
          prop.remove();
        }

        if (!nodes.length) return;

        if (path.isClassExpression()) {
          nodes.push(t.expressionStatement(ref));
        }

        path.insertAfter(nodes);
      }
    }
  };
}
