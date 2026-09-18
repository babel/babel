import type * as t from "../index.ts";

export default function traverseBindingIdentifiers(
  node: t.Node | undefined | null,
  callback: (id: t.Identifier) => void,
  outerOnly: boolean = false,
) {
  if (node == null) return;
  switch (node.type) {
    case "Identifier":
      callback(node);
      break;

    case "ExportDefaultDeclaration":
    case "ExportNamedDeclaration":
      traverseBindingIdentifiers(node.declaration, callback);

      break;
    case "DeclareClass":
    case "DeclareFunction":
    case "DeclareModule":
    case "DeclareVariable":
    case "DeclareInterface":
    case "DeclareTypeAlias":
    case "DeclareOpaqueType":
    case "InterfaceDeclaration":
    case "TypeAlias":
    case "OpaqueType":
      traverseBindingIdentifiers(node.id, callback);
      break;

    case "CatchClause":
      traverseBindingIdentifiers(node.param, callback);
      break;
    case "LabeledStatement":
      traverseBindingIdentifiers(node.label, callback);
      break;
    case "UnaryExpression":
      traverseBindingIdentifiers(node.argument, callback);
      break;
    case "AssignmentExpression":
      traverseBindingIdentifiers(node.left, callback);
      break;

    case "ImportSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportDefaultSpecifier":
      traverseBindingIdentifiers(node.local, callback);
      break;
    case "ImportDeclaration":
      for (const specifier of node.specifiers) {
        traverseBindingIdentifiers(specifier, callback);
      }
      break;
    case "TSImportEqualsDeclaration":
      traverseBindingIdentifiers(node.id, callback);
      break;

    case "ExportSpecifier":
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      traverseBindingIdentifiers(node.exported, callback);
      break;

    case "FunctionExpression":
      if (outerOnly) break;
    // fall through
    case "FunctionDeclaration":
      traverseBindingIdentifiers(node.id, callback);
    // fall through
    case "ArrowFunctionExpression":
    case "ObjectMethod":
    case "ClassMethod":
    case "ClassPrivateMethod":
      for (const param of node.params) {
        traverseBindingIdentifiers(param, callback);
      }
      break;

    case "ForInStatement":
    case "ForOfStatement":
      traverseBindingIdentifiers(node.left, callback);
      break;

    case "ClassDeclaration":
    case "ClassExpression":
      traverseBindingIdentifiers(node.id, callback);
      break;

    case "RestElement":
    case "UpdateExpression":
      traverseBindingIdentifiers(node.argument, callback);
      break;

    case "ObjectProperty":
      traverseBindingIdentifiers(node.value, callback);
      break;

    case "AssignmentPattern":
      traverseBindingIdentifiers(node.left, callback);
      break;
    case "ArrayPattern":
      for (const element of node.elements) {
        traverseBindingIdentifiers(element, callback);
      }
      break;
    case "ObjectPattern":
      for (const property of node.properties) {
        traverseBindingIdentifiers(property, callback);
      }
      break;

    case "VariableDeclaration":
      for (const declarator of node.declarations) {
        traverseBindingIdentifiers(declarator, callback);
      }
      break;
    case "VariableDeclarator":
      traverseBindingIdentifiers(node.id, callback);
      break;
  }
}
