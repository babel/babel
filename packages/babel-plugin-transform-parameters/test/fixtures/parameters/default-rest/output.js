var a = 1;

function rest() {
  var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : a;
  expect(b).toBe(1);
}

rest(undefined, 2);

function rest2() {
  var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : a;
  expect(arguments.length <= 1 ? undefined : arguments[1]).toBe(2);
}

rest2(undefined, 2);

function rest3() {
  var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : a;

  for (var _len = arguments.length, a = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    a[_key - 1] = arguments[_key];
  }

  expect(a).toHaveLength(1);
}

rest3(undefined, 2);
