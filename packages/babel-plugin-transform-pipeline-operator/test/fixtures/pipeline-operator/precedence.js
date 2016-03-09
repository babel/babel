
var inc = (x) => x + 1;

var result = 4 || 9 |> inc;
assert.equal(result, 5);


var f = (x) => x + 10
var h = (x) => x + 20

var result2 = 10 |> f || h |> inc;
assert.equal(result2, 21);
