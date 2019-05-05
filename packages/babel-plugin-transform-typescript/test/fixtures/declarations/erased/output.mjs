export class C2 {}
export { E }; // only E

// everything removed
export { E as E2, C2 as C3 }; // only E and C2

var BB;

(function (BB) {
  BB[BB["K"] = 0] = "K";
})(BB || (BB = {}));

(function (BB) {
  BB["L"] = "LL";
})(BB || (BB = {}));

export { BB }; // only BB

// everything removed
export { BB as BB1 }; // as-is

var BB2;

(function (BB2) {})(BB2 || (BB2 = {}));

function foo() {}

export { BB2 as BB3, foo }; // only BB2 and foo
