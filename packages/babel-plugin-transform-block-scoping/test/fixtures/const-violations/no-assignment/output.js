function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var MULTIPLIER = 5;
MULTIPLIER = (_readOnlyError("MULTIPLIER"), "overwrite");
