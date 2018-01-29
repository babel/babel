var incPromise = x => Promise.resolve(x + 1);

var double = x => x * 2;

var result = async () => {
  var _;

  return _ = 10, await (0, incPromise)(_);
};

var result2 = async () => {
  var _ref, _2;

  return _ref = (_2 = 10, await (0, incPromise)(_2)), double(_ref);
};
