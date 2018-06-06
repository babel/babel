import template from "@babel/template";

const helpers = {};
export default helpers;

helpers.typeof = () => template.program.ast`
  export default function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) { return typeof obj; };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }

    return _typeof(obj);
  }
`;

helpers.jsx = () => template.program.ast`
  var REACT_ELEMENT_TYPE;

  export default function _createRawReactElement(type, props, key, children) {
    if (!REACT_ELEMENT_TYPE) {
      REACT_ELEMENT_TYPE = (
        typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")
      ) || 0xeac7;
    }

    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      // If we're going to assign props.children, we create a new object now
      // to avoid mutating defaultProps.
      props = {
        children: void 0,
      };
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

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = new Array(childrenLength);
      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }
      props.children = childArray;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null,
    };
  }
`;

helpers.asyncIterator = () => template.program.ast`
  export default function _asyncIterator(iterable) {
    var method
    if (typeof Symbol === "function") {
      if (Symbol.asyncIterator) {
        method = iterable[Symbol.asyncIterator]
        if (method != null) return method.call(iterable);
      }
      if (Symbol.iterator) {
        method = iterable[Symbol.iterator]
        if (method != null) return method.call(iterable);
      }
    }
    throw new TypeError("Object is not async iterable");
  }
`;

helpers.AwaitValue = () => template.program.ast`
  export default function _AwaitValue(value) {
    this.wrapped = value;
  }
`;

helpers.AsyncGenerator = () => template.program.ast`
  import AwaitValue from "AwaitValue";

  export default function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null,
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg)
        var value = result.value;
        var wrappedAwait = value instanceof AwaitValue;

        Promise.resolve(wrappedAwait ? value.wrapped : value).then(
          function (arg) {
            if (wrappedAwait) {
              resume("next", arg);
              return
            }

            settle(result.done ? "return" : "normal", arg);
          },
          function (err) { resume("throw", err); });
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({ value: value, done: true });
          break;
        case "throw":
          front.reject(value);
          break;
        default:
          front.resolve({ value: value, done: false });
          break;
      }

      front = front.next;
      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    // Hide "return" method if generator return is not supported
    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; };
  }

  AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };
  AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };
  AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };
`;

helpers.wrapAsyncGenerator = () => template.program.ast`
  import AsyncGenerator from "AsyncGenerator";

  export default function _wrapAsyncGenerator(fn) {
    return function () {
      return new AsyncGenerator(fn.apply(this, arguments));
    };
  }
`;

helpers.awaitAsyncGenerator = () => template.program.ast`
  import AwaitValue from "AwaitValue";

  export default function _awaitAsyncGenerator(value) {
    return new AwaitValue(value);
  }
`;

helpers.asyncGeneratorDelegate = () => template.program.ast`
  export default function _asyncGeneratorDelegate(inner, awaitWrap) {
    var iter = {}, waiting = false;

    function pump(key, value) {
      waiting = true;
      value = new Promise(function (resolve) { resolve(inner[key](value)); });
      return { done: false, value: awaitWrap(value) };
    };

    if (typeof Symbol === "function" && Symbol.iterator) {
      iter[Symbol.iterator] = function () { return this; };
    }

    iter.next = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }
      return pump("next", value);
    };

    if (typeof inner.throw === "function") {
      iter.throw = function (value) {
        if (waiting) {
          waiting = false;
          throw value;
        }
        return pump("throw", value);
      };
    }

    if (typeof inner.return === "function") {
      iter.return = function (value) {
        return pump("return", value);
      };
    }

    return iter;
  }
`;

helpers.asyncToGenerator = () => template.program.ast`
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  export default function _asyncToGenerator(fn) {
    return function () {
      var self = this, args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }
`;

helpers.classCallCheck = () => template.program.ast`
  export default function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
`;

helpers.createClass = () => template.program.ast`
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i ++) {
      var descriptor = props[i];
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
`;

helpers.defineEnumerableProperties = () => template.program.ast`
  export default function _defineEnumerableProperties(obj, descs) {
    for (var key in descs) {
      var desc = descs[key];
      desc.configurable = desc.enumerable = true;
      if ("value" in desc) desc.writable = true;
      Object.defineProperty(obj, key, desc);
    }

    // Symbols are not enumerated over by for-in loops. If native
    // Symbols are available, fetch all of the descs object's own
    // symbol properties and define them on our target object too.
    if (Object.getOwnPropertySymbols) {
      var objectSymbols = Object.getOwnPropertySymbols(descs);
      for (var i = 0; i < objectSymbols.length; i++) {
        var sym = objectSymbols[i];
        var desc = descs[sym];
        desc.configurable = desc.enumerable = true;
        if ("value" in desc) desc.writable = true;
        Object.defineProperty(obj, sym, desc);
      }
    }
    return obj;
  }
`;

