var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js/instance/filter");
var _mapInstanceProperty = require("@babel/runtime-corejs3/core-js/instance/map");
var _map = "map";
_filterInstanceProperty(object); // polyfill
_mapInstanceProperty(object); // polyfill
object[find]; // don't polyfill

_filterInstanceProperty(object).call(object); // polyfill
_mapInstanceProperty(object).call(object); // polyfill
object[find](); // don't polyfill
