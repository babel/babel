/* eslint max-len: "off" */

import template from "babel-template";

const helpers = {};
export default helpers;

function defineHelper(str) {
  return template(str, { sourceType: "module" });
}

helpers.typeof = defineHelper(`
  export default function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = obj => typeof obj;
    } else {
      _typeof = obj => {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`);

helpers.jsx = defineHelper(`
  const REACT_ELEMENT_TYPE = (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;

  export default function _createRawReactElement(type, props, key, ...children) {
    const defaultProps = type && type.defaultProps;

    if (!props && children.length !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {};
    }

    if (props && defaultProps) {
      for (const propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    if (children.length === 1) {
      props.children = children[0];
    } else if (children.length > 1) {
      props.children = children;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props,
      _owner: null,
    };
  }
`);

helpers.asyncIterator = defineHelper(`
  export default function _asyncIterator(iterable) {
    if (typeof Symbol === "function") {
      if (Symbol.asyncIterator) {
        const method = iterable[Symbol.asyncIterator];
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        return iterable[Symbol.iterator]();
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`);

helpers.asyncGenerator = defineHelper(`
  function AwaitValue(value) {
    this.value = value;
  }

  const send = (state, key, arg) => new Promise((resolve, reject) => {
    const request = {
      key,
      arg,
      resolve,
      reject,
      next: null,
    };

    if (state.back) {
      state.back = state.back.next = request;
    } else {
      state.front = state.back = request;
      resume(state, key, arg);
    }
  });

  const resume = (state, key, arg) => {
    try {
      const result = state.gen[key](arg);
      const {value} = result;
      if (value instanceof AwaitValue) {
        Promise.resolve(value.value).then(
          arg => resume(state, "next", arg),
          arg => resume(state, "throw", arg),
        );
      } else {
        settle(state, result.done ? "return" : "normal", result.value);
      }
    } catch (err) {
      settle(state, "throw", err);
    }
  };

  const settle = (state, type, value) => {
    switch (type) {
      case "return":
        state.front.resolve({ value, done: true });
        break;
      case "throw":
        state.front.reject(value);
        break;
      default:
        state.front.resolve({ value, done: false });
        break;
    }

    state.front = state.front.next;
    if (state.front) {
      resume(state, state.front.key, state.front.arg);
    } else {
      state.back = null;
    }
  };

  class AsyncGenerator {
    constructor(gen) {
      this._state = {
        gen,
        front: null,
        back: null,
      }

      this._invoke = send;

      // Hide "return" method if generator return is not supported
      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    [(typeof Symbol === "function" && Symbol.asyncIterator) || "@@asyncIterator"]() {
      return this;
    }

    next(arg) {
      return this._invoke(this._state, "next", arg);
    }

    throw(arg) {
      return this._invoke(this._state, "throw", arg);
    }

    return(arg) {
      return this._invoke(this._state, "return", arg);
    }
  }

  export default {
    wrap: fn => (...args) => new AsyncGenerator(fn.apply(this, args)),
    await: value => new AwaitValue(value),
  };
`);

helpers.asyncGeneratorDelegate = defineHelper(`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    const iter = {};
    let waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(resolve => resolve(inner[key](value)));
      return { done: false, value: awaitWrap(value) };
    }

    iter[(typeof Symbol === "function" && Symbol.iterator) || "@@iterator"] = () => iter;

    iter.next = value => {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = value => {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = value => pump("return", value);
    }

    return iter;
  }
`);

helpers.asyncToGenerator = defineHelper(`
  export default function _asyncToGenerator(fn) {
    return function (...args) {
      return new Promise((resolve, reject) => {
        const gen = fn.apply(this, args);
        function step(key, arg) {
          let info;
          try {
            info = gen[key](arg);
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(info.value);
          } else {
            Promise.resolve(info.value).then(_next, _throw);
          }
        }
        function _next(value) { step("next", value); }
        function _throw(err) { step("throw", err); }

        _next();
      });
    };
  }
`);

helpers.classCallCheck = defineHelper(`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`);

helpers.createClass = defineHelper(`
  function _defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  export default function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
`);

helpers.defineEnumerableProperties = defineHelper(`
  export default function _defineEnumerableProperties(obj, descs) {
    for (const key in descs) {
      const desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      const objectSymbols = Object.getOwnPropertySymbols(descs);
      for (let i = 0; i < objectSymbols.length; i++) {
        const sym = objectSymbols[i];
        const desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`);

helpers.defaults = defineHelper(`
  export default function _defaults(obj, defaults) {
    const keys = Object.getOwnPropertyNames(defaults);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`);

helpers.defineProperty = defineHelper(`
  export default function _defineProperty(obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
`);

helpers.extends = defineHelper(`
  export default Object.assign || function (target, ...sources) {
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
`);

helpers.get = defineHelper(`
  export default function _get(object, property, receiver) {
    if (object === null) object = Function.prototype;

    const desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      const parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return _get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      const getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
`);

helpers.inherits = defineHelper(`
  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
`);

helpers.inheritsLoose = defineHelper(`
  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
`);

helpers.instanceof = defineHelper(`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`);

helpers.interopRequireDefault = defineHelper(`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`);

helpers.interopRequireWildcard = defineHelper(`
  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      const newObj = {};
      if (obj != null) {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }
      newObj.default = obj;
      return newObj;
    }
  }
`);

helpers.newArrowCheck = defineHelper(`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`);

helpers.objectDestructuringEmpty = defineHelper(`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`);

helpers.objectWithoutProperties = defineHelper(`
  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    const target = {};
    const sourceKeys = Object.keys(source);

    for (let i = 0; i < sourceKeys.length; i++) {
      const key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    if (Object.getOwnPropertySymbols) {
      const sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (let i = 0; i < sourceSymbolKeys.length; i++) {
        const key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`);

helpers.possibleConstructorReturn = defineHelper(`
  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`);

helpers.set = defineHelper(`
  export default function _set(object, property, value, receiver) {
    const desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      const parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        _set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      const setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  }
`);

helpers.slicedToArray = defineHelper(`
  // Broken out into a separate function to avoid deoptimizations due to the try/catch for the
  // array iterator case.
  function _sliceIterator(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliancy is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    const _arr = [];
    let _n = true;
    let _d = false;
    let _e, _i;
    try {
      let _s;
      for (_i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }

  export default function _slicedToArray(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return _sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  }
`);

helpers.slicedToArrayLoose = defineHelper(`
  export default function _slicedToArrayLoose(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      const _arr = [];
      for (let _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);
        if (i && _arr.length === i) break;
      }
      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  }
`);

helpers.taggedTemplateLiteral = defineHelper(`
  export default function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`);

helpers.taggedTemplateLiteralLoose = defineHelper(`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    strings.raw = raw;
    return strings;
  }
`);

helpers.temporalRef = defineHelper(`
  export default function _temporalRef(val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    } else {
      return val;
    }
  }
`);

helpers.temporalUndefined = defineHelper(`
  export default {};
`);

helpers.toArray = defineHelper(`
  export default function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }
`);

helpers.toConsumableArray = defineHelper(`
  export default function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      let i, arr2;
      for (i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
`);

helpers.skipFirstGeneratorNext = defineHelper(`
  export default function _skipFirstGeneratorNext(fn) {
    return function (...args) {
      const it = fn.apply(this, args);
      it.next();
      return it;
    }
  }
`);

helpers.toPropertyKey = defineHelper(`
  export default function _toPropertyKey(key) {
    if (typeof key === "symbol") {
      return key;
    } else {
      return String(key);
    }
  }
`);
