var incPromise = x => Promise.resolve(x + 1);
var double = x => x * 2;

var result = async () => 10 |> await incPromise;
var result2 = async () => 10 |> await incPromise |> double;

return Promise.all([result(), result2()]).then(([r, r2]) => {
  assert.equal(r, 11);
  assert.equal(r2, 22);
});
