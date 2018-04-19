var x = 'y';
var foo = {[x]: 10, z: {[x]: 10}};
expect(foo.y + foo.z.y).toBe(20);
expect({[x]: {[x]: {[x]: 10}}}.y.y.y).toBe(10);
