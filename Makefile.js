/* eslint-disable */
  //prettier-ignore
  'use strict';

var require$$0 = require('os');
var require$$1 = require('fs');
var require$$2 = require('path');
var require$$4 = require('events');
var require$$6 = require('assert');
var require$$4$1 = require('util');
var require$$0$1 = require('child_process');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
var require$$4__default = /*#__PURE__*/_interopDefaultLegacy(require$$4);
var require$$6__default = /*#__PURE__*/_interopDefaultLegacy(require$$6);
var require$$4__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$4$1);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$g =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$p = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$o = fails$p;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$o(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$n = fails$p;

var functionBindNative = !fails$n(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$f = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$f.bind(call$f) : function () {
  return call$f.apply(call$f, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$1(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var bind$2 = FunctionPrototype$2.bind;
var call$e = FunctionPrototype$2.call;
var uncurryThis$s = NATIVE_BIND$2 && bind$2.bind(call$e, call$e);

var functionUncurryThis = NATIVE_BIND$2 ? function (fn) {
  return fn && uncurryThis$s(fn);
} : function (fn) {
  return fn && function () {
    return call$e.apply(fn, arguments);
  };
};

var uncurryThis$r = functionUncurryThis;

var toString$c = uncurryThis$r({}.toString);
var stringSlice$7 = uncurryThis$r(''.slice);

var classofRaw$1 = function (it) {
  return stringSlice$7(toString$c(it), 8, -1);
};

var uncurryThis$q = functionUncurryThis;
var fails$m = fails$p;
var classof$7 = classofRaw$1;

var $Object$4 = Object;
var split = uncurryThis$q(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$m(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$7(it) == 'String' ? split(it, '') : $Object$4(it);
} : $Object$4;

var $TypeError$d = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$8 = function (it) {
  if (it == undefined) throw $TypeError$d("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$7 = requireObjectCoercible$8;

var toIndexedObject$6 = function (it) {
  return IndexedObject$1(requireObjectCoercible$7(it));
};

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$m = function (argument) {
  return typeof argument == 'function';
};

var isCallable$l = isCallable$m;

var isObject$d = function (it) {
  return typeof it == 'object' ? it !== null : isCallable$l(it);
};

var global$f = global$g;
var isCallable$k = isCallable$m;

var aFunction = function (argument) {
  return isCallable$k(argument) ? argument : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$f[namespace]) : global$f[namespace] && global$f[namespace][method];
};

var uncurryThis$p = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$p({}.isPrototypeOf);

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

var global$e = global$g;
var userAgent$2 = engineUserAgent;

var process$1 = global$e.process;
var Deno = global$e.Deno;
var versions = process$1 && process$1.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$2) {
  match = userAgent$2.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$2.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es-x/no-symbol -- required for testing */

var V8_VERSION$2 = engineV8Version;
var fails$l = fails$p;

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails$l(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
});

/* eslint-disable es-x/no-symbol -- required for testing */

var NATIVE_SYMBOL$2 = nativeSymbol;

var useSymbolAsUid = NATIVE_SYMBOL$2
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$6 = getBuiltIn$8;
var isCallable$j = isCallable$m;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$3 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return isCallable$j($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$3(it));
};

var $String$3 = String;

var tryToString$3 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$i = isCallable$m;
var tryToString$2 = tryToString$3;

var $TypeError$c = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$3 = function (argument) {
  if (isCallable$i(argument)) return argument;
  throw $TypeError$c(tryToString$2(argument) + ' is not a function');
};

var aCallable$2 = aCallable$3;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$5 = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable$2(func);
};

var call$d = functionCall;
var isCallable$h = isCallable$m;
var isObject$c = isObject$d;

var $TypeError$b = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$h(fn = input.toString) && !isObject$c(val = call$d(fn, input))) return val;
  if (isCallable$h(fn = input.valueOf) && !isObject$c(val = call$d(fn, input))) return val;
  if (pref !== 'string' && isCallable$h(fn = input.toString) && !isObject$c(val = call$d(fn, input))) return val;
  throw $TypeError$b("Can't convert object to primitive value");
};

var shared$4 = {exports: {}};

var global$d = global$g;

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$6 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$6(global$d, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$d[key] = value;
  } return value;
};

var global$c = global$g;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$c[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.23.4',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.23.4/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$6 = requireObjectCoercible$8;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$7 = function (argument) {
  return $Object$2(requireObjectCoercible$6(argument));
};

var uncurryThis$o = functionUncurryThis;
var toObject$6 = toObject$7;

var hasOwnProperty = uncurryThis$o({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$6(it), key);
};

var uncurryThis$n = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$b = uncurryThis$n(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$b(++id + postfix, 36);
};

var global$b = global$g;
var shared$3 = shared$4.exports;
var hasOwn$b = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL$1 = nativeSymbol;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$b.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$i = function (name) {
  if (!hasOwn$b(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL$1 || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL$1 && hasOwn$b(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var call$c = functionCall;
var isObject$b = isObject$d;
var isSymbol$2 = isSymbol$3;
var getMethod$4 = getMethod$5;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$h = wellKnownSymbol$i;

var $TypeError$a = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$h('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$b(input) || isSymbol$2(input)) return input;
  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$c(exoticToPrim, input, pref);
    if (!isObject$b(result) || isSymbol$2(result)) return result;
    throw $TypeError$a("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol$1 = isSymbol$3;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol$1(key) ? key : key + '';
};

var global$a = global$g;
var isObject$a = isObject$d;

var document$1 = global$a.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$a(document$1) && isObject$a(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$c = descriptors;
var fails$k = fails$p;
var createElement = documentCreateElement$1;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$c && !fails$k(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$b = descriptors;
var call$b = functionCall;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var toIndexedObject$5 = toIndexedObject$6;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$a = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$b ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$5(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$a(O, P)) return createPropertyDescriptor$4(!call$b(propertyIsEnumerableModule.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$a = descriptors;
var fails$j = fails$p;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$a && fails$j(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$9 = isObject$d;

var $String$2 = String;
var $TypeError$9 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$b = function (argument) {
  if (isObject$9(argument)) return argument;
  throw $TypeError$9($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$9 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$a = anObject$b;
var toPropertyKey$1 = toPropertyKey$3;

var $TypeError$8 = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$9 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$a(O);
  P = toPropertyKey$1(P);
  anObject$a(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$a(O);
  P = toPropertyKey$1(P);
  anObject$a(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$8('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$8 = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var createNonEnumerableProperty$7 = DESCRIPTORS$8 ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$3 = {exports: {}};

var DESCRIPTORS$7 = descriptors;
var hasOwn$9 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$7 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$9(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$7 || (DESCRIPTORS$7 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$m = functionUncurryThis;
var isCallable$g = isCallable$m;
var store$1 = sharedStore;

var functionToString = uncurryThis$m(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$g(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$9 = global$g;
var isCallable$f = isCallable$m;
var inspectSource$2 = inspectSource$3;

var WeakMap$1 = global$9.WeakMap;

var nativeWeakMap = isCallable$f(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1));

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys$1 = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys$1[key] || (keys$1[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = nativeWeakMap;
var global$8 = global$g;
var uncurryThis$l = functionUncurryThis;
var isObject$8 = isObject$d;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$7;
var hasOwn$8 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$1 = global$8.TypeError;
var WeakMap = global$8.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$8(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$1('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  var wmget = uncurryThis$l(store.get);
  var wmhas = uncurryThis$l(store.has);
  var wmset = uncurryThis$l(store.set);
  set$1 = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$8(it, STATE)) throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$6(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$8(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$8(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$i = fails$p;
var isCallable$e = isCallable$m;
var hasOwn$7 = hasOwnProperty_1;
var DESCRIPTORS$6 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$1 = inspectSource$3;
var InternalStateModule$1 = internalState;

var enforceInternalState$1 = InternalStateModule$1.enforce;
var getInternalState$3 = InternalStateModule$1.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$6 && !fails$i(function () {
  return defineProperty$5(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$7(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$6) defineProperty$5(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$7(options, 'arity') && value.length !== options.arity) {
    defineProperty$5(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$7(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$6) defineProperty$5(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState$1(value);
  if (!hasOwn$7(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$2(function toString() {
  return isCallable$e(this) && getInternalState$3(this).source || inspectSource$1(this);
}, 'toString');

var isCallable$d = isCallable$m;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn$1 = makeBuiltIn$3.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$5 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$d(value)) makeBuiltIn$1(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$4.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$2 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$2 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$5 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$4 = toIntegerOrInfinity$5;

var max$5 = Math.max;
var min$4 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$4 = function (index, length) {
  var integer = toIntegerOrInfinity$4(index);
  return integer < 0 ? max$5(integer + length, 0) : min$4(integer, length);
};

var toIntegerOrInfinity$3 = toIntegerOrInfinity$5;

var min$3 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$4 = function (argument) {
  return argument > 0 ? min$3(toIntegerOrInfinity$3(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$3 = toLength$4;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$7 = function (obj) {
  return toLength$3(obj.length);
};

var toIndexedObject$4 = toIndexedObject$6;
var toAbsoluteIndex$3 = toAbsoluteIndex$4;
var lengthOfArrayLike$6 = lengthOfArrayLike$7;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$3 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$4($this);
    var length = lengthOfArrayLike$6(O);
    var index = toAbsoluteIndex$3(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$3(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$3(false)
};

var uncurryThis$k = functionUncurryThis;
var hasOwn$6 = hasOwnProperty_1;
var toIndexedObject$3 = toIndexedObject$6;
var indexOf$2 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$4 = uncurryThis$k([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$3(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$6(hiddenKeys$2, key) && hasOwn$6(O, key) && push$4(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$6(O, key = names[i++])) {
    ~indexOf$2(result, key) || push$4(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$8;
var uncurryThis$j = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var anObject$9 = anObject$b;

var concat$1 = uncurryThis$j([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$9(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$5 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;

var copyConstructorProperties$2 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$3.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$5(target, key) && !(exceptions && hasOwn$5(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$h = fails$p;
var isCallable$c = isCallable$m;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize$1(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$c(detection) ? fails$h(detection)
    : !!detection;
};

var normalize$1 = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$7 = global$g;
var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$7;
var defineBuiltIn$4 = defineBuiltIn$5;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$1 = copyConstructorProperties$2;
var isForced$1 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$7;
  } else if (STATIC) {
    target = global$7[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$7[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties$1(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$5(sourceProperty, 'sham', true);
    }
    defineBuiltIn$4(target, key, sourceProperty, options);
  }
};

var defineProperty$4 = objectDefineProperty.f;
var hasOwn$4 = hasOwnProperty_1;
var wellKnownSymbol$g = wellKnownSymbol$i;

var TO_STRING_TAG$2 = wellKnownSymbol$g('toStringTag');

var setToStringTag$3 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$4(target, TO_STRING_TAG$2)) {
    defineProperty$4(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var $$g = _export;
var global$6 = global$g;
var setToStringTag$2 = setToStringTag$3;

$$g({ global: true }, { Reflect: {} });

// Reflect[@@toStringTag] property
// https://tc39.es/ecma262/#sec-reflect-@@tostringtag
setToStringTag$2(global$6.Reflect, 'Reflect', true);

var objectDefineProperties = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
var objectKeys$1 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$5 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$8 = anObject$b;
var toIndexedObject$2 = toIndexedObject$6;
var objectKeys = objectKeys$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$5 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$8(O);
  var props = toIndexedObject$2(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$4 = getBuiltIn$8;

var html$1 = getBuiltIn$4('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$7 = anObject$b;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$7(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$f = wellKnownSymbol$i;
var create$2 = objectCreate;
var defineProperty$3 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$f('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty$3(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$2(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$1 = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$g = fails$p;

var correctPrototypeGetter = !fails$g(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$3 = hasOwnProperty_1;
var isCallable$b = isCallable$m;
var toObject$5 = toObject$7;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$5(O);
  if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$b(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype : null;
};

var fails$f = fails$p;
var isCallable$a = isCallable$m;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$3 = defineBuiltIn$5;
var wellKnownSymbol$e = wellKnownSymbol$i;

var ITERATOR$1 = wellKnownSymbol$e('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails$f(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$1].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$a(IteratorPrototype$2[ITERATOR$1])) {
  defineBuiltIn$3(IteratorPrototype$2, ITERATOR$1, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;
var setToStringTag$1 = setToStringTag$3;
var Iterators$2 = iterators;

var returnThis$1 = function () { return this; };

var createIteratorConstructor$1 = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$1(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
  setToStringTag$1(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$2[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isCallable$9 = isCallable$m;

var $String$1 = String;
var $TypeError$7 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$9(argument)) return argument;
  throw $TypeError$7("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$i = functionUncurryThis;
var anObject$6 = anObject$b;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$i(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$6(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$f = _export;
var call$a = functionCall;
var FunctionName = functionName;
var isCallable$8 = isCallable$m;
var createIteratorConstructor = createIteratorConstructor$1;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$2 = objectSetPrototypeOf;
var setToStringTag = setToStringTag$3;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$7;
var defineBuiltIn$2 = defineBuiltIn$5;
var wellKnownSymbol$d = wellKnownSymbol$i;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol$d('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator$1 = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$2) {
          setPrototypeOf$2(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$8(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn$2(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$4(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$a(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$2(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$f({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn$2(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators$1[NAME] = defaultIterator;

  return methods;
};

var toIndexedObject$1 = toIndexedObject$6;
var addToUnscopables = addToUnscopables$1;
var Iterators = iterators;
var InternalStateModule = internalState;
var defineProperty$2 = objectDefineProperty.f;
var defineIterator = defineIterator$1;
var DESCRIPTORS$4 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState$2 = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$1(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$4 && values.name !== 'values') try {
  defineProperty$2(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

var wellKnownSymbol$c = wellKnownSymbol$i;

var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');
var test$2 = {};

test$2[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test$2) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$7 = isCallable$m;
var classofRaw = classofRaw$1;
var wellKnownSymbol$b = wellKnownSymbol$i;

var TO_STRING_TAG = wellKnownSymbol$b('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$6 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
};

var classof$5 = classof$6;

var $String = String;

var toString$a = function (argument) {
  if (classof$5(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var anObject$5 = anObject$b;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$5(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var fails$e = fails$p;
var global$5 = global$g;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$5.RegExp;

var UNSUPPORTED_Y$3 = fails$e(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY$1 = UNSUPPORTED_Y$3 || fails$e(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$e(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$1,
  UNSUPPORTED_Y: UNSUPPORTED_Y$3
};

var fails$d = fails$p;
var global$4 = global$g;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$4.RegExp;

var regexpUnsupportedDotAll = fails$d(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$c = fails$p;
var global$3 = global$g;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$3.RegExp;

var regexpUnsupportedNcg = fails$c(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$9 = functionCall;
var uncurryThis$h = functionUncurryThis;
var toString$9 = toString$a;
var regexpFlags = regexpFlags$1;
var stickyHelpers$2 = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState$1 = internalState.get;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$5 = uncurryThis$h(''.charAt);
var indexOf$1 = uncurryThis$h(''.indexOf);
var replace$5 = uncurryThis$h(''.replace);
var stringSlice$6 = uncurryThis$h(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$9(nativeExec, re1, 'a');
  call$9(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$2 = stickyHelpers$2.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$2 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$1(re);
    var str = toString$9(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$9(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$2 && re.sticky;
    var flags = call$9(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$5(flags, 'y', '');
      if (indexOf$1(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$6(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$9(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$6(match.input, charsAdded);
        match[0] = stringSlice$6(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$9(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$3 = patchedExec;

var $$e = _export;
var exec$6 = regexpExec$3;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$e({ target: 'RegExp', proto: true, forced: /./.exec !== exec$6 }, {
  exec: exec$6
});

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$4 = FunctionPrototype.apply;
var call$8 = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$8.bind(apply$4) : function () {
  return call$8.apply(apply$4, arguments);
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$g = functionUncurryThis;
var defineBuiltIn$1 = defineBuiltIn$5;
var regexpExec$2 = regexpExec$3;
var fails$b = fails$p;
var wellKnownSymbol$a = wellKnownSymbol$i;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$7;

var SPECIES$5 = wellKnownSymbol$a('species');
var RegExpPrototype$3 = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol$a(KEY);

  var DELEGATES_TO_SYMBOL = !fails$b(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$b(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$5] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$g(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$g(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$2 || $exec === RegExpPrototype$3.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn$1(String.prototype, KEY, methods[0]);
    defineBuiltIn$1(RegExpPrototype$3, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty$3(RegExpPrototype$3[SYMBOL], 'sham', true);
};

var uncurryThis$f = functionUncurryThis;
var toIntegerOrInfinity$2 = toIntegerOrInfinity$5;
var toString$8 = toString$a;
var requireObjectCoercible$5 = requireObjectCoercible$8;

var charAt$4 = uncurryThis$f(''.charAt);
var charCodeAt$1 = uncurryThis$f(''.charCodeAt);
var stringSlice$5 = uncurryThis$f(''.slice);

var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$8(requireObjectCoercible$5($this));
    var position = toIntegerOrInfinity$2(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$4(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$5(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};

var charAt$3 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$3 = function (S, index, unicode) {
  return index + (unicode ? charAt$3(S, index).length : 1);
};

var uncurryThis$e = functionUncurryThis;
var toObject$4 = toObject$7;

var floor$1 = Math.floor;
var charAt$2 = uncurryThis$e(''.charAt);
var replace$4 = uncurryThis$e(''.replace);
var stringSlice$4 = uncurryThis$e(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
var getSubstitution$2 = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject$4(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$4(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt$2(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice$4(str, 0, position);
      case "'": return stringSlice$4(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice$4(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor$1(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt$2(ch, 1) : captures[f - 1] + charAt$2(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};

var call$7 = functionCall;
var anObject$4 = anObject$b;
var isCallable$6 = isCallable$m;
var classof$4 = classofRaw$1;
var regexpExec$1 = regexpExec$3;

var $TypeError$6 = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable$6(exec)) {
    var result = call$7(exec, R, S);
    if (result !== null) anObject$4(result);
    return result;
  }
  if (classof$4(R) === 'RegExp') return call$7(regexpExec$1, R, S);
  throw $TypeError$6('RegExp#exec called on incompatible receiver');
};

var apply$3 = functionApply;
var call$6 = functionCall;
var uncurryThis$d = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var fails$a = fails$p;
var anObject$3 = anObject$b;
var isCallable$5 = isCallable$m;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$5;
var toLength$2 = toLength$4;
var toString$7 = toString$a;
var requireObjectCoercible$4 = requireObjectCoercible$8;
var advanceStringIndex$2 = advanceStringIndex$3;
var getMethod$3 = getMethod$5;
var getSubstitution$1 = getSubstitution$2;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$9 = wellKnownSymbol$i;

var REPLACE$1 = wellKnownSymbol$9('replace');
var max$4 = Math.max;
var min$2 = Math.min;
var concat = uncurryThis$d([].concat);
var push$3 = uncurryThis$d([].push);
var stringIndexOf$2 = uncurryThis$d(''.indexOf);
var stringSlice$3 = uncurryThis$d(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE$1]) {
    return /./[REPLACE$1]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$a(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic$2('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible$4(this);
      var replacer = searchValue == undefined ? undefined : getMethod$3(searchValue, REPLACE$1);
      return replacer
        ? call$6(replacer, searchValue, O, replaceValue)
        : call$6(nativeReplace, toString$7(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject$3(this);
      var S = toString$7(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf$2(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf$2(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable$5(replaceValue);
      if (!functionalReplace) replaceValue = toString$7(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null) break;

        push$3(results, result);
        if (!global) break;

        var matchStr = toString$7(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex$2(S, toLength$2(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString$7(result[0]);
        var position = max$4(min$2(toIntegerOrInfinity$1(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push$3(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push$3(replacerArgs, namedCaptures);
          var replacement = toString$7(apply$3(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution$1(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice$3(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice$3(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);

var isObject$7 = isObject$d;
var classof$3 = classofRaw$1;
var wellKnownSymbol$8 = wellKnownSymbol$i;

var MATCH$1 = wellKnownSymbol$8('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$7(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$3(it) == 'RegExp');
};

var call$5 = functionCall;
var hasOwn$2 = hasOwnProperty_1;
var isPrototypeOf$2 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn$2(R, 'flags') && isPrototypeOf$2(RegExpPrototype$2, R)
    ? call$5(regExpFlags, R) : flags;
};

var $$d = _export;
var call$4 = functionCall;
var uncurryThis$c = functionUncurryThis;
var requireObjectCoercible$3 = requireObjectCoercible$8;
var isCallable$4 = isCallable$m;
var isRegExp$2 = isRegexp;
var toString$6 = toString$a;
var getMethod$2 = getMethod$5;
var getRegExpFlags$1 = regexpGetFlags;
var getSubstitution = getSubstitution$2;
var wellKnownSymbol$7 = wellKnownSymbol$i;

var REPLACE = wellKnownSymbol$7('replace');
var $TypeError$5 = TypeError;
var indexOf = uncurryThis$c(''.indexOf);
uncurryThis$c(''.replace);
var stringSlice$2 = uncurryThis$c(''.slice);
var max$3 = Math.max;

var stringIndexOf$1 = function (string, searchValue, fromIndex) {
  if (fromIndex > string.length) return -1;
  if (searchValue === '') return fromIndex;
  return indexOf(string, searchValue, fromIndex);
};

// `String.prototype.replaceAll` method
// https://tc39.es/ecma262/#sec-string.prototype.replaceall
$$d({ target: 'String', proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible$3(this);
    var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, replacement;
    var position = 0;
    var endOfLastMatch = 0;
    var result = '';
    if (searchValue != null) {
      IS_REG_EXP = isRegExp$2(searchValue);
      if (IS_REG_EXP) {
        flags = toString$6(requireObjectCoercible$3(getRegExpFlags$1(searchValue)));
        if (!~indexOf(flags, 'g')) throw $TypeError$5('`.replaceAll` does not allow non-global regexes');
      }
      replacer = getMethod$2(searchValue, REPLACE);
      if (replacer) {
        return call$4(replacer, searchValue, O, replaceValue);
      }
    }
    string = toString$6(O);
    searchString = toString$6(searchValue);
    functionalReplace = isCallable$4(replaceValue);
    if (!functionalReplace) replaceValue = toString$6(replaceValue);
    searchLength = searchString.length;
    advanceBy = max$3(1, searchLength);
    position = stringIndexOf$1(string, searchString, 0);
    while (position !== -1) {
      replacement = functionalReplace
        ? toString$6(replaceValue(searchString, position, string))
        : getSubstitution(searchString, string, position, [], undefined, replaceValue);
      result += stringSlice$2(string, endOfLastMatch, position) + replacement;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf$1(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice$2(string, endOfLastMatch);
    }
    return result;
  }
});

var defineProperty$1 = objectDefineProperty.f;

var proxyAccessor$2 = function (Target, Source, key) {
  key in Target || defineProperty$1(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};

var isCallable$3 = isCallable$m;
var isObject$6 = isObject$d;
var setPrototypeOf$1 = objectSetPrototypeOf;

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired$2 = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$1 &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$3(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject$6(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf$1($this, NewTargetPrototype);
  return $this;
};

var toString$5 = toString$a;

var normalizeStringArgument$1 = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString$5(argument);
};

var isObject$5 = isObject$d;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$7;

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
var installErrorCause$1 = function (O, options) {
  if (isObject$5(options) && 'cause' in options) {
    createNonEnumerableProperty$2(O, 'cause', options.cause);
  }
};

var uncurryThis$b = functionUncurryThis;

var $Error = Error;
var replace$3 = uncurryThis$b(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

var clearErrorStack$1 = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace$3(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};

var fails$9 = fails$p;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var errorStackInstallable = !fails$9(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor$1(1, 7));
  return error.stack !== 7;
});

var getBuiltIn$3 = getBuiltIn$8;
var hasOwn$1 = hasOwnProperty_1;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$7;
var isPrototypeOf$1 = objectIsPrototypeOf;
var setPrototypeOf = objectSetPrototypeOf;
var copyConstructorProperties = copyConstructorProperties$2;
var proxyAccessor$1 = proxyAccessor$2;
var inheritIfRequired$1 = inheritIfRequired$2;
var normalizeStringArgument = normalizeStringArgument$1;
var installErrorCause = installErrorCause$1;
var clearErrorStack = clearErrorStack$1;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;
var DESCRIPTORS$3 = descriptors;

var wrapErrorConstructorWithCause$1 = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn$3.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (hasOwn$1(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn$3('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty$1(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty$1(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf$1(OriginalErrorPrototype, this)) inheritIfRequired$1(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$3 && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor$1(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$1(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};

/* eslint-disable no-unused-vars -- required for functions `.length` */

var $$c = _export;
var global$2 = global$g;
var apply$2 = functionApply;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$1;

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global$2[WEB_ASSEMBLY];

var FORCED$2 = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED$2);
  $$c({ global: true, constructor: true, arity: 1, forced: FORCED$2 }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED$2);
    $$c({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$2 }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply$2(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply$2(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply$2(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply$2(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply$2(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply$2(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply$2(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply$2(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply$2(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply$2(init, this, arguments); };
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var $$b = _export;
var call$3 = functionCall;
var uncurryThis$a = functionUncurryThis;
var isCallable$2 = isCallable$m;
var isObject$4 = isObject$d;

var DELEGATES_TO_EXEC = function () {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function () {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test('abc') === true && execCalled;
}();

var $TypeError$4 = TypeError;
var un$Test = uncurryThis$a(/./.test);

// `RegExp.prototype.test` method
// https://tc39.es/ecma262/#sec-regexp.prototype.test
$$b({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function (str) {
    var exec = this.exec;
    if (!isCallable$2(exec)) return un$Test(this, str);
    var result = call$3(exec, this, str);
    if (result !== null && !isObject$4(result)) {
      throw new $TypeError$4('RegExp exec method returned something other than an Object or null');
    }
    return !!result;
  }
});

// a string of all valid unicode whitespaces
var whitespaces$2 = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var uncurryThis$9 = functionUncurryThis;
var requireObjectCoercible$2 = requireObjectCoercible$8;
var toString$4 = toString$a;
var whitespaces$1 = whitespaces$2;

var replace$2 = uncurryThis$9(''.replace);
var whitespace = '[' + whitespaces$1 + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$1 = function (TYPE) {
  return function ($this) {
    var string = toString$4(requireObjectCoercible$2($this));
    if (TYPE & 1) string = replace$2(string, ltrim, '');
    if (TYPE & 2) string = replace$2(string, rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var fails$8 = fails$p;
var whitespaces = whitespaces$2;

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails$8(function () {
    return !!whitespaces[METHOD_NAME]()
      || non[METHOD_NAME]() !== non
      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  });
};

var $$a = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod$1 = stringTrimForced;

// `String.prototype.trim` method
// https://tc39.es/ecma262/#sec-string.prototype.trim
$$a({ target: 'String', proto: true, forced: forcedStringTrimMethod$1('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

var classof$2 = classofRaw$1;

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
var isArray$4 = Array.isArray || function isArray(argument) {
  return classof$2(argument) == 'Array';
};

var uncurryThis$8 = functionUncurryThis;
var fails$7 = fails$p;
var isCallable$1 = isCallable$m;
var classof$1 = classof$6;
var getBuiltIn$2 = getBuiltIn$8;
var inspectSource = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$2('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$5 = uncurryThis$8(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$1(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$1(argument)) return false;
  switch (classof$1(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$5(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$3 = !construct || fails$7(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var toPropertyKey = toPropertyKey$3;
var definePropertyModule$1 = objectDefineProperty;
var createPropertyDescriptor = createPropertyDescriptor$5;

var createProperty$4 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule$1.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var fails$6 = fails$p;
var wellKnownSymbol$6 = wellKnownSymbol$i;
var V8_VERSION$1 = engineV8Version;

var SPECIES$4 = wellKnownSymbol$6('species');

var arrayMethodHasSpeciesSupport$5 = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION$1 >= 51 || !fails$6(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var uncurryThis$7 = functionUncurryThis;

var arraySlice$3 = uncurryThis$7([].slice);

var $$9 = _export;
var isArray$3 = isArray$4;
var isConstructor$2 = isConstructor$3;
var isObject$3 = isObject$d;
var toAbsoluteIndex$2 = toAbsoluteIndex$4;
var lengthOfArrayLike$5 = lengthOfArrayLike$7;
var toIndexedObject = toIndexedObject$6;
var createProperty$3 = createProperty$4;
var wellKnownSymbol$5 = wellKnownSymbol$i;
var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
var un$Slice = arraySlice$3;

var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$4('slice');

var SPECIES$3 = wellKnownSymbol$5('species');
var $Array$2 = Array;
var max$2 = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$$9({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike$5(O);
    var k = toAbsoluteIndex$2(start, length);
    var fin = toAbsoluteIndex$2(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray$3(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor$2(Constructor) && (Constructor === $Array$2 || isArray$3(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$3(Constructor)) {
        Constructor = Constructor[SPECIES$3];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array$2 || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array$2 : Constructor)(max$2(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty$3(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var fails$5 = fails$p;

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$5(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

/* eslint-disable es-x/no-array-prototype-indexof -- required for testing */
var $$8 = _export;
var uncurryThis$6 = functionUncurryThis;
var $IndexOf = arrayIncludes.indexOf;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;

var un$IndexOf = uncurryThis$6([].indexOf);

var NEGATIVE_ZERO = !!un$IndexOf && 1 / un$IndexOf([1], 1, -0) < 0;
var STRICT_METHOD$1 = arrayMethodIsStrict$1('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$$8({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? un$IndexOf(this, searchElement, fromIndex) || 0
      : $IndexOf(this, searchElement, fromIndex);
  }
});

var isConstructor$1 = isConstructor$3;
var tryToString$1 = tryToString$3;

var $TypeError$3 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor$1(argument)) return argument;
  throw $TypeError$3(tryToString$1(argument) + ' is not a constructor');
};

var anObject$2 = anObject$b;
var aConstructor = aConstructor$1;
var wellKnownSymbol$4 = wellKnownSymbol$i;

var SPECIES$2 = wellKnownSymbol$4('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$2(O).constructor;
  var S;
  return C === undefined || (S = anObject$2(C)[SPECIES$2]) == undefined ? defaultConstructor : aConstructor(S);
};

var toAbsoluteIndex$1 = toAbsoluteIndex$4;
var lengthOfArrayLike$4 = lengthOfArrayLike$7;
var createProperty$2 = createProperty$4;

var $Array$1 = Array;
var max$1 = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$4(O);
  var k = toAbsoluteIndex$1(start, length);
  var fin = toAbsoluteIndex$1(end === undefined ? length : end, length);
  var result = $Array$1(max$1(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty$2(result, n, O[k]);
  result.length = n;
  return result;
};

var apply$1 = functionApply;
var call$2 = functionCall;
var uncurryThis$5 = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var isRegExp$1 = isRegexp;
var anObject$1 = anObject$b;
var requireObjectCoercible$1 = requireObjectCoercible$8;
var speciesConstructor = speciesConstructor$1;
var advanceStringIndex$1 = advanceStringIndex$3;
var toLength$1 = toLength$4;
var toString$3 = toString$a;
var getMethod$1 = getMethod$5;
var arraySlice$2 = arraySliceSimple;
var callRegExpExec = regexpExecAbstract;
var regexpExec = regexpExec$3;
var stickyHelpers$1 = regexpStickyHelpers;
var fails$4 = fails$p;

var UNSUPPORTED_Y$1 = stickyHelpers$1.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min$1 = Math.min;
var $push = [].push;
var exec$4 = uncurryThis$5(/./.exec);
var push$2 = uncurryThis$5($push);
var stringSlice$1 = uncurryThis$5(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$4(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic$1('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString$3(requireObjectCoercible$1(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp$1(separator)) {
        return call$2(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call$2(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push$2(output, stringSlice$1(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply$1($push, output, arraySlice$2(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec$4(separatorCopy, '')) push$2(output, '');
      } else push$2(output, stringSlice$1(string, lastLastIndex));
      return output.length > lim ? arraySlice$2(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call$2(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible$1(this);
      var splitter = separator == undefined ? undefined : getMethod$1(separator, SPLIT);
      return splitter
        ? call$2(splitter, separator, O, limit)
        : call$2(internalSplit, toString$3(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject$1(this);
      var S = toString$3(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y$1 ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y$1 ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y$1 ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y$1 ? stringSlice$1(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min$1(toLength$1(splitter.lastIndex + (UNSUPPORTED_Y$1 ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex$1(S, q, unicodeMatching);
        } else {
          push$2(A, stringSlice$1(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push$2(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push$2(A, stringSlice$1(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y$1);

var uncurryThis$4 = functionUncurryThis;
var aCallable$1 = aCallable$3;
var NATIVE_BIND = functionBindNative;

var bind$1 = uncurryThis$4(uncurryThis$4.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$1(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$1(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var isArray$2 = isArray$4;
var isConstructor = isConstructor$3;
var isObject$2 = isObject$d;
var wellKnownSymbol$3 = wellKnownSymbol$i;

var SPECIES$1 = wellKnownSymbol$3('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesConstructor$1 = function (originalArray) {
  var C;
  if (isArray$2(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray$2(C.prototype))) C = undefined;
    else if (isObject$2(C)) {
      C = C[SPECIES$1];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};

var arraySpeciesConstructor = arraySpeciesConstructor$1;

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate$3 = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};

var bind = functionBindContext;
var uncurryThis$3 = functionUncurryThis;
var IndexedObject = indexedObject;
var toObject$3 = toObject$7;
var lengthOfArrayLike$3 = lengthOfArrayLike$7;
var arraySpeciesCreate$2 = arraySpeciesCreate$3;

var push$1 = uncurryThis$3([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject$3($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike$3(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate$2;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push$1(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push$1(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};

var $$7 = _export;
var $map = arrayIteration.map;
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$3('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$$7({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $TypeError$2 = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

var doesNotExceedSafeInteger$2 = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError$2('Maximum allowed index exceeded');
  return it;
};

var $$6 = _export;
var fails$3 = fails$p;
var isArray$1 = isArray$4;
var isObject$1 = isObject$d;
var toObject$2 = toObject$7;
var lengthOfArrayLike$2 = lengthOfArrayLike$7;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$2;
var createProperty$1 = createProperty$4;
var arraySpeciesCreate$1 = arraySpeciesCreate$3;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
var wellKnownSymbol$2 = wellKnownSymbol$i;
var V8_VERSION = engineV8Version;

var IS_CONCAT_SPREADABLE = wellKnownSymbol$2('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$3(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport$2('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$1(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$1(O);
};

var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$$6({ target: 'Array', proto: true, arity: 1, forced: FORCED$1 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$2(this);
    var A = arraySpeciesCreate$1(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike$2(E);
        doesNotExceedSafeInteger$1(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty$1(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger$1(n + 1);
        createProperty$1(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var common$2 = {};

var call$1 = functionCall;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject = anObject$b;
var toLength = toLength$4;
var toString$2 = toString$a;
var requireObjectCoercible = requireObjectCoercible$8;
var getMethod = getMethod$5;
var advanceStringIndex = advanceStringIndex$3;
var regExpExec = regexpExecAbstract;

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : getMethod(regexp, MATCH);
      return matcher ? call$1(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$2(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString$2(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString$2(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

var old = {};

var hasRequiredOld;

function requireOld() {
  if (hasRequiredOld) return old;
  hasRequiredOld = 1;
  var pathModule = require$$2__default["default"];
  var isWindows = process.platform === 'win32';
  var fs = require$$1__default["default"];
  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);

  function rethrow() {
    var callback;

    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else callback = missingCallback;

    return callback;

    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }

    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation) throw err;else if (!process.noDeprecation) {
          var msg = 'fs: missing callback ' + (err.stack || err.message);
          if (process.traceDeprecation) console.trace(msg);else console.error(msg);
        }
      }
    }
  }

  function maybeCallback(cb) {
    return typeof cb === 'function' ? cb : rethrow();
  }

  pathModule.normalize;

  if (isWindows) {
    var nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    var nextPartRe = /(.*?)(?:[\/]+|$)/g;
  }

  if (isWindows) {
    var splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    var splitRootRe = /^[\/]*/;
  }

  old.realpathSync = function realpathSync(p, cache) {
    p = pathModule.resolve(p);

    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }

    var original = p,
        seenLinks = {},
        knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();

    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = '';

      if (isWindows && !knownHard[base]) {
        fs.lstatSync(base);
        knownHard[base] = true;
      }
    }

    while (pos < p.length) {
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;

      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }

      var resolvedLink;

      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        resolvedLink = cache[base];
      } else {
        var stat = fs.lstatSync(base);

        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache) cache[base] = base;
          continue;
        }

        var linkTarget = null;

        if (!isWindows) {
          var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);

          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }

        if (linkTarget === null) {
          fs.statSync(base);
          linkTarget = fs.readlinkSync(base);
        }

        resolvedLink = pathModule.resolve(previous, linkTarget);
        if (cache) cache[base] = resolvedLink;
        if (!isWindows) seenLinks[id] = linkTarget;
      }

      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }

    if (cache) cache[original] = p;
    return p;
  };

  old.realpath = function realpath(p, cache, cb) {
    if (typeof cb !== 'function') {
      cb = maybeCallback(cache);
      cache = null;
    }

    p = pathModule.resolve(p);

    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }

    var original = p,
        seenLinks = {},
        knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();

    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = '';

      if (isWindows && !knownHard[base]) {
        fs.lstat(base, function (err) {
          if (err) return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    }

    function LOOP() {
      if (pos >= p.length) {
        if (cache) cache[original] = p;
        return cb(null, p);
      }

      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;

      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }

      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        return gotResolvedLink(cache[base]);
      }

      return fs.lstat(base, gotStat);
    }

    function gotStat(err, stat) {
      if (err) return cb(err);

      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache) cache[base] = base;
        return process.nextTick(LOOP);
      }

      if (!isWindows) {
        var id = stat.dev.toString(32) + ':' + stat.ino.toString(32);

        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }

      fs.stat(base, function (err) {
        if (err) return cb(err);
        fs.readlink(base, function (err, target) {
          if (!isWindows) seenLinks[id] = target;
          gotTarget(err, target);
        });
      });
    }

    function gotTarget(err, target, base) {
      if (err) return cb(err);
      var resolvedLink = pathModule.resolve(previous, target);
      if (cache) cache[base] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }

    function gotResolvedLink(resolvedLink) {
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
  };

  return old;
}

var fs_realpath;
var hasRequiredFs_realpath;

function requireFs_realpath() {
  if (hasRequiredFs_realpath) return fs_realpath;
  hasRequiredFs_realpath = 1;
  fs_realpath = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;
  var fs = require$$1__default["default"];
  var origRealpath = fs.realpath;
  var origRealpathSync = fs.realpathSync;
  var version = process.version;
  var ok = /^v[0-5]\./.test(version);
  var old = requireOld();

  function newError(er) {
    return er && er.syscall === 'realpath' && (er.code === 'ELOOP' || er.code === 'ENOMEM' || er.code === 'ENAMETOOLONG');
  }

  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }

    if (typeof cache === 'function') {
      cb = cache;
      cache = null;
    }

    origRealpath(p, cache, function (er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }

  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }

    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }

  function monkeypatch() {
    fs.realpath = realpath;
    fs.realpathSync = realpathSync;
  }

  function unmonkeypatch() {
    fs.realpath = origRealpath;
    fs.realpathSync = origRealpathSync;
  }

  return fs_realpath;
}

var $$5 = _export;
var $filter = arrayIteration.filter;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$$5({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var getBuiltIn$1 = getBuiltIn$8;
var definePropertyModule = objectDefineProperty;
var wellKnownSymbol$1 = wellKnownSymbol$i;
var DESCRIPTORS$2 = descriptors;

var SPECIES = wellKnownSymbol$1('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$1(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS$2 && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var DESCRIPTORS$1 = descriptors;
var global$1 = global$g;
var uncurryThis$2 = functionUncurryThis;
var isForced = isForced_1;
var inheritIfRequired = inheritIfRequired$2;
var createNonEnumerableProperty = createNonEnumerableProperty$7;
var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var isPrototypeOf = objectIsPrototypeOf;
var isRegExp = isRegexp;
var toString$1 = toString$a;
var getRegExpFlags = regexpGetFlags;
var stickyHelpers = regexpStickyHelpers;
var proxyAccessor = proxyAccessor$2;
var defineBuiltIn = defineBuiltIn$5;
var fails$2 = fails$p;
var hasOwn = hasOwnProperty_1;
var enforceInternalState = internalState.enforce;
var setSpecies = setSpecies$1;
var wellKnownSymbol = wellKnownSymbol$i;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global$1.RegExp;
var RegExpPrototype$1 = NativeRegExp.prototype;
var SyntaxError = global$1.SyntaxError;
var exec$3 = uncurryThis$2(RegExpPrototype$1.exec);
var charAt$1 = uncurryThis$2(''.charAt);
var replace$1 = uncurryThis$2(''.replace);
var stringIndexOf = uncurryThis$2(''.indexOf);
var stringSlice = uncurryThis$2(''.slice);
// TODO: Use only proper RegExpIdentifierName
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var MISSED_STICKY = stickyHelpers.MISSED_STICKY;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var BASE_FORCED = DESCRIPTORS$1 &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL$1 || UNSUPPORTED_NCG || fails$2(function () {
    re2[MATCH] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
  }));

var handleDotAll = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt$1(string, index);
    if (chr === '\\') {
      result += chr + charAt$1(string, ++index);
      continue;
    }
    if (!brackets && chr === '.') {
      result += '[\\s\\S]';
    } else {
      if (chr === '[') {
        brackets = true;
      } else if (chr === ']') {
        brackets = false;
      } result += chr;
    }
  } return result;
};

var handleNCG = function (string) {
  var length = string.length;
  var index = 0;
  var result = '';
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = '';
  var chr;
  for (; index <= length; index++) {
    chr = charAt$1(string, index);
    if (chr === '\\') {
      chr = chr + charAt$1(string, ++index);
    } else if (chr === ']') {
      brackets = false;
    } else if (!brackets) switch (true) {
      case chr === '[':
        brackets = true;
        break;
      case chr === '(':
        if (exec$3(IS_NCG, stringSlice(string, index + 1))) {
          index += 2;
          ncg = true;
        }
        result += chr;
        groupid++;
        continue;
      case chr === '>' && ncg:
        if (groupname === '' || hasOwn(names, groupname)) {
          throw new SyntaxError('Invalid capture group name');
        }
        names[groupname] = true;
        named[named.length] = [groupname, groupid];
        ncg = false;
        groupname = '';
        continue;
    }
    if (ncg) groupname += chr;
    else result += chr;
  } return [result, named];
};

// `RegExp` constructor
// https://tc39.es/ecma262/#sec-regexp-constructor
if (isForced('RegExp', BASE_FORCED)) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = isPrototypeOf(RegExpPrototype$1, this);
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;

    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }

    if (patternIsRegExp || isPrototypeOf(RegExpPrototype$1, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined) flags = getRegExpFlags(rawPattern);
    }

    pattern = pattern === undefined ? '' : toString$1(pattern);
    flags = flags === undefined ? '' : toString$1(flags);
    rawPattern = pattern;

    if (UNSUPPORTED_DOT_ALL$1 && 'dotAll' in re1) {
      dotAll = !!flags && stringIndexOf(flags, 's') > -1;
      if (dotAll) flags = replace$1(flags, /s/g, '');
    }

    rawFlags = flags;

    if (MISSED_STICKY && 'sticky' in re1) {
      sticky = !!flags && stringIndexOf(flags, 'y') > -1;
      if (sticky && UNSUPPORTED_Y) flags = replace$1(flags, /y/g, '');
    }

    if (UNSUPPORTED_NCG) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }

    result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$1, RegExpWrapper);

    if (dotAll || sticky || groups.length) {
      state = enforceInternalState(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky) state.sticky = true;
      if (groups.length) state.groups = groups;
    }

    if (pattern !== rawPattern) try {
      // fails in old engines, but we have no alternatives for unsupported regex syntax
      createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern);
    } catch (error) { /* empty */ }

    return result;
  };

  for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++]);
  }

  RegExpPrototype$1.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$1;
  defineBuiltIn(global$1, 'RegExp', RegExpWrapper, { constructor: true });
}

// https://tc39.es/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');

var makeBuiltIn = makeBuiltIn$3.exports;
var defineProperty = objectDefineProperty;

var defineBuiltInAccessor$1 = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

var DESCRIPTORS = descriptors;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var classof = classofRaw$1;
var defineBuiltInAccessor = defineBuiltInAccessor$1;
var getInternalState = internalState.get;

var RegExpPrototype = RegExp.prototype;
var $TypeError$1 = TypeError;

// `RegExp.prototype.dotAll` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
  defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
    configurable: true,
    get: function dotAll() {
      if (this === RegExpPrototype) return undefined;
      // We can't use InternalStateModule.getterFor because
      // we don't add metadata for regexps created by a literal.
      if (classof(this) === 'RegExp') {
        return !!getInternalState(this).dotAll;
      }
      throw $TypeError$1('Incompatible receiver, RegExp required');
    }
  });
}

var concatMap;
var hasRequiredConcatMap;

function requireConcatMap() {
  if (hasRequiredConcatMap) return concatMap;
  hasRequiredConcatMap = 1;

  concatMap = function concatMap(xs, fn) {
    var res = [];

    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x)) res.push.apply(res, x);else res.push(x);
    }

    return res;
  };

  var isArray = Array.isArray || function (xs) {
    return Object.prototype.toString.call(xs) === '[object Array]';
  };

  return concatMap;
}

var balancedMatch;
var hasRequiredBalancedMatch;

function requireBalancedMatch() {
  if (hasRequiredBalancedMatch) return balancedMatch;
  hasRequiredBalancedMatch = 1;

  balancedMatch = balanced;

  function balanced(a, b, str) {
    if (a instanceof RegExp) a = maybeMatch(a, str);
    if (b instanceof RegExp) b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }

  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }

  balanced.range = range;

  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;

    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;

      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();

          if (beg < left) {
            left = beg;
            right = bi;
          }

          bi = str.indexOf(b, i + 1);
        }

        i = ai < bi && ai >= 0 ? ai : bi;
      }

      if (begs.length) {
        result = [left, right];
      }
    }

    return result;
  }

  return balancedMatch;
}

var braceExpansion;
var hasRequiredBraceExpansion;

function requireBraceExpansion() {
  if (hasRequiredBraceExpansion) return braceExpansion;
  hasRequiredBraceExpansion = 1;
  var concatMap = requireConcatMap();
  var balanced = requireBalancedMatch();
  braceExpansion = expandTop;
  var escSlash = '\0SLASH' + Math.random() + '\0';
  var escOpen = '\0OPEN' + Math.random() + '\0';
  var escClose = '\0CLOSE' + Math.random() + '\0';
  var escComma = '\0COMMA' + Math.random() + '\0';
  var escPeriod = '\0PERIOD' + Math.random() + '\0';

  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }

  function escapeBraces(str) {
    return str.split('\\\\').join(escSlash).split('\\{').join(escOpen).split('\\}').join(escClose).split('\\,').join(escComma).split('\\.').join(escPeriod);
  }

  function unescapeBraces(str) {
    return str.split(escSlash).join('\\').split(escOpen).join('{').split(escClose).join('}').split(escComma).join(',').split(escPeriod).join('.');
  }

  function parseCommaParts(str) {
    if (!str) return [''];
    var parts = [];
    var m = balanced('{', '}', str);
    if (!m) return str.split(',');
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(',');
    p[p.length - 1] += '{' + body + '}';
    var postParts = parseCommaParts(post);

    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }

    parts.push.apply(parts, p);
    return parts;
  }

  function expandTop(str) {
    if (!str) return [];

    if (str.substr(0, 2) === '{}') {
      str = '\\{\\}' + str.substr(2);
    }

    return expand(escapeBraces(str), true).map(unescapeBraces);
  }

  function embrace(str) {
    return '{' + str + '}';
  }

  function isPadded(el) {
    return /^-?0\d/.test(el);
  }

  function lte(i, y) {
    return i <= y;
  }

  function gte(i, y) {
    return i >= y;
  }

  function expand(str, isTop) {
    var expansions = [];
    var m = balanced('{', '}', str);
    if (!m || /\$$/.test(m.pre)) return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(',') >= 0;

    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + '{' + m.body + escClose + m.post;
        return expand(str);
      }

      return [str];
    }

    var n;

    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);

      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);

        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [''];
          return post.map(function (p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }

    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [''];
    var N;

    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;

      if (reverse) {
        incr *= -1;
        test = gte;
      }

      var pad = n.some(isPadded);
      N = [];

      for (var i = x; test(i, y); i += incr) {
        var c;

        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === '\\') c = '';
        } else {
          c = String(i);

          if (pad) {
            var need = width - c.length;

            if (need > 0) {
              var z = new Array(need + 1).join('0');
              if (i < 0) c = '-' + z + c.slice(1);else c = z + c;
            }
          }
        }

        N.push(c);
      }
    } else {
      N = concatMap(n, function (el) {
        return expand(el, false);
      });
    }

    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion) expansions.push(expansion);
      }
    }

    return expansions;
  }

  return braceExpansion;
}

var minimatch_1;
var hasRequiredMinimatch;

function requireMinimatch() {
  if (hasRequiredMinimatch) return minimatch_1;
  hasRequiredMinimatch = 1;
  minimatch_1 = minimatch;
  minimatch.Minimatch = Minimatch;
  var path = {
    sep: '/'
  };

  try {
    path = require('path');
  } catch (er) {}

  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = requireBraceExpansion();
  var plTypes = {
    '!': {
      open: '(?:(?!(?:',
      close: '))[^/]*?)'
    },
    '?': {
      open: '(?:',
      close: ')?'
    },
    '+': {
      open: '(?:',
      close: ')+'
    },
    '*': {
      open: '(?:',
      close: ')*'
    },
    '@': {
      open: '(?:',
      close: ')'
    }
  };
  var qmark = '[^/]';
  var star = qmark + '*?';
  var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';
  var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';
  var reSpecials = charSet('().*{}+?[]^$\\!');

  function charSet(s) {
    return s.split('').reduce(function (set, c) {
      set[c] = true;
      return set;
    }, {});
  }

  var slashSplit = /\/+/;
  minimatch.filter = filter;

  function filter(pattern, options) {
    options = options || {};
    return function (p, i, list) {
      return minimatch(p, pattern, options);
    };
  }

  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function (k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function (k) {
      t[k] = a[k];
    });
    return t;
  }

  minimatch.defaults = function (def) {
    if (!def || !Object.keys(def).length) return minimatch;
    var orig = minimatch;

    var m = function minimatch(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };

    m.Minimatch = function Minimatch(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };

    return m;
  };

  Minimatch.defaults = function (def) {
    if (!def || !Object.keys(def).length) return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };

  function minimatch(p, pattern, options) {
    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};

    if (!options.nocomment && pattern.charAt(0) === '#') {
      return false;
    }

    if (pattern.trim() === '') return p === '';
    return new Minimatch(pattern, options).match(p);
  }

  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }

    if (typeof pattern !== 'string') {
      throw new TypeError('glob pattern string required');
    }

    if (!options) options = {};
    pattern = pattern.trim();

    if (path.sep !== '/') {
      pattern = pattern.split(path.sep).join('/');
    }

    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.make();
  }

  Minimatch.prototype.debug = function () {};

  Minimatch.prototype.make = make;

  function make() {
    if (this._made) return;
    var pattern = this.pattern;
    var options = this.options;

    if (!options.nocomment && pattern.charAt(0) === '#') {
      this.comment = true;
      return;
    }

    if (!pattern) {
      this.empty = true;
      return;
    }

    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    if (options.debug) this.debug = console.error;
    this.debug(this.pattern, set);
    set = this.globParts = set.map(function (s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);
    set = set.map(function (s, si, set) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);
    set = set.filter(function (s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }

  Minimatch.prototype.parseNegate = parseNegate;

  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate) return;

    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
      negate = !negate;
      negateOffset++;
    }

    if (negateOffset) this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }

  minimatch.braceExpand = function (pattern, options) {
    return braceExpand(pattern, options);
  };

  Minimatch.prototype.braceExpand = braceExpand;

  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }

    pattern = typeof pattern === 'undefined' ? this.pattern : pattern;

    if (typeof pattern === 'undefined') {
      throw new TypeError('undefined pattern');
    }

    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      return [pattern];
    }

    return expand(pattern);
  }

  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};

  function parse(pattern, isSub) {
    if (pattern.length > 1024 * 64) {
      throw new TypeError('pattern is too long');
    }

    var options = this.options;
    if (!options.noglobstar && pattern === '**') return GLOBSTAR;
    if (pattern === '') return '';
    var re = '';
    var hasMagic = !!options.nocase;
    var escaping = false;
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    var patternStart = pattern.charAt(0) === '.' ? '' : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
    var self = this;

    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case '*':
            re += star;
            hasMagic = true;
            break;

          case '?':
            re += qmark;
            hasMagic = true;
            break;

          default:
            re += '\\' + stateChar;
            break;
        }

        self.debug('clearStateChar %j %j', stateChar, re);
        stateChar = false;
      }
    }

    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug('%s\t%s %s %j', pattern, i, re, c);

      if (escaping && reSpecials[c]) {
        re += '\\' + c;
        escaping = false;
        continue;
      }

      switch (c) {
        case '/':
          return false;

        case '\\':
          clearStateChar();
          escaping = true;
          continue;

        case '?':
        case '*':
        case '+':
        case '@':
        case '!':
          this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

          if (inClass) {
            this.debug('  in class');
            if (c === '!' && i === classStart + 1) c = '^';
            re += c;
            continue;
          }

          self.debug('call clearStateChar %j', stateChar);
          clearStateChar();
          stateChar = c;
          if (options.noext) clearStateChar();
          continue;

        case '(':
          if (inClass) {
            re += '(';
            continue;
          }

          if (!stateChar) {
            re += '\\(';
            continue;
          }

          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
          this.debug('plType %j %j', stateChar, re);
          stateChar = false;
          continue;

        case ')':
          if (inClass || !patternListStack.length) {
            re += '\\)';
            continue;
          }

          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          re += pl.close;

          if (pl.type === '!') {
            negativeLists.push(pl);
          }

          pl.reEnd = re.length;
          continue;

        case '|':
          if (inClass || !patternListStack.length || escaping) {
            re += '\\|';
            escaping = false;
            continue;
          }

          clearStateChar();
          re += '|';
          continue;

        case '[':
          clearStateChar();

          if (inClass) {
            re += '\\' + c;
            continue;
          }

          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;

        case ']':
          if (i === classStart + 1 || !inClass) {
            re += '\\' + c;
            escaping = false;
            continue;
          }

          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);

            try {
              RegExp('[' + cs + ']');
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }

          hasMagic = true;
          inClass = false;
          re += c;
          continue;

        default:
          clearStateChar();

          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === '^' && inClass)) {
            re += '\\';
          }

          re += c;
      }
    }

    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + '\\[' + sp[0];
      hasMagic = hasMagic || sp[1];
    }

    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug('setting tail', re, pl);
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function (_, $1, $2) {
        if (!$2) {
          $2 = '\\';
        }

        return $1 + $1 + $2 + '|';
      });
      this.debug('tail=%j\n   %s', tail, tail, pl, re);
      var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + '\\(' + tail;
    }

    clearStateChar();

    if (escaping) {
      re += '\\\\';
    }

    var addPatternStart = false;

    switch (re.charAt(0)) {
      case '.':
      case '[':
      case '(':
        addPatternStart = true;
    }

    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;
      var openParensBefore = nlBefore.split('(').length - 1;
      var cleanAfter = nlAfter;

      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
      }

      nlAfter = cleanAfter;
      var dollar = '';

      if (nlAfter === '' && isSub !== SUBPARSE) {
        dollar = '$';
      }

      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }

    if (re !== '' && hasMagic) {
      re = '(?=.)' + re;
    }

    if (addPatternStart) {
      re = patternStart + re;
    }

    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }

    if (!hasMagic) {
      return globUnescape(pattern);
    }

    var flags = options.nocase ? 'i' : '';

    try {
      var regExp = new RegExp('^' + re + '$', flags);
    } catch (er) {
      return new RegExp('$.');
    }

    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }

  minimatch.makeRe = function (pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };

  Minimatch.prototype.makeRe = makeRe;

  function makeRe() {
    if (this.regexp || this.regexp === false) return this.regexp;
    var set = this.set;

    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }

    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? 'i' : '';
    var re = set.map(function (pattern) {
      return pattern.map(function (p) {
        return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
      }).join('\\\/');
    }).join('|');
    re = '^(?:' + re + ')$';
    if (this.negate) re = '^(?!' + re + ').*$';

    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }

    return this.regexp;
  }

  minimatch.match = function (list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function (f) {
      return mm.match(f);
    });

    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }

    return list;
  };

  Minimatch.prototype.match = match;

  function match(f, partial) {
    this.debug('match', f, this.pattern);
    if (this.comment) return false;
    if (this.empty) return f === '';
    if (f === '/' && partial) return true;
    var options = this.options;

    if (path.sep !== '/') {
      f = f.split(path.sep).join('/');
    }

    f = f.split(slashSplit);
    this.debug(this.pattern, 'split', f);
    var set = this.set;
    this.debug(this.pattern, 'set', set);
    var filename;
    var i;

    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename) break;
    }

    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;

      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }

      var hit = this.matchOne(file, pattern, partial);

      if (hit) {
        if (options.flipNegate) return true;
        return !this.negate;
      }
    }

    if (options.flipNegate) return false;
    return this.negate;
  }

  Minimatch.prototype.matchOne = function (file, pattern, partial) {
    var options = this.options;
    this.debug('matchOne', {
      'this': this,
      file: file,
      pattern: pattern
    });
    this.debug('matchOne', file.length, pattern.length);

    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug('matchOne loop');
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false) return false;

      if (p === GLOBSTAR) {
        this.debug('GLOBSTAR', [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;

        if (pr === pl) {
          this.debug('** at the end');

          for (; fi < fl; fi++) {
            if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
          }

          return true;
        }

        while (fr < fl) {
          var swallowee = file[fr];
          this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);

          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug('globstar found match!', fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
              this.debug('dot detected!', file, fr, pattern, pr);
              break;
            }

            this.debug('globstar swallow a segment, and continue');
            fr++;
          }
        }

        if (partial) {
          this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
          if (fr === fl) return true;
        }

        return false;
      }

      var hit;

      if (typeof p === 'string') {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }

        this.debug('string match', p, f, hit);
      } else {
        hit = f.match(p);
        this.debug('pattern match', p, f, hit);
      }

      if (!hit) return false;
    }

    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      var emptyFileEnd = fi === fl - 1 && file[fi] === '';
      return emptyFileEnd;
    }

    throw new Error('wtf?');
  };

  function globUnescape(s) {
    return s.replace(/\\(.)/g, '$1');
  }

  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  return minimatch_1;
}

var inherits = {exports: {}};

var inherits_browser = {exports: {}};

var hasRequiredInherits_browser;

function requireInherits_browser() {
  if (hasRequiredInherits_browser) return inherits_browser.exports;
  hasRequiredInherits_browser = 1;

  if (typeof Object.create === 'function') {
    inherits_browser.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    inherits_browser.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;

        var TempCtor = function TempCtor() {};

        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }

  return inherits_browser.exports;
}

var hasRequiredInherits;

function requireInherits() {
  if (hasRequiredInherits) return inherits.exports;
  hasRequiredInherits = 1;

  (function (module) {
    try {
      var util = require('util');

      if (typeof util.inherits !== 'function') throw '';
      module.exports = util.inherits;
    } catch (e) {
      module.exports = requireInherits_browser();
    }
  })(inherits);

  return inherits.exports;
}

var pathIsAbsolute = {exports: {}};

var hasRequiredPathIsAbsolute;

function requirePathIsAbsolute() {
  if (hasRequiredPathIsAbsolute) return pathIsAbsolute.exports;
  hasRequiredPathIsAbsolute = 1;

  function posix(path) {
    return path.charAt(0) === '/';
  }

  function win32(path) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || '';
    var isUnc = Boolean(device && device.charAt(1) !== ':');
    return Boolean(result[2] || isUnc);
  }

  pathIsAbsolute.exports = process.platform === 'win32' ? win32 : posix;
  pathIsAbsolute.exports.posix = posix;
  pathIsAbsolute.exports.win32 = win32;
  return pathIsAbsolute.exports;
}

var tryToString = tryToString$3;

var $TypeError = TypeError;

var deletePropertyOrThrow$2 = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

var arraySlice$1 = arraySliceSimple;

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice$1(array, 0, middle), comparefn),
    mergeSort(arraySlice$1(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

var arraySort = mergeSort;

var userAgent$1 = engineUserAgent;

var firefox = userAgent$1.match(/firefox\/(\d+)/i);

var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;

var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent = engineUserAgent;

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

var engineWebkitVersion = !!webkit && +webkit[1];

var $$4 = _export;
var uncurryThis$1 = functionUncurryThis;
var aCallable = aCallable$3;
var toObject$1 = toObject$7;
var lengthOfArrayLike$1 = lengthOfArrayLike$7;
var deletePropertyOrThrow$1 = deletePropertyOrThrow$2;
var toString = toString$a;
var fails$1 = fails$p;
var internalSort = arraySort;
var arrayMethodIsStrict = arrayMethodIsStrict$2;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;

var test$1 = [];
var un$Sort = uncurryThis$1(test$1.sort);
var push = uncurryThis$1(test$1.push);

// IE8-
var FAILS_ON_UNDEFINED = fails$1(function () {
  test$1.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails$1(function () {
  test$1.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails$1(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test$1.push({ k: chr + index, v: value });
    }
  }

  test$1.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test$1.length; index++) {
    chr = test$1[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString(x) > toString(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$$4({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject$1(this);

    if (STABLE_SORT) return comparefn === undefined ? un$Sort(array) : un$Sort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike$1(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = items.length;
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow$1(array, index++);

    return array;
  }
});

var common$1 = {};

var hasRequiredCommon$1;

function requireCommon$1() {
  if (hasRequiredCommon$1) return common$1;
  hasRequiredCommon$1 = 1;
  common$1.setopts = setopts;
  common$1.ownProp = ownProp;
  common$1.makeAbs = makeAbs;
  common$1.finish = finish;
  common$1.mark = mark;
  common$1.isIgnored = isIgnored;
  common$1.childrenIgnored = childrenIgnored;

  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }

  var path = require$$2__default["default"];
  var minimatch = requireMinimatch();
  var isAbsolute = requirePathIsAbsolute();
  var Minimatch = minimatch.Minimatch;

  function alphasort(a, b) {
    return a.localeCompare(b, 'en');
  }

  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];
    if (!Array.isArray(self.ignore)) self.ignore = [self.ignore];

    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }

  function ignoreMap(pattern) {
    var gmatcher = null;

    if (pattern.slice(-3) === '/**') {
      var gpattern = pattern.replace(/(\/\*\*)+$/, '');
      gmatcher = new Minimatch(gpattern, {
        dot: true
      });
    }

    return {
      matcher: new Minimatch(pattern, {
        dot: true
      }),
      gmatcher: gmatcher
    };
  }

  function setopts(self, pattern, options) {
    if (!options) options = {};

    if (options.matchBase && -1 === pattern.indexOf("/")) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }

      pattern = "**/" + pattern;
    }

    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir) self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;
    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd")) self.cwd = cwd;else {
      self.cwd = path.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }
    self.root = options.root || path.resolve(self.cwd, "/");
    self.root = path.resolve(self.root);
    if (process.platform === "win32") self.root = self.root.replace(/\\/g, "/");
    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32") self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount;
    options.nonegate = true;
    options.nocomment = true;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }

  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);

    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];

      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          var literal = self.minimatch.globSet[i];
          if (nou) all.push(literal);else all[literal] = true;
        }
      } else {
        var m = Object.keys(matches);
        if (nou) all.push.apply(all, m);else m.forEach(function (m) {
          all[m] = true;
        });
      }
    }

    if (!nou) all = Object.keys(all);
    if (!self.nosort) all = all.sort(alphasort);

    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }

      if (self.nodir) {
        all = all.filter(function (e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c) notDir = c !== 'DIR' && !Array.isArray(c);
          return notDir;
        });
      }
    }

    if (self.ignore.length) all = all.filter(function (m) {
      return !isIgnored(self, m);
    });
    self.found = all;
  }

  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;

    if (c) {
      var isDir = c === 'DIR' || Array.isArray(c);
      var slash = p.slice(-1) === '/';
      if (isDir && !slash) m += '/';else if (!isDir && slash) m = m.slice(0, -1);

      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }

    return m;
  }

  function makeAbs(self, f) {
    var abs = f;

    if (f.charAt(0) === '/') {
      abs = path.join(self.root, f);
    } else if (isAbsolute(f) || f === '') {
      abs = f;
    } else if (self.changedCwd) {
      abs = path.resolve(self.cwd, f);
    } else {
      abs = path.resolve(f);
    }

    if (process.platform === 'win32') abs = abs.replace(/\\/g, '/');
    return abs;
  }

  function isIgnored(self, path) {
    if (!self.ignore.length) return false;
    return self.ignore.some(function (item) {
      return item.matcher.match(path) || !!(item.gmatcher && item.gmatcher.match(path));
    });
  }

  function childrenIgnored(self, path) {
    if (!self.ignore.length) return false;
    return self.ignore.some(function (item) {
      return !!(item.gmatcher && item.gmatcher.match(path));
    });
  }

  return common$1;
}

var sync;
var hasRequiredSync;

function requireSync() {
  if (hasRequiredSync) return sync;
  hasRequiredSync = 1;
  sync = globSync;
  globSync.GlobSync = GlobSync;
  var fs = require$$1__default["default"];
  var rp = requireFs_realpath();
  var minimatch = requireMinimatch();
  minimatch.Minimatch;
  requireGlob().Glob;
  var path = require$$2__default["default"];
  var assert = require$$6__default["default"];
  var isAbsolute = requirePathIsAbsolute();
  var common = requireCommon$1();
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;

  function globSync(pattern, options) {
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
    return new GlobSync(pattern, options).found;
  }

  function GlobSync(pattern, options) {
    if (!pattern) throw new Error('must provide pattern');
    if (typeof options === 'function' || arguments.length === 3) throw new TypeError('callback provided to sync glob\n' + 'See: https://github.com/isaacs/node-glob/issues/167');
    if (!(this instanceof GlobSync)) return new GlobSync(pattern, options);
    setopts(this, pattern, options);
    if (this.noprocess) return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);

    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }

    this._finish();
  }

  GlobSync.prototype._finish = function () {
    assert(this instanceof GlobSync);

    if (this.realpath) {
      var self = this;
      this.matches.forEach(function (matchset, index) {
        var set = self.matches[index] = Object.create(null);

        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = rp.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === 'stat') set[self._makeAbs(p)] = true;else throw er;
          }
        }
      });
    }

    common.finish(this);
  };

  GlobSync.prototype._process = function (pattern, index, inGlobStar) {
    assert(this instanceof GlobSync);
    var n = 0;

    while (typeof pattern[n] === 'string') {
      n++;
    }

    var prefix;

    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join('/'), index);

        return;

      case 0:
        prefix = null;
        break;

      default:
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n);
    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read);

    if (childrenIgnored(this, read)) return;
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };

  GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);

    if (!entries) return;
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';
    var matchedEntries = [];

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];

      if (e.charAt(0) !== '.' || dotOk) {
        var m;

        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }

        if (m) matchedEntries.push(e);
      }
    }

    var len = matchedEntries.length;
    if (len === 0) return;

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];

        if (prefix) {
          if (prefix.slice(-1) !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e);
        }

        this._emitMatch(index, e);
      }

      return;
    }

    remain.shift();

    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) newPattern = [prefix, e];else newPattern = [e];

      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };

  GlobSync.prototype._emitMatch = function (index, e) {
    if (isIgnored(this, e)) return;

    var abs = this._makeAbs(e);

    if (this.mark) e = this._mark(e);

    if (this.absolute) {
      e = abs;
    }

    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;
    if (this.stat) this._stat(e);
  };

  GlobSync.prototype._readdirInGlobStar = function (abs) {
    if (this.follow) return this._readdir(abs, false);
    var entries;
    var lstat;

    try {
      lstat = fs.lstatSync(abs);
    } catch (er) {
      if (er.code === 'ENOENT') {
        return null;
      }
    }

    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;
    if (!isSym && lstat && !lstat.isDirectory()) this.cache[abs] = 'FILE';else entries = this._readdir(abs, false);
    return entries;
  };

  GlobSync.prototype._readdir = function (abs, inGlobStar) {
    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return null;
      if (Array.isArray(c)) return c;
    }

    try {
      return this._readdirEntries(abs, fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);

      return null;
    }
  };

  GlobSync.prototype._readdirEntries = function (abs, entries) {
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;
    return entries;
  };

  GlobSync.prototype._readdirError = function (f, er) {
    switch (er.code) {
      case 'ENOTSUP':
      case 'ENOTDIR':
        var abs = this._makeAbs(f);

        this.cache[abs] = 'FILE';

        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }

        break;

      case 'ENOENT':
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) throw er;
        if (!this.silent) console.error('glob error', er);
        break;
    }
  };

  GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);

    if (!entries) return;
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    this._process(noGlobStar, index, false);

    var len = entries.length;
    var isSym = this.symlinks[abs];
    if (isSym && inGlobStar) return;

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);

      this._process(instead, index, true);

      var below = gspref.concat(entries[i], remain);

      this._process(below, index, true);
    }
  };

  GlobSync.prototype._processSimple = function (prefix, index) {
    var exists = this._stat(prefix);

    if (!this.matches[index]) this.matches[index] = Object.create(null);
    if (!exists) return;

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);

      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    this._emitMatch(index, prefix);
  };

  GlobSync.prototype._stat = function (f) {
    var abs = this._makeAbs(f);

    var needDir = f.slice(-1) === '/';
    if (f.length > this.maxLength) return false;

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c)) c = 'DIR';
      if (!needDir || c === 'DIR') return c;
      if (needDir && c === 'FILE') return false;
    }
    var stat = this.statCache[abs];

    if (!stat) {
      var lstat;

      try {
        lstat = fs.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
          this.statCache[abs] = false;
          return false;
        }
      }

      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }

    this.statCache[abs] = stat;
    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === 'FILE') return false;
    return c;
  };

  GlobSync.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  GlobSync.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };

  return sync;
}

var $$3 = _export;
var toObject = toObject$7;
var toAbsoluteIndex = toAbsoluteIndex$4;
var toIntegerOrInfinity = toIntegerOrInfinity$5;
var lengthOfArrayLike = lengthOfArrayLike$7;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$2;
var arraySpeciesCreate = arraySpeciesCreate$3;
var createProperty = createProperty$4;
var deletePropertyOrThrow = deletePropertyOrThrow$2;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$$3({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var wrappy_1;
var hasRequiredWrappy;

function requireWrappy() {
  if (hasRequiredWrappy) return wrappy_1;
  hasRequiredWrappy = 1;
  wrappy_1 = wrappy;

  function wrappy(fn, cb) {
    if (fn && cb) return wrappy(fn)(cb);
    if (typeof fn !== 'function') throw new TypeError('need wrapper function');
    Object.keys(fn).forEach(function (k) {
      wrapper[k] = fn[k];
    });
    return wrapper;

    function wrapper() {
      var args = new Array(arguments.length);

      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      var ret = fn.apply(this, args);
      var cb = args[args.length - 1];

      if (typeof ret === 'function' && ret !== cb) {
        Object.keys(cb).forEach(function (k) {
          ret[k] = cb[k];
        });
      }

      return ret;
    }
  }

  return wrappy_1;
}

var once = {exports: {}};

var hasRequiredOnce;

function requireOnce() {
  if (hasRequiredOnce) return once.exports;
  hasRequiredOnce = 1;
  var wrappy = requireWrappy();
  once.exports = wrappy(once$1);
  once.exports.strict = wrappy(onceStrict);
  once$1.proto = once$1(function () {
    Object.defineProperty(Function.prototype, 'once', {
      value: function value() {
        return once$1(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, 'onceStrict', {
      value: function value() {
        return onceStrict(this);
      },
      configurable: true
    });
  });

  function once$1(fn) {
    var f = function f() {
      if (f.called) return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };

    f.called = false;
    return f;
  }

  function onceStrict(fn) {
    var f = function f() {
      if (f.called) throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };

    var name = fn.name || 'Function wrapped with `once`';
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }

  return once.exports;
}

var inflight_1;
var hasRequiredInflight;

function requireInflight() {
  if (hasRequiredInflight) return inflight_1;
  hasRequiredInflight = 1;
  var wrappy = requireWrappy();
  var reqs = Object.create(null);
  var once = requireOnce();
  inflight_1 = wrappy(inflight);

  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }

  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);

      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function () {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }

  function slice(args) {
    var length = args.length;
    var array = [];

    for (var i = 0; i < length; i++) array[i] = args[i];

    return array;
  }

  return inflight_1;
}

var glob_1;
var hasRequiredGlob;

function requireGlob() {
  if (hasRequiredGlob) return glob_1;
  hasRequiredGlob = 1;
  glob_1 = glob;
  var fs = require$$1__default["default"];
  var rp = requireFs_realpath();
  var minimatch = requireMinimatch();
  minimatch.Minimatch;
  var inherits = requireInherits();
  var EE = require$$4__default["default"].EventEmitter;
  var path = require$$2__default["default"];
  var assert = require$$6__default["default"];
  var isAbsolute = requirePathIsAbsolute();
  var globSync = requireSync();
  var common = requireCommon$1();
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = requireInflight();
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  var once = requireOnce();

  function glob(pattern, options, cb) {
    if (typeof options === 'function') cb = options, options = {};
    if (!options) options = {};

    if (options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return globSync(pattern, options);
    }

    return new Glob(pattern, options, cb);
  }

  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;
  glob.glob = glob;

  function extend(origin, add) {
    if (add === null || typeof add !== 'object') {
      return origin;
    }

    var keys = Object.keys(add);
    var i = keys.length;

    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }

    return origin;
  }

  glob.hasMagic = function (pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;
    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (!pattern) return false;
    if (set.length > 1) return true;

    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== 'string') return true;
    }

    return false;
  };

  glob.Glob = Glob;
  inherits(Glob, EE);

  function Glob(pattern, options, cb) {
    if (typeof options === 'function') {
      cb = options;
      options = null;
    }

    if (options && options.sync) {
      if (cb) throw new TypeError('callback provided to sync glob');
      return new GlobSync(pattern, options);
    }

    if (!(this instanceof Glob)) return new Glob(pattern, options, cb);
    setopts(this, pattern, options);
    this._didRealPath = false;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);

    if (typeof cb === 'function') {
      cb = once(cb);
      this.on('error', cb);
      this.on('end', function (matches) {
        cb(null, matches);
      });
    }

    var self = this;
    this._processing = 0;
    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;
    if (this.noprocess) return this;
    if (n === 0) return done();
    var sync = true;

    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }

    sync = false;

    function done() {
      --self._processing;

      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function () {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }

  Glob.prototype._finish = function () {
    assert(this instanceof Glob);
    if (this.aborted) return;
    if (this.realpath && !this._didRealpath) return this._realpath();
    common.finish(this);
    this.emit('end', this.found);
  };

  Glob.prototype._realpath = function () {
    if (this._didRealpath) return;
    this._didRealpath = true;
    var n = this.matches.length;
    if (n === 0) return this._finish();
    var self = this;

    for (var i = 0; i < this.matches.length; i++) this._realpathSet(i, next);

    function next() {
      if (--n === 0) self._finish();
    }
  };

  Glob.prototype._realpathSet = function (index, cb) {
    var matchset = this.matches[index];
    if (!matchset) return cb();
    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;
    if (n === 0) return cb();
    var set = this.matches[index] = Object.create(null);
    found.forEach(function (p, i) {
      p = self._makeAbs(p);
      rp.realpath(p, self.realpathCache, function (er, real) {
        if (!er) set[real] = true;else if (er.syscall === 'stat') set[p] = true;else self.emit('error', er);

        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };

  Glob.prototype._mark = function (p) {
    return common.mark(this, p);
  };

  Glob.prototype._makeAbs = function (f) {
    return common.makeAbs(this, f);
  };

  Glob.prototype.abort = function () {
    this.aborted = true;
    this.emit('abort');
  };

  Glob.prototype.pause = function () {
    if (!this.paused) {
      this.paused = true;
      this.emit('pause');
    }
  };

  Glob.prototype.resume = function () {
    if (this.paused) {
      this.emit('resume');
      this.paused = false;

      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);

        this._emitQueue.length = 0;

        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];

          this._emitMatch(e[0], e[1]);
        }
      }

      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);

        this._processQueue.length = 0;

        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;

          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };

  Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === 'function');
    if (this.aborted) return;
    this._processing++;

    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);

      return;
    }

    var n = 0;

    while (typeof pattern[n] === 'string') {
      n++;
    }

    var prefix;

    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join('/'), index, cb);

        return;

      case 0:
        prefix = null;
        break;

      default:
        prefix = pattern.slice(0, n).join('/');
        break;
    }

    var remain = pattern.slice(n);
    var read;
    if (prefix === null) read = '.';else if (isAbsolute(prefix) || isAbsolute(pattern.join('/'))) {
      if (!prefix || !isAbsolute(prefix)) prefix = '/' + prefix;
      read = prefix;
    } else read = prefix;

    var abs = this._makeAbs(read);

    if (childrenIgnored(this, read)) return cb();
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar) this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);else this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };

  Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;

    this._readdir(abs, inGlobStar, function (er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries) return cb();
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === '.';
    var matchedEntries = [];

    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];

      if (e.charAt(0) !== '.' || dotOk) {
        var m;

        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }

        if (m) matchedEntries.push(e);
      }
    }

    var len = matchedEntries.length;
    if (len === 0) return cb();

    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index]) this.matches[index] = Object.create(null);

      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];

        if (prefix) {
          if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
        }

        if (e.charAt(0) === '/' && !this.nomount) {
          e = path.join(this.root, e);
        }

        this._emitMatch(index, e);
      }

      return cb();
    }

    remain.shift();

    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];

      if (prefix) {
        if (prefix !== '/') e = prefix + '/' + e;else e = prefix + e;
      }

      this._process([e].concat(remain), index, inGlobStar, cb);
    }

    cb();
  };

  Glob.prototype._emitMatch = function (index, e) {
    if (this.aborted) return;
    if (isIgnored(this, e)) return;

    if (this.paused) {
      this._emitQueue.push([index, e]);

      return;
    }

    var abs = isAbsolute(e) ? e : this._makeAbs(e);
    if (this.mark) e = this._mark(e);
    if (this.absolute) e = abs;
    if (this.matches[index][e]) return;

    if (this.nodir) {
      var c = this.cache[abs];
      if (c === 'DIR' || Array.isArray(c)) return;
    }

    this.matches[index][e] = true;
    var st = this.statCache[abs];
    if (st) this.emit('stat', e, st);
    this.emit('match', e);
  };

  Glob.prototype._readdirInGlobStar = function (abs, cb) {
    if (this.aborted) return;
    if (this.follow) return this._readdir(abs, false, cb);
    var lstatkey = 'lstat\0' + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);
    if (lstatcb) fs.lstat(abs, lstatcb);

    function lstatcb_(er, lstat) {
      if (er && er.code === 'ENOENT') return cb();
      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;

      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = 'FILE';
        cb();
      } else self._readdir(abs, false, cb);
    }
  };

  Glob.prototype._readdir = function (abs, inGlobStar, cb) {
    if (this.aborted) return;
    cb = inflight('readdir\0' + abs + '\0' + inGlobStar, cb);
    if (!cb) return;
    if (inGlobStar && !ownProp(this.symlinks, abs)) return this._readdirInGlobStar(abs, cb);

    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === 'FILE') return cb();
      if (Array.isArray(c)) return cb(null, c);
    }
    fs.readdir(abs, readdirCb(this, abs, cb));
  };

  function readdirCb(self, abs, cb) {
    return function (er, entries) {
      if (er) self._readdirError(abs, er, cb);else self._readdirEntries(abs, entries, cb);
    };
  }

  Glob.prototype._readdirEntries = function (abs, entries, cb) {
    if (this.aborted) return;

    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === '/') e = abs + e;else e = abs + '/' + e;
        this.cache[e] = true;
      }
    }

    this.cache[abs] = entries;
    return cb(null, entries);
  };

  Glob.prototype._readdirError = function (f, er, cb) {
    if (this.aborted) return;

    switch (er.code) {
      case 'ENOTSUP':
      case 'ENOTDIR':
        var abs = this._makeAbs(f);

        this.cache[abs] = 'FILE';

        if (abs === this.cwdAbs) {
          var error = new Error(er.code + ' invalid cwd ' + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit('error', error);
          this.abort();
        }

        break;

      case 'ENOENT':
      case 'ELOOP':
      case 'ENAMETOOLONG':
      case 'UNKNOWN':
        this.cache[this._makeAbs(f)] = false;
        break;

      default:
        this.cache[this._makeAbs(f)] = false;

        if (this.strict) {
          this.emit('error', er);
          this.abort();
        }

        if (!this.silent) console.error('glob error', er);
        break;
    }

    return cb();
  };

  Glob.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;

    this._readdir(abs, inGlobStar, function (er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };

  Glob.prototype._processGlobStar2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries) return cb();
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);

    this._process(noGlobStar, index, false, cb);

    var isSym = this.symlinks[abs];
    var len = entries.length;
    if (isSym && inGlobStar) return cb();

    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === '.' && !this.dot) continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);

      this._process(instead, index, true, cb);

      var below = gspref.concat(entries[i], remain);

      this._process(below, index, true, cb);
    }

    cb();
  };

  Glob.prototype._processSimple = function (prefix, index, cb) {
    var self = this;

    this._stat(prefix, function (er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };

  Glob.prototype._processSimple2 = function (prefix, index, er, exists, cb) {
    if (!this.matches[index]) this.matches[index] = Object.create(null);
    if (!exists) return cb();

    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);

      if (prefix.charAt(0) === '/') {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail) prefix += '/';
      }
    }

    if (process.platform === 'win32') prefix = prefix.replace(/\\/g, '/');

    this._emitMatch(index, prefix);

    cb();
  };

  Glob.prototype._stat = function (f, cb) {
    var abs = this._makeAbs(f);

    var needDir = f.slice(-1) === '/';
    if (f.length > this.maxLength) return cb();

    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c)) c = 'DIR';
      if (!needDir || c === 'DIR') return cb(null, c);
      if (needDir && c === 'FILE') return cb();
    }
    var stat = this.statCache[abs];

    if (stat !== undefined) {
      if (stat === false) return cb(null, stat);else {
        var type = stat.isDirectory() ? 'DIR' : 'FILE';
        if (needDir && type === 'FILE') return cb();else return cb(null, type, stat);
      }
    }

    var self = this;
    var statcb = inflight('stat\0' + abs, lstatcb_);
    if (statcb) fs.lstat(abs, statcb);

    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        return fs.stat(abs, function (er, stat) {
          if (er) self._stat2(f, abs, null, lstat, cb);else self._stat2(f, abs, er, stat, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };

  Glob.prototype._stat2 = function (f, abs, er, stat, cb) {
    if (er && (er.code === 'ENOENT' || er.code === 'ENOTDIR')) {
      this.statCache[abs] = false;
      return cb();
    }

    var needDir = f.slice(-1) === '/';
    this.statCache[abs] = stat;
    if (abs.slice(-1) === '/' && stat && !stat.isDirectory()) return cb(null, false, stat);
    var c = true;
    if (stat) c = stat.isDirectory() ? 'DIR' : 'FILE';
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === 'FILE') return cb();
    return cb(null, c, stat);
  };

  return glob_1;
}

var hasRequiredCommon;

function requireCommon() {
  if (hasRequiredCommon) return common$2;
  hasRequiredCommon = 1;

  var os = require$$0__default["default"];
  var fs = require$$1__default["default"];
  var glob = requireGlob();
  var shell = requireShell();
  var shellMethods = Object.create(shell);
  common$2.extend = Object.assign;
  var isElectron = Boolean(process.versions.electron);
  var DEFAULT_CONFIG = {
    fatal: false,
    globOptions: {},
    maxdepth: 255,
    noglob: false,
    silent: false,
    verbose: false,
    execPath: null,
    bufLength: 64 * 1024
  };
  var config = {
    reset: function reset() {
      Object.assign(this, DEFAULT_CONFIG);

      if (!isElectron) {
        this.execPath = process.execPath;
      }
    },
    resetForTesting: function resetForTesting() {
      this.reset();
      this.silent = true;
    }
  };
  config.reset();
  common$2.config = config;
  var state = {
    error: null,
    errorCode: 0,
    currentCmd: 'shell.js'
  };
  common$2.state = state;
  delete process.env.OLDPWD;

  function isObject(a) {
    return typeof a === 'object' && a !== null;
  }

  common$2.isObject = isObject;

  function log() {
    if (!config.silent) {
      console.error.apply(console, arguments);
    }
  }

  common$2.log = log;

  function convertErrorOutput(msg) {
    if (typeof msg !== 'string') {
      throw new TypeError('input must be a string');
    }

    return msg.replace(/\\/g, '/');
  }

  common$2.convertErrorOutput = convertErrorOutput;

  function error(msg, _code, options) {
    if (typeof msg !== 'string') throw new Error('msg must be a string');
    var DEFAULT_OPTIONS = {
      continue: false,
      code: 1,
      prefix: state.currentCmd + ': ',
      silent: false
    };

    if (typeof _code === 'number' && isObject(options)) {
      options.code = _code;
    } else if (isObject(_code)) {
      options = _code;
    } else if (typeof _code === 'number') {
      options = {
        code: _code
      };
    } else if (typeof _code !== 'number') {
      options = {};
    }

    options = Object.assign({}, DEFAULT_OPTIONS, options);
    if (!state.errorCode) state.errorCode = options.code;
    var logEntry = convertErrorOutput(options.prefix + msg);
    state.error = state.error ? state.error + '\n' : '';
    state.error += logEntry;
    if (config.fatal) throw new Error(logEntry);
    if (msg.length > 0 && !options.silent) log(logEntry);

    if (!options.continue) {
      throw {
        msg: 'earlyExit',
        retValue: new ShellString('', state.error, state.errorCode)
      };
    }
  }

  common$2.error = error;

  function ShellString(stdout, stderr, code) {
    var that;

    if (stdout instanceof Array) {
      that = stdout;
      that.stdout = stdout.join('\n');
      if (stdout.length > 0) that.stdout += '\n';
    } else {
      that = new String(stdout);
      that.stdout = stdout;
    }

    that.stderr = stderr;
    that.code = code;
    pipeMethods.forEach(function (cmd) {
      that[cmd] = shellMethods[cmd].bind(that);
    });
    return that;
  }

  common$2.ShellString = ShellString;

  function parseOptions(opt, map, errorOptions) {
    if (typeof opt !== 'string' && !isObject(opt)) {
      throw new Error('options must be strings or key-value pairs');
    } else if (!isObject(map)) {
      throw new Error('parseOptions() internal error: map must be an object');
    } else if (errorOptions && !isObject(errorOptions)) {
      throw new Error('parseOptions() internal error: errorOptions must be object');
    }

    if (opt === '--') {
      return {};
    }

    var options = {};
    Object.keys(map).forEach(function (letter) {
      var optName = map[letter];

      if (optName[0] !== '!') {
        options[optName] = false;
      }
    });
    if (opt === '') return options;

    if (typeof opt === 'string') {
      if (opt[0] !== '-') {
        throw new Error("Options string must start with a '-'");
      }

      var chars = opt.slice(1).split('');
      chars.forEach(function (c) {
        if (c in map) {
          var optionName = map[c];

          if (optionName[0] === '!') {
            options[optionName.slice(1)] = false;
          } else {
            options[optionName] = true;
          }
        } else {
          error('option not recognized: ' + c, errorOptions || {});
        }
      });
    } else {
      Object.keys(opt).forEach(function (key) {
        var c = key[1];

        if (c in map) {
          var optionName = map[c];
          options[optionName] = opt[key];
        } else {
          error('option not recognized: ' + c, errorOptions || {});
        }
      });
    }

    return options;
  }

  common$2.parseOptions = parseOptions;

  function expand(list) {
    if (!Array.isArray(list)) {
      throw new TypeError('must be an array');
    }

    var expanded = [];
    list.forEach(function (listEl) {
      if (typeof listEl !== 'string') {
        expanded.push(listEl);
      } else {
        var ret;

        try {
          ret = glob.sync(listEl, config.globOptions);
          ret = ret.length > 0 ? ret : [listEl];
        } catch (e) {
          ret = [listEl];
        }

        expanded = expanded.concat(ret);
      }
    });
    return expanded;
  }

  common$2.expand = expand;
  var buffer = typeof Buffer.alloc === 'function' ? function (len) {
    return Buffer.alloc(len || config.bufLength);
  } : function (len) {
    return new Buffer(len || config.bufLength);
  };
  common$2.buffer = buffer;

  function unlinkSync(file) {
    try {
      fs.unlinkSync(file);
    } catch (e) {
      if (e.code === 'EPERM') {
        fs.chmodSync(file, '0666');
        fs.unlinkSync(file);
      } else {
        throw e;
      }
    }
  }

  common$2.unlinkSync = unlinkSync;

  function statFollowLinks() {
    return fs.statSync.apply(fs, arguments);
  }

  common$2.statFollowLinks = statFollowLinks;

  function statNoFollowLinks() {
    return fs.lstatSync.apply(fs, arguments);
  }

  common$2.statNoFollowLinks = statNoFollowLinks;

  function randomFileName() {
    function randomHash(count) {
      if (count === 1) {
        return parseInt(16 * Math.random(), 10).toString(16);
      }

      var hash = '';

      for (var i = 0; i < count; i++) {
        hash += randomHash(1);
      }

      return hash;
    }

    return 'shelljs_' + randomHash(20);
  }

  common$2.randomFileName = randomFileName;

  function wrap(cmd, fn, options) {
    options = options || {};
    return function () {
      var retValue = null;
      state.currentCmd = cmd;
      state.error = null;
      state.errorCode = 0;

      try {
        var args = [].slice.call(arguments, 0);

        if (config.verbose) {
          console.error.apply(console, [cmd].concat(args));
        }

        state.pipedValue = this && typeof this.stdout === 'string' ? this.stdout : '';

        if (options.unix === false) {
          retValue = fn.apply(this, args);
        } else {
          if (isObject(args[0]) && args[0].constructor.name === 'Object') {} else if (args.length === 0 || typeof args[0] !== 'string' || args[0].length <= 1 || args[0][0] !== '-') {
            args.unshift('');
          }

          args = args.reduce(function (accum, cur) {
            if (Array.isArray(cur)) {
              return accum.concat(cur);
            }

            accum.push(cur);
            return accum;
          }, []);
          args = args.map(function (arg) {
            if (isObject(arg) && arg.constructor.name === 'String') {
              return arg.toString();
            }

            return arg;
          });
          var homeDir = os.homedir();
          args = args.map(function (arg) {
            if (typeof arg === 'string' && arg.slice(0, 2) === '~/' || arg === '~') {
              return arg.replace(/^~/, homeDir);
            }

            return arg;
          });

          if (!config.noglob && options.allowGlobbing === true) {
            args = args.slice(0, options.globStart).concat(expand(args.slice(options.globStart)));
          }

          try {
            if (isObject(options.cmdOptions)) {
              args[0] = parseOptions(args[0], options.cmdOptions);
            }

            retValue = fn.apply(this, args);
          } catch (e) {
            if (e.msg === 'earlyExit') {
              retValue = e.retValue;
            } else {
              throw e;
            }
          }
        }
      } catch (e) {
        if (!state.error) {
          e.name = 'ShellJSInternalError';
          throw e;
        }

        if (config.fatal) throw e;
      }

      if (options.wrapOutput && (typeof retValue === 'string' || Array.isArray(retValue))) {
        retValue = new ShellString(retValue, state.error, state.errorCode);
      }

      state.currentCmd = 'shell.js';
      return retValue;
    };
  }

  common$2.wrap = wrap;

  function _readFromPipe() {
    return state.pipedValue;
  }

  common$2.readFromPipe = _readFromPipe;
  var DEFAULT_WRAP_OPTIONS = {
    allowGlobbing: true,
    canReceivePipe: false,
    cmdOptions: null,
    globStart: 1,
    pipeOnly: false,
    wrapOutput: true,
    unix: true
  };
  var pipeMethods = [];

  function _register(name, implementation, wrapOptions) {
    wrapOptions = wrapOptions || {};
    Object.keys(wrapOptions).forEach(function (option) {
      if (!DEFAULT_WRAP_OPTIONS.hasOwnProperty(option)) {
        throw new Error("Unknown option '" + option + "'");
      }

      if (typeof wrapOptions[option] !== typeof DEFAULT_WRAP_OPTIONS[option]) {
        throw new TypeError("Unsupported type '" + typeof wrapOptions[option] + "' for option '" + option + "'");
      }
    });
    wrapOptions = Object.assign({}, DEFAULT_WRAP_OPTIONS, wrapOptions);

    if (shell.hasOwnProperty(name)) {
      throw new Error('Command `' + name + '` already exists');
    }

    if (wrapOptions.pipeOnly) {
      wrapOptions.canReceivePipe = true;
      shellMethods[name] = wrap(name, implementation, wrapOptions);
    } else {
      shell[name] = wrap(name, implementation, wrapOptions);
    }

    if (wrapOptions.canReceivePipe) {
      pipeMethods.push(name);
    }
  }

  common$2.register = _register;
  return common$2;
}

var cat;
var hasRequiredCat;

function requireCat() {
  if (hasRequiredCat) return cat;
  hasRequiredCat = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('cat', _cat, {
    canReceivePipe: true,
    cmdOptions: {
      'n': 'number'
    }
  });

  function _cat(options, files) {
    var cat = common.readFromPipe();
    if (!files && !cat) common.error('no paths given');
    files = [].slice.call(arguments, 1);
    files.forEach(function (file) {
      if (!fs.existsSync(file)) {
        common.error('no such file or directory: ' + file);
      } else if (common.statFollowLinks(file).isDirectory()) {
        common.error(file + ': Is a directory');
      }

      cat += fs.readFileSync(file, 'utf8');
    });

    if (options.number) {
      cat = addNumbers(cat);
    }

    return cat;
  }

  cat = _cat;

  function addNumbers(cat) {
    var lines = cat.split('\n');
    var lastLine = lines.pop();
    lines = lines.map(function (line, i) {
      return numberedLine(i + 1, line);
    });

    if (lastLine.length) {
      lastLine = numberedLine(lines.length + 1, lastLine);
    }

    lines.push(lastLine);
    return lines.join('\n');
  }

  function numberedLine(n, line) {
    var number = ('     ' + n).slice(-6) + '\t';
    return number + line;
  }

  return cat;
}

var cd;
var hasRequiredCd;

function requireCd() {
  if (hasRequiredCd) return cd;
  hasRequiredCd = 1;
  var os = require$$0__default["default"];
  var common = requireCommon();
  common.register('cd', _cd, {});

  function _cd(options, dir) {
    if (!dir) dir = os.homedir();

    if (dir === '-') {
      if (!process.env.OLDPWD) {
        common.error('could not find previous directory');
      } else {
        dir = process.env.OLDPWD;
      }
    }

    try {
      var curDir = process.cwd();
      process.chdir(dir);
      process.env.OLDPWD = curDir;
    } catch (e) {
      var err;

      try {
        common.statFollowLinks(dir);
        err = 'not a directory: ' + dir;
      } catch (e2) {
        err = 'no such file or directory: ' + dir;
      }

      if (err) common.error(err);
    }

    return '';
  }

  cd = _cd;
  return cd;
}

var chmod;
var hasRequiredChmod;

function requireChmod() {
  if (hasRequiredChmod) return chmod;
  hasRequiredChmod = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];

  var PERMS = function (base) {
    return {
      OTHER_EXEC: base.EXEC,
      OTHER_WRITE: base.WRITE,
      OTHER_READ: base.READ,
      GROUP_EXEC: base.EXEC << 3,
      GROUP_WRITE: base.WRITE << 3,
      GROUP_READ: base.READ << 3,
      OWNER_EXEC: base.EXEC << 6,
      OWNER_WRITE: base.WRITE << 6,
      OWNER_READ: base.READ << 6,
      STICKY: parseInt('01000', 8),
      SETGID: parseInt('02000', 8),
      SETUID: parseInt('04000', 8),
      TYPE_MASK: parseInt('0770000', 8)
    };
  }({
    EXEC: 1,
    WRITE: 2,
    READ: 4
  });

  common.register('chmod', _chmod, {});

  function _chmod(options, mode, filePattern) {
    if (!filePattern) {
      if (options.length > 0 && options.charAt(0) === '-') {
        [].unshift.call(arguments, '');
      } else {
        common.error('You must specify a file.');
      }
    }

    options = common.parseOptions(options, {
      'R': 'recursive',
      'c': 'changes',
      'v': 'verbose'
    });
    filePattern = [].slice.call(arguments, 2);
    var files;

    if (options.recursive) {
      files = [];
      filePattern.forEach(function addFile(expandedFile) {
        var stat = common.statNoFollowLinks(expandedFile);

        if (!stat.isSymbolicLink()) {
          files.push(expandedFile);

          if (stat.isDirectory()) {
            fs.readdirSync(expandedFile).forEach(function (child) {
              addFile(expandedFile + '/' + child);
            });
          }
        }
      });
    } else {
      files = filePattern;
    }

    files.forEach(function innerChmod(file) {
      file = path.resolve(file);

      if (!fs.existsSync(file)) {
        common.error('File not found: ' + file);
      }

      if (options.recursive && common.statNoFollowLinks(file).isSymbolicLink()) {
        return;
      }

      var stat = common.statFollowLinks(file);
      var isDir = stat.isDirectory();
      var perms = stat.mode;
      var type = perms & PERMS.TYPE_MASK;
      var newPerms = perms;

      if (isNaN(parseInt(mode, 8))) {
        mode.split(',').forEach(function (symbolicMode) {
          var pattern = /([ugoa]*)([=\+-])([rwxXst]*)/i;
          var matches = pattern.exec(symbolicMode);

          if (matches) {
            var applyTo = matches[1];
            var operator = matches[2];
            var change = matches[3];
            var changeOwner = applyTo.indexOf('u') !== -1 || applyTo === 'a' || applyTo === '';
            var changeGroup = applyTo.indexOf('g') !== -1 || applyTo === 'a' || applyTo === '';
            var changeOther = applyTo.indexOf('o') !== -1 || applyTo === 'a' || applyTo === '';
            var changeRead = change.indexOf('r') !== -1;
            var changeWrite = change.indexOf('w') !== -1;
            var changeExec = change.indexOf('x') !== -1;
            var changeExecDir = change.indexOf('X') !== -1;
            var changeSticky = change.indexOf('t') !== -1;
            var changeSetuid = change.indexOf('s') !== -1;

            if (changeExecDir && isDir) {
              changeExec = true;
            }

            var mask = 0;

            if (changeOwner) {
              mask |= (changeRead ? PERMS.OWNER_READ : 0) + (changeWrite ? PERMS.OWNER_WRITE : 0) + (changeExec ? PERMS.OWNER_EXEC : 0) + (changeSetuid ? PERMS.SETUID : 0);
            }

            if (changeGroup) {
              mask |= (changeRead ? PERMS.GROUP_READ : 0) + (changeWrite ? PERMS.GROUP_WRITE : 0) + (changeExec ? PERMS.GROUP_EXEC : 0) + (changeSetuid ? PERMS.SETGID : 0);
            }

            if (changeOther) {
              mask |= (changeRead ? PERMS.OTHER_READ : 0) + (changeWrite ? PERMS.OTHER_WRITE : 0) + (changeExec ? PERMS.OTHER_EXEC : 0);
            }

            if (changeSticky) {
              mask |= PERMS.STICKY;
            }

            switch (operator) {
              case '+':
                newPerms |= mask;
                break;

              case '-':
                newPerms &= ~mask;
                break;

              case '=':
                newPerms = type + mask;

                if (common.statFollowLinks(file).isDirectory()) {
                  newPerms |= PERMS.SETUID + PERMS.SETGID & perms;
                }

                break;

              default:
                common.error('Could not recognize operator: `' + operator + '`');
            }

            if (options.verbose) {
              console.log(file + ' -> ' + newPerms.toString(8));
            }

            if (perms !== newPerms) {
              if (!options.verbose && options.changes) {
                console.log(file + ' -> ' + newPerms.toString(8));
              }

              fs.chmodSync(file, newPerms);
              perms = newPerms;
            }
          } else {
            common.error('Invalid symbolic mode change: ' + symbolicMode);
          }
        });
      } else {
        newPerms = type + parseInt(mode, 8);

        if (common.statFollowLinks(file).isDirectory()) {
          newPerms |= PERMS.SETUID + PERMS.SETGID & perms;
        }

        fs.chmodSync(file, newPerms);
      }
    });
    return '';
  }

  chmod = _chmod;
  return chmod;
}

var cp;
var hasRequiredCp;

function requireCp() {
  if (hasRequiredCp) return cp;
  hasRequiredCp = 1;
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  var common = requireCommon();
  common.register('cp', _cp, {
    cmdOptions: {
      'f': '!no_force',
      'n': 'no_force',
      'u': 'update',
      'R': 'recursive',
      'r': 'recursive',
      'L': 'followsymlink',
      'P': 'noFollowsymlink'
    },
    wrapOutput: false
  });

  function copyFileSync(srcFile, destFile, options) {
    if (!fs.existsSync(srcFile)) {
      common.error('copyFileSync: no such file or directory: ' + srcFile);
    }

    var isWindows = process.platform === 'win32';

    try {
      if (options.update && common.statFollowLinks(srcFile).mtime < fs.statSync(destFile).mtime) {
        return;
      }
    } catch (e) {}

    if (common.statNoFollowLinks(srcFile).isSymbolicLink() && !options.followsymlink) {
      try {
        common.statNoFollowLinks(destFile);
        common.unlinkSync(destFile);
      } catch (e) {}

      var symlinkFull = fs.readlinkSync(srcFile);
      fs.symlinkSync(symlinkFull, destFile, isWindows ? 'junction' : null);
    } else {
      var buf = common.buffer();
      var bufLength = buf.length;
      var bytesRead = bufLength;
      var pos = 0;
      var fdr = null;
      var fdw = null;

      try {
        fdr = fs.openSync(srcFile, 'r');
      } catch (e) {
        common.error('copyFileSync: could not read src file (' + srcFile + ')');
      }

      try {
        fdw = fs.openSync(destFile, 'w');
      } catch (e) {
        common.error('copyFileSync: could not write to dest file (code=' + e.code + '):' + destFile);
      }

      while (bytesRead === bufLength) {
        bytesRead = fs.readSync(fdr, buf, 0, bufLength, pos);
        fs.writeSync(fdw, buf, 0, bytesRead);
        pos += bytesRead;
      }

      fs.closeSync(fdr);
      fs.closeSync(fdw);
      fs.chmodSync(destFile, common.statFollowLinks(srcFile).mode);
    }
  }

  function cpdirSyncRecursive(sourceDir, destDir, currentDepth, opts) {
    if (!opts) opts = {};
    if (currentDepth >= common.config.maxdepth) return;
    currentDepth++;
    var isWindows = process.platform === 'win32';

    try {
      fs.mkdirSync(destDir);
    } catch (e) {
      if (e.code !== 'EEXIST') throw e;
    }

    var files = fs.readdirSync(sourceDir);

    for (var i = 0; i < files.length; i++) {
      var srcFile = sourceDir + '/' + files[i];
      var destFile = destDir + '/' + files[i];
      var srcFileStat = common.statNoFollowLinks(srcFile);
      var symlinkFull;

      if (opts.followsymlink) {
        if (cpcheckcycle(sourceDir, srcFile)) {
          console.error('Cycle link found.');
          symlinkFull = fs.readlinkSync(srcFile);
          fs.symlinkSync(symlinkFull, destFile, isWindows ? 'junction' : null);
          continue;
        }
      }

      if (srcFileStat.isDirectory()) {
        cpdirSyncRecursive(srcFile, destFile, currentDepth, opts);
      } else if (srcFileStat.isSymbolicLink() && !opts.followsymlink) {
        symlinkFull = fs.readlinkSync(srcFile);

        try {
          common.statNoFollowLinks(destFile);
          common.unlinkSync(destFile);
        } catch (e) {}

        fs.symlinkSync(symlinkFull, destFile, isWindows ? 'junction' : null);
      } else if (srcFileStat.isSymbolicLink() && opts.followsymlink) {
        srcFileStat = common.statFollowLinks(srcFile);

        if (srcFileStat.isDirectory()) {
          cpdirSyncRecursive(srcFile, destFile, currentDepth, opts);
        } else {
          copyFileSync(srcFile, destFile, opts);
        }
      } else {
        if (fs.existsSync(destFile) && opts.no_force) {
          common.log('skipping existing file: ' + files[i]);
        } else {
          copyFileSync(srcFile, destFile, opts);
        }
      }
    }

    var checkDir = common.statFollowLinks(sourceDir);
    fs.chmodSync(destDir, checkDir.mode);
  }

  function checkRecentCreated(sources, index) {
    var lookedSource = sources[index];
    return sources.slice(0, index).some(function (src) {
      return path.basename(src) === path.basename(lookedSource);
    });
  }

  function cpcheckcycle(sourceDir, srcFile) {
    var srcFileStat = common.statNoFollowLinks(srcFile);

    if (srcFileStat.isSymbolicLink()) {
      var cyclecheck = common.statFollowLinks(srcFile);

      if (cyclecheck.isDirectory()) {
        var sourcerealpath = fs.realpathSync(sourceDir);
        var symlinkrealpath = fs.realpathSync(srcFile);
        var re = new RegExp(symlinkrealpath);

        if (re.test(sourcerealpath)) {
          return true;
        }
      }
    }

    return false;
  }

  function _cp(options, sources, dest) {
    if (options.followsymlink) {
      options.noFollowsymlink = false;
    }

    if (!options.recursive && !options.noFollowsymlink) {
      options.followsymlink = true;
    }

    if (arguments.length < 3) {
      common.error('missing <source> and/or <dest>');
    } else {
      sources = [].slice.call(arguments, 1, arguments.length - 1);
      dest = arguments[arguments.length - 1];
    }

    var destExists = fs.existsSync(dest);
    var destStat = destExists && common.statFollowLinks(dest);

    if ((!destExists || !destStat.isDirectory()) && sources.length > 1) {
      common.error('dest is not a directory (too many sources)');
    }

    if (destExists && destStat.isFile() && options.no_force) {
      return new common.ShellString('', '', 0);
    }

    sources.forEach(function (src, srcIndex) {
      if (!fs.existsSync(src)) {
        if (src === '') src = "''";
        common.error('no such file or directory: ' + src, {
          continue: true
        });
        return;
      }

      var srcStat = common.statFollowLinks(src);

      if (!options.noFollowsymlink && srcStat.isDirectory()) {
        if (!options.recursive) {
          common.error("omitting directory '" + src + "'", {
            continue: true
          });
        } else {
          var newDest = destStat && destStat.isDirectory() ? path.join(dest, path.basename(src)) : dest;

          try {
            common.statFollowLinks(path.dirname(dest));
            cpdirSyncRecursive(src, newDest, 0, {
              no_force: options.no_force,
              followsymlink: options.followsymlink
            });
          } catch (e) {
            common.error("cannot create directory '" + dest + "': No such file or directory");
          }
        }
      } else {
        var thisDest = dest;

        if (destStat && destStat.isDirectory()) {
          thisDest = path.normalize(dest + '/' + path.basename(src));
        }

        var thisDestExists = fs.existsSync(thisDest);

        if (thisDestExists && checkRecentCreated(sources, srcIndex)) {
          if (!options.no_force) {
            common.error("will not overwrite just-created '" + thisDest + "' with '" + src + "'", {
              continue: true
            });
          }

          return;
        }

        if (thisDestExists && options.no_force) {
          return;
        }

        if (path.relative(src, thisDest) === '') {
          common.error("'" + thisDest + "' and '" + src + "' are the same file", {
            continue: true
          });
          return;
        }

        copyFileSync(src, thisDest, options);
      }
    });
    return new common.ShellString('', common.state.error, common.state.errorCode);
  }

  cp = _cp;
  return cp;
}

var dirs = {};

var hasRequiredDirs;

function requireDirs() {
  if (hasRequiredDirs) return dirs;
  hasRequiredDirs = 1;
  var common = requireCommon();

  var _cd = requireCd();

  var path = require$$2__default["default"];
  common.register('dirs', _dirs, {
    wrapOutput: false
  });
  common.register('pushd', _pushd, {
    wrapOutput: false
  });
  common.register('popd', _popd, {
    wrapOutput: false
  });
  var _dirStack = [];

  function _isStackIndex(index) {
    return /^[\-+]\d+$/.test(index);
  }

  function _parseStackIndex(index) {
    if (_isStackIndex(index)) {
      if (Math.abs(index) < _dirStack.length + 1) {
        return /^-/.test(index) ? Number(index) - 1 : Number(index);
      }

      common.error(index + ': directory stack index out of range');
    } else {
      common.error(index + ': invalid number');
    }
  }

  function _actualDirStack() {
    return [process.cwd()].concat(_dirStack);
  }

  function _pushd(options, dir) {
    if (_isStackIndex(options)) {
      dir = options;
      options = '';
    }

    options = common.parseOptions(options, {
      'n': 'no-cd',
      'q': 'quiet'
    });

    var dirs = _actualDirStack();

    if (dir === '+0') {
      return dirs;
    } else if (!dir) {
      if (dirs.length > 1) {
        dirs = dirs.splice(1, 1).concat(dirs);
      } else {
        return common.error('no other directory');
      }
    } else if (_isStackIndex(dir)) {
      var n = _parseStackIndex(dir);

      dirs = dirs.slice(n).concat(dirs.slice(0, n));
    } else {
      if (options['no-cd']) {
        dirs.splice(1, 0, dir);
      } else {
        dirs.unshift(dir);
      }
    }

    if (options['no-cd']) {
      dirs = dirs.slice(1);
    } else {
      dir = path.resolve(dirs.shift());

      _cd('', dir);
    }

    _dirStack = dirs;
    return _dirs(options.quiet ? '-q' : '');
  }

  dirs.pushd = _pushd;

  function _popd(options, index) {
    if (_isStackIndex(options)) {
      index = options;
      options = '';
    }

    options = common.parseOptions(options, {
      'n': 'no-cd',
      'q': 'quiet'
    });

    if (!_dirStack.length) {
      return common.error('directory stack empty');
    }

    index = _parseStackIndex(index || '+0');

    if (options['no-cd'] || index > 0 || _dirStack.length + index === 0) {
      index = index > 0 ? index - 1 : index;

      _dirStack.splice(index, 1);
    } else {
      var dir = path.resolve(_dirStack.shift());

      _cd('', dir);
    }

    return _dirs(options.quiet ? '-q' : '');
  }

  dirs.popd = _popd;

  function _dirs(options, index) {
    if (_isStackIndex(options)) {
      index = options;
      options = '';
    }

    options = common.parseOptions(options, {
      'c': 'clear',
      'q': 'quiet'
    });

    if (options.clear) {
      _dirStack = [];
      return _dirStack;
    }

    var stack = _actualDirStack();

    if (index) {
      index = _parseStackIndex(index);

      if (index < 0) {
        index = stack.length + index;
      }

      if (!options.quiet) {
        common.log(stack[index]);
      }

      return stack[index];
    }

    if (!options.quiet) {
      common.log(stack.join(' '));
    }

    return stack;
  }

  dirs.dirs = _dirs;
  return dirs;
}

var echo;
var hasRequiredEcho;

function requireEcho() {
  if (hasRequiredEcho) return echo;
  hasRequiredEcho = 1;
  var format = require$$4__default$1["default"].format;
  var common = requireCommon();
  common.register('echo', _echo, {
    allowGlobbing: false
  });

  function _echo(opts) {
    var messages = [].slice.call(arguments, opts ? 0 : 1);
    var options = {};

    try {
      options = common.parseOptions(messages[0], {
        'e': 'escapes',
        'n': 'no_newline'
      }, {
        silent: true
      });

      if (messages[0]) {
        messages.shift();
      }
    } catch (_) {
      common.state.error = null;
    }

    var output = format.apply(null, messages);

    if (!options.no_newline) {
      output += '\n';
    }

    process.stdout.write(output);
    return output;
  }

  echo = _echo;
  return echo;
}

var error_1;
var hasRequiredError;

function requireError() {
  if (hasRequiredError) return error_1;
  hasRequiredError = 1;
  var common = requireCommon();

  function error() {
    return common.state.error;
  }

  error_1 = error;
  return error_1;
}

var execChild = {exports: {}};

var hasRequiredExecChild;

function requireExecChild() {
  if (hasRequiredExecChild) return execChild.exports;
  hasRequiredExecChild = 1;

  (function (module) {
    if (require.main !== module) {
      throw new Error('This file should not be required');
    }

    var childProcess = require$$0__default$1["default"];
    var fs = require$$1__default["default"];
    var paramFilePath = process.argv[2];
    var serializedParams = fs.readFileSync(paramFilePath, 'utf8');
    var params = JSON.parse(serializedParams);
    var cmd = params.command;
    var execOptions = params.execOptions;
    var pipe = params.pipe;
    var stdoutFile = params.stdoutFile;
    var stderrFile = params.stderrFile;
    var c = childProcess.exec(cmd, execOptions, function (err) {
      if (!err) {
        process.exitCode = 0;
      } else if (err.code === undefined) {
        process.exitCode = 1;
      } else {
        process.exitCode = err.code;
      }
    });
    var stdoutStream = fs.createWriteStream(stdoutFile);
    var stderrStream = fs.createWriteStream(stderrFile);
    c.stdout.pipe(stdoutStream);
    c.stderr.pipe(stderrStream);
    c.stdout.pipe(process.stdout);
    c.stderr.pipe(process.stderr);

    if (pipe) {
      c.stdin.end(pipe);
    }
  })(execChild);

  return execChild.exports;
}

var $$2 = _export;
var getBuiltIn = getBuiltIn$8;
var apply = functionApply;
var call = functionCall;
var uncurryThis = functionUncurryThis;
var fails = fails$p;
var isArray = isArray$4;
var isCallable = isCallable$m;
var isObject = isObject$d;
var isSymbol = isSymbol$3;
var arraySlice = arraySlice$3;
var NATIVE_SYMBOL = nativeSymbol;

var $stringify = getBuiltIn('JSON', 'stringify');
var exec$2 = uncurryThis(/./.exec);
var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var replace = uncurryThis(''.replace);
var numberToString = uncurryThis(1.0.toString);

var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;

var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
  var symbol = getBuiltIn('Symbol')();
  // MS Edge converts symbol values to JSON as {}
  return $stringify([symbol]) != '[null]'
    // WebKit converts symbol values to JSON as null
    || $stringify({ a: symbol }) != '{}'
    // V8 throws on boxed symbols
    || $stringify(Object(symbol)) != '{}';
});

// https://github.com/tc39/proposal-well-formed-stringify
var ILL_FORMED_UNICODE = fails(function () {
  return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"'
    || $stringify('\uDEAD') !== '"\\udead"';
});

var stringifyWithSymbolsFix = function (it, replacer) {
  var args = arraySlice(arguments);
  var $replacer = replacer;
  if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
  if (!isArray(replacer)) replacer = function (key, value) {
    if (isCallable($replacer)) value = call($replacer, this, key, value);
    if (!isSymbol(value)) return value;
  };
  args[1] = replacer;
  return apply($stringify, null, args);
};

var fixIllFormed = function (match, offset, string) {
  var prev = charAt(string, offset - 1);
  var next = charAt(string, offset + 1);
  if ((exec$2(low, match) && !exec$2(hi, next)) || (exec$2(hi, match) && !exec$2(low, prev))) {
    return '\\u' + numberToString(charCodeAt(match, 0), 16);
  } return match;
};

if ($stringify) {
  // `JSON.stringify` method
  // https://tc39.es/ecma262/#sec-json.stringify
  $$2({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = arraySlice(arguments);
      var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == 'string' ? replace(result, tester, fixIllFormed) : result;
    }
  });
}

var tempdir = {};

var hasRequiredTempdir;

function requireTempdir() {
  if (hasRequiredTempdir) return tempdir;
  hasRequiredTempdir = 1;
  var common = requireCommon();
  var os = require$$0__default["default"];
  var fs = require$$1__default["default"];
  common.register('tempdir', _tempDir, {
    allowGlobbing: false,
    wrapOutput: false
  });

  function writeableDir(dir) {
    if (!dir || !fs.existsSync(dir)) return false;
    if (!common.statFollowLinks(dir).isDirectory()) return false;
    var testFile = dir + '/' + common.randomFileName();

    try {
      fs.writeFileSync(testFile, ' ');
      common.unlinkSync(testFile);
      return dir;
    } catch (e) {
      return false;
    }
  }

  var cachedTempDir;

  function _tempDir() {
    if (cachedTempDir) return cachedTempDir;
    cachedTempDir = writeableDir(os.tmpdir()) || writeableDir(process.env.TMPDIR) || writeableDir(process.env.TEMP) || writeableDir(process.env.TMP) || writeableDir(process.env.Wimp$ScrapDir) || writeableDir('C:\\TEMP') || writeableDir('C:\\TMP') || writeableDir('\\TEMP') || writeableDir('\\TMP') || writeableDir('/tmp') || writeableDir('/var/tmp') || writeableDir('/usr/tmp') || writeableDir('.');
    return cachedTempDir;
  }

  function isCached() {
    return cachedTempDir;
  }

  function clearCache() {
    cachedTempDir = undefined;
  }

  tempdir.tempDir = _tempDir;
  tempdir.isCached = isCached;
  tempdir.clearCache = clearCache;
  return tempdir;
}

var pwd;
var hasRequiredPwd;

function requirePwd() {
  if (hasRequiredPwd) return pwd;
  hasRequiredPwd = 1;
  var path = require$$2__default["default"];
  var common = requireCommon();
  common.register('pwd', _pwd, {
    allowGlobbing: false
  });

  function _pwd() {
    var pwd = path.resolve(process.cwd());
    return pwd;
  }

  pwd = _pwd;
  return pwd;
}

var exec$1;
var hasRequiredExec;

function requireExec() {
  if (hasRequiredExec) return exec$1;
  hasRequiredExec = 1;
  var common = requireCommon();
  var _tempDir = requireTempdir().tempDir;

  var _pwd = requirePwd();

  var path = require$$2__default["default"];
  var fs = require$$1__default["default"];
  var child = require$$0__default$1["default"];
  var DEFAULT_MAXBUFFER_SIZE = 20 * 1024 * 1024;
  var DEFAULT_ERROR_CODE = 1;
  common.register('exec', _exec, {
    unix: false,
    canReceivePipe: true,
    wrapOutput: false
  });

  function execSync(cmd, opts, pipe) {
    if (!common.config.execPath) {
      common.error('Unable to find a path to the node binary. Please manually set config.execPath');
    }

    var tempDir = _tempDir();

    var paramsFile = path.resolve(tempDir + '/' + common.randomFileName());
    var stderrFile = path.resolve(tempDir + '/' + common.randomFileName());
    var stdoutFile = path.resolve(tempDir + '/' + common.randomFileName());
    opts = common.extend({
      silent: common.config.silent,
      cwd: _pwd().toString(),
      env: process.env,
      maxBuffer: DEFAULT_MAXBUFFER_SIZE,
      encoding: 'utf8'
    }, opts);
    if (fs.existsSync(paramsFile)) common.unlinkSync(paramsFile);
    if (fs.existsSync(stderrFile)) common.unlinkSync(stderrFile);
    if (fs.existsSync(stdoutFile)) common.unlinkSync(stdoutFile);
    opts.cwd = path.resolve(opts.cwd);
    var paramsToSerialize = {
      command: cmd,
      execOptions: opts,
      pipe: pipe,
      stdoutFile: stdoutFile,
      stderrFile: stderrFile
    };

    function writeFileLockedDown(filePath, data) {
      fs.writeFileSync(filePath, data, {
        encoding: 'utf8',
        mode: parseInt('600', 8)
      });
    }

    writeFileLockedDown(stdoutFile, '');
    writeFileLockedDown(stderrFile, '');
    writeFileLockedDown(paramsFile, JSON.stringify(paramsToSerialize));
    var execArgs = [path.join(__dirname, 'exec-child.js'), paramsFile];

    if (opts.silent) {
      opts.stdio = 'ignore';
    } else {
      opts.stdio = [0, 1, 2];
    }

    var code = 0;

    try {
      delete opts.shell;
      child.execFileSync(common.config.execPath, execArgs, opts);
    } catch (e) {
      code = e.status || DEFAULT_ERROR_CODE;
    }

    var stdout = '';
    var stderr = '';

    if (opts.encoding === 'buffer') {
      stdout = fs.readFileSync(stdoutFile);
      stderr = fs.readFileSync(stderrFile);
    } else {
      stdout = fs.readFileSync(stdoutFile, opts.encoding);
      stderr = fs.readFileSync(stderrFile, opts.encoding);
    }

    try {
      common.unlinkSync(paramsFile);
    } catch (e) {}

    try {
      common.unlinkSync(stderrFile);
    } catch (e) {}

    try {
      common.unlinkSync(stdoutFile);
    } catch (e) {}

    if (code !== 0) {
      common.error(stderr, code, {
        continue: true,
        silent: true
      });
    }

    var obj = common.ShellString(stdout, stderr, code);
    return obj;
  }

  function execAsync(cmd, opts, pipe, callback) {
    opts = common.extend({
      silent: common.config.silent,
      cwd: _pwd().toString(),
      env: process.env,
      maxBuffer: DEFAULT_MAXBUFFER_SIZE,
      encoding: 'utf8'
    }, opts);
    var c = child.exec(cmd, opts, function (err, stdout, stderr) {
      if (callback) {
        if (!err) {
          callback(0, stdout, stderr);
        } else if (err.code === undefined) {
          callback(1, stdout, stderr);
        } else {
          callback(err.code, stdout, stderr);
        }
      }
    });
    if (pipe) c.stdin.end(pipe);

    if (!opts.silent) {
      c.stdout.pipe(process.stdout);
      c.stderr.pipe(process.stderr);
    }

    return c;
  }

  function _exec(command, options, callback) {
    options = options || {};
    if (!command) common.error('must specify command');
    var pipe = common.readFromPipe();

    if (typeof options === 'function') {
      callback = options;
      options = {
        async: true
      };
    }

    if (typeof options === 'object' && typeof callback === 'function') {
      options.async = true;
    }

    options = common.extend({
      silent: common.config.silent,
      async: false
    }, options);

    if (options.async) {
      return execAsync(command, options, pipe, callback);
    } else {
      return execSync(command, options, pipe);
    }
  }

  exec$1 = _exec;
  return exec$1;
}

var ls;
var hasRequiredLs;

function requireLs() {
  if (hasRequiredLs) return ls;
  hasRequiredLs = 1;
  var path = require$$2__default["default"];
  var fs = require$$1__default["default"];
  var common = requireCommon();
  var glob = requireGlob();
  var globPatternRecursive = path.sep + '**';
  common.register('ls', _ls, {
    cmdOptions: {
      'R': 'recursive',
      'A': 'all',
      'L': 'link',
      'a': 'all_deprecated',
      'd': 'directory',
      'l': 'long'
    }
  });

  function _ls(options, paths) {
    if (options.all_deprecated) {
      common.log('ls: Option -a is deprecated. Use -A instead');
      options.all = true;
    }

    if (!paths) {
      paths = ['.'];
    } else {
      paths = [].slice.call(arguments, 1);
    }

    var list = [];

    function pushFile(abs, relName, stat) {
      if (process.platform === 'win32') {
        relName = relName.replace(/\\/g, '/');
      }

      if (options.long) {
        stat = stat || (options.link ? common.statFollowLinks(abs) : common.statNoFollowLinks(abs));
        list.push(addLsAttributes(relName, stat));
      } else {
        list.push(relName);
      }
    }

    paths.forEach(function (p) {
      var stat;

      try {
        stat = options.link ? common.statFollowLinks(p) : common.statNoFollowLinks(p);

        if (stat.isSymbolicLink()) {
          try {
            var _stat = common.statFollowLinks(p);

            if (_stat.isDirectory()) {
              stat = _stat;
            }
          } catch (_) {}
        }
      } catch (e) {
        common.error('no such file or directory: ' + p, 2, {
          continue: true
        });
        return;
      }

      if (stat.isDirectory() && !options.directory) {
        if (options.recursive) {
          glob.sync(p + globPatternRecursive, {
            dot: options.all,
            follow: options.link
          }).forEach(function (item) {
            if (path.relative(p, item)) {
              pushFile(item, path.relative(p, item));
            }
          });
        } else if (options.all) {
          fs.readdirSync(p).forEach(function (item) {
            pushFile(path.join(p, item), item);
          });
        } else {
          fs.readdirSync(p).forEach(function (item) {
            if (item[0] !== '.') {
              pushFile(path.join(p, item), item);
            }
          });
        }
      } else {
        pushFile(p, p, stat);
      }
    });
    return list;
  }

  function addLsAttributes(pathName, stats) {
    stats.name = pathName;

    stats.toString = function () {
      return [this.mode, this.nlink, this.uid, this.gid, this.size, this.mtime, this.name].join(' ');
    };

    return stats;
  }

  ls = _ls;
  return ls;
}

var find;
var hasRequiredFind;

function requireFind() {
  if (hasRequiredFind) return find;
  hasRequiredFind = 1;
  var path = require$$2__default["default"];
  var common = requireCommon();

  var _ls = requireLs();

  common.register('find', _find, {});

  function _find(options, paths) {
    if (!paths) {
      common.error('no path specified');
    } else if (typeof paths === 'string') {
      paths = [].slice.call(arguments, 1);
    }

    var list = [];

    function pushFile(file) {
      if (process.platform === 'win32') {
        file = file.replace(/\\/g, '/');
      }

      list.push(file);
    }

    paths.forEach(function (file) {
      var stat;

      try {
        stat = common.statFollowLinks(file);
      } catch (e) {
        common.error('no such file or directory: ' + file);
      }

      pushFile(file);

      if (stat.isDirectory()) {
        _ls({
          recursive: true,
          all: true
        }, file).forEach(function (subfile) {
          pushFile(path.join(file, subfile));
        });
      }
    });
    return list;
  }

  find = _find;
  return find;
}

var grep;
var hasRequiredGrep;

function requireGrep() {
  if (hasRequiredGrep) return grep;
  hasRequiredGrep = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('grep', _grep, {
    globStart: 2,
    canReceivePipe: true,
    cmdOptions: {
      'v': 'inverse',
      'l': 'nameOnly',
      'i': 'ignoreCase'
    }
  });

  function _grep(options, regex, files) {
    var pipe = common.readFromPipe();
    if (!files && !pipe) common.error('no paths given', 2);
    files = [].slice.call(arguments, 2);

    if (pipe) {
      files.unshift('-');
    }

    var grep = [];

    if (options.ignoreCase) {
      regex = new RegExp(regex, 'i');
    }

    files.forEach(function (file) {
      if (!fs.existsSync(file) && file !== '-') {
        common.error('no such file or directory: ' + file, 2, {
          continue: true
        });
        return;
      }

      var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');

      if (options.nameOnly) {
        if (contents.match(regex)) {
          grep.push(file);
        }
      } else {
        var lines = contents.split('\n');
        lines.forEach(function (line) {
          var matched = line.match(regex);

          if (options.inverse && !matched || !options.inverse && matched) {
            grep.push(line);
          }
        });
      }
    });
    return grep.join('\n') + '\n';
  }

  grep = _grep;
  return grep;
}

var head;
var hasRequiredHead;

function requireHead() {
  if (hasRequiredHead) return head;
  hasRequiredHead = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('head', _head, {
    canReceivePipe: true,
    cmdOptions: {
      'n': 'numLines'
    }
  });

  function readSomeLines(file, numLines) {
    var buf = common.buffer();
    var bufLength = buf.length;
    var bytesRead = bufLength;
    var pos = 0;
    var fdr = fs.openSync(file, 'r');
    var numLinesRead = 0;
    var ret = '';

    while (bytesRead === bufLength && numLinesRead < numLines) {
      bytesRead = fs.readSync(fdr, buf, 0, bufLength, pos);
      var bufStr = buf.toString('utf8', 0, bytesRead);
      numLinesRead += bufStr.split('\n').length - 1;
      ret += bufStr;
      pos += bytesRead;
    }

    fs.closeSync(fdr);
    return ret;
  }

  function _head(options, files) {
    var head = [];
    var pipe = common.readFromPipe();
    if (!files && !pipe) common.error('no paths given');
    var idx = 1;

    if (options.numLines === true) {
      idx = 2;
      options.numLines = Number(arguments[1]);
    } else if (options.numLines === false) {
      options.numLines = 10;
    }

    files = [].slice.call(arguments, idx);

    if (pipe) {
      files.unshift('-');
    }

    var shouldAppendNewline = false;
    files.forEach(function (file) {
      if (file !== '-') {
        if (!fs.existsSync(file)) {
          common.error('no such file or directory: ' + file, {
            continue: true
          });
          return;
        } else if (common.statFollowLinks(file).isDirectory()) {
          common.error("error reading '" + file + "': Is a directory", {
            continue: true
          });
          return;
        }
      }

      var contents;

      if (file === '-') {
        contents = pipe;
      } else if (options.numLines < 0) {
        contents = fs.readFileSync(file, 'utf8');
      } else {
        contents = readSomeLines(file, options.numLines);
      }

      var lines = contents.split('\n');
      var hasTrailingNewline = lines[lines.length - 1] === '';

      if (hasTrailingNewline) {
        lines.pop();
      }

      shouldAppendNewline = hasTrailingNewline || options.numLines < lines.length;
      head = head.concat(lines.slice(0, options.numLines));
    });

    if (shouldAppendNewline) {
      head.push('');
    }

    return head.join('\n');
  }

  head = _head;
  return head;
}

var ln;
var hasRequiredLn;

function requireLn() {
  if (hasRequiredLn) return ln;
  hasRequiredLn = 1;
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  var common = requireCommon();
  common.register('ln', _ln, {
    cmdOptions: {
      's': 'symlink',
      'f': 'force'
    }
  });

  function _ln(options, source, dest) {
    if (!source || !dest) {
      common.error('Missing <source> and/or <dest>');
    }

    source = String(source);
    var sourcePath = path.normalize(source).replace(RegExp(path.sep + '$'), '');
    var isAbsolute = path.resolve(source) === sourcePath;
    dest = path.resolve(process.cwd(), String(dest));

    if (fs.existsSync(dest)) {
      if (!options.force) {
        common.error('Destination file exists', {
          continue: true
        });
      }

      fs.unlinkSync(dest);
    }

    if (options.symlink) {
      var isWindows = process.platform === 'win32';
      var linkType = isWindows ? 'file' : null;
      var resolvedSourcePath = isAbsolute ? sourcePath : path.resolve(process.cwd(), path.dirname(dest), source);

      if (!fs.existsSync(resolvedSourcePath)) {
        common.error('Source file does not exist', {
          continue: true
        });
      } else if (isWindows && common.statFollowLinks(resolvedSourcePath).isDirectory()) {
        linkType = 'junction';
      }

      try {
        fs.symlinkSync(linkType === 'junction' ? resolvedSourcePath : source, dest, linkType);
      } catch (err) {
        common.error(err.message);
      }
    } else {
      if (!fs.existsSync(source)) {
        common.error('Source file does not exist', {
          continue: true
        });
      }

      try {
        fs.linkSync(source, dest);
      } catch (err) {
        common.error(err.message);
      }
    }

    return '';
  }

  ln = _ln;
  return ln;
}

var mkdir;
var hasRequiredMkdir;

function requireMkdir() {
  if (hasRequiredMkdir) return mkdir;
  hasRequiredMkdir = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  common.register('mkdir', _mkdir, {
    cmdOptions: {
      'p': 'fullpath'
    }
  });

  function mkdirSyncRecursive(dir) {
    var baseDir = path.dirname(dir);

    if (baseDir === dir) {
      common.error('dirname() failed: [' + dir + ']');
    }

    if (fs.existsSync(baseDir)) {
      fs.mkdirSync(dir, parseInt('0777', 8));
      return;
    }

    mkdirSyncRecursive(baseDir);
    fs.mkdirSync(dir, parseInt('0777', 8));
  }

  function _mkdir(options, dirs) {
    if (!dirs) common.error('no paths given');

    if (typeof dirs === 'string') {
      dirs = [].slice.call(arguments, 1);
    }

    dirs.forEach(function (dir) {
      try {
        var stat = common.statNoFollowLinks(dir);

        if (!options.fullpath) {
          common.error('path already exists: ' + dir, {
            continue: true
          });
        } else if (stat.isFile()) {
          common.error('cannot create directory ' + dir + ': File exists', {
            continue: true
          });
        }

        return;
      } catch (e) {}

      var baseDir = path.dirname(dir);

      if (!fs.existsSync(baseDir) && !options.fullpath) {
        common.error('no such file or directory: ' + baseDir, {
          continue: true
        });
        return;
      }

      try {
        if (options.fullpath) {
          mkdirSyncRecursive(path.resolve(dir));
        } else {
          fs.mkdirSync(dir, parseInt('0777', 8));
        }
      } catch (e) {
        var reason;

        if (e.code === 'EACCES') {
          reason = 'Permission denied';
        } else if (e.code === 'ENOTDIR' || e.code === 'ENOENT') {
          reason = 'Not a directory';
        } else {
          throw e;
        }

        common.error('cannot create directory ' + dir + ': ' + reason, {
          continue: true
        });
      }
    });
    return '';
  }

  mkdir = _mkdir;
  return mkdir;
}

var rm;
var hasRequiredRm;

function requireRm() {
  if (hasRequiredRm) return rm;
  hasRequiredRm = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('rm', _rm, {
    cmdOptions: {
      'f': 'force',
      'r': 'recursive',
      'R': 'recursive'
    }
  });

  function rmdirSyncRecursive(dir, force, fromSymlink) {
    var files;
    files = fs.readdirSync(dir);

    for (var i = 0; i < files.length; i++) {
      var file = dir + '/' + files[i];
      var currFile = common.statNoFollowLinks(file);

      if (currFile.isDirectory()) {
        rmdirSyncRecursive(file, force);
      } else {
        if (force || isWriteable(file)) {
          try {
            common.unlinkSync(file);
          } catch (e) {
            common.error('could not remove file (code ' + e.code + '): ' + file, {
              continue: true
            });
          }
        }
      }
    }

    if (fromSymlink) return;
    var result;

    try {
      var start = Date.now();

      for (;;) {
        try {
          result = fs.rmdirSync(dir);
          if (fs.existsSync(dir)) throw {
            code: 'EAGAIN'
          };
          break;
        } catch (er) {
          if (process.platform === 'win32' && (er.code === 'ENOTEMPTY' || er.code === 'EBUSY' || er.code === 'EPERM' || er.code === 'EAGAIN')) {
            if (Date.now() - start > 1000) throw er;
          } else if (er.code === 'ENOENT') {
            break;
          } else {
            throw er;
          }
        }
      }
    } catch (e) {
      common.error('could not remove directory (code ' + e.code + '): ' + dir, {
        continue: true
      });
    }

    return result;
  }

  function isWriteable(file) {
    var writePermission = true;

    try {
      var __fd = fs.openSync(file, 'a');

      fs.closeSync(__fd);
    } catch (e) {
      writePermission = false;
    }

    return writePermission;
  }

  function handleFile(file, options) {
    if (options.force || isWriteable(file)) {
      common.unlinkSync(file);
    } else {
      common.error('permission denied: ' + file, {
        continue: true
      });
    }
  }

  function handleDirectory(file, options) {
    if (options.recursive) {
      rmdirSyncRecursive(file, options.force);
    } else {
      common.error('path is a directory', {
        continue: true
      });
    }
  }

  function handleSymbolicLink(file, options) {
    var stats;

    try {
      stats = common.statFollowLinks(file);
    } catch (e) {
      common.unlinkSync(file);
      return;
    }

    if (stats.isFile()) {
      common.unlinkSync(file);
    } else if (stats.isDirectory()) {
      if (file[file.length - 1] === '/') {
        if (options.recursive) {
          var fromSymlink = true;
          rmdirSyncRecursive(file, options.force, fromSymlink);
        } else {
          common.error('path is a directory', {
            continue: true
          });
        }
      } else {
        common.unlinkSync(file);
      }
    }
  }

  function handleFIFO(file) {
    common.unlinkSync(file);
  }

  function _rm(options, files) {
    if (!files) common.error('no paths given');
    files = [].slice.call(arguments, 1);
    files.forEach(function (file) {
      var lstats;

      try {
        var filepath = file[file.length - 1] === '/' ? file.slice(0, -1) : file;
        lstats = common.statNoFollowLinks(filepath);
      } catch (e) {
        if (!options.force) {
          common.error('no such file or directory: ' + file, {
            continue: true
          });
        }

        return;
      }

      if (lstats.isFile()) {
        handleFile(file, options);
      } else if (lstats.isDirectory()) {
        handleDirectory(file, options);
      } else if (lstats.isSymbolicLink()) {
        handleSymbolicLink(file, options);
      } else if (lstats.isFIFO()) {
        handleFIFO(file);
      }
    });
    return '';
  }

  rm = _rm;
  return rm;
}

var mv;
var hasRequiredMv;

function requireMv() {
  if (hasRequiredMv) return mv;
  hasRequiredMv = 1;
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  var common = requireCommon();
  var cp = requireCp();
  var rm = requireRm();
  common.register('mv', _mv, {
    cmdOptions: {
      'f': '!no_force',
      'n': 'no_force'
    }
  });

  function checkRecentCreated(sources, index) {
    var lookedSource = sources[index];
    return sources.slice(0, index).some(function (src) {
      return path.basename(src) === path.basename(lookedSource);
    });
  }

  function _mv(options, sources, dest) {
    if (arguments.length < 3) {
      common.error('missing <source> and/or <dest>');
    } else if (arguments.length > 3) {
      sources = [].slice.call(arguments, 1, arguments.length - 1);
      dest = arguments[arguments.length - 1];
    } else if (typeof sources === 'string') {
      sources = [sources];
    } else {
      common.error('invalid arguments');
    }

    var exists = fs.existsSync(dest);
    var stats = exists && common.statFollowLinks(dest);

    if ((!exists || !stats.isDirectory()) && sources.length > 1) {
      common.error('dest is not a directory (too many sources)');
    }

    if (exists && stats.isFile() && options.no_force) {
      common.error('dest file already exists: ' + dest);
    }

    sources.forEach(function (src, srcIndex) {
      if (!fs.existsSync(src)) {
        common.error('no such file or directory: ' + src, {
          continue: true
        });
        return;
      }

      var thisDest = dest;

      if (fs.existsSync(dest) && common.statFollowLinks(dest).isDirectory()) {
        thisDest = path.normalize(dest + '/' + path.basename(src));
      }

      var thisDestExists = fs.existsSync(thisDest);

      if (thisDestExists && checkRecentCreated(sources, srcIndex)) {
        if (!options.no_force) {
          common.error("will not overwrite just-created '" + thisDest + "' with '" + src + "'", {
            continue: true
          });
        }

        return;
      }

      if (fs.existsSync(thisDest) && options.no_force) {
        common.error('dest file already exists: ' + thisDest, {
          continue: true
        });
        return;
      }

      if (path.resolve(src) === path.dirname(path.resolve(thisDest))) {
        common.error('cannot move to self: ' + src, {
          continue: true
        });
        return;
      }

      try {
        fs.renameSync(src, thisDest);
      } catch (e) {
        if (e.code === 'EXDEV') {
          cp('-r', src, thisDest);
          rm('-rf', src);
        }
      }
    });
    return '';
  }

  mv = _mv;
  return mv;
}

var popd = {};

var hasRequiredPopd;

function requirePopd() {
  if (hasRequiredPopd) return popd;
  hasRequiredPopd = 1;
  return popd;
}

var pushd = {};

var hasRequiredPushd;

function requirePushd() {
  if (hasRequiredPushd) return pushd;
  hasRequiredPushd = 1;
  return pushd;
}

var sed;
var hasRequiredSed;

function requireSed() {
  if (hasRequiredSed) return sed;
  hasRequiredSed = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('sed', _sed, {
    globStart: 3,
    canReceivePipe: true,
    cmdOptions: {
      'i': 'inplace'
    }
  });

  function _sed(options, regex, replacement, files) {
    var pipe = common.readFromPipe();

    if (typeof replacement !== 'string' && typeof replacement !== 'function') {
      if (typeof replacement === 'number') {
        replacement = replacement.toString();
      } else {
        common.error('invalid replacement string');
      }
    }

    if (typeof regex === 'string') {
      regex = RegExp(regex);
    }

    if (!files && !pipe) {
      common.error('no files given');
    }

    files = [].slice.call(arguments, 3);

    if (pipe) {
      files.unshift('-');
    }

    var sed = [];
    files.forEach(function (file) {
      if (!fs.existsSync(file) && file !== '-') {
        common.error('no such file or directory: ' + file, 2, {
          continue: true
        });
        return;
      }

      var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');
      var lines = contents.split('\n');
      var result = lines.map(function (line) {
        return line.replace(regex, replacement);
      }).join('\n');
      sed.push(result);

      if (options.inplace) {
        fs.writeFileSync(file, result, 'utf8');
      }
    });
    return sed.join('\n');
  }

  sed = _sed;
  return sed;
}

var set;
var hasRequiredSet;

function requireSet() {
  if (hasRequiredSet) return set;
  hasRequiredSet = 1;
  var common = requireCommon();
  common.register('set', _set, {
    allowGlobbing: false,
    wrapOutput: false
  });

  function _set(options) {
    if (!options) {
      var args = [].slice.call(arguments, 0);
      if (args.length < 2) common.error('must provide an argument');
      options = args[1];
    }

    var negate = options[0] === '+';

    if (negate) {
      options = '-' + options.slice(1);
    }

    options = common.parseOptions(options, {
      'e': 'fatal',
      'v': 'verbose',
      'f': 'noglob'
    });

    if (negate) {
      Object.keys(options).forEach(function (key) {
        options[key] = !options[key];
      });
    }

    Object.keys(options).forEach(function (key) {
      if (negate !== options[key]) {
        common.config[key] = options[key];
      }
    });
    return;
  }

  set = _set;
  return set;
}

var $trimEnd = stringTrim.end;
var forcedStringTrimMethod = stringTrimForced;

// `String.prototype.{ trimEnd, trimRight }` method
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// https://tc39.es/ecma262/#String.prototype.trimright
var stringTrimEnd = forcedStringTrimMethod('trimEnd') ? function trimEnd() {
  return $trimEnd(this);
// eslint-disable-next-line es-x/no-string-prototype-trimstart-trimend -- safe
} : ''.trimEnd;

var $$1 = _export;
var trimEnd$1 = stringTrimEnd;

// `String.prototype.trimRight` method
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// eslint-disable-next-line es-x/no-string-prototype-trimleft-trimright -- safe
$$1({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimRight !== trimEnd$1 }, {
  trimRight: trimEnd$1
});

// TODO: Remove this line from `core-js@4`

var $ = _export;
var trimEnd = stringTrimEnd;

// `String.prototype.trimEnd` method
// https://tc39.es/ecma262/#sec-string.prototype.trimend
// eslint-disable-next-line es-x/no-string-prototype-trimstart-trimend -- safe
$({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimEnd !== trimEnd }, {
  trimEnd: trimEnd
});

var sort;
var hasRequiredSort;

function requireSort() {
  if (hasRequiredSort) return sort;
  hasRequiredSort = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('sort', _sort, {
    canReceivePipe: true,
    cmdOptions: {
      'r': 'reverse',
      'n': 'numerical'
    }
  });

  function parseNumber(str) {
    var match = str.match(/^\s*(\d*)\s*(.*)$/);
    return {
      num: Number(match[1]),
      value: match[2]
    };
  }

  function unixCmp(a, b) {
    var aLower = a.toLowerCase();
    var bLower = b.toLowerCase();
    return aLower === bLower ? -1 * a.localeCompare(b) : aLower.localeCompare(bLower);
  }

  function numericalCmp(a, b) {
    var objA = parseNumber(a);
    var objB = parseNumber(b);

    if (objA.hasOwnProperty('num') && objB.hasOwnProperty('num')) {
      return objA.num !== objB.num ? objA.num - objB.num : unixCmp(objA.value, objB.value);
    } else {
      return unixCmp(objA.value, objB.value);
    }
  }

  function _sort(options, files) {
    var pipe = common.readFromPipe();
    if (!files && !pipe) common.error('no files given');
    files = [].slice.call(arguments, 1);

    if (pipe) {
      files.unshift('-');
    }

    var lines = files.reduce(function (accum, file) {
      if (file !== '-') {
        if (!fs.existsSync(file)) {
          common.error('no such file or directory: ' + file, {
            continue: true
          });
          return accum;
        } else if (common.statFollowLinks(file).isDirectory()) {
          common.error('read failed: ' + file + ': Is a directory', {
            continue: true
          });
          return accum;
        }
      }

      var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');
      return accum.concat(contents.trimRight().split('\n'));
    }, []);
    var sorted = lines.sort(options.numerical ? numericalCmp : unixCmp);

    if (options.reverse) {
      sorted = sorted.reverse();
    }

    return sorted.join('\n') + '\n';
  }

  sort = _sort;
  return sort;
}

var tail;
var hasRequiredTail;

function requireTail() {
  if (hasRequiredTail) return tail;
  hasRequiredTail = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('tail', _tail, {
    canReceivePipe: true,
    cmdOptions: {
      'n': 'numLines'
    }
  });

  function _tail(options, files) {
    var tail = [];
    var pipe = common.readFromPipe();
    if (!files && !pipe) common.error('no paths given');
    var idx = 1;

    if (options.numLines === true) {
      idx = 2;
      options.numLines = Number(arguments[1]);
    } else if (options.numLines === false) {
      options.numLines = 10;
    }

    options.numLines = -1 * Math.abs(options.numLines);
    files = [].slice.call(arguments, idx);

    if (pipe) {
      files.unshift('-');
    }

    var shouldAppendNewline = false;
    files.forEach(function (file) {
      if (file !== '-') {
        if (!fs.existsSync(file)) {
          common.error('no such file or directory: ' + file, {
            continue: true
          });
          return;
        } else if (common.statFollowLinks(file).isDirectory()) {
          common.error("error reading '" + file + "': Is a directory", {
            continue: true
          });
          return;
        }
      }

      var contents = file === '-' ? pipe : fs.readFileSync(file, 'utf8');
      var lines = contents.split('\n');

      if (lines[lines.length - 1] === '') {
        lines.pop();
        shouldAppendNewline = true;
      } else {
        shouldAppendNewline = false;
      }

      tail = tail.concat(lines.slice(options.numLines));
    });

    if (shouldAppendNewline) {
      tail.push('');
    }

    return tail.join('\n');
  }

  tail = _tail;
  return tail;
}

var test;
var hasRequiredTest;

function requireTest() {
  if (hasRequiredTest) return test;
  hasRequiredTest = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('test', _test, {
    cmdOptions: {
      'b': 'block',
      'c': 'character',
      'd': 'directory',
      'e': 'exists',
      'f': 'file',
      'L': 'link',
      'p': 'pipe',
      'S': 'socket'
    },
    wrapOutput: false,
    allowGlobbing: false
  });

  function _test(options, path) {
    if (!path) common.error('no path given');
    var canInterpret = false;
    Object.keys(options).forEach(function (key) {
      if (options[key] === true) {
        canInterpret = true;
      }
    });
    if (!canInterpret) common.error('could not interpret expression');

    if (options.link) {
      try {
        return common.statNoFollowLinks(path).isSymbolicLink();
      } catch (e) {
        return false;
      }
    }

    if (!fs.existsSync(path)) return false;
    if (options.exists) return true;
    var stats = common.statFollowLinks(path);
    if (options.block) return stats.isBlockDevice();
    if (options.character) return stats.isCharacterDevice();
    if (options.directory) return stats.isDirectory();
    if (options.file) return stats.isFile();
    if (options.pipe) return stats.isFIFO();
    if (options.socket) return stats.isSocket();
    return false;
  }

  test = _test;
  return test;
}

var to;
var hasRequiredTo;

function requireTo() {
  if (hasRequiredTo) return to;
  hasRequiredTo = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  common.register('to', _to, {
    pipeOnly: true,
    wrapOutput: false
  });

  function _to(options, file) {
    if (!file) common.error('wrong arguments');

    if (!fs.existsSync(path.dirname(file))) {
      common.error('no such file or directory: ' + path.dirname(file));
    }

    try {
      fs.writeFileSync(file, this.stdout || this.toString(), 'utf8');
      return this;
    } catch (e) {
      common.error('could not write to file (code ' + e.code + '): ' + file, {
        continue: true
      });
    }
  }

  to = _to;
  return to;
}

var toEnd;
var hasRequiredToEnd;

function requireToEnd() {
  if (hasRequiredToEnd) return toEnd;
  hasRequiredToEnd = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  common.register('toEnd', _toEnd, {
    pipeOnly: true,
    wrapOutput: false
  });

  function _toEnd(options, file) {
    if (!file) common.error('wrong arguments');

    if (!fs.existsSync(path.dirname(file))) {
      common.error('no such file or directory: ' + path.dirname(file));
    }

    try {
      fs.appendFileSync(file, this.stdout || this.toString(), 'utf8');
      return this;
    } catch (e) {
      common.error('could not append to file (code ' + e.code + '): ' + file, {
        continue: true
      });
    }
  }

  toEnd = _toEnd;
  return toEnd;
}

var touch;
var hasRequiredTouch;

function requireTouch() {
  if (hasRequiredTouch) return touch;
  hasRequiredTouch = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  common.register('touch', _touch, {
    cmdOptions: {
      'a': 'atime_only',
      'c': 'no_create',
      'd': 'date',
      'm': 'mtime_only',
      'r': 'reference'
    }
  });

  function _touch(opts, files) {
    if (!files) {
      common.error('no files given');
    } else if (typeof files === 'string') {
      files = [].slice.call(arguments, 1);
    } else {
      common.error('file arg should be a string file path or an Array of string file paths');
    }

    files.forEach(function (f) {
      touchFile(opts, f);
    });
    return '';
  }

  function touchFile(opts, file) {
    var stat = tryStatFile(file);

    if (stat && stat.isDirectory()) {
      return;
    }

    if (!stat && opts.no_create) {
      return;
    }

    fs.closeSync(fs.openSync(file, 'a'));
    var now = new Date();
    var mtime = opts.date || now;
    var atime = opts.date || now;

    if (opts.reference) {
      var refStat = tryStatFile(opts.reference);

      if (!refStat) {
        common.error('failed to get attributess of ' + opts.reference);
      }

      mtime = refStat.mtime;
      atime = refStat.atime;
    } else if (opts.date) {
      mtime = opts.date;
      atime = opts.date;
    }

    if (opts.atime_only && opts.mtime_only) ; else if (opts.atime_only) {
      mtime = stat.mtime;
    } else if (opts.mtime_only) {
      atime = stat.atime;
    }

    fs.utimesSync(file, atime, mtime);
  }

  touch = _touch;

  function tryStatFile(filePath) {
    try {
      return common.statFollowLinks(filePath);
    } catch (e) {
      return null;
    }
  }

  return touch;
}

var uniq;
var hasRequiredUniq;

function requireUniq() {
  if (hasRequiredUniq) return uniq;
  hasRequiredUniq = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];

  function lpad(c, str) {
    var res = '' + str;

    if (res.length < c) {
      res = Array(c - res.length + 1).join(' ') + res;
    }

    return res;
  }

  common.register('uniq', _uniq, {
    canReceivePipe: true,
    cmdOptions: {
      'i': 'ignoreCase',
      'c': 'count',
      'd': 'duplicates'
    }
  });

  function _uniq(options, input, output) {
    var pipe = common.readFromPipe();

    if (!pipe) {
      if (!input) common.error('no input given');

      if (!fs.existsSync(input)) {
        common.error(input + ': No such file or directory');
      } else if (common.statFollowLinks(input).isDirectory()) {
        common.error("error reading '" + input + "'");
      }
    }

    if (output && fs.existsSync(output) && common.statFollowLinks(output).isDirectory()) {
      common.error(output + ': Is a directory');
    }

    var lines = (input ? fs.readFileSync(input, 'utf8') : pipe).trimRight().split('\n');

    var compare = function compare(a, b) {
      return options.ignoreCase ? a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()) : a.localeCompare(b);
    };

    var uniqed = lines.reduceRight(function (res, e) {
      if (res.length === 0) {
        return [{
          count: 1,
          ln: e
        }];
      } else if (compare(res[0].ln, e) === 0) {
        return [{
          count: res[0].count + 1,
          ln: e
        }].concat(res.slice(1));
      } else {
        return [{
          count: 1,
          ln: e
        }].concat(res);
      }
    }, []).filter(function (obj) {
      return options.duplicates ? obj.count > 1 : true;
    }).map(function (obj) {
      return (options.count ? lpad(7, obj.count) + ' ' : '') + obj.ln;
    }).join('\n') + '\n';

    if (output) {
      new common.ShellString(uniqed).to(output);
      return '';
    } else {
      return uniqed;
    }
  }

  uniq = _uniq;
  return uniq;
}

var which;
var hasRequiredWhich;

function requireWhich() {
  if (hasRequiredWhich) return which;
  hasRequiredWhich = 1;
  var common = requireCommon();
  var fs = require$$1__default["default"];
  var path = require$$2__default["default"];
  common.register('which', _which, {
    allowGlobbing: false,
    cmdOptions: {
      'a': 'all'
    }
  });
  var XP_DEFAULT_PATHEXT = '.com;.exe;.bat;.cmd;.vbs;.vbe;.js;.jse;.wsf;.wsh';
  var FILE_EXECUTABLE_MODE = 1;

  function isWindowsPlatform() {
    return process.platform === 'win32';
  }

  function splitPath(p) {
    return p ? p.split(path.delimiter) : [];
  }

  function isExecutable(pathName) {
    try {
      fs.accessSync(pathName, FILE_EXECUTABLE_MODE);
    } catch (err) {
      return false;
    }

    return true;
  }

  function checkPath(pathName) {
    return fs.existsSync(pathName) && !common.statFollowLinks(pathName).isDirectory() && (isWindowsPlatform() || isExecutable(pathName));
  }

  function _which(options, cmd) {
    if (!cmd) common.error('must specify command');
    var isWindows = isWindowsPlatform();
    var pathArray = splitPath(process.env.PATH);
    var queryMatches = [];

    if (cmd.indexOf('/') === -1) {
      var pathExtArray = [''];

      if (isWindows) {
        var pathExtEnv = process.env.PATHEXT || XP_DEFAULT_PATHEXT;
        pathExtArray = splitPath(pathExtEnv.toUpperCase());
      }

      for (var k = 0; k < pathArray.length; k++) {
        if (queryMatches.length > 0 && !options.all) break;
        var attempt = path.resolve(pathArray[k], cmd);

        if (isWindows) {
          attempt = attempt.toUpperCase();
        }

        var match = attempt.match(/\.[^<>:"/\|?*.]+$/);

        if (match && pathExtArray.indexOf(match[0]) >= 0) {
          if (checkPath(attempt)) {
            queryMatches.push(attempt);
            break;
          }
        } else {
          for (var i = 0; i < pathExtArray.length; i++) {
            var ext = pathExtArray[i];
            var newAttempt = attempt + ext;

            if (checkPath(newAttempt)) {
              queryMatches.push(newAttempt);
              break;
            }
          }
        }
      }
    } else if (checkPath(cmd)) {
      queryMatches.push(path.resolve(cmd));
    }

    if (queryMatches.length > 0) {
      return options.all ? queryMatches : queryMatches[0];
    }

    return options.all ? [] : null;
  }

  which = _which;
  return which;
}

var dynamicModules;

function getDynamicModules() {
	return dynamicModules || (dynamicModules = {
		"/node_modules/shelljs/src/cat.js": requireCat,
		"/node_modules/shelljs/src/cd.js": requireCd,
		"/node_modules/shelljs/src/chmod.js": requireChmod,
		"/node_modules/shelljs/src/common.js": requireCommon,
		"/node_modules/shelljs/src/cp.js": requireCp,
		"/node_modules/shelljs/src/dirs.js": requireDirs,
		"/node_modules/shelljs/src/echo.js": requireEcho,
		"/node_modules/shelljs/src/error.js": requireError,
		"/node_modules/shelljs/src/exec-child.js": requireExecChild,
		"/node_modules/shelljs/src/exec.js": requireExec,
		"/node_modules/shelljs/src/find.js": requireFind,
		"/node_modules/shelljs/src/grep.js": requireGrep,
		"/node_modules/shelljs/src/head.js": requireHead,
		"/node_modules/shelljs/src/ln.js": requireLn,
		"/node_modules/shelljs/src/ls.js": requireLs,
		"/node_modules/shelljs/src/mkdir.js": requireMkdir,
		"/node_modules/shelljs/src/mv.js": requireMv,
		"/node_modules/shelljs/src/popd.js": requirePopd,
		"/node_modules/shelljs/src/pushd.js": requirePushd,
		"/node_modules/shelljs/src/pwd.js": requirePwd,
		"/node_modules/shelljs/src/rm.js": requireRm,
		"/node_modules/shelljs/src/sed.js": requireSed,
		"/node_modules/shelljs/src/set.js": requireSet,
		"/node_modules/shelljs/src/sort.js": requireSort,
		"/node_modules/shelljs/src/tail.js": requireTail,
		"/node_modules/shelljs/src/tempdir.js": requireTempdir,
		"/node_modules/shelljs/src/test.js": requireTest,
		"/node_modules/shelljs/src/to.js": requireTo,
		"/node_modules/shelljs/src/toEnd.js": requireToEnd,
		"/node_modules/shelljs/src/touch.js": requireTouch,
		"/node_modules/shelljs/src/uniq.js": requireUniq,
		"/node_modules/shelljs/src/which.js": requireWhich
	});
}

function createCommonjsRequire(originalModuleDir) {
	function handleRequire(path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return getDynamicModules()[resolvedPath]();
		}
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}
	handleRequire.resolve = function (path) {
		var resolvedPath = commonjsResolve(path, originalModuleDir);
		if (resolvedPath !== null) {
			return resolvedPath;
		}
		return require.resolve(path);
	};
	return handleRequire;
}

function commonjsResolve (path, originalModuleDir) {
	var shouldTryNodeModules = isPossibleNodeModulesPath(path);
	path = normalize(path);
	var relPath;
	if (path[0] === '/') {
		originalModuleDir = '';
	}
	var modules = getDynamicModules();
	var checkedExtensions = ['', '.js', '.json'];
	while (true) {
		if (!shouldTryNodeModules) {
			relPath = normalize(originalModuleDir + '/' + path);
		} else {
			relPath = normalize(originalModuleDir + '/node_modules/' + path);
		}

		if (relPath.endsWith('/..')) {
			break; // Travelled too far up, avoid infinite loop
		}

		for (var extensionIndex = 0; extensionIndex < checkedExtensions.length; extensionIndex++) {
			var resolvedPath = relPath + checkedExtensions[extensionIndex];
			if (modules[resolvedPath]) {
				return resolvedPath;
			}
		}
		if (!shouldTryNodeModules) break;
		var nextDir = normalize(originalModuleDir + '/..');
		if (nextDir === originalModuleDir) break;
		originalModuleDir = nextDir;
	}
	return null;
}

function isPossibleNodeModulesPath (modulePath) {
	var c0 = modulePath[0];
	if (c0 === '/' || c0 === '\\') return false;
	var c1 = modulePath[1], c2 = modulePath[2];
	if ((c0 === '.' && (!c1 || c1 === '/' || c1 === '\\')) ||
		(c0 === '.' && c1 === '.' && (!c2 || c2 === '/' || c2 === '\\'))) return false;
	if (c1 === ':' && (c2 === '/' || c2 === '\\')) return false;
	return true;
}

function normalize (path) {
	path = path.replace(/\\/g, '/');
	var parts = path.split('/');
	var slashed = parts[0] === '';
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] === '.' || parts[i] === '') {
			parts.splice(i--, 1);
		}
	}
	for (var i = 1; i < parts.length; i++) {
		if (parts[i] !== '..') continue;
		if (i > 0 && parts[i - 1] !== '..' && parts[i - 1] !== '.') {
			parts.splice(--i, 2);
			i--;
		}
	}
	path = parts.join('/');
	if (slashed && path[0] !== '/') path = '/' + path;
	else if (path.length === 0) path = '.';
	return path;
}

var shell$2 = {};

var commands = ['cat', 'cd', 'chmod', 'cp', 'dirs', 'echo', 'exec', 'find', 'grep', 'head', 'ln', 'ls', 'mkdir', 'mv', 'pwd', 'rm', 'sed', 'set', 'sort', 'tail', 'tempdir', 'test', 'to', 'toEnd', 'touch', 'uniq', 'which'];

var hasRequiredShell;

function requireShell() {
  if (hasRequiredShell) return shell$2;
  hasRequiredShell = 1;
  var common = requireCommon();
  commands.forEach(function (command) {
    createCommonjsRequire("/node_modules/shelljs")('./src/' + command);
  });
  shell$2.exit = process.exit;
  shell$2.error = requireError();
  shell$2.ShellString = common.ShellString;
  shell$2.env = process.env;
  shell$2.config = common.config;
  return shell$2;
}

var shell$1 = requireShell();
var common = requireCommon();
Object.keys(shell$1).forEach(function (cmd) {
  commonjsGlobal[cmd] = shell$1[cmd];
});

var _to = requireTo();

String.prototype.to = common.wrap('to', _to);

var _toEnd = requireToEnd();

String.prototype.toEnd = common.wrap('toEnd', _toEnd);

commonjsGlobal.config.fatal = true;
commonjsGlobal.target = {};
var args = process.argv.slice(2),
    targetArgs,
    dashesLoc = args.indexOf('--');

if (dashesLoc > -1) {
  targetArgs = args.slice(dashesLoc + 1, args.length);
  args = args.slice(0, dashesLoc);
}

setTimeout(function () {
  var t;

  if (args.length === 1 && args[0] === '--help') {
    console.log('Available targets:');

    for (t in commonjsGlobal.target) console.log('  ' + t);

    return;
  }

  for (t in commonjsGlobal.target) {
    (function (t, oldTarget) {
      commonjsGlobal.target[t] = function () {
        if (!oldTarget.done) {
          oldTarget.done = true;
          oldTarget.result = oldTarget.apply(oldTarget, arguments);
        }

        return oldTarget.result;
      };
    })(t, commonjsGlobal.target[t]);
  }

  if (args.length > 0) {
    args.forEach(function (arg) {
      if (arg in commonjsGlobal.target) commonjsGlobal.target[arg](targetArgs);else {
        console.log('no such target: ' + arg);
      }
    });
  } else if ('all' in commonjsGlobal.target) {
    commonjsGlobal.target.all(targetArgs);
  }
}, 0);

const shell = global;
const target = new Proxy(global.target, {
  set: function set(obj, prop, value) {
    return Reflect.set(...arguments);
  },
  get: function get(obj, prop, receiver) {
    print(`make ${prop}`);
    return Reflect.get(...arguments);
  }
});
const SOURCES = ["packages", "codemods", "eslint"];
const EslintArgs = ["eslint", "scripts", "benchmark", ...SOURCES, "*.{js,cjs,mjs,ts}", "--format", "codeframe", "--ext", ".js,.cjs,.mjs,.ts"];
const YARN_PATH = shell.which("yarn").stdout;
const NODE_PATH = process.execPath;
shell.config.verbose = true;

function print(...msgs) {
  console.log.apply(console, msgs);
}

function exec(executable, args, cwd, inheritStdio = true) {
  print(`${executable.replaceAll(YARN_PATH, "yarn").replaceAll(NODE_PATH, "node")} ${args.join(" ")}`);

  try {
    return require$$0$1.execFileSync(executable, args, {
      stdio: inheritStdio ? "inherit" : undefined,
      cwd: cwd && require$$2__default["default"].resolve(cwd),
      env: process.env
    });
  } catch (error) {
    if (inheritStdio && error.status != 0) {
      console.error(new Error(`\ncommand: ${executable} ${args.join(" ")}\ncode: ${error.status}`));
      process.exit(error.status);
    }

    throw error;
  }
}

function yarn(args, cwd, inheritStdio) {
  return exec(YARN_PATH, args, cwd, inheritStdio);
}

function node(args, cwd, inheritStdio) {
  return exec(NODE_PATH, args, cwd, inheritStdio);
}

function env(fun, env) {
  const envBak = process.env;
  process.env = Object.assign(Object.assign({}, envBak), env);
  fun();
  process.env = envBak;
}

target["clean-all"] = function () {
  ["node_modules", "package-lock.json", ".changelog"].forEach(path => {
    shell.rm("-rf", path);
  });
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/package-lock.json`);
  });
  target["clean"]();
  target["clean-lib"]();
};

target["clean"] = function () {
  target["test-clean"]();
  [".npmrc", "coverage", "packages/*/npm-debug*", "node_modules/.cache"].forEach(path => {
    shell.rm("-rf", path);
  });
};

target["test-clean"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/test/tmp`);
    shell.rm("-rf", `${source}/*/test-fixtures.json`);
  });
};

target["clean-lib"] = function () {
  SOURCES.forEach(source => {
    shell.rm("-rf", `${source}/*/lib`);
  });
};

target["clean-runtime-helpers"] = function () {
  ["packages/babel-runtime/helpers/**/*.js", "packages/babel-runtime-corejs2/helpers/**/*.js", "packages/babel-runtime-corejs3/helpers/**/*.js", "packages/babel-runtime/helpers/**/*.mjs", "packages/babel-runtime-corejs2/helpers/**/*.mjs", "packages/babel-runtime-corejs3/helpers/**/*.mjs", "packages/babel-runtime-corejs2/core-js"].forEach(path => {
    shell.rm("-rf", path);
  });
};

target["use-cjs"] = function () {
  node(["scripts/set-module-type.js", "script"]);
  target["bootstrap"]();
};

target["use-esm"] = function () {
  node(["scripts/set-module-type.js", "module"]);
  target["bootstrap"]();
};

target["bootstrap-only"] = function () {
  target["clean-all"]();
  yarn(["install"]);
};

target["bootstrap"] = function () {
  target["bootstrap-only"]();
  target["generate-tsconfig"]();
  target["build"]();
};

target["build"] = function () {
  target["build-no-bundle"]();

  if (process.env.BABEL_COVERAGE != "true") {
    target["build-standalone"]();
  }
};

target["build-standalone"] = function () {
  yarn(["gulp", "build-babel-standalone"]);
};

target["build-bundle"] = function () {
  target["clean"]();
  target["clean-lib"]();
  node(["scripts/set-module-type.js"]);
  yarn(["gulp", "build"]);
  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-no-bundle"] = function () {
  target["clean"]();
  target["clean-lib"]();
  node(["scripts/set-module-type.js"]);
  env(() => {
    yarn(["gulp", "build-dev"]);
  }, {
    BABEL_ENV: "development"
  });
  target["build-flow-typings"]();
  target["build-dist"]();
};

target["build-flow-typings"] = function () {
  require$$1.writeFileSync("packages/babel-types/lib/index.js.flow", node(["packages/babel-types/scripts/generators/flow.js"], undefined, false));
};

target["build-dist"] = function () {
  target["build-plugin-transform-runtime-dist"]();
};

target["build-plugin-transform-runtime-dist"] = function () {
  node(["scripts/build-dist.js"], "packages/babel-plugin-transform-runtime");
};

target["prepublish"] = function () {
  target["bootstrap-only"]();
  target["prepublish-build"]();
  env(() => {
    target["test"]();
  }, {
    IS_PUBLISH: "true"
  });
  node(["scripts/set-module-type.js", "clean"]);
};

target["prepublish-build"] = function () {
  target["clean-lib"]();
  target["clean-runtime-helpers"]();
  env(() => {
    target["build-bundle"]();
  }, {
    NODE_ENV: "production",
    BABEL_ENV: "production",
    STRIP_BABEL_8_FLAG: "true"
  });
  env(() => {
    target["prepublish-build-standalone"]();
    target["clone-license"]();
    target["prepublish-prepare-dts"]();
  }, {
    STRIP_BABEL_8_FLAG: "true"
  });
};

target["prepublish-build-standalone"] = function () {
  env(() => {
    target["build-standalone"]();
  }, {
    BABEL_ENV: "production",
    IS_PUBLISH: "true"
  });
};

target["prepublish-prepare-dts"] = function () {
  target["tscheck"]();
  yarn(["gulp", "bundle-dts"]);
  target["build-typescript-legacy-typings"]();
};

target["tscheck"] = function () {
  target["generate-tsconfig"]();
  shell.rm("-rf", "dts");
  yarn(["tsc", "-b", "."]);
};

target["generate-tsconfig"] = function () {
  node(["scripts/generators/tsconfig.js"]);
  node(["scripts/generators/archived-libs-typings.js"]);
};

target["generate-type-helpers"] = function () {
  yarn(["gulp", "generate-type-helpers"]);
};

target["build-typescript-legacy-typings"] = function () {
  require$$1.writeFileSync("packages/babel-types/lib/index-legacy.d.ts", node(["packages/babel-types/scripts/generators/typescript-legacy.js"], undefined, false));
};

target["clone-license"] = function () {
  node(["scripts/clone-license.js"]);
};

target["lint"] = function () {
  env(() => {
    yarn(EslintArgs);
  }, {
    BABEL_ENV: "test"
  });
};

target["fix"] = function () {
  target["fix-json"]();
  target["fix-js"]();
};

target["fix-js"] = function () {
  yarn([...EslintArgs, "--fix"]);
};

target["fix-json"] = function () {
  yarn(["prettier", `{${SOURCES.join(",")}}/*/test/fixtures/**/options.json`, "--write", "--loglevel", "warn"]);
};

target["watch"] = function () {
  target["build-no-bundle"]();
  env(() => {
    yarn(["gulp", "watch"]);
  }, {
    BABEL_ENV: "development",
    WATCH_SKIP_BUILD: "true"
  });
};

target["test"] = function () {
  target["lint"]();
  target["test-only"]();
};

target["test-only"] = function (args = []) {
  yarn(["jest", ...args]);
};

target["new-version-checklist"] = function () {
};

target["new-version"] = function () {
  target["new-version-checklist"]();
  exec("git", ["pull", "--rebase"]);
  yarn(["release-tool", "version", "-f", "@babel/standalone"]);
};

target["new-version"] = function () {
  target["new-version-checklist"]();
  exec("git", ["pull", "--rebase"]);
  yarn(["release-tool", "version", "-f", "@babel/standalone"]);
};
