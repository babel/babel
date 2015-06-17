// single referenes
"use strict";

function r() {
  if (noNeedToWork) return 0;

  for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }

  return rest;
}

// multiple references
function r() {
  if (noNeedToWork) return 0;

  for (var _len2 = arguments.length, rest = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    rest[_key2] = arguments[_key2];
  }

  rest;
  rest;
}

// multiple nested references
function r() {
  if (noNeedToWork) return 0;

  for (var _len3 = arguments.length, rest = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    rest[_key3] = arguments[_key3];
  }

  if (true) {
    return rest;
  } else {
    return rest;
  }
}

// nested reference with root reference
function r() {
  if (noNeedToWork) return 0;

  for (var _len4 = arguments.length, rest = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    rest[_key4] = arguments[_key4];
  }

  if (lol) rest;
  rest;
}
