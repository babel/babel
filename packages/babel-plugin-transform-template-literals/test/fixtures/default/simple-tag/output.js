var _templateObject = /*#__PURE__*/ _taggedTemplateLiteral(["wow"]),
    _templateObject2 = /*#__PURE__*/ _taggedTemplateLiteral(["first", "second"]);

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = tag(_templateObject);
var bar = tag(_templateObject2, 1);
