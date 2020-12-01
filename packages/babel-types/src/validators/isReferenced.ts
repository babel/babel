import type * as t from "..";

/**
 * Check if the input `node` is a reference to a bound variable.
 */
export default function isReferenced(
  node: t.Node,
  parent: t.Node,
  grandparent?: t.Node,
): boolean {
  switch (parent.type) {
    // yes: PARENT[NODE]
    // yes: NODE.child
    // no: parent.NODE
    case "MemberExpression":
    case "JSXMemberExpression":
    case "OptionalMemberExpression":
      if (parent.property === node) {
        // @ts-expect-error todo(flow->ts): computed is missing on JSXMemberExpression
        return !!parent.computed;
      }
      return parent.object === node;

    // no: let NODE = init;
    // yes: let id = NODE;
    case "VariableDeclarator":
      return parent.init === node;

    // yes: () => NODE
    // no: (NODE) => {}
    case "ArrowFunctionExpression":
      return parent.body === node;

    // no: class { #NODE; }
    // no: class { get #NODE() {} }
    // no: class { #NODE() {} }
    // no: class { fn() { return this.#NODE; } }
    case "PrivateName":
      return false;

    // no: class { NODE() {} }
    // yes: class { [NODE]() {} }
    // no: class { foo(NODE) {} }
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ObjectMethod":
      // @ts-expect-error todo(flow->ts) params have more specific type comparing to node
      if (parent.params.includes(node)) {
        return false;
      }
    // fall through

    // yes: { [NODE]: "" }
    // no: { NODE: "" }
    // depends: { NODE }
    // depends: { key: NODE }
    // fall through
    case "ObjectProperty":
    // no: class { NODE = value; }
    // yes: class { [NODE] = value; }
    // yes: class { key = NODE; }
    // fall through
    case "ClassProperty":
    case "ClassPrivateProperty":
      if (parent.key === node) {
        // @ts-expect-error todo(flow->ts): computed might not exist
        return !!parent.computed;
      }
      // @ts-expect-error todo(flow->ts): ObjectMethod does not have value property
      if (parent.value === node) {
        return !grandparent || grandparent.type !== "ObjectPattern";
      }
      return true;

    // no: class NODE {}
    // yes: class Foo extends NODE {}
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.superClass === node;

    // yes: left = NODE;
    // no: NODE = right;
    case "AssignmentExpression":
      return parent.right === node;

    // no: [NODE = foo] = [];
    // yes: [foo = NODE] = [];
    case "AssignmentPattern":
      return parent.right === node;

    // no: NODE: for (;;) {}
    case "LabeledStatement":
      return false;

    // no: try {} catch (NODE) {}
    case "CatchClause":
      return false;

    // no: function foo(...NODE) {}
    case "RestElement":
      return false;

    case "BreakStatement":
    case "ContinueStatement":
      return false;

    // no: function NODE() {}
    // no: function foo(NODE) {}
    case "FunctionDeclaration":
    case "FunctionExpression":
      return false;

    // no: export NODE from "foo";
    // no: export * as NODE from "foo";
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;

    // no: export { foo as NODE };
    // yes: export { NODE as foo };
    // no: export { NODE as foo } from "foo";
    case "ExportSpecifier":
      // @ts-expect-error todo(flow->ts): Property 'source' does not exist on type 'AnyTypeAnnotation'.
      if (grandparent?.source) {
        return false;
      }
      return parent.local === node;

    // no: import NODE from "foo";
    // no: import * as NODE from "foo";
    // no: import { NODE as foo } from "foo";
    // no: import { foo as NODE } from "foo";
    // no: import NODE from "bar";
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;

    // no: <div NODE="foo" />
    case "JSXAttribute":
      return false;

    // no: [NODE] = [];
    // no: ({ NODE }) = [];
    case "ObjectPattern":
    case "ArrayPattern":
      return false;

    // no: new.NODE
    // no: NODE.target
    case "MetaProperty":
      return false;

    // yes: type X = { somePropert: NODE }
    // no: type X = { NODE: OtherType }
    case "ObjectTypeProperty":
      return parent.key !== node;

    // yes: enum X { Foo = NODE }
    // no: enum X { NODE }
    case "TSEnumMember":
      return parent.id !== node;

    // yes: { [NODE]: value }
    // no: { NODE: value }
    case "TSPropertySignature":
      if (parent.key === node) {
        return !!parent.computed;
      }

      return true;
  }

  return true;
}
