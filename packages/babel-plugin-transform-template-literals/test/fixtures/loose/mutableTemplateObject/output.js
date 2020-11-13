function _templateObject() {
  const data = _taggedTemplateLiteralLoose(["foo ", " baz"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteralLoose(strings, raw) { if (!raw) { raw = strings.slice(0); } strings.raw = raw; return strings; }

var o = tag(_templateObject(), bar);
