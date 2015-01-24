module.exports = function cloneDeep(obj) {
  var obj2 = {};
  if (!obj) return obj2;

  for (var key in obj) {
    obj2[key] = obj[key];
  }

  return obj2;
};
