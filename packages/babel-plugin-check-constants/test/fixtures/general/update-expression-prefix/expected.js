function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var a = "str";
_readOnlyError("a"), --a;
