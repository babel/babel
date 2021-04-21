/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */

import template from "@babel/template";

export const jsx = {
  minVersion: "7.0.0-beta.0",
  ast: () =>
    template.program.ast(
      '\nlet REACT_ELEMENT_TYPE;\nexport default function _createRawReactElement(type, props, key, children) {\n  if (!REACT_ELEMENT_TYPE) {\n    REACT_ELEMENT_TYPE =\n      \n      (typeof Symbol === "function" &&\n        Symbol["for"] &&\n        Symbol["for"]("react.element")) ||\n      0xeac7;\n  }\n  const defaultProps = type && type.defaultProps;\n  const childrenLength = arguments.length - 3;\n  if (!props && childrenLength !== 0) {\n    \n    \n    props = {\n      children: void 0,\n    };\n  }\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    const childArray = new Array(childrenLength);\n    for (let i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 3];\n    }\n    props.children = childArray;\n  }\n  if (props && defaultProps) {\n    for (const propName in defaultProps) {\n      if (props[propName] === void 0) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  } else if (!props) {\n    props = defaultProps || {};\n  }\n  return {\n    $$typeof: REACT_ELEMENT_TYPE,\n    type: type,\n    key: key === undefined ? null : "" + key,\n    ref: null,\n    props: props,\n    _owner: null,\n  };\n}\n',
    ),
};

export { _typeof as typeof };
const _typeof = {
  minVersion: "7.0.0-beta.0",
  ast: () =>
    template.program.ast(
      '\nexport default function _typeof(obj) {\n  "@babel/helpers - typeof";\n  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {\n    _typeof = function (obj) {\n      return typeof obj;\n    };\n  } else {\n    _typeof = function (obj) {\n      return obj &&\n        typeof Symbol === "function" &&\n        obj.constructor === Symbol &&\n        obj !== Symbol.prototype\n        ? "symbol"\n        : typeof obj;\n    };\n  }\n  return _typeof(obj);\n}\n',
    ),
};
