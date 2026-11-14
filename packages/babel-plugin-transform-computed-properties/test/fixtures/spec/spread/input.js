var before = { ...a, b, [c]: d };

var after = { [a]: b, ...c };

var both = { ...a, b, [c]: d, ...e, f, ...g, [h]: i };

var accessor = { get [a]() {}, ...b };
