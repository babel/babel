export type DeepArray<T> = Array<T | ReadonlyDeepArray<T>>;

// Just to make sure that DeepArray<T> is not assignable to ReadonlyDeepArray<T>
declare const __marker: unique symbol;
export type ReadonlyDeepArray<T> = ReadonlyArray<T | ReadonlyDeepArray<T>> & {
  [__marker]: true;
};

export function finalize<T>(deepArr: DeepArray<T>): ReadonlyDeepArray<T> {
  return Object.freeze(deepArr) as ReadonlyDeepArray<T>;
}

export function flattenToSet<T extends string>(
  arr: ReadonlyDeepArray<T>,
): Set<T> {
  const result = new Set<T>();
  const stack = [arr];
  while (stack.length > 0) {
    for (const el of stack.pop()) {
      if (Array.isArray(el)) stack.push(el as ReadonlyDeepArray<T>);
      else result.add(el as T);
    }
  }
  return result;
}
