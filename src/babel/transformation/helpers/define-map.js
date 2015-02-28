import cloneDeep from "lodash/lang/cloneDeep";
import traverse from "../../traversal";
import clone from "lodash/lang/clone";
import each from "lodash/collection/each";
import has from "lodash/object/has";
import t from "../../types";

export function push(mutatorMap, key, kind, computed, value) {
  var alias;

  if (t.isIdentifier(key)) {
    alias = key.name;
    if (computed) alias = "computed:" + alias;
  } else if (t.isLiteral(key)) {
    alias = String(key.value);
  } else {
    alias = JSON.stringify(traverse.removeProperties(cloneDeep(key)));
  }

  var map;
  if (has(mutatorMap, alias)) {
    map = mutatorMap[alias];
  } else {
    map = {};
  }
  mutatorMap[alias] = map;

  map._key = key;
  if (computed) {
    map._computed = true;
  }

  map[kind] = value;
}

export function build(mutatorMap) {
  var objExpr = t.objectExpression([]);

  each(mutatorMap, function (map) {
    var mapNode = t.objectExpression([]);

    var propNode = t.property("init", map._key, mapNode, map._computed);

    if (!map.get && !map.set) {
      map.writable = t.literal(true);
    }

    if (map.enumerable === false) {
      delete map.enumerable;
    } else {
      map.enumerable = t.literal(true);
    }

    map.configurable = t.literal(true);

    each(map, function (node, key) {
      if (key[0] === "_") return;

      node = clone(node);
      var inheritNode = node;
      if (t.isMethodDefinition(node)) node = node.value;

      var prop = t.property("init", t.identifier(key), node);
      t.inheritsComments(prop, inheritNode);
      t.removeComments(inheritNode);
      mapNode.properties.push(prop);
    });

    objExpr.properties.push(propNode);
  });

  return objExpr;
}
