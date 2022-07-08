import { declare } from "@babel/helper-plugin-utils";
import { template, types as t, type PluginPass } from "@babel/core";
import type { Scope } from "@babel/traverse";

export interface Options {
  loose?: boolean;
}

type PropertyInfo = {
  scope: Scope;
  objId: t.Identifier;
  body: t.Statement[];
  computedProps: t.ObjectMember[];
  initPropExpression: t.ObjectExpression;
  getMutatorId: () => t.Identifier;
  state: PluginPass;
};

export default declare((api, options: Options) => {
  api.assertVersion(7);

  const setComputedProperties =
    api.assumption("setComputedProperties") ?? options.loose;

  const pushComputedProps = setComputedProperties
    ? pushComputedPropsLoose
    : pushComputedPropsSpec;

  const buildMutatorMapAssign = template.statements(`
    MUTATOR_MAP_REF[KEY] = MUTATOR_MAP_REF[KEY] || {};
    MUTATOR_MAP_REF[KEY].KIND = VALUE;
  `);

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
          getValue(prop),
        ),
      ),
    );
  }

  function pushMutatorDefine(
    { body, getMutatorId, scope }: PropertyInfo,
    prop: t.ObjectMethod,
  ) {
    let key =
      !prop.computed && t.isIdentifier(prop.key)
        ? t.stringLiteral(prop.key.name)
        : prop.key;

    const maybeMemoise = scope.maybeGenerateMemoised(key);
    if (maybeMemoise) {
      body.push(
        t.expressionStatement(t.assignmentExpression("=", maybeMemoise, key)),
      );
      key = maybeMemoise;
    }

    body.push(
      ...buildMutatorMapAssign({
        MUTATOR_MAP_REF: getMutatorId(),
        KEY: t.cloneNode(key),
        VALUE: getValue(prop),
        KIND: t.identifier(prop.kind),
      }),
    );
  }

  function pushComputedPropsLoose(info: PropertyInfo) {
    for (const prop of info.computedProps) {
      if (
        t.isObjectMethod(prop) &&
        (prop.kind === "get" || prop.kind === "set")
      ) {
        pushMutatorDefine(info, prop);
      } else {
        pushAssign(t.cloneNode(info.objId), prop, info.body);
      }
    }
  }

  function pushComputedPropsSpec(info: PropertyInfo) {
    const { objId, body, computedProps, state } = info;

    for (const prop of computedProps) {
      // PrivateName must not be in ObjectExpression
      const key = t.toComputedKey(prop) as t.Expression;

      if (
        t.isObjectMethod(prop) &&
        (prop.kind === "get" || prop.kind === "set")
      ) {
        pushMutatorDefine(info, prop);
      } else {
        // the value of ObjectProperty in ObjectExpression must be an expression
        const value = getValue(prop) as t.Expression;
        if (computedProps.length === 1) {
          return t.callExpression(state.addHelper("defineProperty"), [
            info.initPropExpression,
            key,
            value,
          ]);
        } else {
          body.push(
            t.expressionStatement(
              t.callExpression(state.addHelper("defineProperty"), [
                t.cloneNode(objId),
                key,
                value,
              ]),
            ),
          );
        }
      }
    }
  }

  return {
    name: "transform-computed-properties",

    visitor: {
      ObjectExpression: {
        exit(path, state) {
          const { node, parent, scope } = path;
          let hasComputed = false;
          for (const prop of node.properties) {
            // @ts-expect-error SpreadElement must not have computed property
            hasComputed = prop.computed === true;
            if (hasComputed) break;
          }
          if (!hasComputed) return;

          // put all getters/setters into the first object expression as well as all initialisers up
          // to the first computed property

          const initProps: t.ObjectMember[] = [];
          const computedProps: t.ObjectMember[] = [];
          let foundComputed = false;

          for (const prop of node.properties) {
            if (t.isSpreadElement(prop)) {
              continue;
            }
            if (prop.computed) {
              foundComputed = true;
            }

            if (foundComputed) {
              computedProps.push(prop);
            } else {
              initProps.push(prop);
            }
          }

          const objId = scope.generateUidIdentifierBasedOnNode(parent);
          const initPropExpression = t.objectExpression(initProps);
          const body = [];

          body.push(
            t.variableDeclaration("var", [
              t.variableDeclarator(objId, initPropExpression),
            ]),
          );

          let mutatorRef: t.Identifier;

          const getMutatorId = function () {
            if (!mutatorRef) {
              mutatorRef = scope.generateUidIdentifier("mutatorMap");

              body.push(
                t.variableDeclaration("var", [
                  t.variableDeclarator(mutatorRef, t.objectExpression([])),
                ]),
              );
            }

            return t.cloneNode(mutatorRef);
          };

          const single = pushComputedProps({
            scope,
            objId,
            body,
            computedProps,
            initPropExpression,
            getMutatorId,
            state,
          });

          if (mutatorRef) {
            body.push(
              t.expressionStatement(
                t.callExpression(
                  state.addHelper("defineEnumerableProperties"),
                  [t.cloneNode(objId), t.cloneNode(mutatorRef)],
                ),
              ),
            );
          }

          // @ts-expect-error todo(flow->ts) `void` should not be used as variable
          if (single) {
            path.replaceWith(single);
          } else {
            body.push(t.expressionStatement(t.cloneNode(objId)));
            path.replaceWithMultiple(body);
          }
        },
      },
    },
  };
});
