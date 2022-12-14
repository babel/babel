import { types as t } from "@babel/core";

type DefineMap = {
  _inherits: t.Node[];
  _key: t.Expression;
  get?: t.Expression;
  set?: t.Expression;
  kind: "get" | "set";
};

export type MutatorMap = Record<string, DefineMap>;

export function pushAccessor(
  mutatorMap: MutatorMap,
  node: t.ObjectMethod & { kind: "get" | "set"; computed: false },
) {
  const alias = t.toKeyAlias(node);
  const map = (mutatorMap[alias] ??= {
    _inherits: [],
    _key: node.key,
  } as DefineMap);

  map._inherits.push(node);

  const value = t.functionExpression(
    null,
    node.params,
    node.body,
    node.generator,
    node.async,
  );
  value.returnType = node.returnType;
  t.inheritsComments(value, node);
  map[node.kind] = value;

  return map;
}

export function toDefineObject(mutatorMap: any) {
  const objExpr = t.objectExpression([]);

  Object.keys(mutatorMap).forEach(function (mutatorMapKey) {
    const map = mutatorMap[mutatorMapKey];
    map.configurable = t.booleanLiteral(true);
    map.enumerable = t.booleanLiteral(true);

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