helpers.defaults = () => template.program.ast`
  export default function _defaults(obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  }
`;

helpers.defineProperty = () => template.program.ast`
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
`;

helpers.extends = () => template.program.ast`
  export default function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };

    return _extends.apply(this, arguments);
  }
`;

helpers.objectSpread = () => template.program.ast`
  import defineProperty from "defineProperty";

  export default function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = (arguments[i] != null) ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }
      ownKeys.forEach(function(key) {
        defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
`;

helpers.inherits = () => template.program.ast`
  import setPrototypeOf from "setPrototypeOf";

  export default function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
`;

helpers.inheritsLoose = () => template.program.ast`
  export default function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
`;

helpers.getPrototypeOf = () => template.program.ast`
  export default function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function _getPrototypeOf(o) {
          return o.__proto__ || Object.getPrototypeOf(o);
        };
    return _getPrototypeOf(o);
  }
`;

helpers.setPrototypeOf = () => template.program.ast`
  export default function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
`;

helpers.construct = () => template.program.ast`
  import setPrototypeOf from "setPrototypeOf";

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;

    // core-js@3
    if (Reflect.construct.sham) return false;

    // Proxy can't be polyfilled. Every browser implemented
    // proxies before or at the same time as Reflect.construct,
    // so if they support Proxy they also support Reflect.construct.
    if (typeof Proxy === "function") return true;

    // Since Reflect.construct can't be properly polyfilled, some
    // implementations (e.g. core-js@2) don't set the correct internal slots.
    // Those polyfills don't allow us to subclass built-ins, so we need to
    // use our fallback implementation.
    try {
      // If the internal slots aren't set, this throws an error similar to
      //   TypeError: this is not a Date object.
      Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  export default function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }
    // Avoid issues with Class being present but undefined when it wasn't
    // present in the original call.
    return _construct.apply(null, arguments);
  }
`;

// Based on https://github.com/WebReflection/babel-plugin-transform-builtin-classes
helpers.wrapNativeSuper = () => template.program.ast`
  import getPrototypeOf from "getPrototypeOf";
  import setPrototypeOf from "setPrototypeOf";
  import construct from "construct";

  export default function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null) return null;
      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);
        _cache.set(Class, Wrapper);
      }
      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor)
      }
      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true,
        }
      });

      return setPrototypeOf(Wrapper, Class);
    }

    return _wrapNativeSuper(Class)
  }
`;

helpers.instanceof = () => template.program.ast`
  export default function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }
`;

helpers.interopRequireDefault = () => template.program.ast`
  export default function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
`;

helpers.interopRequireWildcard = () => template.program.ast`
  export default function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};
      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
            if (desc.get || desc.set) {
              Object.defineProperty(newObj, key, desc);
            } else {
              newObj[key] = obj[key];
            }
          }
        }
      }
      newObj.default = obj;
      return newObj;
    }
  }
`;

helpers.newArrowCheck = () => template.program.ast`
  export default function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }
`;

helpers.objectDestructuringEmpty = () => template.program.ast`
  export default function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  }
`;

helpers.objectWithoutPropertiesLoose = () => template.program.ast`
  export default function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};

    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }
`;

helpers.objectWithoutProperties = () => template.program.ast`
  import objectWithoutPropertiesLoose from "objectWithoutPropertiesLoose";

  export default function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }
`;

helpers.assertThisInitialized = () => template.program.ast`
  export default function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
`;

helpers.possibleConstructorReturn = () => template.program.ast`
  import assertThisInitialized from "assertThisInitialized";

  export default function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }
    return assertThisInitialized(self);
  }
`;

helpers.superPropBase = () => template.program.ast`
  import getPrototypeOf from "getPrototypeOf";

  export default function _superPropBase(object, property) {
    // Yes, this throws if object is null to being with, that's on purpose.
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = getPrototypeOf(object);
      if (object === null) break;
    }
    return object;
  }
`;

helpers.get = () => template.program.ast`
  import getPrototypeOf from "getPrototypeOf";
  import superPropBase from "superPropBase";

  export default function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = superPropBase(target, property);

        if (!base) return;

        var desc = Object.getOwnPropertyDescriptor(base, property);
        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }
    return _get(target, property, receiver || target);
  }
`;

