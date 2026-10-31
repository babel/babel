const log = [];
const key = { [Symbol.toPrimitive]() { log.push("key"); return log.length === 1 ? "a" : "b"; } };
const source = { get a() { log.push("get"); return 1; }, b: 2 };
const { [key]: a, ...rest } = source;
