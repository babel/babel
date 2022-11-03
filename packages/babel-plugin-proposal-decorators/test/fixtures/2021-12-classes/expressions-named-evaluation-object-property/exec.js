const logs = [];
const dec = (value, context) => { logs.push(context.name); return value; };

const f = () => { logs.push("computing f"); return 8. }

// __proto__ setter should not name anonymous class
({
  __proto__: @dec class {},
});
({
  "__proto__": @dec class {},
});

({
  A0: @dec class {},
  "1": @dec class { static {} },
  2: @dec class extends class {} {},
  3n: @dec class extends class {} { static {} },
  ["4"]: @dec class { p; },
  [5]: @dec class { p; },
  [6n]: @dec class { p; },
  [f()]: @dec class { @dec static 7; },
  [Symbol(9)]: @dec class { p; },
})

expect(logs).toEqual(["", "", "A0", "1", "2", "3", "4", "5", "6", "computing f", "7", "8", "[9]"]);
