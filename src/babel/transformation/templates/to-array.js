(function (arr) {
  return arr && arr.constructor === Array ? arr : Array.from(arr);
});
