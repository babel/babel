function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncValue(value) {
  await timeout(50);
  return value;
}

(async function() {
  var value = await asyncValue(42);
  console.log(42== value)
  //assert.equal(42, value);
  //done();
})();

// ------------------------------------------------

function timeout(ms) {
  return new Promise(function(resolve) {
    setTimeout(resolve, ms);
  });
}

function asyncValue(value) {return new Promise(function(resolve) {
  timeout(50).then(function(){
  resolve(value);
  });
})};

(function() {new Promise(function(resolve) {
  var value;asyncValue(42).then(function(_value){value = _value;
  console.log(42== value)
  //assert.equal(42, value);
  //done();
});})})();