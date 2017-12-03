"use strict";
const path = require("path");
const URL = require("whatwg-url-compat").createURLConstructor();
const domSymbolTree = require("./living/helpers/internal-constants").domSymbolTree;
const SYMBOL_TREE_POSITION = require("symbol-tree").TreePosition;

exports.URL = URL;

exports.toFileUrl = function (fileName) {
  // Beyond just the `path.resolve`, this is mostly for the benefit of Windows,
  // where we need to convert "\" to "/" and add an extra "/" prefix before the
  // drive letter.
  let pathname = path.resolve(process.cwd(), fileName).replace(/\\/g, "/");
  if (pathname[0] !== "/") {
    pathname = "/" + pathname;
  }

  // path might contain spaces, so convert those to %20
  return "file://" + encodeURI(pathname);
};

/**
 * Define a setter on an object
 *
 * This method replaces any existing setter but leaves getters in place.
 *
 * - `object` {Object} the object to define the setter on
 * - `property` {String} the name of the setter
 * - `setterFn` {Function} the setter
 */
exports.defineSetter = function defineSetter(object, property, setterFn) {
  const descriptor = Object.getOwnPropertyDescriptor(object, property) || {
    configurable: true,
    enumerable: true
  };

  descriptor.set = setterFn;

  Object.defineProperty(object, property, descriptor);
};

/**
 * Define a getter on an object
 *
 * This method replaces any existing getter but leaves setters in place.
 *
 * - `object` {Object} the object to define the getter on
 * - `property` {String} the name of the getter
 * - `getterFn` {Function} the getter
 */
exports.defineGetter = function defineGetter(object, property, getterFn) {
  const descriptor = Object.getOwnPropertyDescriptor(object, property) || {
    configurable: true,
    enumerable: true
  };

  descriptor.get = getterFn;

  Object.defineProperty(object, property, descriptor);
};

/**
 * Create an object with the given prototype
 *
 * Optionally augment the created object.
 *
 * - `prototype` {Object} the created object's prototype
 * - `[properties]` {Object} properties to attach to the created object
 */
exports.createFrom = function createFrom(prototype, properties) {
  properties = properties || {};

  const descriptors = {};
  for (const name of Object.getOwnPropertyNames(properties)) {
    descriptors[name] = Object.getOwnPropertyDescriptor(properties, name);
  }
  for (const symbol of Object.getOwnPropertySymbols(properties)) {
    descriptors[symbol] = Object.getOwnPropertyDescriptor(properties, symbol);
  }

  return Object.create(prototype, descriptors);
};

/**
 * Create an inheritance relationship between two classes
 *
 * Optionally augment the inherited prototype.
 *
 * - `Superclass` {Function} the inherited class
 * - `Subclass` {Function} the inheriting class
 * - `[properties]` {Object} properties to attach to the inherited prototype
 */
exports.inheritFrom = function inheritFrom(Superclass, Subclass, properties) {
  properties = properties || {};

  Object.defineProperty(properties, "constructor", {
    value: Subclass,
    writable: true,
    configurable: true
  });

  Subclass.prototype = exports.createFrom(Superclass.prototype, properties);
};

/**
 * Define a set of properties on an object, by copying the property descriptors
 * from the original object.
 *
 * - `object` {Object} the target object
 * - `properties` {Object} the source from which to copy property descriptors
 */
exports.define = function define(object, properties) {
  for (const name of Object.getOwnPropertyNames(properties)) {
    const propDesc = Object.getOwnPropertyDescriptor(properties, name);
    Object.defineProperty(object, name, propDesc);
  }
};

/**
 * Define a list of constants on a constructor and its .prototype
 *
 * - `Constructor` {Function} the constructor to define the constants on
 * - `propertyMap` {Object}  key/value map of properties to define
 */
exports.addConstants = function addConstants(Constructor, propertyMap) {
  for (const property in propertyMap) {
    const value = propertyMap[property];
    addConstant(Constructor, property, value);
    addConstant(Constructor.prototype, property, value);
  }
};

function addConstant(object, property, value) {
  Object.defineProperty(object, property, {
    configurable: false,
    enumerable: true,
    writable: false,
    value
  });
}

