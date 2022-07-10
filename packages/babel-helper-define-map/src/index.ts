import nameFunction from "@babel/helper-function-name";
import {
  arrayExpression,
  booleanLiteral,
  functionExpression,
  identifier,
  inheritsComments,
  isClassMethod,
  isFunctionExpression,
  isObjectMethod,
  isObjectProperty,
  isProperty,
  isStringLiteral,
  objectExpression,
  objectProperty,
  removeComments,
  toComputedKey,
  toKeyAlias,
} from "@babel/types";
import type { File } from "@babel/core";
import type * as t from "@babel/types";
import type { Scope } from "@babel/traverse";

function toKind(node: t.Property | t.Method) {
  if (isClassMethod(node) || isObjectMethod(node)) {
    if (node.kind === "get" || node.kind === "set") {
      return node.kind;
    }
  }

  return "value";
}

const has = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

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

export function push(
  mutatorMap: MutatorMap,
  node: t.Property | t.Method,
  kind: DefineMap["kind"],
  file: File,
  scope?: Scope,
) {
  const alias = toKeyAlias(node);

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
    const decorators = (map.decorators = map.decorators || arrayExpression([]));
    decorators.elements.push(
      ...node.decorators.map(dec => dec.expression).reverse(),
    );
  }

  if (map.value || map.initializer) {
    throw file.buildCodeFrameError(node, "Key conflict with sibling node");
  }

  let key, value;

  // save the key so we can possibly do function name inferences
  if (isObjectProperty(node) || isObjectMethod(node) || isClassMethod(node)) {
    key = toComputedKey(node, node.key);
  }

  if (isProperty(node)) {
    value = node.value as t.Expression;
  } else if (isObjectMethod(node) || isClassMethod(node)) {
    value = functionExpression(
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
    isStringLiteral(key) &&
    (kind === "value" || kind === "initializer") &&
    isFunctionExpression(value)
  ) {
    value = nameFunction({ id: key, node: value, scope });
  }

  if (value) {
    inheritsComments(value, node);
    map[kind] = value;
  }

  return map;
}

export function hasComputed(mutatorMap: any): boolean {
  for (const key of Object.keys(mutatorMap)) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }
  return false;
}

export function toComputedObjectFromClass(obj: any) {
  const objExpr = arrayExpression([]);

  for (let i = 0; i < obj.properties.length; i++) {
    const prop = obj.properties[i];
    const val = prop.value;
    val.properties.unshift(
      objectProperty(
        identifier("key"),
        // @ts-expect-error toComputedObjectFromClass is not used, maybe we can remove it
        toComputedKey(prop),
      ),
    );
    objExpr.elements.push(val);
  }

  return objExpr;
}

export function toClassObject(mutatorMap: any) {
  const objExpr = objectExpression([]);

  Object.keys(mutatorMap).forEach(function (mutatorMapKey) {
    const map = mutatorMap[mutatorMapKey];
    const mapNode = objectExpression([]);

    const propNode = objectProperty(map._key, mapNode, map._computed);

    Object.keys(map).forEach(function (key) {
      const node = map[key];
      if (key[0] === "_") return;

      const prop = objectProperty(identifier(key), node);
      inheritsComments(prop, node);
      removeComments(node);

      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
}

export function toDefineObject(mutatorMap: any) {
  Object.keys(mutatorMap).forEach(function (key) {
    const map = mutatorMap[key];
    if (map.value) map.writable = booleanLiteral(true);
    map.configurable = booleanLiteral(true);
    map.enumerable = booleanLiteral(true);
  });

  return toClassObject(mutatorMap);
}
