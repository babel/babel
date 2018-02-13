import { Component } from "react";

function withContext(ComposedComponent) {
  return (
    /*#__PURE__*/
    (_Component => {
      babelHelpers.inherits(WithContext, _Component);

      function WithContext() {
        babelHelpers.classCallCheck(this, WithContext);
        return babelHelpers.possibleConstructorReturn(this, (WithContext.__proto__ || Object.getPrototypeOf(WithContext)).apply(this, arguments));
      }

      WithContext.propTypes = {
        context: PropTypes.shape({
          addCss: PropTypes.func,
          setTitle: PropTypes.func,
          setMeta: PropTypes.func
        })
      };
      return WithContext;
    })(Component)
  );
}
