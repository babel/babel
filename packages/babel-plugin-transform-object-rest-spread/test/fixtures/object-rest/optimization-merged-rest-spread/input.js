let { a, ...rest } = obj;
let abc = { ...rest, c: 123 };

let { x, ...rest2 } = obj2;
let def = { a: 1, ...rest2, b: 2 };
