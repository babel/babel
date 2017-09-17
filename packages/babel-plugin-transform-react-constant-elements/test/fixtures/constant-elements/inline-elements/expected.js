const REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;

function _jsx(type, props, key, ...children) { const defaultProps = type && type.defaultProps; if (!props && children.length !== 0) { props = {}; } if (props && defaultProps) { for (const propName in defaultProps) { if (props[propName] === undefined) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (children.length === 1) { props.children = children[0]; } else if (children.length > 1) { props.children = children; } return { $$typeof: REACT_ELEMENT_TYPE, type, key: key === undefined ? null : '' + key, ref: null, props, _owner: null }; }

var _ref = _jsx("foo", {});

function render() {
  return _ref;
}

function render() {
  var text = getText();

  var _ref2 = _jsx("foo", {}, void 0, text);

  return function () {
    return _ref2;
  };
}
