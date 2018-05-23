function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var foo = 1;
_readOnlyError("foo"), foo++;
