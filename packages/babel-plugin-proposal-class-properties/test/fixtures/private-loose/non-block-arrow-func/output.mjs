export default (param => {
  var _class, _temp, _props;

  return _temp = _class = class App {
    getParam() {
      return param;
    }

  }, _props = babelHelpers.classPrivateFieldLooseKey("props"), Object.defineProperty(_class, _props, {
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  }), _temp;
});
