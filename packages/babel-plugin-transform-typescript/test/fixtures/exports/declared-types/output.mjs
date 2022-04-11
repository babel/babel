export class C2 {}
// everything removed
export { C2 as C3 }; // only C2->C3

var BB;

(function (BB) {
  BB[BB["K"] = 0] = "K";
})(BB || (BB = {}));

(function (BB) {
  BB["L"] = "LL";
})(BB || (BB = {}));

export { BB }; // only BB

// everything removed
export { BB as BB1 }; // BB->BB1

var BB2;

(function (BB2) {})(BB2 || (BB2 = {}));

function foo() {}

export { BB2 as BB3, foo }; // only BB2->BB3 and foo
// export an interface before declaration

// everything removed
export { C2 as C4 }; // only C2->C4
