var A = _esdown.class(function(__, __static) { var A;

  __({ constructor: A = function() {
    this.x = 1;
  },

  set a(value) {},

  get b() {}});

  __static({ S: function() {}});

  __static({ get T() {}});

  __static({ "U": function() {}});

  __static({ "Hello World": function() {}});

  __({ foo: function() {}});
 });

var B = _esdown.class(A, function(__, __static, __super, __base) { var B;
  __({ constructor: B = function() {
    __base.call(this, 1);
    __super.foo.call(this);
  }});

  __static({ x: function() {
    __base.x.call(this);
    __base.y;
  }});
 });

((function() { var C = _esdown.class(function(__) { var C; __({ constructor: C = function() {} }); }); return C; }()));

new (_esdown.class(function(__) { __({ constructor: function() {} }); }));