helpers.set = () => template.program.ast`
  import getPrototypeOf from "getPrototypeOf";
  import superPropBase from "superPropBase";
  import defineProperty from "defineProperty";

  function set(target, property, value, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.set) {
      set = Reflect.set;
    } else {
      set = function set(target, property, value, receiver) {
        var base = superPropBase(target, property);
        var desc;

        if (base) {
          desc = Object.getOwnPropertyDescriptor(base, property);
          if (desc.set) {
            desc.set.call(receiver, value);
            return true;
          } else if (!desc.writable) {
            // Both getter and non-writable fall into this.
            return false;
          }
        }

        // Without a super that defines the property, spec boils down to
        // "define on receiver" for some reason.
        desc = Object.getOwnPropertyDescriptor(receiver, property);
        if (desc) {
          if (!desc.writable) {
            // Setter, getter, and non-writable fall into this.
            return false;
          }

          desc.value = value;
          Object.defineProperty(receiver, property, desc);
        } else {
          // Avoid setters that may be defined on Sub's prototype, but not on
          // the instance.
          defineProperty(receiver, property, value);
        }

        return true;
      };
    }

    return set(target, property, value, receiver);
  }

  export default function _set(target, property, value, receiver, isStrict) {
    var s = set(target, property, value, receiver || target);
    if (!s && isStrict) {
      throw new Error('failed to set property');
    }

    return value;
  }
`;

helpers.taggedTemplateLiteral = () => template.program.ast`
  export default function _taggedTemplateLiteral(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  }
`;

helpers.taggedTemplateLiteralLoose = () => template.program.ast`
  export default function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) { raw = strings.slice(0); }
    strings.raw = raw;
    return strings;
  }
`;

helpers.temporalRef = () => template.program.ast`
  import undef from "temporalUndefined";

  export default function _temporalRef(val, name) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    } else {
      return val;
    }
  }
`;

helpers.readOnlyError = () => template.program.ast`
  export default function _readOnlyError(name) {
    throw new Error("\\"" + name + "\\" is read-only");
  }
`;

helpers.classNameTDZError = () => template.program.ast`
  export default function _classNameTDZError(name) {
    throw new Error("Class \\"" + name + "\\" cannot be referenced in computed property keys.");
  }
`;

helpers.temporalUndefined = () => template.program.ast`
  export default {};
`;

helpers.slicedToArray = () => template.program.ast`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimit from "iterableToArrayLimit";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }
`;

helpers.slicedToArrayLoose = () => template.program.ast`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArrayLimitLoose from "iterableToArrayLimitLoose";
  import nonIterableRest from "nonIterableRest";

  export default function _slicedToArrayLoose(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimitLoose(arr, i) || nonIterableRest();
  }
`;

helpers.toArray = () => template.program.ast`
  import arrayWithHoles from "arrayWithHoles";
  import iterableToArray from "iterableToArray";
  import nonIterableRest from "nonIterableRest";

  export default function _toArray(arr) {
    return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
  }
`;

helpers.toConsumableArray = () => template.program.ast`
  import arrayWithoutHoles from "arrayWithoutHoles";
  import iterableToArray from "iterableToArray";
  import nonIterableSpread from "nonIterableSpread";

  export default function _toConsumableArray(arr) {
    return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
  }
`;

helpers.arrayWithoutHoles = () => template.program.ast`
  export default function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    }
  }
`;

helpers.arrayWithHoles = () => template.program.ast`
  export default function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
`;

helpers.iterableToArray = () => template.program.ast`
  export default function _iterableToArray(iter) {
    if (
      Symbol.iterator in Object(iter) ||
      Object.prototype.toString.call(iter) === "[object Arguments]"
    ) return Array.from(iter);
  }
`;

helpers.iterableToArrayLimit = () => template.program.ast`
  export default function _iterableToArrayLimit(arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliancy is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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
`;

helpers.iterableToArrayLimitLoose = () => template.program.ast`
  export default function _iterableToArrayLimitLoose(arr, i) {
    var _arr = [];
    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  }
`;

helpers.nonIterableSpread = () => template.program.ast`
  export default function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
`;

helpers.nonIterableRest = () => template.program.ast`
  export default function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
`;

helpers.skipFirstGeneratorNext = () => template.program.ast`
  export default function _skipFirstGeneratorNext(fn) {
    return function () {
      var it = fn.apply(this, arguments);
      it.next();
      return it;
    }
  }
`;

