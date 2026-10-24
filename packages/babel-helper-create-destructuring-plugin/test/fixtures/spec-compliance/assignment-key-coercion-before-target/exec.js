const log = [];
const key = { [Symbol.toPrimitive]() { log.push("key"); return "a"; } };
const source = { a: 1 };
const target = () => (log.push("target"), {});
({ [key]: target().x } = source);
expect(log).toEqual(["key", "target"]);
