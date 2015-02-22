var obj = {
  // localy declared variable
  f: function () {
    (function f() {
      console.log(f);
    })();
  },

  // self reference
  h: function () {
    console.log(h);
  },

  // no reference
  m: function () {
    doSmth();
  }
};

// locally declared variable
var f = function () {
  var f = 2;
};

// self reference
var f = function () {
  console.log(f, g);
};

// no reference
var g = function () {
  doSmth();
};

// param with the same name as id
var h = function (h) {

};

// assignment to self
var i = function () {
  i = 5;
};

// assignment to self
var j = function () {
  ({ j }) = 5;
};
