"use strict";

var each = require("lodash/collection/each");

each(["BindMemberExpression", "BindFunctionExpression"], function (type) {
  exports[type] = function () {
    throw new ReferenceError("Trying to render non-standard playground node " + JSON.stringify(type));
  };
});
