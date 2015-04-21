(function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var hop = Object.prototype.hasOwnProperty;
    var es_obj = { "default": obj };
    if (typeof obj === "object" && obj !== null) {
      for (var key in obj) {
        if (key !== "default" && hop.call(obj, key)) {
          es_obj[key] = obj[key];
        }
      }
    }
    return es_obj;
  }
})
