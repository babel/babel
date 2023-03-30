export class C2 {}

// Not-even E

// everything removed
export { C2 as C3 }; // only C2->C3
var BB = /*#__PURE__*/function (BB) {
  BB[BB["K"] = 0] = "K";
  return BB;
}(BB || {});
BB = /*#__PURE__*/function (BB) {
  BB["L"] = "LL";
  return BB;
}(BB || {});
export { BB }; // only BB

// everything removed
export { BB as BB1 }; // BB->BB1
var BB2 = /*#__PURE__*/function (BB2) {
  return BB2;
}(BB2 || {});
function foo() {}
export { BB2 as BB3, foo }; // only BB2->BB3 and foo

// export an interface before declaration
// everything removed
export { C2 as C4 }; // only C2->C4
