var _eval, _eval2;
var foo;

/* indirect eval calls */
eval == null || (0, eval)(foo);
eval == null || (0, eval)(foo);
eval == null || (0, eval)()();
eval == null || (0, eval)().foo;

/* direct eval calls */

(_eval = eval()) == null || _eval();
(_eval2 = eval()) == null || _eval2.foo;

/* plain function calls */

foo.eval == null || foo.eval(foo);
eval.foo == null ? void 0 : eval.foo(foo);
