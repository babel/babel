var PRS$0 = (function(o,t){o["__proto__"]={"a":t};return o["a"]===t})({},{});var DP$0 = Object.defineProperty;var GOPD$0 = Object.getOwnPropertyDescriptor;var MIXIN$0 = function(t,s){for(var p in s){if(s.hasOwnProperty(p)){DP$0(t,p,GOPD$0(s,p));}}return t};var SP$0 = Object.setPrototypeOf||function(o,p){if(PRS$0){o["__proto__"]=p;}else {DP$0(o,"__proto__",{"value":p,"configurable":true,"enumerable":false,"writable":true});}return o};var OC$0 = Object.create;
var passed = true;
var B = ((function(super$0){"use strict";super$0=((function(){"use strict";var proto$0={};
  function constructor$0(a) { return this.id + a; }DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  proto$0.foo = function(a)         { return a + this.id; };
MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})());if(!PRS$0)MIXIN$0(constructor$0, super$0);var proto$0={};
  function constructor$0(a) {
    this.id = 'AB';
    // "super" in the constructor calls
    // the superclass's constructor on "this".
    passed &= super$0.call(this, a)     === 'ABCD';
    // "super" can be also used to call
    // superclass methods on "this".
    passed &= super$0.prototype.foo.call(this, a) === 'CDAB';
  }if(super$0!==null)SP$0(constructor$0,super$0);constructor$0.prototype = OC$0(super$0!==null?super$0.prototype:null,{"constructor":{"value":constructor$0,"configurable":true,"writable":true}});DP$0(constructor$0,"prototype",{"configurable":false,"enumerable":false,"writable":false});
  proto$0.foo = function(a) {
    // "super" in methods calls the
    // superclass's same-named method on "this".
    passed &= super$0.prototype.foo.call(this, a) === 'YZEF';
    passed &= super$0.prototype.foo.call(this, a) === super$0.prototype.foo.call(this, a);
  };
MIXIN$0(constructor$0.prototype,proto$0);proto$0=void 0;return constructor$0;})())
var b = new B("CD");
// "super" is bound statically, even though "this" isn't
var obj = { foo: b.foo, id:"EF" };
obj.foo("YZ");
console.log(passed == true)
