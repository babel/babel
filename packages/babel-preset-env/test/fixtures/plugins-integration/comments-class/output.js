/**
 * ES6 class with fat arrow inner functions
 */

'use strict';

/**
 * @class Polygon
 * The main polygon class
 */
var Polygon = /*#__PURE__*/babelHelpers.createClass(
/**
 * Class constructor
 * @param {*} height
 * @param {*} width
 */
function Polygon(height, width) {
  var _this = this;
  babelHelpers.classCallCheck(this, Polygon);
  /**
   * @name sayName
   * @function
   * @inner
   * A helper function to say name
   */
  babelHelpers.defineProperty(this, "sayName", function () {
    console.log('Hi, I am a ', _this.name + '.');
  });

  /**
   * @name sayHistory
   * @function
   * @inner
   * A helper function to say name
   */
  babelHelpers.defineProperty(this, "sayHistory", function () {
    console.log('"Polygon" is derived from the Greek polus (many) ' + 'and gonia (angle).');
  });
  this.name = 'Polygon';
  this.height = height;
  this.width = width;
});
module.exports = Polygon;
