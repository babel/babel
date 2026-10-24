import type {
  PluginAPI,
  PluginObject,
  PluginPass,
  Visitor,
  types as t,
} from "@babel/core";
import { isLessThan } from "verkit";

import {
  FEATURES,
  enableFeature,
  getResolvedOptions,
  setAssumptions,
  type FeatureOptions,
} from "./features.ts";
import { buildDestructuringVisitor, type Guard } from "./visitors.ts";
import { transformFunctionParams } from "./function-params.ts";
import { transformObjectSpread } from "./object-spread.ts";
import { hasPrivateClassElement } from "./util.ts";

export { FEATURES };
export { unshiftForXStatementBody } from "./util.ts";
export { buildObjectExcludingKeys } from "./util.ts";

const versionKey = "@babel/plugin-destructuring/version";

export interface Options {
  name: string;
  feature: number;
  options?: FeatureOptions;
  manipulateOptions?: PluginObject["manipulateOptions"];
  inherits?: PluginObject["inherits"];
  api: PluginAPI;
}

/**
 * Create a plugin lowering destructuring-related syntax. Several plugins
 * created by this factory can be enabled at the same time: they share a
 * single lowering pass, configured with the union of their features.
 */
export function createDestructuringPlugin({
  name,
  feature,
  options = {},
  manipulateOptions,
  inherits,
  api,
}: Options): PluginObject {
  // Used when moving parameters of arrow functions into their body.
  const noNewArrows = api.assumption("noNewArrows");

  const isCurrentVersion = (state: PluginPass) =>
    state.file.get(versionKey) === PACKAGE_JSON.version;

  const guard: Guard = handler => (path, state) => {
    if (isCurrentVersion(state)) {
      handler(path, state, getResolvedOptions(state.file));
    }
  };

  const visitor = buildDestructuringVisitor(guard);

  if (feature & (FEATURES.objectRest | FEATURES.privateDestructuring)) {
    Object.assign(visitor, {
      Function: guard<t.Function>((path, _, options) =>
        transformFunctionParams(path, options),
      ),
    });
  }

  if (feature & FEATURES.objectSpread) {
    Object.assign(visitor, {
      ObjectExpression: guard<t.ObjectExpression>(transformObjectSpread),
    });
  }

  if (feature & FEATURES.privateDestructuring) {
    // Private names in patterns must be lowered to private member
    // expressions before the class features plugins transform the class,
    // which happens when visiting the Class node.
    const innerVisitor: Visitor<PluginPass> = { ...visitor };
    Object.assign(visitor, {
      Class: guard<t.Class>((path, state) => {
        if (!hasPrivateClassElement(path.node.body)) return;
        path.traverse(innerVisitor, state);
      }),
    });
  }

  return {
    name,
    manipulateOptions,
    inherits,

    pre(file) {
      enableFeature(file, feature, options);
      setAssumptions(file, { noNewArrows });

      if (
        !file.get(versionKey) ||
        isLessThan(file.get(versionKey), PACKAGE_JSON.version)
      ) {
        file.set(versionKey, PACKAGE_JSON.version);
      }
    },

    visitor,
  };
}
