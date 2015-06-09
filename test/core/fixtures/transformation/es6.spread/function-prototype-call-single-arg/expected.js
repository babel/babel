"use strict";

function foo() {}
foo.apply({}, babelHelpers.toConsumableArray(nums));
