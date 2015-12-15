var t = require("../lib");

Object.keys(t.VISITOR_KEYS).forEach(function (type) {
  try {
    require("./definitions/" + type.toLowerCase());
  }
  catch (e) {}
});
