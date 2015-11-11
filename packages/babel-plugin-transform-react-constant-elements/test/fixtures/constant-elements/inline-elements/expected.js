var _createRawReactElement = (function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, key, props) { return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key, ref: null, props: props, _owner: null }; }; })();

var _ref = _createRawReactElement("foo", null, {});

function render() {
  return _ref;
}

function render() {
  var text = getText();

  var _ref2 = _createRawReactElement("foo", null, {
    children: text
  });

  return function () {
    return _ref2;
  };
}