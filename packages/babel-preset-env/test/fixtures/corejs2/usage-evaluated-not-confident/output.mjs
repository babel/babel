import "core-js/modules/es6.array.map.js";
import "core-js/modules/web.dom.iterable.js";
import "core-js/modules/es6.array.iterator.js";
import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es7.object.values.js";
Object['values'](); // include

[]['map'](); // include

Object[keys](); // don't include

[][filter](); // don't include
