var result = [5,10]
  |> _ => _.map(x => x * 2)
  |> _ => _.reduce( (a,b) => a + b )
  |> sum => sum + 1

assert.equal(result, 31)


var inc = (x) => x + 1;
var double = (x) => x * 2;

var result2 = [4, 9].map( x => x |> inc |> double )

assert.deepEqual(result2, [10, 20])
