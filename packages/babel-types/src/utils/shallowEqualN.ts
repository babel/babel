import shallowEqual from "./shallowEqual.ts";

export default function shallowEqualN<T extends object>(
  actual: object,
  expected: T | undefined | null,
): actual is T {
  return expected == null || shallowEqual<T>(actual, expected);
}
