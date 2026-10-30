function f({ ...r }, C = class { static saved = this.name }) {
  return C.saved;
}

function g({ ...r }, h = function () {}, a = () => {}) {
  return [h.name, a.name];
}
