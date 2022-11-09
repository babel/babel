const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

const [ A0 = @dec class {} ] = [];
const { A1 = @dec class { static {} } } = {}
const { A0: A2 = @dec class { p } } = {}
let A3, A4;
[ A3 = @dec class extends A1 {} ] = [];
({ A4 = @dec class extends A1 { static {} } } = {});
({ ["A0"]: A5 = @dec class { p } });
((A6 = @dec class {}) => {})();

expect(logs).toEqual(["A0", "A1", "A2", "A3", "A4", "A5", "A6"]);
