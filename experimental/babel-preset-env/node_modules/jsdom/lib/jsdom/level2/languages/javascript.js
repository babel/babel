"use strict";
const vm = require("vm");
const reportException = require("../../living/helpers/runtime-script-errors");

exports.javascript = function (element, code, filename) {
  const document = element.ownerDocument;
  const window = document && document._global;

  if (window) {
    window.document._currentScript = element;

    try {
      vm.runInContext(code, window, { filename, displayErrors: false });
    } catch (e) {
      reportException(window, e, filename);
    } finally {
      window.document._currentScript = null;
    }
  }
};
