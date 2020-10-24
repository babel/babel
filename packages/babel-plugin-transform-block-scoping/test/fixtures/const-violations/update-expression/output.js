function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var foo = 1;
_readOnlyError("foo"), foo++;
