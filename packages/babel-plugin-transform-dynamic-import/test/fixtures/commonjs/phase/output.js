"use strict";

import.source("a");
import.defer("b");
import.sync("d");
Promise.resolve().then(() => babelHelpers.interopRequireWildcard(require("c")));
