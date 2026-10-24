var { [(log.push("key"), "a")]: void, b } = { b: 1 };
({ [key]: void } = source);
var { [{ toString() { log.push("toString"); return "a"; } }]: void } = source;
var { [key]: void, ...rest } = source;
const { ["a"]: void, [null]: void, [!0]: void, [`a${1}`]: void, c } = source;
