const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

class C {
  static #A = @dec class {}
  static #B = @dec class { static {} }
}

expect(logs).toEqual(["#A", "#B"]);
