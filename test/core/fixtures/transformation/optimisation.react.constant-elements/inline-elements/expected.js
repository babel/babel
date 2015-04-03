"use strict";

var _ref = {
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
    type: "foo",
    ref: null,
    props: {
      children: [text]
    },
    key: null
  };
  return function () {
    return _ref2;
  };
}