"use strict";

add.apply(undefined, [foo].concat(babelHelpers.toConsumableArray(numbers), [bar]));
