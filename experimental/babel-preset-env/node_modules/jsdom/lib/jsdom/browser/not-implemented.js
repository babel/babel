"use strict";

module.exports = function (nameForErrorMessage, window) {
  if (!window) {
    // Do nothing for window-less documents.
    return;
  }

  window._virtualConsole.emit("jsdomError", new Error(`Not implemented: ${nameForErrorMessage}`));
};
