var obj = { key: 'value' };
var keys = o => {
  var r = [];

  for (var k in o) {
    r.push(k);
  }

  return r;
};
var values = o => {
  var r = [];

  for (var k in o) {
    r.push(o[k]);
  }

  return r;
};
var entries = o => {
  var r = [];

  for (var k in o) {
    r.push([k, o[k]]);
  }

  return r;
};
