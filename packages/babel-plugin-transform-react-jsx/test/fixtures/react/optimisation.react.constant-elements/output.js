var _div;
let App = /*#__PURE__*/function (_React$Component) {
  "use strict";

  function App() {
    babelHelpers.classCallCheck(this, App);
    return babelHelpers.callSuper(this, App, arguments);
  }
  babelHelpers.inherits(App, _React$Component);
  return babelHelpers.createClass(App, [{
    key: "render",
    value: function render() {
      const navbarHeader = _div || (_div = <div className="navbar-header">
      <a className="navbar-brand" href="/">
        <img src="/img/logo/logo-96x36.png" />
      </a>
    </div>);
      return <div>
      <nav className="navbar navbar-default">
        <div className="container">
          {navbarHeader}
        </div>
      </nav>
    </div>;
    }
  }]);
}(React.Component);
