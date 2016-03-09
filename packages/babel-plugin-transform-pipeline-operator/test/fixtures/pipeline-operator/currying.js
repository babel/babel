
var map = (fn) => (array) => array.map(fn);

var result = [10,20] |> map(x => x * 20);

assert.deepEqual(result, [200, 400])
