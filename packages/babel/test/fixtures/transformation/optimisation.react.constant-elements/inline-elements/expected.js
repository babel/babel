"use strict";

var _typeofReactElement = typeof Symbol === "function" && Symbol["for"] && Symbol["for"]("react.element") || 60103;

var _ref = {
  $$typeof: _typeofReactElement,
  type: "foo",
  ref: null,
  props: {},
  key: null
};
function render() {
  return _ref;
}

function render() {
  var text = getText();
  var _ref2 = {
    $$typeof: _typeofReactElement,
    type: "foo",
    ref: null,
    props: {
      children: text
    },
    key: null
  };
  return function () {
    return _ref2;
  };
}