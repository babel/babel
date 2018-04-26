/*before*/"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test2 = exports.test = undefined;

/*after*/ /*before*/require("foo") /*after*/;

/*before*/require("foo-bar") /*after*/;

/*before*/require("./directory/foo-bar") /*after*/;

var /*before*/_foo = require("foo2") /*after*/;

/*before*/var _foo2 = babelHelpers.interopRequireDefault(_foo);

/*after*/var /*before*/_foo3 = require("foo3") /*after*/;

/*before*/var /*after*/foo2 = babelHelpers.interopRequireWildcard(_foo3);

var /*before*/_foo4 = require("foo4") /*after*/;

var /*before*/_foo5 = require("foo5") /*after*/;

/*before*/exports. /*after*/test = test;
var test2 = /*before*/exports. /*after*/test2 = 5;

/*before*/(0, /*after*/ /*before*/_foo4 /*after*/. /*before*/bar) /*after*/( /*before*/_foo2 /*after*/. /*before*/default /*after*/, /*before*/_foo5 /*after*/. /*before*/foo /*after*/);

/* my comment */
/*before*/_foo5 /*after*/. /*before*/foo /*after*/;
/*before*/_foo2 /*after*/. /*before*/default /*after*/;