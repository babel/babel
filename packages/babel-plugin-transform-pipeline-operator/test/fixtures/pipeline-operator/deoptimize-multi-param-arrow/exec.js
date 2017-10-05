var a = 1,
    b = 2,
    c = 3;
var result = a
  |> (a, b) => b
  |> (a, b) => c;

assert.equal(result, c)
