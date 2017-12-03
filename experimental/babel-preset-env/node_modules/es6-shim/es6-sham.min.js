/*!
  * https://github.com/paulmillr/es6-shim
  * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
  *   and contributors,  MIT License
  * es6-sham: v0.35.1
  * see https://github.com/paulmillr/es6-shim/blob/0.35.1/LICENSE
  * Details and documentation:
  * https://github.com/paulmillr/es6-shim/
  */
(function(t,e){if(typeof define==="function"&&define.amd){define(e)}else if(typeof exports==="object"){module.exports=e()}else{t.returnExports=e()}})(this,function(){"use strict";var t=new Function("return this;");var e=t();var r=e.Object;var n=Function.call.bind(Function.call);var o=Function.toString;var i=String.prototype.match;var f=function(t){try{t();return false}catch(t){return true}};var a=function(){return!f(function(){r.defineProperty({},"x",{get:function(){}})})};var u=!!r.defineProperty&&a();(function(){if(r.setPrototypeOf){return}var t=r.getOwnPropertyNames;var e=r.getOwnPropertyDescriptor;var n=r.create;var o=r.defineProperty;var i=r.getPrototypeOf;var f=r.prototype;var a=function(r,n){t(n).forEach(function(t){o(r,t,e(n,t))});return r};var u=function(t,e){return a(n(e),t)};var c,s;try{c=e(f,"__proto__").set;c.call({},null);s=function(t,e){c.call(t,e);return t}}catch(t){c={__proto__:null};if(c instanceof r){s=u}else{c.__proto__=f;if(c instanceof r){s=function(t,e){t.__proto__=e;return t}}else{s=function(t,e){if(i(t)){t.__proto__=e;return t}else{return u(t,e)}}}}}r.setPrototypeOf=s})();if(u&&function foo(){}.name!=="foo"){r.defineProperty(Function.prototype,"name",{configurable:true,enumerable:false,get:function(){var t=n(o,this);var e=n(i,t,/\s*function\s+([^(\s]*)\s*/);var f=e&&e[1];r.defineProperty(this,"name",{configurable:true,enumerable:false,writable:false,value:f});return f}})}});
//# sourceMappingURL=es6-sham.map
