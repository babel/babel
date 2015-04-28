(function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
    }
    newObj.default = obj;
    return newObj;
  }
})
