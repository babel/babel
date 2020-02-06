var _ref3 =
/*#__PURE__*/
(() => <img src="/img/logo/logo-96x36.png" />)();

var _ref2 =
/*#__PURE__*/
(() => <a className="navbar-brand" href="/">
        {_ref3}
      </a>)();

var _ref =
/*#__PURE__*/
(() => <div className="navbar-header">
      {_ref2}
    </div>)();

let App =
/*#__PURE__*/
function (_React$Component) {
  "use strict";

  babelHelpers.inherits(App, _React$Component);

  function App() {
    babelHelpers.classCallCheck(this, App);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(App).apply(this, arguments));
  }

  babelHelpers.createClass(App, [{
    key: "render",
    value: function render() {
      const navbarHeader = _ref;
      return <div>
      <nav className="navbar navbar-default">
        <div className="container">
          {navbarHeader}
        </div>
      </nav>
    </div>;
    }
  }]);
  return App;
}(React.Component);
