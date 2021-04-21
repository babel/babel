/* @minVersion 7.0.0-beta.0 */

let REACT_ELEMENT_TYPE;

export default function _createRawReactElement(type, props, key, children) {
  if (!REACT_ELEMENT_TYPE) {
    REACT_ELEMENT_TYPE =
      // "for" is a reserved keyword in ES3 so escaping it here for backward compatibility
      (typeof Symbol === "function" &&
        Symbol["for"] &&
        Symbol["for"]("react.element")) ||
      0xeac7;
  }

  const defaultProps = type && type.defaultProps;
  const childrenLength = arguments.length - 3;

  if (!props && childrenLength !== 0) {
    // If we're going to assign props.children, we create a new object now
    // to avoid mutating defaultProps.
    props = {
      children: void 0,
    };
  }

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = new Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 3];
    }
    props.children = childArray;
  }

  if (props && defaultProps) {
    for (const propName in defaultProps) {
      if (props[propName] === void 0) {
        props[propName] = defaultProps[propName];
      }
    }
  } else if (!props) {
    props = defaultProps || {};
  }

  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type: type,
    key: key === undefined ? null : "" + key,
    ref: null,
    props: props,
    _owner: null,
  };
}
