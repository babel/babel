var _filterInstanceProperty = require("core-js-pure/features/instance/filter.js");

var _mapInstanceProperty = require("core-js-pure/features/instance/map.js");

var _map = "map";

_filterInstanceProperty(object); // polyfill


_mapInstanceProperty(object); // polyfill


object[find]; // don't polyfill

_filterInstanceProperty(object).call(object); // polyfill


_mapInstanceProperty(object).call(object); // polyfill


object[find](); // don't polyfill
