var t = function (..._ref) {
  let [...items] = [..._ref];

  var x = items[0];
  var y = items[1];
};

function t(..._ref2) {
  let [...items] = [..._ref2];

  var x = items[0];
  var y = items[1];
}

function t(..._ref3) {
  let [...items] = [..._ref3];

  var a = [];
  for (var i = 0; i < items.length; i++) {
    a.push(i);
  }
  return a;
}

// https://github.com/babel/babel/pull/2833#issuecomment-166039291
function t(..._ref4) {
  let [...items] = [..._ref4];

  for (let i = 0; i < items.length; i++) {
    return items[i];
  }
}