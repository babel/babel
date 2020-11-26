export default (param => {
  var App, _props, _temp;

  return _temp = (_props = babelHelpers.classPrivateFieldLooseKey("props"), App = class App {
    getParam() {
      return param;
    }

  }), Object.defineProperty(App, _props, {
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  }), _temp;
});
