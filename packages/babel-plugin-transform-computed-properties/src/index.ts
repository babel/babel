import { types as t } from "@babel/core";
import type { PluginPass, Scope } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  /** @deprecated Use the `setComputedProperties` assumption instead. */
  loose?: boolean;
}

type PropertyInfo = {
  scope: Scope;
  objId: t.Identifier;
  body: t.Statement[];
  computedProps: (t.ObjectMember | t.SpreadElement)[];
  initPropExpression: t.ObjectExpression;
  state: PluginPass;
};

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("loose" in options) {
    console.warn(
      "@babel/plugin-transform-computed-properties: The 'loose' option has been deprecated, " +
        "use the 'setComputedProperties' assumption instead (https://babeljs.io/assumptions).",
    );
  }

  const setComputedProperties =
    api.assumption("setComputedProperties") ?? options.loose;

  const pushComputedProps = setComputedProperties
    ? pushComputedPropsLoose
    : pushComputedPropsSpec;

  function buildDefineAccessor(
    state: PluginPass,
    obj: t.Expression,
    prop: t.ObjectMethod,
  ) {
    const type = prop.kind as "get" | "set";
    const key =
      !prop.computed && t.isIdentifier(prop.key)
        ? t.stringLiteral(prop.key.name)
        : prop.key;
    const fn = getValue(prop)!;

    return t.callExpression(state.addHelper("defineAccessor"), [
      t.stringLiteral(type),
      obj,
      key,
      fn,
    ]);
  }

  /**
   * Get value of an object member under object expression.
   * Returns a function expression if prop is a ObjectMethod.
   *
   * @param {t.ObjectMember} prop
   * @returns t.Expression
   */
  function getValue(prop: t.ObjectMember) {
    if (t.isObjectProperty(prop)) {
      return prop.value as t.Expression;
    } else if (t.isObjectMethod(prop)) {
      return t.functionExpression(
        null,
        prop.params,
        prop.body,
        prop.generator,
        prop.async,
      );
    }
  }

  // A spread element after a computed property can't stay in the initial
  // object literal, because it must be applied after the properties preceding it.
  function buildSpread(
    state: PluginPass,
    obj: t.Expression,
    prop: t.SpreadElement,
  ) {
    return t.callExpression(state.addHelper("objectSpread2"), [
      obj,
      prop.argument,
    ]);
  }

  function pushAssign(
    objId: t.Identifier,
    prop: t.ObjectMember,
    body: t.Statement[],
  ) {
    body.push(
      t.expressionStatement(
        t.assignmentExpression(
          "=",
          t.memberExpression(
            t.cloneNode(objId),
            prop.key,
            prop.computed || t.isLiteral(prop.key),
          ),
          getValue(prop)!,
        ),
      ),
    );
  }

  function pushComputedPropsLoose(info: PropertyInfo) {
    const { computedProps, state, initPropExpression, objId, body } = info;

    for (const prop of computedProps) {
      if (t.isSpreadElement(prop)) {
        body.push(
          t.expressionStatement(buildSpread(state, t.cloneNode(objId), prop)),
        );
      } else if (
        t.isObjectMethod(prop) &&
        (prop.kind === "get" || prop.kind === "set")
      ) {
        if (computedProps.length === 1) {
          return buildDefineAccessor(state, initPropExpression, prop);
        } else {
          body.push(
            t.expressionStatement(
              buildDefineAccessor(state, t.cloneNode(objId), prop),
            ),
          );
        }
      } else {
        pushAssign(t.cloneNode(objId), prop, body);
      }
    }
  }

  function pushComputedPropsSpec(info: PropertyInfo) {
    const { objId, body, computedProps, state } = info;

    // To prevent too deep AST structures in case of large objects
    const CHUNK_LENGTH_CAP = 10;

    let currentChunk: PropertyInfo["computedProps"] | null = null;
    const computedPropsChunks: PropertyInfo["computedProps"][] = [];
    for (const prop of computedProps) {
      if (!currentChunk || currentChunk.length === CHUNK_LENGTH_CAP) {
        currentChunk = [];
        computedPropsChunks.push(currentChunk);
      }
      currentChunk.push(prop);
    }

    for (const chunk of computedPropsChunks) {
      const single = computedPropsChunks.length === 1;
      let node: t.Expression = single
        ? info.initPropExpression
        : t.cloneNode(objId);
      for (const prop of chunk) {
        if (t.isSpreadElement(prop)) {
          node = buildSpread(state, node, prop);
        } else if (
          t.isObjectMethod(prop) &&
          (prop.kind === "get" || prop.kind === "set")
        ) {
          node = buildDefineAccessor(info.state, node, prop);
        } else {
          node = t.callExpression(state.addHelper("defineProperty"), [
            node,
            // PrivateName must not be in ObjectExpression
            t.toComputedKey(prop) as t.Expression,
            // the value of ObjectProperty in ObjectExpression must be an expression
            getValue(prop)!,
          ]);
        }
      }
      if (single) return node;
      body.push(t.expressionStatement(node));
    }
  }

  return {
    name: "transform-computed-properties",

    visitor: {
      ObjectExpression: {
        exit(path, state) {
          const { node, parent, scope } = path;
          // put all properties and spread elements up to the first computed
          // property into the first object expression

          const firstComputed = node.properties.findIndex(
            prop => !t.isSpreadElement(prop) && prop.computed,
          );
          if (firstComputed === -1) return;

          const initProps = node.properties.slice(0, firstComputed);
          const computedProps = node.properties.slice(firstComputed);

          const objId = scope.generateUidIdentifierBasedOnNode(parent);
          const initPropExpression = t.objectExpression(initProps);
          const body = [];

          body.push(
            t.variableDeclaration("var", [
              t.variableDeclarator(objId, initPropExpression),
            ]),
          );

          const single = pushComputedProps({
            scope,
            objId,
            body,
            computedProps,
            initPropExpression,
            state,
          });

          if (single) {
            path.replaceWith(single);
          } else {
            if (setComputedProperties) {
              body.push(t.expressionStatement(t.cloneNode(objId)));
            }
            path.replaceWithMultiple(body);
          }
        },
      },
    },
  };
});
