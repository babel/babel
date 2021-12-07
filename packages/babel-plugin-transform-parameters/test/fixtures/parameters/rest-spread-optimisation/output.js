// optimisation
function foo() {
  foo.apply(void 0, arguments);
} // deoptimisation


function foo(a) {
  for (var _args = arguments, _len = _args.length, b = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    b[_key - 1] = _args[_key];
  }

  foo.apply(void 0, b);
}

function foo() {
  for (var _args2 = arguments, _len2 = _args2.length, b = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    b[_key2] = _args2[_key2];
  }

  foo.apply(void 0, [1].concat(b));
}

function foo() {
  for (var _args3 = arguments, _len3 = _args3.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = _args3[_key3];
  }

  args.pop();
  foo.apply(void 0, args);
}
