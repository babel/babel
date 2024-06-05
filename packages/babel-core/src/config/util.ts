import type {
  ValidatedOptions,
  NormalizedOptions,
} from "./validation/options.ts";

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
      //@ts-expect-error k must index source
      const val = source[k];
      //@ts-expect-error assigning source to target
      if (val !== undefined) target[k] = val as any;
    }
  }
}

function mergeDefaultFields<T extends object>(target: T, source: T) {
  for (const k of Object.keys(source) as (keyof T)[]) {
    const val = source[k];
    if (val !== undefined) target[k] = val;
  }
}

export function isIterableIterator(value: any): value is IterableIterator<any> {
  return (
    !!value &&
    typeof value.next === "function" &&
    typeof value[Symbol.iterator] === "function"
  );
}
