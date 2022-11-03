const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

var A0 = @dec class {};
let A1 = @dec class { static {} };
const A2 = @dec class extends A1 {}

expect(logs).toEqual(["A0", "A1", "A2"]);
