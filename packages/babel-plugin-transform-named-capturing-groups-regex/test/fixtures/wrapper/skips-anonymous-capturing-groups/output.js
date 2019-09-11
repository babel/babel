"abba".match(babelHelpers.wrapRegExp(/([\0-\t\x0B\f\x0E-\u2027\u202A-\uFFFF])([\0-\t\x0B\f\x0E-\u2027\u202A-\uFFFF])\2\1/, {
  n: 2
}));
