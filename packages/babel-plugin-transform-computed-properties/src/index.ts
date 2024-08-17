import { types as t } from "@babel/core";
import type { PluginPass, Scope } from "@babel/core";
import { declare } from "@babel/helper-plugin-utils";
import template from "@babel/template";

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
  api.assertVersion(REQUIRED_VERSION(7));

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
    const fn = getValue(prop);
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

  function pushComputedPropsLoose(info: PropertyInfo) {
    const { computedProps, state, initPropExpression, objId, body } = info;

    for (const prop of computedProps) {
      if (
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

    let currentChunk: t.ObjectMember[] = null;
    const computedPropsChunks: Array<t.ObjectMember[]> = [];
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
        if (
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
            getValue(prop),
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
