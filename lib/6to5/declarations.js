var b = require("recast").types.builders;

exports.slice = b.memberExpression(b.identifier("Array"), b.memberExpression(b.identifier("prototype"), b.identifier("slice"), false), false)
