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
      if (val !== undefined) target[k] = val as any;
    }
  }
}

function mergeDefaultFields<T extends {}>(target: T, source: T) {
  for (const k of Object.keys(source)) {
    const val = source[k];
    if (val !== undefined) target[k] = val as any;
  }
}

export function isIterableIterator(value: any): value is IterableIterator<any> {
  return (
    !!value &&
    typeof value.next === "function" &&
    typeof value[Symbol.iterator] === "function"
  );
}
