var t = function (...items) {
  var x = items[0];
  var y = items[1];
}

function t(...items) {
  var x = items[0];
  var y = items[1];
}

function t(...items) {
  var a = [];
  for (var i = 0; i < items.length; i++) {
    a.push(i);
  }
  return a;
}