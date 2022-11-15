const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

export default @dec class {}

export const atypical = @dec class {}

expect(logs).toEqual(["default", "atypical"]);