let memoizeQueryTypeCounter = 0;

/**
 * Returns a version of a method that memoizes specific types of calls on the object
 *
 * - `fn` {Function} the method to be memozied
 */
exports.memoizeQuery = function memoizeQuery(fn) {
  // Only memoize query functions with arity <= 2
  if (fn.length > 2) {
    return fn;
  }

  const type = memoizeQueryTypeCounter++;

  return function () {
    if (!this._memoizedQueries) {
      return fn.apply(this, arguments);
    }

    if (!this._memoizedQueries[type]) {
      this._memoizedQueries[type] = Object.create(null);
    }

    let key;
    if (arguments.length === 1 && typeof arguments[0] === "string") {
      key = arguments[0];
    } else if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
      key = arguments[0] + "::" + arguments[1];
    } else {
      return fn.apply(this, arguments);
    }

    if (!(key in this._memoizedQueries[type])) {
      this._memoizedQueries[type][key] = fn.apply(this, arguments);
    }
    return this._memoizedQueries[type][key];
  };
};

exports.resolveHref = function resolveHref(baseUrl, href) {
  try {
    return new URL(href, baseUrl).href;
  } catch (e) {
    // can't throw since this utility is basically used everywhere
    // do what the spec says regarding anchor tags: just don't parse it
    // https://url.spec.whatwg.org/#dom-urlutils-href
    return href;
  }
};

exports.mapper = function (parent, filter, recursive) {
  function skipRoot(node) {
    return node !== parent && (!filter || filter(node));
  }
  return () => {
    if (recursive !== false) { // default is not recursive
      return domSymbolTree.treeToArray(parent, { filter: skipRoot });
    }

    return domSymbolTree.childrenToArray(parent, { filter });
  };
};

function isValidAbsoluteURL(str) {
  try {
    /* eslint-disable no-new */
    new URL(str);
    /* eslint-enable no-new */

    // If we can parse it, it's a valid absolute URL.
    return true;
  } catch (e) {
    return false;
  }
}

exports.isValidTargetOrigin = function (str) {
  return str === "*" || str === "/" || isValidAbsoluteURL(str);
};

exports.simultaneousIterators = function* (first, second) {
  for (;;) {
    const firstResult = first.next();
    const secondResult = second.next();

    if (firstResult.done && secondResult.done) {
      return;
    }

    yield [
      firstResult.done ? null : firstResult.value,
      secondResult.done ? null : secondResult.value
    ];
  }
};

exports.treeOrderSorter = function (a, b) {
  const compare = domSymbolTree.compareTreePosition(a, b);

  if (compare & SYMBOL_TREE_POSITION.PRECEDING) { // b is preceding a
    return 1;
  }

  if (compare & SYMBOL_TREE_POSITION.FOLLOWING) {
    return -1;
  }

  // disconnected or equal:
  return 0;
};

exports.lengthFromProperties = function (arrayLike) {
  let max = -1;
  const keys = Object.keys(arrayLike);
  const highestKeyIndex = keys.length - 1;

  // Abuses a v8 implementation detail for a very fast case
  // (if this implementation detail changes, this method will still
  //  return correct results)
  /* eslint-disable eqeqeq */
  if (highestKeyIndex == keys[highestKeyIndex]) { // not ===
    /* eslint-enable eqeqeq */
    return keys.length;
  }

  for (let i = highestKeyIndex; i >= 0; --i) {
    const asNumber = Number(keys[i]);

    if (!Number.isNaN(asNumber) && asNumber > max) {
      max = asNumber;
    }
  }
  return max + 1;
};

const base64Regexp = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;

exports.parseDataUrl = function parseDataUrl(url) {
  const urlParts = url.match(/^data:(.+?)(?:;(base64))?,(.*)$/);
  let buffer;
  if (urlParts[2] === "base64") {
    if (urlParts[3] && !base64Regexp.test(urlParts[3])) {
      throw new Error("Not a base64 string");
    }
    buffer = new Buffer(urlParts[3], "base64");
  } else {
    buffer = new Buffer(urlParts[3]);
  }
  return { buffer, type: urlParts[1] };
};
