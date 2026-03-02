export default param => {
  var _App, _props;
  return _props = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("props"), _App = class App {
    getParam() {
      return param;
    }
  }, Object.defineProperty(_App, _props, {
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  }), _App;
};
