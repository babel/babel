export function assertNoOwnProperties(obj: object) {
  expect(Object.getOwnPropertyNames(obj)).toHaveLength(0);
}

export function multiline(arr: string[]) {
  return arr.join("\n");
}
