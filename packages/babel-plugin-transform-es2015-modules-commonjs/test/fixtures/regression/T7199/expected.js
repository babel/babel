"use strict";

var _foo = _interopRequireDefault(require("foo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _sliceIterator(arr, i) { const _arr = []; let _n = true; let _d = false; let _e, _i; try { let _s; for (_i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return _sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

const _bar = bar,
      _bar2 = _slicedToArray(_bar, 1),
      x = _bar2[0];
