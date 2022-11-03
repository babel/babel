const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

let A0, A1, A2;
A0 = @dec class {}
A1 = @dec class { static {} }
A2 = @dec class extends A1 {}

var B = true;
B &&= @dec class {}

var C = false;
C ||= @dec class {}

var D = undefined;
D ??= @dec class {};

expect(logs).toEqual(["A0", "A1", "A2", "B", "C", "D"]);
