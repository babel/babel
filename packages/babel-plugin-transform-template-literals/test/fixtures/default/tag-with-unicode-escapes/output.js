var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = bar(_templateObject || (_templateObject = _taggedTemplateLiteral(["aa\uD835\uDC9C\uD835\uDC9C"], ["\\u0061\\u{0061}\\ud835\\udc9c\\u{1d49c}"])));
