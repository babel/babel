import "core-js/modules/es7.object.values.js";
import "core-js/modules/es6.array.map.js";
Object['values'](); // include
[]['map'](); // include

Object[keys](); // don't include
[][filter](); // don't include
