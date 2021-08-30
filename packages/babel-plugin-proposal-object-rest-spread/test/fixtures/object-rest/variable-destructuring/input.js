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

let { x5: { w5, ...y5 } } = z();
let { x6: { w6: { a6, ...y6 } } } = z();
let { x7: { e7, r7 }, q7: { w7: { a7, ...y7 } } } = z();
let { x8, ...y8 } = z();
let { x9: { w9: { a9, ...y9 } }, x10: { a10, ...y10 },  } = z();
let { x11: [{ w11, ...z11 }] } = z();
let { x12: [{ a12, b12 }, { c12, ...d12 }] } = z();
let { x13: [, { c13, ...d13 }] } = z();
const { x14: [...{ q14, ...y14 }] } = z();
