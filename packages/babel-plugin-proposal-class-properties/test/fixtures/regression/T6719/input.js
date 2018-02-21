import { Component } from "react";

function withContext(ComposedComponent) {
  return class WithContext extends Component {
    static propTypes = {
      context: PropTypes.shape({
        addCss: PropTypes.func,
        setTitle: PropTypes.func,
        setMeta: PropTypes.func,
      }),
    };
  };
}
