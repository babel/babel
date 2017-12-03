module.exports = require('./fork')([
    // This core module of AST types captures ES5 as it is parsed today by
    // git://github.com/ariya/esprima.git#master.
    require("./def/core"),

    // Feel free to add to or remove from this list of extension modules to
    // configure the precise type hierarchy that you need.
    require("./def/es6"),
    require("./def/es7"),
    require("./def/mozilla"),
    require("./def/e4x"),
    require("./def/jsx"),
    require("./def/flow"),
    require("./def/esprima"),
    require("./def/babel"),
    require("./def/babel6")
]);
