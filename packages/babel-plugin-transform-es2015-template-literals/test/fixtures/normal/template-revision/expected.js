var _templateObject = _taggedTemplateLiteral([], ["\\unicode and \\u{55}"]),
    _templateObject2 = _taggedTemplateLiteral([], ["\\01"]),
    _templateObject3 = _taggedTemplateLiteral(["right"], ["\\xg", "right"]),
    _templateObject4 = _taggedTemplateLiteral(["left"], ["left", "\\xg"]),
    _templateObject5 = _taggedTemplateLiteral(["left", "right"], ["left", "\\xg", "right"]),
    _templateObject6 = _taggedTemplateLiteral(["left", "right"], ["left", "\\u000g", "right"]),
    _templateObject7 = _taggedTemplateLiteral(["left", "right"], ["left", "\\u{-0}", "right"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

tag(_templateObject);

tag(_templateObject2);
tag(_templateObject3, 0);
tag(_templateObject4, 0);
tag(_templateObject5, 0, 1);
tag(_templateObject6, 0, 1);
tag(_templateObject7, 0, 1);