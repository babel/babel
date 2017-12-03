"use strict";
const util = require("util");
const ErrorEvent = require("../generated/ErrorEvent").interface;

const errorReportingMode = Symbol("error reporting mode");

// https://html.spec.whatwg.org/multipage/webappapis.html#report-the-error
// Omits script parameter and any check for muted errors; takes error object, message, and location as params, unlike
// the spec. Returns whether the event was handled or not.
function reportAnError(line, col, target, errorObject, message, location) {
  if (errorReportingMode in target) {
    return false;
  }

  target[errorReportingMode] = true;

  // TODO Events: use constructor directly, once they are no longer tied to a window.
  const event = new ErrorEvent("error", {
    bubbles: false,
    cancelable: true,
    message,
    filename: location,
    lineno: line,
    colno: col,
    error: errorObject
  });

  target.dispatchEvent(event);

  delete target[errorReportingMode];

  return event.defaultPrevented;
}

module.exports = function reportException(window, error, filenameHint) {
  // This function will give good results on real Error objects with stacks; poor ones otherwise

  const stack = error && error.stack;
  const lines = stack && stack.split("\n");

  // Find the first line that matches; important for multi-line messages
  let pieces;
  if (lines) {
    for (let i = 1; i < lines.length && !pieces; ++i) {
      pieces = lines[i].match(/at (?:(.+)\s+)?\(?(?:(.+?):(\d+):(\d+)|([^)]+))\)?/);
    }
  }

  const fileName = pieces && pieces[2] || filenameHint || window._document._URL;
  const lineNumber = pieces && parseInt(pieces[3]) || 0;
  const columnNumber = pieces && parseInt(pieces[4]) || 0;

  const handled = reportAnError(lineNumber, columnNumber, window, error, error.message, fileName);

  if (!handled) {
    const jsdomError = new Error(`Uncaught ${util.inspect(error)}`);
    jsdomError.detail = error;

    window._virtualConsole.emit("jsdomError", jsdomError);
  }
};
