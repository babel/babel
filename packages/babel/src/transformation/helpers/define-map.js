import each from "lodash/collection/each";
import has from "lodash/object/has";
import * as t from "../../types";

export function push(mutatorMap, node, kind, file) {
  var alias = t.toKeyAlias(node);

  //

  var map = {};
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
    var decorators = map.decorators = map.decorators || t.arrayExpression([]);
    decorators.elements = decorators.elements.concat(node.decorators.map(dec => dec.expression).reverse());
  }

  if (map.value || map.initializer) {
    throw file.errorWithNode(node, "Key conflict with sibling node");
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
  for (var key in mutatorMap) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }
  return false;
}

export function toComputedObjectFromClass(obj) {
  var objExpr = t.arrayExpression([]);

  for (var i = 0; i < obj.properties.length; i++) {
    var prop = obj.properties[i];
    var val = prop.value;
    val.properties.unshift(t.property("init", t.identifier("key"), t.toComputedKey(prop)));
    objExpr.elements.push(val);
  }

  return objExpr;
}

export function toClassObject(mutatorMap) {
  var objExpr = t.objectExpression([]);

  each(mutatorMap, function (map) {
    var mapNode = t.objectExpression([]);

    var propNode = t.property("init", map._key, mapNode, map._computed);

    each(map, function (node, key) {
      if (key[0] === "_") return;

      var inheritNode = node;
      if (t.isMethodDefinition(node) || t.isClassProperty(node)) node = node.value;

      var prop = t.property("init", t.identifier(key), node);
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
    if (map.value) map.writable = t.literal(true);
    map.configurable = t.literal(true);
    map.enumerable = t.literal(true);
  });

  return toClassObject(mutatorMap);
}
