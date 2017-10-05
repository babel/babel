var inc = (x) => x + 1;
var double = (x) => x * 2;

assert.equal(10 |> inc |> double, 22);
