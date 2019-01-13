
function f(input) {
  case (input) {
    when { name: { firstName },  age: x} -> return ['object', x, firstName];
    when { name: "Chen",  age: 3, number: [1, 2, 3] } -> return ['object'];
    when [1, { type: 3 }, b] -> return ['array', b];
  }
  return [];
}

expect(f({name: { firstName: "Greg", etc: "etc" }, age: 1})).toEqual(['object', 1, "Greg"]);

expect(f({name: "Chen", age: 3, number: [1, 2, 3]})).toEqual(['object']);
expect(f({name: "Chen", age: 4, number: [1, 2, 3]})).toEqual([]);
expect(f({name: "Chen", age: 3, number: [1, 2]})).toEqual([]);

expect(f({name: "Chen", age: 3, number: [1, 2, 3, 4]})).toEqual([]);

expect(f([1, {type: 3, stuff: 4}, 5])).toEqual(['array', 5]);
