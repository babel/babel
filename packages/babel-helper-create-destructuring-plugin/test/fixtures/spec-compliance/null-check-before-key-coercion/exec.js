const log = [];
const key = { [Symbol.toPrimitive]() { log.push("key"); return "a"; } };
expect(() => { const { [key]: a } = null; }).toThrow(TypeError);
expect(log).toEqual([]);
