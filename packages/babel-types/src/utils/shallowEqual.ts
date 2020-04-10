export default function shallowEqual<T extends object>(
  actual: object,
  expected: T,
): actual is T {
  const keys = Object.keys(expected);

  for (const key of keys as Array<string>) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}
