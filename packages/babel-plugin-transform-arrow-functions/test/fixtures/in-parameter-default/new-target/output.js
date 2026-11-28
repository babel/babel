function f(read = function (_newtarget) {
  return function () {
    return _newtarget;
  };
}(new.target)) {
  return read();
}
