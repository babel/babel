function f0(void, x) {}

function f1(x, void) {}

function f2(x, void, ...y) {}

var f3 = (x, void, ...y) => {}

var f4 = (void, x = 0, y) => {}

function f0(x, { y: void }, [ z, void ]) {}
