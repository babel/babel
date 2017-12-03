/* global expect: true, assert: true, require, process */

expect = (function () {
  var chai = require('chai');
  chai.config.includeStack = true;
  return chai.expect;
}());

assert = (function () {
  var chai = require('chai');
  chai.config.includeStack = true;
  return chai.assert;
}());

if (typeof process === 'undefined' || !process.env.NO_ES6_SHIM) {
  require('../');
}
