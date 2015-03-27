"use strict";

new (babelHelpers.bind.apply(Numbers, babelHelpers.toConsumableArray(nums)))();
new (babelHelpers.bind.apply(Numbers, [1].concat(babelHelpers.toConsumableArray(nums))))();
