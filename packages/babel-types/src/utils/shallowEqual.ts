export default function shallowEqual(actual: any, expected: any): boolean {
  const keys = Object.keys(expected);

  for (const key of keys as Array<string>) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}
