export default (param => {
  var _class, _temp;

  return function () {
    _temp = _class = class App {
      getParam() {
        return param;
      }

    };

    var _classStatics = Object.create(null);

    babelHelpers.defineProperty(_classStatics, "props", {
      prop1: 'prop1',
      prop2: 'prop2'
    });
    return _temp;
  }();
});
