var _eval, _eval2, _foo$eval, _eval$foo;
var foo;

/* indirect eval calls */
eval === null || eval === void 0 ? void 0 : (0, eval)(foo);
eval === null || eval === void 0 ? void 0 : (0, eval)(foo);
eval === null || eval === void 0 ? void 0 : (0, eval)()();
eval === null || eval === void 0 ? void 0 : (0, eval)().foo;

/* direct eval calls */

(_eval = eval()) === null || _eval === void 0 ? void 0 : _eval();
(_eval2 = eval()) === null || _eval2 === void 0 ? void 0 : _eval2.foo;

/* plain function calls */

(_foo$eval = foo.eval) === null || _foo$eval === void 0 ? void 0 : _foo$eval.call(foo, foo);
(_eval$foo = eval.foo) === null || _eval$foo === void 0 ? void 0 : _eval$foo.call(eval, foo);
