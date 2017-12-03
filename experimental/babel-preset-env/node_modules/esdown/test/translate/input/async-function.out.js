function f(a, b, c) { return _esdown.async(function*(a, b, c) {

    (yield 0);
}.apply(this, arguments)); }

({ f: function() { return _esdown.async(function*() { (yield 0); }.apply(this, arguments)); } });

(function(x) { return _esdown.async(function*(x) { return (yield y); }.apply(this, arguments)); });

// asi
function f() { return _esdown.async(function*() {
    1
    ;(yield 1)
}.apply(this, arguments)); }
