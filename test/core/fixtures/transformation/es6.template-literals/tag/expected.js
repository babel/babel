"use strict";

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = bar(_taggedTemplateLiteral(["wow\na", "b ", ""], ["wow\\na", "b ", ""]), 42, _.foobar());