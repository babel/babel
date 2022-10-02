var _eval, _eval2;
var foo;

/* indirect eval calls */
eval == null ? void 0 : (0, eval)(foo);
eval == null ? void 0 : (0, eval)(foo);
eval == null ? void 0 : (0, eval)()();
eval == null ? void 0 : (0, eval)().foo;

/* direct eval calls */

(_eval = eval()) == null ? void 0 : _eval();
(_eval2 = eval()) == null ? void 0 : _eval2.foo;

/* plain function calls */

foo.eval == null ? void 0 : foo.eval(foo);
eval.foo == null ? void 0 : eval.foo(foo);
