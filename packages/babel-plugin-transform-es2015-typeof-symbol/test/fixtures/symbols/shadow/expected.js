function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = obj => typeof obj; } else { _typeof = obj => { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _Symbol = foo();

typeof s === "undefined" ? "undefined" : _typeof(s);
foo(_Symbol);
