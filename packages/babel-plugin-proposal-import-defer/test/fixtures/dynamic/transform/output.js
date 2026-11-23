Promise.resolve().then(() => babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("a"))));
Promise.resolve().then(() => babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require(`b`))));
(specifier => new Promise(r => r(`${specifier}`)).then(s => babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require(s)))))(c);
Promise.resolve().then(() => babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("d"))));
import("e");
