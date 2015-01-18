"use strict";

/**
 * A trick from Bluebird to force V8 to use fast properties for an object.
 * Read more: http://stackoverflow.com/questions/24987896/
 *
 * Use %HasFastProperties(obj) and --allow-natives-syntax to check whether
 * a particular object already has fast properties.
 */

module.exports = function toFastProperties(obj) {
  /*jshint -W027*/
  function f() {}
  f.prototype = obj;
  return f;
  eval(obj);
};
