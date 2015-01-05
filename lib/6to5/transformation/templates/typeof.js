(function (obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
});