helpers.toPropertyKey = () => template.program.ast`
  export default function _toPropertyKey(key) {
    if (typeof key === "symbol") {
      return key;
    } else {
      return String(key);
    }
  }
`;

/**
 * Add a helper that will throw a useful error if the transform fails to detect the class
 * property assignment, so users know something failed.
 */
helpers.initializerWarningHelper = () => template.program.ast`
    export default function _initializerWarningHelper(descriptor, context){
        throw new Error(
          'Decorating class property failed. Please ensure that ' +
          'proposal-class-properties is enabled and set to use loose mode. ' +
          'To use proposal-class-properties in spec mode with decorators, wait for ' +
          'the next major version of decorators in stage 2.'
        );
    }
`;

/**
 * Add a helper to call as a replacement for class property definition.
 */
helpers.initializerDefineProperty = () => template.program.ast`
    export default function _initializerDefineProperty(target, property, descriptor, context){
        if (!descriptor) return;

        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0,
        });
    }
`;

/**
 * Add a helper to take an initial descriptor, apply some decorators to it, and optionally
 * define the property.
 */
helpers.applyDecoratedDescriptor = () => template.program.ast`
    export default function _applyDecoratedDescriptor(target, property, decorators, descriptor, context){
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function(key){
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;
        if ('value' in desc || desc.initializer){
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function(desc, decorator){
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0){
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0){
            // This is a hack to avoid this being processed by 'transform-runtime'.
            // See issue #9.
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }
`;

helpers.classPrivateFieldLooseKey = () => template.program.ast`
  var id = 0;
  export default function _classPrivateFieldKey(name) {
    return "__private_" + (id++) + "_" + name;
  }
`;

helpers.classPrivateFieldLooseBase = () => template.program.ast`
  export default function _classPrivateFieldBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }
    return receiver;
  }
`;

helpers.classPrivateFieldGet = () => template.program.ast`
  export default function _classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver).value;
  }
`;

helpers.classPrivateFieldSet = () => template.program.ast`
  export default function _classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to set private field on non-instance");
    }
    var descriptor = privateMap.get(receiver);
    if (!descriptor.writable) {
      // This should only throw in strict mode, but class bodies are
      // always strict and private fields can only be used inside
      // class bodies.
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
    return value;
  }
`;

