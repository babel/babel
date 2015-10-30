// Error: :24:18: Duplicate parameter name x
// Error: :24:24: Duplicate parameter name x
// Error: :27:19: Duplicate parameter name a
// Error: :27:23: Duplicate parameter name a
// Error: :30:22: Duplicate parameter name c
// Error: :30:25: Duplicate parameter name c
// Error: :33:20: Duplicate parameter name e
// Error: :33:23: Duplicate parameter name e
// Error: :36:15: Duplicate parameter name g
// Error: :39:15: Duplicate parameter name i
// Error: :42:15: Duplicate parameter name k
// Error: :45:17: Duplicate parameter name x
// Error: :45:23: Duplicate parameter name x
// Error: :48:18: Duplicate parameter name a
// Error: :48:22: Duplicate parameter name a
// Error: :51:21: Duplicate parameter name c
// Error: :51:24: Duplicate parameter name c
// Error: :54:19: Duplicate parameter name e
// Error: :54:22: Duplicate parameter name e
// Error: :57:14: Duplicate parameter name g
// Error: :60:14: Duplicate parameter name i
// Error: :63:14: Duplicate parameter name k

function f(x, y, x, ...x) {
}

function g([a, b, a], a) {
}

function h(c = 1, d, c, c) {
}

function i({e, f}, e, e) {
}

function j(g, g, [h]) {
}

function h(i, i, j = 1) {
}

function i(k, k, ...l) {
}

var f2 = (x, y, x, ...x) => {
};

var g2 = ([a, b, a], a) => {
};

var h2 = (c = 1, d, c, c) => {
};

var i2 = ({e, f}, e, e) => {
};

var j2 = (g, g, [h]) => {
};

var h2 = (i, i, j = 1) => {
};

var i2 = (k, k, ...l) => {
};
