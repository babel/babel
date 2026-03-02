var _eval, _eval2, _foo$eval, _eval$foo;
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

(_foo$eval = foo.eval) == null || _foo$eval.call(foo, foo);
(_eval$foo = eval.foo) == null ? void 0 : _eval$foo.call(eval, foo);
