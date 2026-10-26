// RequireObjectCoercible precedes PropertyDestructuringAssignmentEvaluation:
// https://tc39.es/ecma262/#sec-runtime-semantics-destructuringassignmentevaluation
const log = [];
const target = () => (log.push("target"), {});
const fallback = () => log.push("default");
for (const source of [null, undefined]) {
  expect(() => ({ a: target().value } = source)).toThrow(TypeError);
  expect(() => ({ a: missing.value = fallback() } = source)).toThrow(TypeError);
  expect(() => ({ ["a"]: target().value } = source)).toThrow(TypeError);
  expect(() => ({ [log.push("key")]: target().value } = source)).toThrow(TypeError);
  expect(() => ({ nested: { a: target().value } } = { nested: source })).toThrow(TypeError);
}
expect(log).toEqual([]);
({ a: target().value } = { get a() { log.push("get"); return 1; } });
expect(log).toEqual(["target", "get"]);
