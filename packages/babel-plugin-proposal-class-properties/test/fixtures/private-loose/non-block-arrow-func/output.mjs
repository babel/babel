export default (param => {
  var _class, _props;
  return _props = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("props"), (_class = class App {
    getParam() {
      return param;
    }
  }, Object.defineProperty(_class, _props, {
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  }), _class);
});
