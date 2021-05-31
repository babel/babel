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

// https://github.com/babel/babel/pull/2833#issuecomment-166039291
function t(...items) {
  for (let i = 0; i < items.length; i++) {
    return items[i];
  }
}
