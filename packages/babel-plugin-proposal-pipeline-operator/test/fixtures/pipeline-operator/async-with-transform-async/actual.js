var incPromise = (x) => Promise.resolve(x + 1);
var incFuncPromise = Promise.resolve(x => x + 10);
var double = (x) => x * 2;

var result = async () => 10 |> await incPromise;
var result2 = async () => 10 |> await incPromise |> double;

function* foo() {
  return 42 |> (yield incFuncPromise);
}
