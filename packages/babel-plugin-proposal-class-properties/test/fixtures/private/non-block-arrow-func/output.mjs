export default (param => {
  var _class, _props;

  return _class = class App {
    getParam() {
      return param;
    }

  }, _props = {
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  }, _class;
});
