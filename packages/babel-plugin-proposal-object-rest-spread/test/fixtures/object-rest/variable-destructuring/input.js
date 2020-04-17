var z = {};
var { ...x } = z;
var { ...a } = { a: 1 };
var { ...x } = a.b;
var { ...x } = a();
var {x1, ...y1} = z;
x1++;
var { [a]: b, ...c } = z;
var {x1, ...y1} = z;
let {x2, y2, ...z2} = z;
const {w3, x3, y3, ...z4} = z;

let {
  x: { a: xa, [d]: f, ...asdf },
  y: { ...d },
  ...g
} = complex;

let { x4: { ...y4 } } = z;
