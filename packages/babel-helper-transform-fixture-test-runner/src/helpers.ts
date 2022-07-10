export function assertNoOwnProperties(obj: {}) {
  expect(Object.getOwnPropertyNames(obj)).toHaveLength(0);
}

export function multiline(arr: string[]) {
  return arr.join("\n");
}
