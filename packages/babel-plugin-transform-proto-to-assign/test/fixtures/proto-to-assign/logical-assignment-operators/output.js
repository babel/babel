var _foo, _foo2, _foo3;
(_foo = foo).__proto__ ?? babelHelpers.defaults(_foo, bar);
(_foo2 = foo).__proto__ || babelHelpers.defaults(_foo2, bar);
(_foo3 = foo).__proto__ && babelHelpers.defaults(_foo3, bar);
