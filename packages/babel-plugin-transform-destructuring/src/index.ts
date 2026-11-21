/* eslint-disable @babel/development/plugin-name */

import { declare } from "@babel/helper-plugin-utils";
import {
  createDestructuringPlugin,
  FEATURES,
} from "@babel/helper-create-destructuring-plugin";
export {
  buildObjectExcludingKeys,
  unshiftForXStatementBody,
} from "@babel/helper-create-destructuring-plugin";

export interface Options {
  allowArrayLike?: boolean;
  /** @deprecated Use the `iterableIsArray` and `objectRestNoSymbols` assumptions instead. */
  loose?: boolean;
  useBuiltIns?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("loose" in options) {
    console.warn(
      "@babel/plugin-transform-destructuring: The 'loose' option has been deprecated, " +
        "use the `iterableIsArray` and `objectRestNoSymbols` assumptions instead (https://babeljs.io/assumptions).",
    );
  }

  const { useBuiltIns = false } = options;

  const iterableIsArray =
    api.assumption("iterableIsArray") ?? options.loose ?? false;
  const arrayLikeIsIterable =
    options.allowArrayLike ?? api.assumption("arrayLikeIsIterable") ?? false;
  const objectRestNoSymbols =
    api.assumption("objectRestNoSymbols") ?? options.loose ?? false;

  return createDestructuringPlugin({
    name: "transform-destructuring",
    feature: FEATURES.destructuring,
    options: {
      useBuiltIns,
      iterableIsArray,
      arrayLikeIsIterable,
      objectRestNoSymbols,
    },
  });
});
