function _templateObject() {
  const data = _taggedTemplateLiteral(["aa𝒜𝒜"], ["\\u0061\\u{0061}\\ud835\\udc9c\\u{1d49c}"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var foo = bar(_templateObject());
