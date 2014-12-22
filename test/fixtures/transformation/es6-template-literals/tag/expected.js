"use strict";

var _taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: raw
    }
  }));
};

var foo = bar(_taggedTemplateLiteral(["wow\na", "b ", ""], ["wow\\na", "b ", ""]), 42, _.foobar());
