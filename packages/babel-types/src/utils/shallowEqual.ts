// @flow
export default function shallowEqual(
  actual: Object,
  expected: Object,
): boolean {
  const keys = Object.keys(expected);

  for (const key of (keys: Array<string>)) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}
