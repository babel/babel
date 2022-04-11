const x = {
  [null]: function _null() {},
  [/regex/gi]: function _regex_gi() {},
  [`y`]: function y() {},
  [`abc${y}def`]: function abcdef() {},
  [0]: function _() {},
  [false]: function _false() {}
};
