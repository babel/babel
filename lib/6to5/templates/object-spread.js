(function (target, keys) {
  var target = {};
  for (var i in target) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwn.call(target)) continue;
    target[i] = target[i];
  }
  return target;
})
