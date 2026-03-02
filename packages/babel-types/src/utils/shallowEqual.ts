export default function shallowEqual<T extends object>(
  actual: object,
  expected: T,
): actual is T {
  const keys = Object.keys(expected) as (keyof T)[];

  for (const key of keys) {
    if (
      // @ts-expect-error maybe we should check whether key exists first
      actual[key] !== expected[key]
    ) {
      return false;
    }
  }

  return true;
}
