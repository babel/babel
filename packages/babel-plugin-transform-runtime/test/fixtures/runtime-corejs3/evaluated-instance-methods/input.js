var _map = "map";

object["filter"]; // polyfill
object[_map]; // polyfill
object[find]; // don't polyfill

object["filter"](); // polyfill
object[_map](); // polyfill
object[find](); // don't polyfill
