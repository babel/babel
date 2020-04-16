z = Object.assign(Object.assign({
  x
}), y);
z = {
  x,
  w: Object.assign(Object.assign({}), y)
};
