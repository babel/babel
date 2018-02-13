import { Component } from "react";

function withContext(ComposedComponent) {
  return (_Component => {
    babelHelpers.inherits(WithContext, _Component);

    function WithContext() {
      babelHelpers.classCallCheck(this, WithContext);
      return babelHelpers.possibleConstructorReturn(this, (WithContext.__proto__ || Object.getPrototypeOf(WithContext)).apply(this, arguments));
    }

    Object.defineProperty(WithContext, "propTypes", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: {
        context: PropTypes.shape({
          addCss: PropTypes.func,
          setTitle: PropTypes.func,
          setMeta: PropTypes.func
        })
      }
    });
    return WithContext;
  })(Component);
}
