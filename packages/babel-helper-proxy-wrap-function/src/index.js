import type { NodePath } from "@babel/traverse";
import template from "@babel/template";
import * as t from "@babel/types";
const immediatelyInvokedFunction = function(body) {
  return t.callExpression(
    t.parenthesizedExpression(
      t.functionExpression(null, [], t.blockStatement(body)),
    ),
    [],
  );
};

const proxyWrap = template(`
  let ORIGINAL_REF = ORIGINAL_FUNCTION, MODIFIED_REF = MODIFIED_FUNCTION;
  new Proxy(ORIGINAL_REF, {
    apply(target, thisArgument, argumentsList) {
      return Reflect.apply(MODIFIED_REF, thisArgument, argumentsList)
    }
  })
`);

export default function wrapProxy(path: NodePath, callId: Object) {
  if (path.isClassMethod() || path.isObjectMethod()) {
    const body = path.node.body;
    const methodIdentifier = path.node.key;
    const params = path.node.params;

    const originalReference = path.scope.generateUidIdentifier(
      methodIdentifier ? `original_${methodIdentifier.name}` : "ref",
    );
    const modifiedReference = path.scope.generateUidIdentifier(
      methodIdentifier ? `modified_${methodIdentifier.name}` : "ref",
    );
    const originalFunction = t.functionExpression(
      path.node.key,
      params,
      t.blockStatement(body.body),
      true,
    );
    const modifiedFunction = t.callExpression(callId, [originalReference]);
    const placeholders = {
      ORIGINAL_REF: originalReference,
      MODIFIED_REF: modifiedReference,
      ORIGINAL_FUNCTION: originalFunction,
      MODIFIED_FUNCTION: modifiedFunction,
    };
    const container = proxyWrap(placeholders);
    const wrappedIIFE = immediatelyInvokedFunction([
      container[0],
      t.returnStatement(container[1].expression),
    ]);

    if (path.node.type == "ClassMethod") {
      const classDeclaration = path.find(path => path.isClassDeclaration());
      const className = classDeclaration.node.id.name;
      const memberExpression = t.memberExpression(
        t.memberExpression(t.identifier(className), t.identifier("prototype")),
        methodIdentifier,
        false,
      );
      const assignmentExpression = t.assignmentExpression(
        "=",
        memberExpression,
        wrappedIIFE,
      );
      classDeclaration.insertAfter(assignmentExpression);
      path.remove();
    } else {
      // const ObjectDeclaration = path.find(path => path.isObjectExpression());
      const objectProperty = t.objectProperty(path.node.key, wrappedIIFE);
      path.replaceWith(objectProperty);
    }
  } else {
    const functionId = path.node.id;
    const originalReference = path.scope.generateUidIdentifier(
      functionId ? `original_${functionId.name}` : "ref",
    );
    const modifiedReference = path.scope.generateUidIdentifier(
      functionId ? `modified_${functionId.name}` : "ref",
    );
    const originalFunction = t.functionExpression(
      path.node.id,
      path.node.params,
      path.node.body,
      path.node.generator,
      path.node.async,
    );
    const modifiedFunction = t.callExpression(callId, [originalReference]);
    const nameIdentifier =
      functionId || path.scope.generateUidIdentifier("ref");
    const placeholders = {
      ORIGINAL_REF: originalReference,
      MODIFIED_REF: modifiedReference,
      ORIGINAL_FUNCTION: originalFunction,
      MODIFIED_FUNCTION: modifiedFunction,
    };
    const container = proxyWrap(placeholders);

    if (path.isFunctionDeclaration()) {
      const parent = path.parentPath;
      let relationTarget;
      if (parent.type != "Program" && parent.type != "BlockStatement") {
        if (parent.type == "ExportNamedDeclaration") {
          // let x = <proxy>;
          const variableDeclaration = t.variableDeclaration("let", [
            t.variableDeclarator(nameIdentifier, container[1].expression),
          ]);
          relationTarget = parent;
          relationTarget.insertBefore(container[0]);
          path.replaceWith(variableDeclaration);
        } else {
          // let x; x = <proxy>;
          const variableDeclaration = t.variableDeclaration("let", [
            t.variableDeclarator(nameIdentifier),
          ]);
          const assignmentExpression = t.expressionStatement(
            t.assignmentExpression(
              "=",
              nameIdentifier,
              container[1].expression,
            ),
          );

          relationTarget = parent;
          relationTarget.insertBefore(container[0]);
          relationTarget.insertBefore(variableDeclaration);
          relationTarget.insertBefore(assignmentExpression);
          path.replaceWith(nameIdentifier);
        }
      } else {
        const variableDeclaration = t.variableDeclaration("let", [
          t.variableDeclarator(nameIdentifier),
        ]);
        const assignmentExpression = t.expressionStatement(
          t.assignmentExpression("=", nameIdentifier, container[1].expression),
        );
        relationTarget = path;
        relationTarget.insertBefore(container[0]);
        relationTarget.insertBefore(variableDeclaration);
        path.replaceWith(assignmentExpression);
      }
    } else {
      const wrappedIIFE = immediatelyInvokedFunction([
        container[0],
        t.returnStatement(container[1].expression),
      ]);
      // const originalFunction = container.body.body[0].declarations[0].init
      // if (!functionId) {
      //   nameFunction({
      //     node: originalFunction,
      //     parent: path.parent,
      //     scope: path.scope,
      //   });
      // }
      path.replaceWith(wrappedIIFE);
    }
  }
}
