// RequireObjectCoercible precedes the evaluation of the rest target:
// https://tc39.es/ecma262/#sec-runtime-semantics-restdestructuringassignmentevaluation
const log = [];
const target = () => (log.push("target"), {});
for (const source of [null, undefined]) {
  expect(() => ({ ...target().value } = source)).toThrow(TypeError);
  expect(() => ({ ...missing.value } = source)).toThrow(TypeError);
  expect(() => ({ nested: { ...target().value } } = { nested: source })).toThrow(TypeError);
  expect(() => {
    for ({ ...target().value } of [source]);
  }).toThrow(TypeError);
}
expect(log).toEqual([]);

const obj = {};
({ ...obj.value } = { a: 1 });
expect(obj.value).toEqual({ a: 1 });
