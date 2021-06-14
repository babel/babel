import { template, types as t } from "@babel/core";

export default function transpileNamespace(path, t, allowNamespaces) {
  if (path.node.declare || path.node.id.type === "StringLiteral") {
    path.remove();
    return;
  }

  if (!allowNamespaces) {
    throw path.hub.file.buildCodeFrameError(
      path.node.id,
      "Namespace not marked type-only declare." +
        " Non-declarative namespaces are only supported experimentally in Babel." +
        " To enable and review caveats see:" +
        " https://babeljs.io/docs/en/babel-plugin-transform-typescript",
    );
  }

  const name = path.node.id.name;
  const value = handleNested(path, t, t.cloneDeep(path.node));
  const bound = path.scope.hasOwnBinding(name);
  if (path.parent.type === "ExportNamedDeclaration") {
    if (!bound) {
      path.parentPath.insertAfter(value);
      path.replaceWith(getDeclaration(t, name));
      path.scope.registerDeclaration(path.parentPath);
    } else {
      path.parentPath.replaceWith(value);
    }
  } else if (bound) {
    path.replaceWith(value);
  } else {
    path.scope.registerDeclaration(
      path.replaceWithMultiple([getDeclaration(t, name), value])[0],
    );
  }
}

function getDeclaration(t, name) {
  return t.variableDeclaration("let", [
    t.variableDeclarator(t.identifier(name)),
  ]);
}

function getMemberExpression(t, name, itemName) {
  return t.memberExpression(t.identifier(name), t.identifier(itemName));
}

/**
 * Convert export const foo = 1 to Namepsace.foo = 1;
 *
 * @param {t.VariableDeclaration} node given variable declaration, e.g. `const foo = 1`
 * @param {string} name the generated unique namespace member name
 * @param {*} hub An instance implements HubInterface defined in `@babel/traverse` that can throw a code frame error
 */
function handleVariableDeclaration(
  node: t.VariableDeclaration,
  name: string,
  hub: any,
): t.Statement[] {
  if (node.kind !== "const") {
    throw hub.file.buildCodeFrameError(
      node,
      "Namespaces exporting non-const are not supported by Babel." +
        " Change to const or see:" +
        " https://babeljs.io/docs/en/babel-plugin-transform-typescript",
    );
  }
  const { declarations } = node;
  if (
    declarations.every(
      (declarator): declarator is t.VariableDeclarator & { id: t.Identifier } =>
        t.isIdentifier(declarator.id),
    )
  ) {
    // `export const a = 1` transforms to `const a = N.a = 1`, the output
    // is smaller than `const a = 1; N.a = a`;
    for (const declarator of declarations) {
      declarator.init = t.assignmentExpression(
        "=",
        getMemberExpression(t, name, declarator.id.name),
        declarator.init,
      );
    }
    return [node];
  }
  // Now we have pattern in declarators
  // `export const [a] = 1` transforms to `const [a] = 1; N.a = a`
  const bindingIdentifiers = t.getBindingIdentifiers(node);
  const assignments = [];
  // getBindingIdentifiers returns an object without prototype.
  // eslint-disable-next-line guard-for-in
  for (const idName in bindingIdentifiers) {
    assignments.push(
      t.assignmentExpression(
        "=",
        getMemberExpression(t, name, idName),
        t.cloneNode(bindingIdentifiers[idName]),
      ),
    );
  }
  return [node, t.expressionStatement(t.sequenceExpression(assignments))];
}

function handleNested(path, t, node, parentExport?) {
  const names = new Set();
  const realName = node.id;
  const name = path.scope.generateUid(realName.name);
  const namespaceTopLevel = node.body.body;
  for (let i = 0; i < namespaceTopLevel.length; i++) {
    const subNode = namespaceTopLevel[i];

    // The first switch is mainly to detect name usage. Only export
    // declarations require further transformation.
    switch (subNode.type) {
      case "TSModuleDeclaration": {
        const transformed = handleNested(path, t, subNode);
        const moduleName = subNode.id.name;
        if (names.has(moduleName)) {
          namespaceTopLevel[i] = transformed;
        } else {
          names.add(moduleName);
          namespaceTopLevel.splice(
            i++,
            1,
            getDeclaration(t, moduleName),
            transformed,
          );
        }
        continue;
      }
      case "TSEnumDeclaration":
      case "FunctionDeclaration":
      case "ClassDeclaration":
        names.add(subNode.id.name);
        continue;
      case "VariableDeclaration": {
        // getBindingIdentifiers returns an object without prototype.
        // eslint-disable-next-line guard-for-in
        for (const name in t.getBindingIdentifiers(subNode)) {
          names.add(name);
        }
        continue;
      }
      default:
        // Neither named declaration nor export, continue to next item.
        continue;
      case "ExportNamedDeclaration":
      // Export declarations get parsed using the next switch.
    }

    // Transform the export declarations that occur inside of a namespace.
    switch (subNode.declaration.type) {
      case "TSEnumDeclaration":
      case "FunctionDeclaration":
      case "ClassDeclaration": {
        const itemName = subNode.declaration.id.name;
        names.add(itemName);
        namespaceTopLevel.splice(
          i++,
          1,
          subNode.declaration,
          t.expressionStatement(
            t.assignmentExpression(
              "=",
              getMemberExpression(t, name, itemName),
              t.identifier(itemName),
            ),
          ),
        );
        break;
      }
      case "VariableDeclaration": {
        const nodes = handleVariableDeclaration(
          subNode.declaration,
          name,
          path.hub,
        );
        namespaceTopLevel.splice(i, nodes.length, ...nodes);
        i += nodes.length - 1;
        break;
      }
      case "TSModuleDeclaration": {
        const transformed = handleNested(
          path,
          t,
          subNode.declaration,
          t.identifier(name),
        );
        const moduleName = subNode.declaration.id.name;
        if (names.has(moduleName)) {
          namespaceTopLevel[i] = transformed;
        } else {
          names.add(moduleName);
          namespaceTopLevel.splice(
            i++,
            1,
            getDeclaration(t, moduleName),
            transformed,
          );
        }
      }
    }
  }

  // {}
  let fallthroughValue = t.objectExpression([]);

  if (parentExport) {
    const memberExpr = t.memberExpression(parentExport, realName);
    fallthroughValue = template.expression.ast`
      ${t.cloneNode(memberExpr)} ||
        (${t.cloneNode(memberExpr)} = ${fallthroughValue})
    `;
  }

  return template.statement.ast`
    (function (${t.identifier(name)}) {
      ${namespaceTopLevel}
    })(${realName} || (${t.cloneNode(realName)} = ${fallthroughValue}));
  `;
}
