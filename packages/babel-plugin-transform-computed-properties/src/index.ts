import { types as t } from "@babel/core";
import type { PluginPass } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import template from "@babel/template";
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
  state: PluginPass;
};

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var DefineAccessorHelper = template.expression.ast`
    function (type, obj, key, fn) {
      var desc = { configurable: true, enumerable: true };
      desc[type] = fn;
      return Object.defineProperty(obj, key, desc);
    }
  `;
  // @ts-expect-error undocumented _compact node property
  DefineAccessorHelper._compact = true;
}

export default declare((api, options: Options) => {
  api.assertVersion(7);

  const setComputedProperties =
    api.assumption("setComputedProperties") ?? options.loose;

  const pushComputedProps = setComputedProperties
    ? pushComputedPropsLoose
    : pushComputedPropsSpec;

  function buildDefineAccessor(
    state: PluginPass,
    type: "get" | "set",
    obj: t.Expression,
    key: t.Expression,
    fn: t.Expression,
  ) {
    if (process.env.BABEL_8_BREAKING) {
      return t.callExpression(state.addHelper("defineAccessor"), [
        t.stringLiteral(type),
        obj,
        key,
        fn,
      ]);
    } else {
      let helper: t.Identifier;
      if (state.availableHelper("defineAccessor")) {
        helper = state.addHelper("defineAccessor");
      } else {
        // Fallback for @babel/helpers <= 7.20.6, manually add helper function
        const file = state.file;
        helper = file.get("fallbackDefineAccessorHelper");
        if (!helper) {
          const id = file.scope.generateUidIdentifier("defineAccessor");
          file.scope.push({
            id,
            init: DefineAccessorHelper,
          });
          file.set("fallbackDefineAccessorHelper", (helper = id));
        }
        helper = t.cloneNode(helper);
      }

      return t.callExpression(helper, [t.stringLiteral(type), obj, key, fn]);
    }
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

  function pushAccessorDefine(
    { body, computedProps, initPropExpression, objId, state }: PropertyInfo,
    prop: t.ObjectMethod,
  ) {
    const kind = prop.kind as "get" | "set";
    const key =
      !prop.computed && t.isIdentifier(prop.key)
        ? t.stringLiteral(prop.key.name)
        : prop.key;
    const value = getValue(prop);

    if (computedProps.length === 1) {
      return buildDefineAccessor(state, kind, initPropExpression, key, value);
    } else {
      body.push(
        t.expressionStatement(
          buildDefineAccessor(state, kind, t.cloneNode(objId), key, value),
        ),
      );
    }
  }

  function pushComputedPropsLoose(info: PropertyInfo) {
    for (const prop of info.computedProps) {
      if (
        t.isObjectMethod(prop) &&
        (prop.kind === "get" || prop.kind === "set")
      ) {
        const single = pushAccessorDefine(info, prop);
        if (single) return single;
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
        const single = pushAccessorDefine(info, prop);
        if (single) return single;
      } else {
        // the value of ObjectProperty in ObjectExpression must be an expression
        const value = getValue(prop);
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
            body.push(t.expressionStatement(t.cloneNode(objId)));
            path.replaceWithMultiple(body);
          }
        },
      },
    },
  };
});
