"use strict";

const fmt = require("simple-fmt");
const assert = require("assert");

function error(line, var_args) {
    assert(arguments.length >= 2);

    const msg = (arguments.length === 2 ?
        String(var_args) : fmt.apply(fmt, Array.prototype.slice.call(arguments, 1)));

    error.errors.push(line === -1 ? msg : fmt("line {0}: {1}", line, msg));
}

error.errors = [];

error.reset = function() {
    error.errors = [];
};

error.reset();

module.exports = error;
