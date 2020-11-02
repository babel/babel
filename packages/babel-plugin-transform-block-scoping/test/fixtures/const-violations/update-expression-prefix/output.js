function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var a = "str";
_readOnlyError("a"), --a;
