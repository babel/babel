var _ref = React.createElement(
  "div",
  { className: "navbar-header" },
  React.createElement(
    "a",
    { className: "navbar-brand", href: "/" },
    React.createElement("img", { src: "/img/logo/logo-96x36.png" })
  )
);

var App = (function (_React$Component) {
  babelHelpers.inherits(App, _React$Component);

  function App() {
    babelHelpers.classCallCheck(this, App);
    babelHelpers.get(Object.getPrototypeOf(App.prototype), "constructor", this).apply(this, arguments);
  }

  babelHelpers.createClass(App, [{
    key: "render",
    value: function render() {
      var navbarHeader = _ref;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "nav",
          { className: "navbar navbar-default" },
          React.createElement(
            "div",
            { className: "container" },
            navbarHeader
          )
        )
      );
    }
  }]);
  return App;
})(React.Component);
