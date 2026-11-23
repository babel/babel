let a = f();
a = g();

// No code runs between the nullish check and the access,
// so `a` can be read twice even if it's reassigned elsewhere.
a === null || a === void 0 || a.b;
a === null || a === void 0 ? void 0 : a.b();
