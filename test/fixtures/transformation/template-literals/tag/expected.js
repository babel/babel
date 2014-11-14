"use strict";

var _taggedTemplateLiteral = function (strings, raw) {
  return Object.defineProperties(strings, {
    raw: {
      value: raw
    }
  });
};

var foo = bar(_taggedTemplateLiteral(["wow\na", "b ", ""], ["wow\\na", "b ", ""]), 42, _.foobar());
