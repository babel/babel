import template from "babel-template";

export let _typeof = template(`
  (function (obj) {
    return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
  });
`);

export let typeofReactElement = template(`
  (typeof Symbol === "function" && Symbol.for && Symbol.for("react.element")) || 0xeac7;
`);

export let asyncToGenerator = template(`
  (function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);

      return new Promise(function (resolve, reject) {
        var callNext = step.bind(null, "next");
        var callThrow = step.bind(null, "throw");

        function step(key, arg) {
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
            Promise.resolve(value).then(callNext, callThrow);
          }
        }

        callNext();
      });
    };
  })
`);


export let classCallCheck = template(`
  (function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  });
`);

export let createClass = template(`
  (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i ++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })()
`);

export let defaultProps = template(`
  (function (defaultProps, props) {
    if (defaultProps) {
      for (var propName in defaultProps) {
        if (typeof props[propName] === "undefined") {
          props[propName] = defaultProps[propName];
        }
      }
    }
    return props;
  })
`);


export let defaults = template(`
  (function (obj, defaults) {
    var keys = Object.getOwnPropertyNames(defaults);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = Object.getOwnPropertyDescriptor(defaults, key);
      if (value && value.configurable && obj[key] === undefined) {
        Object.defineProperty(obj, key, value);
      }
    }
    return obj;
  })
`);

export let defineProperty = template(`
  (function (obj, key, value) {
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
  });
`);

export let _extends = template(`
  Object.assign || (function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  })
`);

export let get = template(`
  (function get(object, property, receiver) {
    if (object === null) object = Function.prototype;

    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  });
`);


export let inherits = template(`
  (function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
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
  })
`);

export let _instanceof = template(`
  (function (left, right) {
    if (right != null && right[Symbol.hasInstance]) {
      return right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  });
`);


export let interopRequireDefault = template(`
  (function (obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  })
`);

export let interopRequireWildcard = template(`
  (function (obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};
      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }
      newObj.default = obj;
      return newObj;
    }
  })
`);

export let newArrowCheck = template(`
  (function (innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  });
`);

export let objectDestructuringEmpty = template(`
  (function (obj) {
    if (obj == null) throw new TypeError("Cannot destructure undefined");
  });
`);

export let objectWithoutProperties = template(`
  (function (obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  })
`);

export let possibleConstructorReturn = template(`
  (function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  });
`);

export let selfGlobal = template(`
  typeof global === "undefined" ? self : global
`);

export let set = template(`
  (function set(object, property, value, receiver) {
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent !== null) {
        set(parent, property, value, receiver);
      }
    } else if ("value" in desc && desc.writable) {
      desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        setter.call(receiver, value);
      }
    }

    return value;
  });
`);

export let slicedToArray = template(`
  (function () {
    // Broken out into a separate function to avoid deoptimizations due to the try/catch for the
    // array iterator case.
    function sliceIterator(arr, i) {
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
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  })();
`);

export let slicedToArrayLoose = template(`
  (function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      var _arr = [];
      for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
        _arr.push(_step.value);
        if (i && _arr.length === i) break;
      }
      return _arr;
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  });
`);

export let taggedTemplateLiteral = template(`
  (function (strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
        raw: { value: Object.freeze(raw) }
    }));
  });
`);

export let taggedTemplateLiteralLoose = template(`
  (function (strings, raw) {
    strings.raw = raw;
    return strings;
  });
`);

export let temporalRef = template(`
  (function (val, name, undef) {
    if (val === undef) {
      throw new ReferenceError(name + " is not defined - temporal dead zone");
    } else {
      return val;
    }
  })
`);

export let temporalUndefined = template(`
  ({})
`);

export let toArray = template(`
  (function (arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  });
`);

export let toConsumableArray = template(`
  (function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
      return arr2;
    } else {
      return Array.from(arr);
    }
  });
`);
