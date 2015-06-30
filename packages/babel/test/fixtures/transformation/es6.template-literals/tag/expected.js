"use strict";

var _taggedTemplateLiteral_3_wowNaB = _taggedTemplateLiteral(["wow\na", "b ", ""], ["wow\\na", "b ", ""]),
    _taggedTemplateLiteral_3_wowNab = _taggedTemplateLiteral(["wow\nab", " ", ""], ["wow\\nab", " ", ""]),
    _taggedTemplateLiteral_3_wowNaB2 = _taggedTemplateLiteral(["wow\naB", " ", ""], ["wow\\naB", " ", ""]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = bar(_taggedTemplateLiteral_3_wowNaB, 42, _.foobar());
var bar = bar(_taggedTemplateLiteral_3_wowNab, 42, _.foobar());
var bar = bar(_taggedTemplateLiteral_3_wowNaB2, 42, _.foobar());