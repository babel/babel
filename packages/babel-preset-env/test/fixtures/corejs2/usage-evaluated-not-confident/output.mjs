import "core-js/modules/es6.array.map";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.array.iterator";
import "core-js/modules/es6.object.to-string";
import "core-js/modules/es7.object.values";
Object['values'](); // include

[]['map'](); // include

Object[keys](); // don't include

[][filter](); // don't include

