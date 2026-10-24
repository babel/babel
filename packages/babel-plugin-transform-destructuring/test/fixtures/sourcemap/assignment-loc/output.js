function fn(arg) {
  var _arg = babelHelpers.slicedToArray(arg, 2);
  x = _arg[0];
  y = _arg[1];
  const f = () => {
    z = arg.z;
    return arg;
  };
  return g((w = babelHelpers.slicedToArray(arg, 1)[0], arg));
}
