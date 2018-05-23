// @flow

import type { ValidatedOptions } from "./validation/options";

export function mergeOptions(
  target: ValidatedOptions,
  source: ValidatedOptions,
): void {
  for (const k of Object.keys(source)) {
    if (k === "parserOpts" && source.parserOpts) {
      const parserOpts = source.parserOpts;
      const targetObj = (target.parserOpts = target.parserOpts || {});
      mergeDefaultFields(targetObj, parserOpts);
    } else if (k === "generatorOpts" && source.generatorOpts) {
      const generatorOpts = source.generatorOpts;
      const targetObj = (target.generatorOpts = target.generatorOpts || {});
      mergeDefaultFields(targetObj, generatorOpts);
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
