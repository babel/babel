const isPrimitive = value => value === null || babelHelpers.typeof(value) != 'object' && typeof value != 'function';
