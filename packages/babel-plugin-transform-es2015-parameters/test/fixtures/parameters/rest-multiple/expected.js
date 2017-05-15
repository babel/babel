var t = function (f, ..._ref) {
    let [, ...items] = [, ..._ref];

    var x = f;
    x = items[0];
    x = items[1];
};

function t(f, ..._ref2) {
    let [, ...items] = [, ..._ref2];

    var x = f;
    x = items[0];
    x = items[1];
}

function u(f, g, ..._ref3) {
    let [,, ...items] = [,, ..._ref3];

    var x = f;
    var y = g;
    x[12] = items[0];
    y.prop = items[1];
    var z = items[2] | 0 || 12;
}