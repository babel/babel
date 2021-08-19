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

function toKind(node: Object) {
  if (isClassMethod(node) || isObjectMethod(node)) {
    if (node.kind === "get" || node.kind === "set") {
      return node.kind;
    }
  }

  return "value";
}

const has = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

export function push(
  mutatorMap: Object,
  node: Object,
  kind: string,
  file,
  scope?,
): Object {
  const alias = toKeyAlias(node);

  //

  let map = {};
  if (has(mutatorMap, alias)) map = mutatorMap[alias];
  mutatorMap[alias] = map;

  //

  map._inherits = map._inherits || [];
  map._inherits.push(node);

  map._key = node.key;

  if (node.computed) {
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
    value = node.value;
  } else if (isObjectMethod(node) || isClassMethod(node)) {
    value = functionExpression(
      null,
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

export function hasComputed(mutatorMap: Object): boolean {
  for (const key of Object.keys(mutatorMap)) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }
  return false;
}

export function toComputedObjectFromClass(obj: Object): Object {
  const objExpr = arrayExpression([]);

  for (let i = 0; i < obj.properties.length; i++) {
    const prop = obj.properties[i];
    const val = prop.value;
    val.properties.unshift(
      objectProperty(identifier("key"), toComputedKey(prop)),
    );
    objExpr.elements.push(val);
  }

  return objExpr;
}

export function toClassObject(mutatorMap: Object): Object {
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

export function toDefineObject(mutatorMap: Object): Object {
  Object.keys(mutatorMap).forEach(function (key) {
    const map = mutatorMap[key];
    if (map.value) map.writable = booleanLiteral(true);
    map.configurable = booleanLiteral(true);
    map.enumerable = booleanLiteral(true);
  });

  return toClassObject(mutatorMap);
}
