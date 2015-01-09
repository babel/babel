(function (obj, exports) {
  for (var i in obj) {
    if (exports[i] !== undefined) {
      exports[i] = obj[i];
    }
  }
})
