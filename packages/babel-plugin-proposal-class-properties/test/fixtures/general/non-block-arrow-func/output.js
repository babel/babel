export default (param =>
/*#__PURE__*/
(() => {
  function App() {
    babelHelpers.classCallCheck(this, App);
  }

  babelHelpers.createClass(App, [{
    key: "getParam",
    value: function getParam() {
      return param;
    }
  }]);
  Object.defineProperty(App, "props", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      prop1: 'prop1',
      prop2: 'prop2'
    }
  });
  return App;
})());
