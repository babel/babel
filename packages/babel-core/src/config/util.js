// @flow

import type { ValidatedOptions, NormalizedOptions } from "./validation/options";

export function mergeOptions(
  target: ValidatedOptions,
  source: ValidatedOptions | NormalizedOptions,
): void {
  for (const k of Object.keys(source)) {
    if (
      (k === "parserOpts" || k === "generatorOpts" || k === "assumptions") &&
      source[k]
    ) {
      const parserOpts = source[k];
      const targetObj = target[k] || (target[k] = {});
      mergeDefaultFields(targetObj, parserOpts);
    } else {
      const val = source[k];
      if (val !== undefined) target[k] = (val: any);
    }
  }
}

function mergeDefaultFields<T: {}>(target: T, source: T) {
  for (const k of Object.keys(source)) {
    const val = source[k];
    if (val !== undefined) target[k] = (val: any);
  }
}

export function isIterableIterator(value: mixed): boolean %checks {
  return (
    /*:: value instanceof Generator && */
    // /*:: "@@iterator" in value && */
    !!value &&
    typeof value.next === "function" &&
    // $FlowIgnore
    typeof value[Symbol.iterator] === "function"
  );
}
