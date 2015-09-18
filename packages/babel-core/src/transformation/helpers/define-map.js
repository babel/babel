import each from "lodash/collection/each";
import has from "lodash/object/has";
import * as t from "babel-types";

export function push(mutatorMap, node, kind, file) {
  let alias = t.toKeyAlias(node);

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
    let decorators = map.decorators = map.decorators || t.arrayExpression([]);
    decorators.elements = decorators.elements.concat(node.decorators.map(dec => dec.expression).reverse());
  }

  if (map.value || map.initializer) {
    throw file.buildCodeFrameError(node, "Key conflict with sibling node");
  }

  if (node.value) {
    if (node.kind === "init") kind = "value";
    if (node.kind === "get") kind = "get";
    if (node.kind === "set") kind = "set";

    t.inheritsComments(node.value, node);
    map[kind] = node.value;
  }

  return map;
}

export function hasComputed(mutatorMap) {
  for (let key in mutatorMap) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }
  return false;
}

export function toComputedObjectFromClass(obj) {
  let objExpr = t.arrayExpression([]);

  for (let i = 0; i < obj.properties.length; i++) {
    let prop = obj.properties[i];
    let val = prop.value;
    val.properties.unshift(t.property("init", t.identifier("key"), t.toComputedKey(prop)));
    objExpr.elements.push(val);
  }

  return objExpr;
}

export function toClassObject(mutatorMap) {
  let objExpr = t.objectExpression([]);

  each(mutatorMap, function (map) {
    let mapNode = t.objectExpression([]);

    let propNode = t.property("init", map._key, mapNode, map._computed);

    each(map, function (node, key) {
      if (key[0] === "_") return;

      let inheritNode = node;
      if (t.isMethodDefinition(node) || t.isClassProperty(node)) node = node.value;

      let prop = t.property("init", t.identifier(key), node);
      t.inheritsComments(prop, inheritNode);
      t.removeComments(inheritNode);

      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
}

export function toDefineObject(mutatorMap) {
  each(mutatorMap, function (map) {
    if (map.value) map.writable = t.booleanLiteral(true);
    map.configurable = t.booleanLiteral(true);
    map.enumerable = t.booleanLiteral(true);
  });

  return toClassObject(mutatorMap);
}
