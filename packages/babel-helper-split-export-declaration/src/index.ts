import {
  cloneNode,
  exportNamedDeclaration,
  exportSpecifier,
  identifier,
  variableDeclaration,
  variableDeclarator,
} from "@babel/types";
import type * as t from "@babel/types";
import type { NodePath } from "@babel/traverse";

export default function splitExportDeclaration(
  exportDeclaration: NodePath<
    t.ExportDefaultDeclaration | t.ExportNamedDeclaration
  >,
) {
  if (
    !exportDeclaration.isExportDeclaration() ||
    exportDeclaration.isExportAllDeclaration()
  ) {
    throw new Error("Only default and named export declarations can be split.");
  }

  // build specifiers that point back to this export declaration

  if (exportDeclaration.isExportDefaultDeclaration()) {
    const declaration = exportDeclaration.get("declaration");
    const standaloneDeclaration =
      declaration.isFunctionDeclaration() || declaration.isClassDeclaration();
    const exportExpr =
      declaration.isFunctionExpression() || declaration.isClassExpression();

    const scope = declaration.isScope()
      ? declaration.scope.parent
      : declaration.scope;

    // @ts-expect-error id is not defined in expressions other than function/class
    let id = declaration.node.id;
    let needBindingRegistration = false;

    if (!id) {
      needBindingRegistration = true;

      id = scope.generateUidIdentifier("default");

      if (standaloneDeclaration || exportExpr) {
        declaration.node.id = cloneNode(id);
      }
    } else if (exportExpr && scope.hasBinding(id.name)) {
      needBindingRegistration = true;

      id = scope.generateUidIdentifier(id.name);
    }

    const updatedDeclaration = standaloneDeclaration
      ? declaration.node
      : variableDeclaration("var", [
          variableDeclarator(
            cloneNode(id),
            // @ts-expect-error When `standaloneDeclaration` is false, declaration must not be a Function/ClassDeclaration
            declaration.node,
          ),
        ]);

    const updatedExportDeclaration = exportNamedDeclaration(null, [
      exportSpecifier(cloneNode(id), identifier("default")),
    ]);

    exportDeclaration.insertAfter(updatedExportDeclaration);
    exportDeclaration.replaceWith(updatedDeclaration);

    if (needBindingRegistration) {
      scope.registerDeclaration(exportDeclaration);
    }

    return exportDeclaration;
  } else if (
    // @ts-expect-error TS can not narrow down to NodePath<t.ExportNamedDeclaration>
    exportDeclaration.get("specifiers").length > 0
  ) {
    throw new Error("It doesn't make sense to split exported specifiers.");
  }

  const declaration = exportDeclaration.get("declaration");
  const bindingIdentifiers = declaration.getOuterBindingIdentifiers();

  const specifiers = Object.keys(bindingIdentifiers).map(name => {
    return exportSpecifier(identifier(name), identifier(name));
  });

  const aliasDeclar = exportNamedDeclaration(null, specifiers);

  exportDeclaration.insertAfter(aliasDeclar);
  exportDeclaration.replaceWith(declaration.node);
  return exportDeclaration;
}
