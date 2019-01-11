
function f(input) {
  case (input) {
//    when { name: { firstName },  age: x} -> return ['object', x, firstName];
//    when { name: "Chen",  age: 3, number: [1, 2, 3] } -> return ['object'];
//    when [1, { type: 3 }, b] -> return ['array', b];
    when [{type}] -> return ['array'];
  }
  return [];
}

const _case = [{type: 3}];
let _type;
expect(
  Array.isArray(_case) && _case[0]  && (_type = _case[0].type, typeof _type !== "undefined")
).toBe(true);

expect(f(_case)).toEqual(['array']);

//expect(f([1, {type: 3, stuff: 4}, 5])).toEqual(['array', 5]);
