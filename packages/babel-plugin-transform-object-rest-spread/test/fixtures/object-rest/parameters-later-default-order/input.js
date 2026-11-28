function f({ ...a }, b = g()) {}
const h = ({ ...a }, b = g(), c = a) => {};
function i({ ...a }, [b]) {}
function pure({ ...a }, b = 1, c) {}
