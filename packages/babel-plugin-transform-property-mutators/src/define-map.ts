import { types as t, type File } from "@babel/core";
import type { Scope } from "@babel/traverse";
import nameFunction from "@babel/helper-function-name";

type DefineMap = {
  decorators: t.ArrayExpression;
  _computed: boolean;
  _inherits: t.Node[];
  _key: t.Expression | t.PrivateName;
  value?: t.Expression;
  initializer?: t.Expression;
  get?: t.Expression;
  set?: t.Expression;
  kind: "get" | "set" | "value" | "initializer";
};

export type MutatorMap = Record<string, DefineMap>;

const has = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

export function pushProperty(
  mutatorMap: MutatorMap,
  node: t.Property | t.Method,
  kind: DefineMap["kind"],
  file: File,
  scope?: Scope,
) {
  const alias = t.toKeyAlias(node);

  //

  let map = {} as DefineMap;
  if (has(mutatorMap, alias)) map = mutatorMap[alias];
  mutatorMap[alias] = map;

  //

  map._inherits = map._inherits || [];
  map._inherits.push(node);

  map._key = node.key;

  if (
    // @ts-expect-error computed is not in private property
    node.computed
  ) {
    map._computed = true;
  }

  if (node.decorators) {
    const decorators = (map.decorators =
      map.decorators || t.arrayExpression([]));
    decorators.elements.push(
      ...node.decorators.map(dec => dec.expression).reverse(),
    );
  }

  if (map.value || map.initializer) {
    throw file.buildCodeFrameError(node, "Key conflict with sibling node");
  }

  let key, value;

  // save the key so we can possibly do function name inferences
  if (
    t.isObjectProperty(node) ||
    t.isObjectMethod(node) ||
    t.isClassMethod(node)
  ) {
    key = t.toComputedKey(node, node.key);
  }

  if (t.isProperty(node)) {
    value = node.value as t.Expression;
  } else if (t.isObjectMethod(node) || t.isClassMethod(node)) {
    value = t.functionExpression(
      null,
      // @ts-expect-error todo(flow->ts) TSParameterProperty is not assignable to parameter of type 'Identifier | RestElement | Pattern'.
      node.params,
      node.body,
      node.generator,
      node.async,
    );
    value.returnType = node.returnType;
  }

  const inheritedKind = toKind(node);
  if (!kind || inheritedKind !== "value") {
    kind = inheritedKind;
  }

  // infer function name
  if (
    scope &&
    t.isStringLiteral(key) &&
    (kind === "value" || kind === "initializer") &&
    t.isFunctionExpression(value)
  ) {
    value = nameFunction({ id: key, node: value, scope });
  }

  if (value) {
    t.inheritsComments(value, node);
    map[kind] = value;
  }

  return map;
}

function toKind(node: t.Property | t.Method) {
  if (t.isClassMethod(node) || t.isObjectMethod(node)) {
    if (node.kind === "get" || node.kind === "set") {
      return node.kind;
    }
  }

  return "value";
}

export function toDefineObject(mutatorMap: any) {
  Object.keys(mutatorMap).forEach(function (key) {
    const map = mutatorMap[key];
    if (map.value) map.writable = t.booleanLiteral(true);
    map.configurable = t.booleanLiteral(true);
    map.enumerable = t.booleanLiteral(true);
  });

  return toClassObject(mutatorMap);
}

function toClassObject(mutatorMap: any) {
  const objExpr = t.objectExpression([]);

  Object.keys(mutatorMap).forEach(function (mutatorMapKey) {
    const map = mutatorMap[mutatorMapKey];
    const mapNode = t.objectExpression([]);

    const propNode = t.objectProperty(map._key, mapNode, map._computed);

    Object.keys(map).forEach(function (key) {
      const node = map[key];
      if (key[0] === "_") return;

      const prop = t.objectProperty(t.identifier(key), node);
      t.inheritsComments(prop, node);
      t.removeComments(node);

      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
}
