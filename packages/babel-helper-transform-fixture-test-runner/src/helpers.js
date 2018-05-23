export function assertNoOwnProperties(obj) {
  expect(Object.getOwnPropertyNames(obj)).toHaveLength(0);
}

export function multiline(arr) {
  return arr.join("\n");
}
