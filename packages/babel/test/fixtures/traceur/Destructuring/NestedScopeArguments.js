// Destructuring bind alpha-renames 'arguments'; this ensures that
// renaming doesn't rename in nested scopes.
function destructNestedScopeArguments(x) {
  [(function () { return arguments[1]; })(null, x)[0]] = [42];
}

// ----------------------------------------------------------------------------

var result = [];
destructNestedScopeArguments(result);
assert.equal(42, result[0]);
