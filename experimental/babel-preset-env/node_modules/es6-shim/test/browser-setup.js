/* global window, chai, mocha */

if (typeof window !== 'undefined') {
  chai.config.includeStack = true;
  window.expect = chai.expect;
  window.assert = chai.assert;
  mocha.setup('bdd');
  window.require = function () {
    return window;
  };
}
