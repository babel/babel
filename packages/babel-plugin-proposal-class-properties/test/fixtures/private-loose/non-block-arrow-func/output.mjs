export default (param => {
  var _class, _temp;

  return _temp = _class = class App {
    getParam() {
      return param;
    }

  }, Object.defineProperty(_class, "_props", {
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    },
    enumerable: false,
    configurable: false,
    writable: true
  }), _temp;
});
