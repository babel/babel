/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import { isRequired } from "@babel/helper-compilation-targets";
import {
  createDestructuringPlugin,
  FEATURES,
} from "@babel/helper-create-destructuring-plugin";
import compatData from "./compat-data.ts";

export interface Options {
  useBuiltIns?: boolean;
  /** @deprecated Use the `ignoreFunctionLength`, `objectRestNoSymbols`, `pureGetters`, and `setSpreadProperties` assumptions instead. */
  loose?: boolean;
}

export default declare((api, opts: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("loose" in opts) {
    console.warn(
      "@babel/plugin-transform-object-rest-spread: The 'loose' option has been deprecated, " +
        "use the `ignoreFunctionLength`, `objectRestNoSymbols`, `pureGetters`, and `setSpreadProperties` assumptions instead (https://babeljs.io/assumptions).",
    );
  }

  const targets = api.targets();
  const supportsObjectAssign = !isRequired("Object.assign", targets, {
    compatData,
  });

  const { useBuiltIns = supportsObjectAssign, loose = false } = opts;

  if (typeof loose !== "boolean") {
    throw new Error(".loose must be a boolean, or undefined");
  }

  const ignoreFunctionLength = api.assumption("ignoreFunctionLength") ?? loose;
  const objectRestNoSymbols = api.assumption("objectRestNoSymbols") ?? loose;
  const pureGetters = api.assumption("pureGetters") ?? loose;
  const setSpreadProperties = api.assumption("setSpreadProperties") ?? loose;

  return createDestructuringPlugin({
    name: "transform-object-rest-spread",
    api,
    feature: FEATURES.objectRest | FEATURES.objectSpread,
    options: {
      useBuiltIns,
      ignoreFunctionLength,
      objectRestNoSymbols,
      pureGetters,
      setSpreadProperties,
    },
  });
});
