// Copyright 2015 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import newUniqueString from '../new-unique-string.js';
import hasNativeSymbol from '../has-native-symbols.js';

const $create = Object.create;
const $defineProperty = Object.defineProperty;
const $freeze = Object.freeze;
const $getOwnPropertyNames = Object.getOwnPropertyNames;
const $keys = Object.keys;
const $TypeError = TypeError;

function nonEnum(value) {
  return {
    configurable: true,
    enumerable: false,
    value: value,
    writable: true
  };
}

// ### Symbols
//
// Symbols are emulated using an object which is an instance of SymbolValue.
// Calling Symbol as a function returns a symbol value object.
//
// Symbols just use toString as their internal representation, making them
// work but leak as enumerable properties.

// The string used for the real property.
var symbolInternalProperty = newUniqueString();
var symbolDescriptionProperty = newUniqueString();

// Used for the Symbol wrapper
var symbolDataProperty = newUniqueString();

// All symbol values are kept in this map. This is so that we can get back to
// the symbol object if all we have is the string key representing the symbol.
var symbolValues = $create(null);

/**
 * Creates a new unique symbol object.
 * @param {string=} string Optional string used for toString.
 * @constructor
 */
let SymbolImpl = function Symbol(description) {
  var value = new SymbolValue(description);
  if (!(this instanceof SymbolImpl))
    return value;

  // new Symbol should throw.
  //
  // There are two ways to get a wrapper to a symbol. Either by doing
  // Object(symbol) or call a non strict function using a symbol value as
  // this. To correctly handle these two would require a lot of work for very
  // little gain so we are not doing those at the moment.
  throw new $TypeError('Symbol cannot be new\'ed');
};

$defineProperty(SymbolImpl.prototype, 'constructor', nonEnum(SymbolImpl));
$defineProperty(SymbolImpl.prototype, 'toString', nonEnum(function() {
  var symbolValue = this[symbolDataProperty];
  return symbolValue[symbolInternalProperty];
  /* The implementation of toString below matches the spec, but prevents
  use of Symbols in eg generators unless --symbol is set. To simplify our
  code we deliberately go against the spec here.
  if (!symbolValue)
    throw $TypeError('Conversion from symbol to string');
  var desc = symbolValue[symbolDescriptionProperty];
  if (desc === undefined)
    desc = '';
  return 'Symbol(' + desc + ')';
  */
}));
$defineProperty(SymbolImpl.prototype, 'valueOf', nonEnum(function() {
  var symbolValue = this[symbolDataProperty];
  if (!symbolValue)
    throw $TypeError('Conversion from symbol to string');
  return symbolValue[symbolInternalProperty];
}));

function SymbolValue(description) {
  var key = newUniqueString();
  $defineProperty(this, symbolDataProperty, {value: this});
  $defineProperty(this, symbolInternalProperty, {value: key});
  $defineProperty(this, symbolDescriptionProperty, {value: description});
  $freeze(this);
  symbolValues[key] = this;
}
$defineProperty(SymbolValue.prototype, 'constructor', nonEnum(SymbolImpl));
$defineProperty(SymbolValue.prototype, 'toString', {
  value: SymbolImpl.prototype.toString,
  enumerable: false
});
$defineProperty(SymbolValue.prototype, 'valueOf', {
  value: SymbolImpl.prototype.valueOf,
  enumerable: false
});

$freeze(SymbolValue.prototype);

/**
 * Checks if the string is a string that is used to represent an emulated
 * symbol. This is used to filter out symbols in Object.keys,
 * getOwnPropertyKeys and for-in loops.
 */
function isSymbolString(s) {
  return symbolValues[s];
}

function removeSymbolKeys(array) {
  var rv = [];
  for (var i = 0; i < array.length; i++) {
    if (!isSymbolString(array[i])) {
      rv.push(array[i]);
    }
  }
  return rv;
}

// Override getOwnPropertyNames to filter out symbols keys.
function getOwnPropertyNames(object) {
  return removeSymbolKeys($getOwnPropertyNames(object));
}

function keys(object) {
  return removeSymbolKeys($keys(object));
}

function getOwnPropertySymbols(object) {
  var rv = [];
  var names = $getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var symbol = symbolValues[names[i]];
    if (symbol) {
      rv.push(symbol);
    }
  }
  return rv;
}

function polyfillSymbol(global) {
  let {Object} = global;
  if (!hasNativeSymbol()) {
    global.Symbol = SymbolImpl;
    Object.getOwnPropertyNames = getOwnPropertyNames;
    Object.keys = keys;
    $defineProperty(Object, 'getOwnPropertySymbols',
        nonEnum(getOwnPropertySymbols));
  }

  if (!global.Symbol.iterator) {
    global.Symbol.iterator = global.Symbol('Symbol.iterator');
  }
  if (!global.Symbol.observer) {
    global.Symbol.observer = global.Symbol('Symbol.observer');
  }
}

let g = typeof window !== 'undefined' ? window :
    typeof global !== 'undefined' ? global :
    typeof self !== 'undefined' ? self : this;
polyfillSymbol(g);

let typeOf = hasNativeSymbol() ?
    x => typeof x :
    x => x instanceof SymbolValue ? 'symbol' : typeof x;

export {typeOf as typeof};
