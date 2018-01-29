var incPromise = (x) => Promise.resolve(x + 1);
var double = (x) => x * 2;

var result = async () => 10 |> await incPromise;
var result2 = async () => 10 |> await incPromise |> double;
