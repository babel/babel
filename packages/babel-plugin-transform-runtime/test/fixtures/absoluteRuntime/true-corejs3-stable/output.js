var _getIterator = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js/get-iterator");

var _Array$isArray = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js-stable/array/is-array");

var _getIteratorMethod = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js/get-iterator-method");

var _Symbol = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js-stable/symbol");

var _Array$from = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js-stable/array/from");

var _sliceInstanceProperty = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js-stable/instance/slice");

var _regeneratorRuntime = require("<CWD>/node_modules/@babel/runtime-corejs3/regenerator");

var _mapInstanceProperty = require("<CWD>/node_modules/@babel/runtime-corejs3/core-js-stable/instance/map");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context2; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(makeIterator);

_mapInstanceProperty(Array);

function makeIterator() {
  return _regeneratorRuntime.wrap(function makeIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
          _context.next = 4;
          return 2;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var _iterator = _createForOfIteratorHelper(makeIterator()),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var itItem = _step.value;
    console.log(itItem);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