helpers.decorate = () => template.program.ast`
  import toArray from "toArray";

  // ClassDefinitionEvaluation (Steps 26-*)
  export default function _decorate(decorators, factory) {
    var r = factory(function initialize(O) {
      _initializeInstanceElements(O, decorated.elements);
    });
    var decorated = _decorateClass(
      _coalesceClassElements(r.d.map(_createElementDescriptor)),
      decorators
    );

    _initializeClassElements(r.F, decorated.elements);

    return _runClassFinishers(r.F, decorated.finishers);
  }

  // ClassElementEvaluation
  function _createElementDescriptor(def) {
    var descriptor;
    if (def.kind === "method") {
      descriptor = { value: def.value, writable: true, configurable: true, enumerable: false };
    } else if (def.kind === "get") {
      descriptor = { get: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "set") {
      descriptor = { set: def.value, configurable: true, enumerable: false };
    } else if (def.kind === "field") {
      descriptor = { configurable: true, writable: true, enumerable: false };
    }

    var element = {
      kind: def.kind === "field" ? "field" : "method",
      key: def.key,
      placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",
      descriptor: descriptor
    };
    if (def.decorators) element.decorators = def.decorators;
    if (def.kind === "field") element.initializer = def.value;

    return element;
  }

  // CoalesceGetterSetter
  function _coalesceGetterSetter(element, other) {
    if (element.descriptor.get !== undefined) {
      other.descriptor.get = element.descriptor.get;
    } else {
      other.descriptor.set = element.descriptor.set;
    }
  }

  // CoalesceClassElements
  function _coalesceClassElements(elements) {
    var newElements = [];

    var isSameElement = function (other) {
      return (
        other.kind === "method" &&
        other.key === element.key &&
        other.placement === element.placement
      );
    };

    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];

      if (
        element.kind === "method" &&
        (other = newElements.find(isSameElement))
      ) {
        if (
          _isDataDescriptor(element.descriptor) ||
          _isDataDescriptor(other.descriptor)
        ) {
          if (_hasDecorators(element) || _hasDecorators(other)) {
            throw new ReferenceError();
          }
          other.descriptor = element.descriptor;
        } else {
          if (_hasDecorators(element)) {
            if (_hasDecorators(other)) {
              throw new ReferenceError();
            }
            other.decorators = element.decorators;
          }
          _coalesceGetterSetter(element, other);
        }
      } else {
        newElements.push(element);
      }
    }

    return newElements;
  }

  function _hasDecorators(element) {
    return element.decorators && element.decorators.length;
  }

  function _isDataDescriptor(desc) {
    return (
      desc !== undefined &&
      !(desc.value === undefined && desc.writable === undefined)
    );
  }

  // InitializeClassElements
  function _initializeClassElements(F, elements) {
    var proto = F.prototype;

    elements.forEach(function (element) {
      var placement = element.placement;
      if (
        element.kind === "method" &&
        (placement === "static" || placement === "prototype")
      ) {
        var receiver = element.placement === "static" ? F : proto;
        _defineClassElement(receiver, element);
      }
    });
    elements.forEach(function (element) {
      var placement = element.placement;
      if (
        element.kind === "field" &&
        (placement === "static" || placement === "prototype")
      ) {
        var receiver = placement === "static" ? F : proto;
        _defineClassElement(receiver, element);
      }
    });
  }

  // InitializeInstanceElements
  function _initializeInstanceElements(O, elements) {
    elements.forEach(function (element) {
      if (element.kind === "method" && element.placement === "own") {
        _defineClassElement(O, element);
      }
    });
    elements.forEach(function (element) {
      if (element.kind === "field" && element.placement === "own") {
        _defineClassElement(O, element);
      }
    });
  }

  // DefineClassElement
  function _defineClassElement(receiver, element) {
    var descriptor = element.descriptor;
    if (element.kind === "field") {
      var initializer = element.initializer;
      descriptor = {
        enumerable: descriptor.enumerable,
        writable: descriptor.writable,
        configurable: descriptor.configurable,
        value: initializer === void 0 ? void 0 : initializer.call(receiver)
      };
    }
    Object.defineProperty(receiver, element.key, descriptor);
  }

  // DecorateClass
  function _decorateClass(elements, decorators) {
    var newElements = [];
    var finishers = [];
    var keys = { static: [], prototype: [], own: [] };

    elements.forEach(function(element) {
      keys[element.placement].push(element.key);
    });

    elements.forEach(function(element) {
      if (element.decorators && element.decorators.length) {
        var elementFinishersExtras = _decorateElement(element, keys);
        newElements = newElements.concat(
          [elementFinishersExtras.element],
          elementFinishersExtras.extras
        );
        finishers = finishers.concat(elementFinishersExtras.finishers);
      } else {
        newElements.push(element);
      }
    });

    if (!decorators) {
      return { elements: newElements, finishers: finishers };
    }

    var result = _decorateConstructor(newElements, decorators);
    result.finishers = finishers.concat(result.finishers);
    return result;
  }

  // DecorateElement
  function _decorateElement(element, keys) {
    var extras = [];
    var finishers = [];
    var placementKeys = keys[element.placement];

    for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {
      placementKeys.splice(placementKeys.indexOf(element.key), 1);

      var elementFinisherExtras = _toElementFinisherExtras(
        (0, decorators[i])(_fromElementDescriptor(element))
      );

      element = elementFinisherExtras.element;
      _decorateElement_pushKey(placementKeys, element);

      if (elementFinisherExtras.finisher) {
        finishers.push(elementFinisherExtras.finisher);
      }

      var newExtras = elementFinisherExtras.extras;
      if (newExtras) {
        for (var j = 0; j < newExtras.length; j++) {
          _decorateElement_pushKey(keys[newExtras[j].placement], newExtras[j]);
        }
        extras = extras.concat(newExtras);
      }
    }

    return { element: element, finishers: finishers, extras: extras };
  }

  // DecorateElement - Steps 3.g-3.h and 3.k.i.1-3.k.i.2
  function _decorateElement_pushKey(keys, element) {
    if (keys.indexOf(element.key) !== -1) {
      throw new TypeError("Duplicated key " + element.key);
    }
    keys.push(element.key);
  }

  // DecorateConstructor
  function _decorateConstructor(elements, decorators) {
    var finishers = [];

    for (var i = decorators.length - 1; i >= 0; i--) {
      var elementsAndFinisher = _toClassDescriptor(
        (0, decorators[i])(_fromClassDescriptor(elements))
      );

      if (elementsAndFinisher.finisher !== undefined) {
        finishers.push(elementsAndFinisher.finisher);
      }

      if (elementsAndFinisher.elements !== undefined) {
        elements = elementsAndFinisher.elements;

        for (var j = 0; j < elements.length - 1; j++) {
          for (var k = j + 1; k < elements.length; k++) {
            if (
              elements[j].key === elements[k].key &&
              elements[j].placement === elements[k].placement
            ) {
              throw new Error("Duplicated key " + elements[j].key);
            }
          }
        }
      }
    }

    return { elements: elements, finishers: finishers };
  }

  // FromElementDescriptor
  function _fromElementDescriptor(element) {
    var obj = {
      kind: element.kind,
      key: element.key,
      placement: element.placement,
      descriptor: element.descriptor
    };

    var desc = {
      value: element.kind === "method" ? "Method Descriptor" : "Field Descriptor",
      configurable: true
    };
    Object.defineProperty(obj, Symbol.toStringTag, desc);

    if (element.kind === "field") obj.initializer = element.initializer;

    return obj;
  }

  // ToElementDescriptors
  function _toElementDescriptors(elementObjects) {
    if (elementObjects === undefined) return;
    return toArray(elementObjects).map(function (elementObject) {
      var element = _toElementDescriptor(elementObject);
      _disallowProperty(elementObject, "finisher");
      _disallowProperty(elementObject, "extras");
      return element;
    });
  }

  // ToElementDescriptor
  function _toElementDescriptor(elementObject) {
    if (elementObject === undefined) {
      throw new Error(
        "The element descriptor is undefined." +
        " The decorator funciton must return an object."
      );
    }

    var kind = elementObject.kind;
    if (kind !== "method" && kind !== "field") {
      throw new TypeError();
    }

    var key = elementObject.key;
    if (typeof key !== "string" && typeof key !== "symbol") key = String(key);

    var placement = String(elementObject.placement);
    if (
      placement !== "static" &&
      placement !== "prototype" &&
      placement !== "own"
    ) {
      throw new TypeError();
    }

    var descriptor = elementObject.descriptor;

    _disallowProperty(elementObject, "elements");

    var element = {
      kind: kind,
      key: key,
      placement: placement,
      descriptor: Object.assign({}, descriptor)
    };

    if (kind !== "field") {
      _disallowProperty(elementObject, "initializer");
    } else {
      _disallowProperty(descriptor, "get");
      _disallowProperty(descriptor, "set");
      _disallowProperty(descriptor, "value");

      element.initializer = elementObject.initializer;
    }

    return element;
  }

  function _toElementFinisherExtras(elementObject) {
    var element = _toElementDescriptor(elementObject);
    var finisher = _optionalCallableProperty(elementObject, "finisher");
    var extras = _toElementDescriptors(elementObject.extras);

    return { element: element, finisher: finisher, extras: extras };
  }

  // FromClassDescriptor
  function _fromClassDescriptor(elements) {
    var obj = {
      kind: "class",
      elements: elements.map(_fromElementDescriptor)
    };

    var desc = { value: "Class Descriptor", configurable: true };
    Object.defineProperty(obj, Symbol.toStringTag, desc);

    return obj;
  }

  // ToClassDescriptor
  function _toClassDescriptor(obj) {
    var kind = String(obj.kind);
    if (kind !== "class") throw new TypeError();

    _disallowProperty(obj, "key");
    _disallowProperty(obj, "placement");
    _disallowProperty(obj, "descriptor");
    _disallowProperty(obj, "initializer");
    _disallowProperty(obj, "extras");

    var finisher = _optionalCallableProperty(obj, "finisher");
    var elements = _toElementDescriptors(obj.elements);

    return { elements: elements, finisher: finisher };
  }

  function _disallowProperty(obj, name) {
    if (obj[name] !== undefined) {
      throw new TypeError("Unexpected '" + name + "' property.");
    }
  }

  function _optionalCallableProperty(obj, name) {
    var value = obj[name];
    if (value !== undefined && typeof value !== "function") {
      throw new TypeError("Expected '" + name + "' to be a function");
    }
    return value;
  }

  // RunClassFinishers
  function _runClassFinishers(constructor, finishers) {
    for (var i = 0; i < finishers.length; i++) {
      var newConstructor = (0, finishers[i])(constructor);
      if (newConstructor !== undefined) {
        if (typeof newConstructor !== "function") throw new TypeError();
        constructor = newConstructor;
      }
    }
    return constructor;
  }
`;
