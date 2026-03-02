/* @minVersion 7.0.0-beta.0 */

var REACT_ELEMENT_TYPE: symbol | 0xeac7;

interface Props {
  children?: any;
  [propName: string]: any;
}

interface ReactElement {
  $$typeof: typeof REACT_ELEMENT_TYPE;
  type: any;
  key: string | null;
  ref: null;
  props: Props;
  _owner: null;
}

type ReactElementType = any;
type ReactKey = string | number | bigint;
type ReactNode =
  | ReactElement
  | string
  | number
  | Iterable<ReactNode>
  | boolean
  | null
  | undefined;

export default function _createRawReactElement(
  type: ReactElementType,
  props: Props,
  key?: ReactKey,
  children?: ReactNode[],
): ReactElement {
  if (!REACT_ELEMENT_TYPE) {
    REACT_ELEMENT_TYPE =
      (typeof Symbol === "function" &&
        // "for" is a reserved keyword in ES3 so escaping it here for backward compatibility
        Symbol["for"] &&
        Symbol["for"]("react.element")) ||
      0xeac7;
  }

  var defaultProps: Props = type && type.defaultProps;
  var childrenLength = arguments.length - 3;

  if (!props && childrenLength !== 0) {
    // If we're going to assign props.children, we create a new object now
    // to avoid mutating defaultProps.
    props = { children: void 0 };
  }

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = new Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 3];
    }
    props.children = childArray;
  }

  if (props && defaultProps) {
    for (var propName in defaultProps) {
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
