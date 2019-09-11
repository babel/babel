"foo".match(babelHelpers.wrapRegExp(/([\0-\t\x0B\f\x0E-\u2027\u202A-\uFFFF])\1/, {
  double: 1
}));
