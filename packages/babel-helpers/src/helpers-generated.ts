/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'yarn gulp generate-runtime-helpers'
 */

import template from "@babel/template";
import type * as t from "@babel/types";

interface Helper {
  minVersion: string;
  ast: () => t.Program;
  metadata: HelperMetadata;
}

export interface HelperMetadata {
  globals: string[];
  locals: Record<string, string[]>;
  dependencies: Record<string, string[]>;
  exportBindingAssignments: string[];
  exportName: string;
  internal: boolean;
}

function helper(
  minVersion: string,
  source: string,
  metadata: HelperMetadata,
): Helper {
  return Object.freeze({
    minVersion,
    ast: () => template.program.ast(source, { preserveComments: true }),
    metadata,
  });
}

export { helpers as default };
const helpers: Record<string, Helper> = {
  // @ts-expect-error __proto__: null
  __proto__: null,
  // size: 47, gzip size: 63
  OverloadYield: helper(
    "7.18.14",
    "function _OverloadYield(e,d){this.v=e,this.k=d}",
    {
      globals: [],
      locals: { _OverloadYield: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_OverloadYield",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 443, gzip size: 268
  applyDecoratedDescriptor: helper(
    "7.0.0-beta.0",
    'function _applyDecoratedDescriptor(i,e,r,n,l){var a={};return Object.keys(n).forEach(function(i){a[i]=n[i]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce(function(r,n){return n(i,e,r)||r},a),l&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(l):void 0,a.initializer=void 0),void 0===a.initializer?(Object.defineProperty(i,e,a),null):a}',
    {
      globals: ["Object"],
      locals: { _applyDecoratedDescriptor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_applyDecoratedDescriptor",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 2790, gzip size: 1454
  applyDecs2311: helper(
    "7.24.0",
    'function applyDecs2311(n,o,i,a,c,u){var s,f,l,p,d,m,h,v=Symbol.metadata||Symbol.for("Symbol.metadata"),g=Object.defineProperty,y=Object.create,b=[y(null),y(null)],w=o.length;function D(e,t,r){return function(o,i){t&&(i=o,o=n);for(var a=0;a<e.length;a++)i=e[a].apply(o,r?[i]:[]);return r?i:o}}function j(e,t,r,n){if("function"!=typeof e&&(n||void 0!==e))throw new TypeError(t+" must "+(r||"be")+" a function"+(n?"":" or undefined"));return e}function applyDec(e,r,n,o,i,a,c,u,l,p,d){function m(e){if(!d(e))throw new TypeError("Attempted to access private element on non-instance")}var h=[].concat(r[0]),v=r[3],y=!c,w=1===i,E=3===i,O=4===i,S=2===i;function T(t,r,n){return function(o,i){return r&&(i=o,o=e),n&&n(o),z[t].call(o,i)}}if(!y){var z={},A=[],I=E?"get":O||w?"set":"value";if(l?(p||w?z={get:t(function(){return v(this)},o,"get"),set:function(e){r[4](this,e)}}:z[I]=v,p||t(z[I],o,S?"":I)):p||(z=Object.getOwnPropertyDescriptor(e,o)),!p&&!l){if((f=b[+u][o])&&7!==(f^i))throw Error("Decorating two elements with the same name ("+z[I].name+") is not supported yet");b[+u][o]=i<3?1:i}}for(var P=e,k=h.length-1;k>=0;k-=n?2:1){var x=j(h[k],"A decorator","be",!0),F=n?h[k-1]:void 0,H={},K={kind:["field","accessor","method","getter","setter","class"][i],name:o,metadata:s,addInitializer:function(e,t){if(e.v)throw new TypeError("attempted to call addInitializer after decoration was finished");j(t,"An initializer","be",!0),a.push(t)}.bind(null,H)};if(y)f=x.call(F,P,K),H.v=1,j(f,"class decorators","return")&&(P=f);else if(K.static=u,K.private=l,f=K.access={has:l?d.bind():function(e){return o in e}},O||(f.get=l?S?function(e){return m(e),z.value}:T("get",0,m):function(e){return e[o]}),S||E||(f.set=l?T("set",0,m):function(e,t){e[o]=t}),P=x.call(F,w?{get:z.get,set:z.set}:z[I],K),H.v=1,w){if("object"==typeof P&&P)(f=j(P.get,"accessor.get"))&&(z.get=f),(f=j(P.set,"accessor.set"))&&(z.set=f),(f=j(P.init,"accessor.init"))&&A.unshift(f);else if(void 0!==P)throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined")}else j(P,(p?"field":"method")+" decorators","return")&&(p?A.unshift(P):z[I]=P)}return i<2&&c.push(D(A,u,1),D(a,u,0)),p||y||(l?w?c.splice(-1,0,T("get",u),T("set",u)):c.push(S?z[I]:j.call.bind(z[I])):g(e,o,z)),P}function E(e){return g(e,v,{configurable:!0,enumerable:!0,value:s})}return void 0!==u&&(s=u[v]),s=y(null==s?null:s),d=[],m=function(e){e&&d.push(D(e))},h=function(t,o){for(var a=0;a<i.length;a++){var u=i[a],s=u[1],f=7&s;if((8&s)==t&&!f==o){var m=u[2],h=!!u[3],v=16&s;applyDec(t?n:n.prototype,u,v,h?"#"+m:r(m),f,f<2?[]:t?p=p||[]:l=l||[],d,!!t,h,o,t&&h?function(t){return e(t)===n}:c)}}},h(8,0),h(0,0),h(8,1),h(0,1),m(l),m(p),f=d,w||E(n),{e:f,get c(){var e=[];return w&&[E(n=applyDec(n,[o],a,n.name,5,e)),D(e,1)]}}}',
    {
      globals: ["Symbol", "Object", "TypeError", "Error"],
      locals: { applyDecs2311: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "applyDecs2311",
      dependencies: {
        checkInRHS: [
          "body.0.body.body.5.argument.expressions.4.right.body.body.0.body.body.1.consequent.body.1.expression.arguments.10.consequent.body.body.0.argument.left.callee",
        ],
        setFunctionName: [
          "body.0.body.body.3.body.body.3.consequent.body.1.test.expressions.0.consequent.expressions.0.consequent.right.properties.0.value.callee",
          "body.0.body.body.3.body.body.3.consequent.body.1.test.expressions.0.consequent.expressions.1.right.callee",
        ],
        toPropertyKey: [
          "body.0.body.body.5.argument.expressions.4.right.body.body.0.body.body.1.consequent.body.1.expression.arguments.3.alternate.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 118, gzip size: 124
  arrayLikeToArray: helper(
    "7.9.0",
    "function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}",
    {
      globals: ["Array"],
      locals: { _arrayLikeToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayLikeToArray",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 188, gzip size: 150
  arrayWithHoles: helper(
    "7.0.0-beta.0",
    'function _arrayWithHoles(r){var t;if(Array.isArray(r)&&("undefined"==typeof Symbol||(t=r[Symbol.iterator])===[][Symbol.iterator])&&(t||!(t=r["@@iterator"])||t===[]["@@iterator"]))return r}',
    {
      globals: ["Array", "Symbol"],
      locals: { _arrayWithHoles: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayWithHoles",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 194, gzip size: 154
  arrayWithoutHoles: helper(
    "7.0.0-beta.0",
    'function _arrayWithoutHoles(t){var o;if(Array.isArray(t)&&("undefined"==typeof Symbol||(o=t[Symbol.iterator])===[][Symbol.iterator])&&(o||!(o=t["@@iterator"])||o===[]["@@iterator"]))return r(t)}',
    {
      globals: ["Array", "Symbol"],
      locals: { _arrayWithoutHoles: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayWithoutHoles",
      dependencies: {
        arrayLikeToArray: ["body.0.body.body.1.consequent.argument.callee"],
      },
      internal: false,
    },
  ),
  // size: 172, gzip size: 159
  assertClassBrand: helper(
    "7.24.0",
    'function _assertClassBrand(e,t,n){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}',
    {
      globals: ["TypeError"],
      locals: { _assertClassBrand: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_assertClassBrand",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 144, gzip size: 132
  assertThisInitialized: helper(
    "7.0.0-beta.0",
    "function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");return e}",
    {
      globals: ["ReferenceError"],
      locals: { _assertThisInitialized: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_assertThisInitialized",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 474, gzip size: 267
  asyncGeneratorDelegate: helper(
    "7.0.0-beta.0",
    'function _asyncGeneratorDelegate(n){var r={},e=!1;function pump(r,o){return e=!0,o=new Promise(function(t){t(n[r](o))}),{done:!1,value:new t(o,1)}}return r["undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator"]=function(){return this},r.next=function(t){return e?(e=!1,t):pump("next",t)},"function"==typeof n.throw&&(r.throw=function(t){if(e)throw e=!1,t;return pump("throw",t)}),"function"==typeof n.return&&(r.return=function(t){return e?(e=!1,t):pump("return",t)}),r}',
    {
      globals: ["Promise", "Symbol"],
      locals: { _asyncGeneratorDelegate: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_asyncGeneratorDelegate",
      dependencies: {
        OverloadYield: [
          "body.0.body.body.1.body.body.0.argument.expressions.2.properties.1.value.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 1078, gzip size: 433
  asyncIterator: helper(
    "7.15.9",
    'function _asyncIterator(r){var n,t,o,e=2;for("undefined"!=typeof Symbol&&(t=Symbol.asyncIterator,o=Symbol.iterator);e--;){if(t&&null!=(n=r[t]))return n.call(r);if(o&&null!=(n=r[o]))return new AsyncFromSyncIterator(n.call(r));t="@@asyncIterator",o="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(r){function AsyncFromSyncIteratorContinuation(r){if(Object(r)!==r)return Promise.reject(new TypeError(r+" is not an object."));var n=r.done;return Promise.resolve(r.value).then(function(r){return{value:r,done:n}})}return AsyncFromSyncIterator=function(r){this.s=r,this.n=r.next},AsyncFromSyncIterator.prototype={s:null,n:null,next:function(){return AsyncFromSyncIteratorContinuation(this.n.apply(this.s,arguments))},return:function(r){var n=this.s.return;return void 0===n?Promise.resolve({value:r,done:!0}):AsyncFromSyncIteratorContinuation(n.apply(this.s,arguments))},throw:function(r){var n=this.s.throw;return void 0===n?Promise.reject(r):AsyncFromSyncIteratorContinuation(n.apply(this.s,arguments))}},new AsyncFromSyncIterator(r)}',
    {
      globals: ["Symbol", "TypeError", "Object", "Promise"],
      locals: {
        _asyncIterator: ["body.0.id"],
        AsyncFromSyncIterator: [
          "body.1.id",
          "body.0.body.body.1.body.body.1.consequent.argument.callee",
          "body.1.body.body.1.argument.expressions.1.left.object",
          "body.1.body.body.1.argument.expressions.2.callee",
          "body.1.body.body.1.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: [],
      exportName: "_asyncIterator",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 412, gzip size: 240
  asyncToGenerator: helper(
    "7.0.0-beta.0",
    'function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}',
    {
      globals: ["Promise"],
      locals: {
        asyncGeneratorStep: [
          "body.0.id",
          "body.1.body.body.0.argument.body.body.1.argument.arguments.0.body.body.1.body.body.0.expression.callee",
          "body.1.body.body.0.argument.body.body.1.argument.arguments.0.body.body.2.body.body.0.expression.callee",
        ],
        _asyncToGenerator: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_asyncToGenerator",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 51, gzip size: 71
  awaitAsyncGenerator: helper(
    "7.0.0-beta.0",
    "function _awaitAsyncGenerator(r){return new e(r,0)}",
    {
      globals: [],
      locals: { _awaitAsyncGenerator: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_awaitAsyncGenerator",
      dependencies: { OverloadYield: ["body.0.body.body.0.argument.callee"] },
      internal: false,
    },
  ),
  // size: 107, gzip size: 109
  callSuper: helper(
    "7.23.8",
    "function _callSuper(e,c,p){return c=t(c),o(e,r()?Reflect.construct(c,p||[],t(e).constructor):c.apply(e,p))}",
    {
      globals: ["Reflect"],
      locals: { _callSuper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_callSuper",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.0.argument.expressions.0.right.callee",
          "body.0.body.body.0.argument.expressions.1.arguments.1.consequent.arguments.2.object.callee",
        ],
        isNativeReflectConstruct: [
          "body.0.body.body.0.argument.expressions.1.arguments.1.test.callee",
        ],
        possibleConstructorReturn: [
          "body.0.body.body.0.argument.expressions.1.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 146, gzip size: 145
  checkInRHS: helper(
    "7.20.5",
    'function _checkInRHS(e){if(Object(e)!==e)throw TypeError("right-hand side of \'in\' should be an object, got "+(null!==e?typeof e:"null"));return e}',
    {
      globals: ["Object", "TypeError"],
      locals: { _checkInRHS: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_checkInRHS",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 139, gzip size: 132
  checkPrivateRedeclaration: helper(
    "7.14.1",
    'function _checkPrivateRedeclaration(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}',
    {
      globals: ["TypeError"],
      locals: { _checkPrivateRedeclaration: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_checkPrivateRedeclaration",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 108, gzip size: 111
  classCallCheck: helper(
    "7.0.0-beta.0",
    'function _classCallCheck(a,n){if(!(a instanceof n))throw new TypeError("Cannot call a class as a function")}',
    {
      globals: ["TypeError"],
      locals: { _classCallCheck: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classCallCheck",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 121, gzip size: 122
  classNameTDZError: helper(
    "7.0.0-beta.0",
    "function _classNameTDZError(e){throw new ReferenceError('Class \"'+e+'\" cannot be referenced in computed property keys.')}",
    {
      globals: ["ReferenceError"],
      locals: { _classNameTDZError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classNameTDZError",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 58, gzip size: 75
  classPrivateFieldGet2: helper(
    "7.24.0",
    "function _classPrivateFieldGet2(e,r){return e.get(t(e,r))}",
    {
      globals: [],
      locals: { _classPrivateFieldGet2: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldGet2",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.argument.arguments.0.callee"],
      },
      internal: false,
    },
  ),
  // size: 61, gzip size: 78
  classPrivateFieldInitSpec: helper(
    "7.14.1",
    "function _classPrivateFieldInitSpec(t,i,a){e(t,i),i.set(t,a)}",
    {
      globals: [],
      locals: { _classPrivateFieldInitSpec: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldInitSpec",
      dependencies: {
        checkPrivateRedeclaration: [
          "body.0.body.body.0.expression.expressions.0.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 148, gzip size: 141
  classPrivateFieldLooseBase: helper(
    "7.0.0-beta.0",
    'function _classPrivateFieldBase(e,t){if(!{}.hasOwnProperty.call(e,t))throw new TypeError("attempted to use private field on non-instance");return e}',
    {
      globals: ["TypeError"],
      locals: { _classPrivateFieldBase: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldBase",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 71, gzip size: 87
  classPrivateFieldLooseKey: helper(
    "7.0.0-beta.0",
    'var e=0;function _classPrivateFieldKey(r){return"__private_"+e+++"_"+r}',
    {
      globals: [],
      locals: {
        e: [
          "body.0.declarations.0.id",
          "body.1.body.body.0.argument.left.left.right.argument",
          "body.1.body.body.0.argument.left.left.right.argument",
        ],
        _classPrivateFieldKey: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldKey",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 64, gzip size: 82
  classPrivateFieldSet2: helper(
    "7.24.0",
    "function _classPrivateFieldSet2(e,r,s){return e.set(t(e,r),s),s}",
    {
      globals: [],
      locals: { _classPrivateFieldSet2: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldSet2",
      dependencies: {
        assertClassBrand: [
          "body.0.body.body.0.argument.expressions.0.arguments.0.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 53, gzip size: 70
  classPrivateGetter: helper(
    "7.24.0",
    "function _classPrivateGetter(t,e,a){return a(r(t,e))}",
    {
      globals: [],
      locals: { _classPrivateGetter: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateGetter",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.argument.arguments.0.callee"],
      },
      internal: false,
    },
  ),
  // size: 58, gzip size: 74
  classPrivateMethodInitSpec: helper(
    "7.14.1",
    "function _classPrivateMethodInitSpec(t,a){e(t,a),a.add(t)}",
    {
      globals: [],
      locals: { _classPrivateMethodInitSpec: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateMethodInitSpec",
      dependencies: {
        checkPrivateRedeclaration: [
          "body.0.body.body.0.expression.expressions.0.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 59, gzip size: 77
  classPrivateSetter: helper(
    "7.24.0",
    "function _classPrivateSetter(t,e,a,s){return e(r(t,a),s),s}",
    {
      globals: [],
      locals: { _classPrivateSetter: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateSetter",
      dependencies: {
        assertClassBrand: [
          "body.0.body.body.0.argument.expressions.0.arguments.0.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 61, gzip size: 81
  classStaticPrivateMethodGet: helper(
    "7.3.2",
    "function _classStaticPrivateMethodGet(r,a,e){return t(a,r),e}",
    {
      globals: [],
      locals: { _classStaticPrivateMethodGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classStaticPrivateMethodGet",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.argument.expressions.0.callee"],
      },
      internal: false,
    },
  ),
  // size: 170, gzip size: 143
  construct: helper(
    "7.0.0-beta.0",
    "function _construct(e,o,p){if(t())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,o);var l=new(e.bind.apply(e,n));return p&&r(l,p.prototype),l}",
    {
      globals: ["Reflect"],
      locals: { _construct: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_construct",
      dependencies: {
        isNativeReflectConstruct: ["body.0.body.body.0.test.callee"],
        setPrototypeOf: [
          "body.0.body.body.4.argument.expressions.0.right.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 336, gzip size: 217
  createClass: helper(
    "7.0.0-beta.0",
    'function _defineProperties(r,t){for(var o=0;o<t.length;o++){var i=t[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(r,e(i.key),i)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}',
    {
      globals: ["Object"],
      locals: {
        _defineProperties: [
          "body.0.id",
          "body.1.body.body.0.argument.expressions.0.right.callee",
          "body.1.body.body.0.argument.expressions.1.right.callee",
        ],
        _createClass: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_createClass",
      dependencies: {
        toPropertyKey: [
          "body.0.body.body.0.body.body.1.expression.expressions.3.arguments.1.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 701, gzip size: 421
  createForOfIteratorHelper: helper(
    "7.9.0",
    'function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=r(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var o=0,F=function(){};return{s:F,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function(){n=n.call(e)},n:function(){i=!0;var r=n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function(r){a=!0,u=r},f:function(){try{i||null==n.return||n.return()}finally{if(a)throw u}}}}',
    {
      globals: ["Symbol", "Array", "TypeError"],
      locals: { _createForOfIteratorHelper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_createForOfIteratorHelper",
      dependencies: {
        unsupportedIterableToArray: [
          "body.0.body.body.1.consequent.body.0.test.left.right.right.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 463, gzip size: 322
  createForOfIteratorHelperLoose: helper(
    "7.9.0",
    'function _createForOfIteratorHelperLoose(r,t){var o="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(o)return(o=o.call(r)).next.bind(o);if(Array.isArray(r)||(o=e(r))||t&&r&&"number"==typeof r.length){o&&(r=o);var n=0;return function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}',
    {
      globals: ["Symbol", "Array", "TypeError"],
      locals: { _createForOfIteratorHelperLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_createForOfIteratorHelperLoose",
      dependencies: {
        unsupportedIterableToArray: [
          "body.0.body.body.2.test.left.right.right.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 379, gzip size: 277
  createModuleNsFilter: helper(
    "8.1.0",
    'function _createModuleNsFilter(e){return r=>{for(var getter=e=>()=>r[e],t=Object.create(null),n=0;n<e.length;n++){var o=e[n];if(!(o in r))throw new ReferenceError("The requested module does not provide an export named \'"+o+"\'");o in t||Object.defineProperty(t,o,{enumerable:!0,get:getter(o)})}return Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.freeze(t)}}',
    {
      globals: ["Object", "ReferenceError", "Symbol"],
      locals: { _createModuleNsFilter: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_createModuleNsFilter",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 182, gzip size: 141
  createSuper: helper(
    "7.9.0",
    "function _createSuper(o){var i=r();return function(){var r,c=t(o);if(i){var n=t(this).constructor;r=Reflect.construct(c,arguments,n)}else r=c.apply(this,arguments);return e(this,r)}}",
    {
      globals: ["Reflect"],
      locals: { _createSuper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_createSuper",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.1.argument.body.body.0.declarations.1.init.callee",
          "body.0.body.body.1.argument.body.body.1.consequent.body.0.declarations.0.init.object.callee",
        ],
        isNativeReflectConstruct: [
          "body.0.body.body.0.declarations.0.init.callee",
        ],
        possibleConstructorReturn: [
          "body.0.body.body.1.argument.body.body.2.argument.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 206, gzip size: 169
  defaults: helper(
    "7.0.0-beta.0",
    "function _defaults(e,r){for(var t=Object.getOwnPropertyNames(r),o=0;o<t.length;o++){var n=t[o],a=Object.getOwnPropertyDescriptor(r,n);a&&a.configurable&&void 0===e[n]&&Object.defineProperty(e,n,a)}return e}",
    {
      globals: ["Object"],
      locals: { _defaults: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defaults",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 115, gzip size: 120
  defineAccessor: helper(
    "7.20.7",
    "function _defineAccessor(e,r,n,t){var c={configurable:!0,enumerable:!0};return c[e]=t,Object.defineProperty(r,n,c)}",
    {
      globals: ["Object"],
      locals: { _defineAccessor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defineAccessor",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 139, gzip size: 125
  defineProperty: helper(
    "7.0.0-beta.0",
    "function _defineProperty(r,t,o){return(t=e(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}",
    {
      globals: ["Object"],
      locals: { _defineProperty: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defineProperty",
      dependencies: {
        toPropertyKey: [
          "body.0.body.body.0.argument.expressions.0.test.left.right.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 237, gzip size: 179
  extends: helper(
    "7.0.0-beta.0",
    "function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}",
    {
      globals: ["Object"],
      locals: {
        _extends: [
          "body.0.id",
          "body.0.body.body.0.argument.expressions.1.callee.object",
          "body.0.body.body.0.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.argument.expressions.0"],
      exportName: "_extends",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 433, gzip size: 269
  filterModuleNamespace: helper(
    "8.1.0",
    'function _filterModuleNamespace(t){var e,o=!1;try{var i=t(function(r){if(Object(r)===r)try{var{exports:t}=r;if(void 0!==t){if(Object(t)!==t)throw new TypeError("import()\'s `exports` must be an object");for(var i of(e=[],t)){if("string"!=typeof i)throw new TypeError("import()\'s `exports` must be strings");e.push(i)}}}catch(r){throw o=!0,r}return r})}catch(r){if(o)return Promise.reject(r);throw r}return e?(e.sort(),i.then(r(e))):i}',
    {
      globals: ["Object", "TypeError", "Promise"],
      locals: { _filterModuleNamespace: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_filterModuleNamespace",
      dependencies: {
        createModuleNsFilter: [
          "body.0.body.body.2.argument.consequent.expressions.1.arguments.0.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 251, gzip size: 192
  get: helper(
    "7.0.0-beta.0",
    'function _get(){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,r,n){var l=e(t,r);if(l){var f=Object.getOwnPropertyDescriptor(l,r);return f.get?f.get.call(arguments.length<3?t:n):f.value}},_get.apply(null,arguments)}',
    {
      globals: ["Reflect", "Object"],
      locals: {
        _get: [
          "body.0.id",
          "body.0.body.body.0.argument.expressions.1.callee.object",
          "body.0.body.body.0.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.argument.expressions.0"],
      exportName: "_get",
      dependencies: {
        superPropBase: [
          "body.0.body.body.0.argument.expressions.0.right.alternate.body.body.0.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 179, gzip size: 106
  getPrototypeOf: helper(
    "7.0.0-beta.0",
    "function _getPrototypeOf(t){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_getPrototypeOf(t)}",
    {
      globals: ["Object"],
      locals: {
        _getPrototypeOf: [
          "body.0.id",
          "body.0.body.body.0.argument.expressions.1.callee",
          "body.0.body.body.0.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.argument.expressions.0"],
      exportName: "_getPrototypeOf",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 31, gzip size: 51
  identity: helper("7.17.0", "function _identity(t){return t}", {
    globals: [],
    locals: { _identity: ["body.0.id"] },
    exportBindingAssignments: [],
    exportName: "_identity",
    dependencies: {},
    internal: false,
  }),
  // size: 176, gzip size: 138
  immutableUint8Array: helper(
    "8.0.0-rc.2",
    'function _immutableUint8Array(e){return"buffer"in e&&(e=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)),new Uint8Array(e.transferToImmutable?e.transferToImmutable():e)}',
    {
      globals: ["Uint8Array"],
      locals: { _immutableUint8Array: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_immutableUint8Array",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 537, gzip size: 258
  importDeferProxy: helper(
    "7.23.0",
    "function _importDeferProxy(e){var t=null,constValue=function(e){return function(){return e}},proxy=function(r){return function(n,o,f){return null===t&&(t=e()),r(t,o,f)}};return new Proxy({},{defineProperty:constValue(!1),deleteProperty:constValue(!1),get:proxy(Reflect.get),getOwnPropertyDescriptor:proxy(Reflect.getOwnPropertyDescriptor),getPrototypeOf:constValue(null),isExtensible:constValue(!1),has:proxy(Reflect.has),ownKeys:proxy(Reflect.ownKeys),preventExtensions:constValue(!0),set:constValue(!1),setPrototypeOf:constValue(!1)})}",
    {
      globals: ["Proxy", "Reflect"],
      locals: { _importDeferProxy: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_importDeferProxy",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 287, gzip size: 213
  inherits: helper(
    "7.0.0-beta.0",
    'function _inherits(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),r&&e(t,r)}',
    {
      globals: ["TypeError", "Object"],
      locals: { _inherits: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_inherits",
      dependencies: {
        setPrototypeOf: [
          "body.0.body.body.1.expression.expressions.2.right.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 101, gzip size: 100
  inheritsLoose: helper(
    "7.0.0-beta.0",
    "function _inheritsLoose(o,e){o.prototype=Object.create(e.prototype),o.prototype.constructor=o,t(o,e)}",
    {
      globals: ["Object"],
      locals: { _inheritsLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_inheritsLoose",
      dependencies: {
        setPrototypeOf: ["body.0.body.body.0.expression.expressions.2.callee"],
      },
      internal: false,
    },
  ),
  // size: 198, gzip size: 141
  initializerDefineProperty: helper(
    "7.0.0-beta.0",
    "function _initializerDefineProperty(e,i,r,l){r&&Object.defineProperty(e,i,{enumerable:r.enumerable,configurable:r.configurable,writable:r.writable,value:r.initializer?r.initializer.call(l):void 0})}",
    {
      globals: ["Object"],
      locals: { _initializerDefineProperty: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_initializerDefineProperty",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 187, gzip size: 154
  initializerWarningHelper: helper(
    "7.0.0-beta.0",
    'function _initializerWarningHelper(r,e){throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform.")}',
    {
      globals: ["Error"],
      locals: { _initializerWarningHelper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_initializerWarningHelper",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 134, gzip size: 118
  instanceof: helper(
    "7.0.0-beta.0",
    'function _instanceof(n,e){return null!=e&&"undefined"!=typeof Symbol&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](n):n instanceof e}',
    {
      globals: ["Symbol"],
      locals: { _instanceof: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_instanceof",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 72, gzip size: 88
  interopRequireDefault: helper(
    "7.0.0-beta.0",
    "function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}",
    {
      globals: [],
      locals: { _interopRequireDefault: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_interopRequireDefault",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 400, gzip size: 283
  interopRequireWildcard: helper(
    "7.14.0",
    'var e;function _interopRequireWildcard(t,r){if(!r&&t&&t.__esModule)return t;var n,a,o=Object.defineProperty,f={__proto__:null,default:t};if(Object(t)!==t)return f;if(e||"function"!=typeof WeakMap||(e=new WeakMap),e){if(e.has(t))return e.get(t);e.set(t,f)}for(a in t)"default"!==a&&{}.hasOwnProperty.call(t,a)&&((n=o&&Object.getOwnPropertyDescriptor(t,a))&&(n.get||n.set)?o(f,a,n):f[a]=t[a]);return f}',
    {
      globals: ["Object", "WeakMap"],
      locals: {
        e: [
          "body.0.declarations.0.id",
          "body.1.body.body.3.test.expressions.0.left.left",
          "body.1.body.body.3.test.expressions.1",
          "body.1.body.body.3.consequent.body.0.test.callee.object",
          "body.1.body.body.3.consequent.body.0.consequent.argument.callee.object",
          "body.1.body.body.3.consequent.body.1.expression.callee.object",
          "body.1.body.body.3.test.expressions.0.right.left",
        ],
        _interopRequireWildcard: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_interopRequireWildcard",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 133, gzip size: 128
  isNativeFunction: helper(
    "7.0.0-beta.0",
    'function _isNativeFunction(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(n){return"function"==typeof t}}',
    {
      globals: ["Function"],
      locals: { _isNativeFunction: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_isNativeFunction",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 191, gzip size: 143
  isNativeReflectConstruct: helper(
    "7.9.0",
    "function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(t){}return(_isNativeReflectConstruct=function(){return!!t})()}",
    {
      globals: ["Boolean", "Reflect"],
      locals: {
        _isNativeReflectConstruct: [
          "body.0.id",
          "body.0.body.body.1.argument.callee.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.1.argument.callee"],
      exportName: "_isNativeReflectConstruct",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 301, gzip size: 206
  iterableToArray: helper(
    "7.0.0-beta.0",
    'function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}',
    {
      globals: ["Symbol", "Array"],
      locals: { _iterableToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_iterableToArray",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 533, gzip size: 330
  iterableToArrayLimit: helper(
    "7.0.0-beta.0",
    'function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}',
    {
      globals: ["Symbol", "Array", "Object"],
      locals: { _iterableToArrayLimit: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_iterableToArrayLimit",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 441, gzip size: 315
  jsx: helper(
    "7.0.0-beta.0",
    'var e;function _createRawReactElement(r,o,l,n){e||(e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var t=r&&r.defaultProps,f=arguments.length-3;if(o||0===f||(o={children:void 0}),f>0){var a=n;if(f>1){a=Array(f);for(var i=0;i<f;i++)a[i]=arguments[i+3]}o.children=a}if(o&&t)for(var u in t)void 0===o[u]&&(o[u]=t[u]);else o||(o=t||{});return{$$typeof:e,type:r,key:void 0===l?null:""+l,ref:null,props:o,_owner:null}}',
    {
      globals: ["Symbol", "Array"],
      locals: {
        e: [
          "body.0.declarations.0.id",
          "body.1.body.body.0.expression.left",
          "body.1.body.body.4.argument.properties.0.value",
          "body.1.body.body.0.expression.right.left",
        ],
        _createRawReactElement: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_createRawReactElement",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 145, gzip size: 139
  maybeArrayLike: helper(
    "7.9.0",
    'function _maybeArrayLike(e,a,t){if(a&&!Array.isArray(a)&&"number"==typeof a.length){var i=a.length;return r(a,void 0!==t&&t<i?t:i)}return e(a,t)}',
    {
      globals: ["Array"],
      locals: { _maybeArrayLike: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_maybeArrayLike",
      dependencies: {
        arrayLikeToArray: [
          "body.0.body.body.0.consequent.body.1.argument.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 98, gzip size: 106
  newArrowCheck: helper(
    "7.0.0-beta.0",
    'function _newArrowCheck(n,r){if(n!==r)throw new TypeError("Cannot instantiate an arrow function")}',
    {
      globals: ["TypeError"],
      locals: { _newArrowCheck: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_newArrowCheck",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 189, gzip size: 160
  nonIterableRest: helper(
    "7.0.0-beta.0",
    'function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}',
    {
      globals: ["TypeError"],
      locals: { _nonIterableRest: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_nonIterableRest",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 186, gzip size: 156
  nonIterableSpread: helper(
    "7.0.0-beta.0",
    'function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}',
    {
      globals: ["TypeError"],
      locals: { _nonIterableSpread: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_nonIterableSpread",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 99, gzip size: 108
  nullishReceiverError: helper(
    "7.22.6",
    'function _nullishReceiverError(r){throw new TypeError("Cannot set property of null or undefined.")}',
    {
      globals: ["TypeError"],
      locals: { _nullishReceiverError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_nullishReceiverError",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 94, gzip size: 103
  objectDestructuringEmpty: helper(
    "7.0.0-beta.0",
    'function _objectDestructuringEmpty(t){if(null==t)throw new TypeError("Cannot destructure "+t)}',
    {
      globals: ["TypeError"],
      locals: { _objectDestructuringEmpty: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectDestructuringEmpty",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 600, gzip size: 295
  objectSpread2: helper(
    "7.5.0",
    "function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread2(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){e(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}",
    {
      globals: ["Object"],
      locals: {
        ownKeys: [
          "body.0.id",
          "body.1.body.body.0.body.body.1.expression.consequent.callee.object.callee",
          "body.1.body.body.0.body.body.1.expression.alternate.alternate.callee.object.callee",
        ],
        _objectSpread2: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_objectSpread2",
      dependencies: {
        defineProperty: [
          "body.1.body.body.0.body.body.1.expression.consequent.arguments.0.body.body.0.expression.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 252, gzip size: 199
  objectWithoutProperties: helper(
    "7.0.0-beta.0",
    "function _objectWithoutProperties(t,r){if(null==t)return{};var o,n,i=e(t,r);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)o=l[n],-1===r.indexOf(o)&&{}.propertyIsEnumerable.call(t,o)&&(i[o]=t[o])}return i}",
    {
      globals: ["Object"],
      locals: { _objectWithoutProperties: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectWithoutProperties",
      dependencies: {
        objectWithoutPropertiesLoose: [
          "body.0.body.body.1.declarations.2.init.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 169, gzip size: 156
  objectWithoutPropertiesLoose: helper(
    "7.0.0-beta.0",
    "function _objectWithoutPropertiesLoose(r,e){if(null==r)return{};var t={};for(var n in r)if({}.hasOwnProperty.call(r,n)){if(-1!==e.indexOf(n))continue;t[n]=r[n]}return t}",
    {
      globals: [],
      locals: { _objectWithoutPropertiesLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectWithoutPropertiesLoose",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 205, gzip size: 164
  possibleConstructorReturn: helper(
    "7.0.0-beta.0",
    'function _possibleConstructorReturn(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return r(t)}',
    {
      globals: ["TypeError"],
      locals: { _possibleConstructorReturn: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_possibleConstructorReturn",
      dependencies: {
        assertThisInitialized: ["body.0.body.body.2.argument.callee"],
      },
      internal: false,
    },
  ),
  // size: 159, gzip size: 141
  processResponse: helper(
    "8.0.0",
    'function _processResponse(t,e,r){return t.then(function(t){if(t.ok)return t=t[e](),r?t.then(r):t;throw TypeError("Fetch failed: "+t.status+" "+t.statusText)})}',
    {
      globals: ["TypeError"],
      locals: { _processResponse: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_processResponse",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 71, gzip size: 85
  readOnlyError: helper(
    "7.0.0-beta.0",
    "function _readOnlyError(r){throw new TypeError('\"'+r+'\" is read-only')}",
    {
      globals: ["TypeError"],
      locals: { _readOnlyError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_readOnlyError",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 2249, gzip size: 1079
  regenerator: helper(
    "7.27.0",
    'function _regenerator(){\n/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */\nvar r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return t(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?i<3?(i>1&&(G.n=-1),l(i,u)):G.n=u:G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a \'"+n+"\' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(t(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(r.__proto__=GeneratorFunctionPrototype,t(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,t(f,"constructor",GeneratorFunctionPrototype),t(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",t(GeneratorFunctionPrototype,a,"GeneratorFunction"),t(f),t(f,a,"Generator"),t(f,n,function(){return this}),t(f,"toString",function(){return"[object Generator]"}),(_regenerator=function(){return{w:i,m:p}})()}',
    {
      globals: ["Symbol", "Object", "TypeError"],
      locals: {
        _regenerator: [
          "body.0.id",
          "body.0.body.body.9.argument.expressions.9.callee.left",
        ],
      },
      exportBindingAssignments: [
        "body.0.body.body.9.argument.expressions.9.callee",
      ],
      exportName: "_regenerator",
      dependencies: {
        regeneratorDefine: [
          "body.0.body.body.1.body.body.1.argument.expressions.0.callee",
          "body.0.body.body.7.declarations.0.init.alternate.expressions.0.callee",
          "body.0.body.body.8.body.body.0.argument.expressions.0.alternate.expressions.1.callee",
          "body.0.body.body.9.argument.expressions.1.callee",
          "body.0.body.body.9.argument.expressions.2.callee",
          "body.0.body.body.9.argument.expressions.4.callee",
          "body.0.body.body.9.argument.expressions.5.callee",
          "body.0.body.body.9.argument.expressions.6.callee",
          "body.0.body.body.9.argument.expressions.7.callee",
          "body.0.body.body.9.argument.expressions.8.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 123, gzip size: 114
  regeneratorAsync: helper(
    "7.27.0",
    "function _regeneratorAsync(n,r,t,o,u){var a=e(n,r,t,o,u);return a.next().then(function(e){return e.done?e.value:a.next()})}",
    {
      globals: [],
      locals: { _regeneratorAsync: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_regeneratorAsync",
      dependencies: {
        regeneratorAsyncGen: ["body.0.body.body.0.declarations.0.init.callee"],
      },
      internal: false,
    },
  ),
  // size: 81, gzip size: 94
  regeneratorAsyncGen: helper(
    "7.27.0",
    "function _regeneratorAsyncGen(o,t,n,a,m){return new e(r().w(o,t,n,a),m||Promise)}",
    {
      globals: ["Promise"],
      locals: { _regeneratorAsyncGen: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_regeneratorAsyncGen",
      dependencies: {
        regenerator: [
          "body.0.body.body.0.argument.arguments.0.callee.object.callee",
        ],
        regeneratorAsyncIterator: ["body.0.body.body.0.argument.callee"],
      },
      internal: false,
    },
  ),
  // size: 558, gzip size: 290
  regeneratorAsyncIterator: helper(
    "7.27.0",
    'function AsyncIterator(r,e){function o(n,i,c,u){try{var f=r[n](i),a=f.value;return a instanceof t?e.resolve(a.v).then(function(t){o("next",t,c,u)},function(t){o("throw",t,c,u)}):e.resolve(a).then(function(t){f.value=t,c(f)},function(t){return o("throw",t,c,u)})}catch(t){u(t)}}var i;this.next||(n(AsyncIterator.prototype),n(AsyncIterator.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",function(){return this})),n(this,"_invoke",function(t,n,r){function c(){return new e(function(n,e){o(t,r,n,e)})}return i=i?i.then(c,c):c()},!0)}',
    {
      globals: ["Symbol"],
      locals: {
        AsyncIterator: [
          "body.0.id",
          "body.0.body.body.2.expression.expressions.0.right.expressions.0.arguments.0.object",
          "body.0.body.body.2.expression.expressions.0.right.expressions.1.arguments.0.object",
        ],
      },
      exportBindingAssignments: [],
      exportName: "AsyncIterator",
      dependencies: {
        OverloadYield: [
          "body.0.body.body.0.body.body.0.block.body.1.argument.test.right",
        ],
        regeneratorDefine: [
          "body.0.body.body.2.expression.expressions.0.right.expressions.0.callee",
          "body.0.body.body.2.expression.expressions.0.right.expressions.1.callee",
          "body.0.body.body.2.expression.expressions.1.callee",
        ],
      },
      internal: true,
    },
  ),
  // size: 347, gzip size: 221
  regeneratorDefine: helper(
    "7.27.0",
    'function regeneratorDefine(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}regeneratorDefine=function(e,r,n,t){function o(r,n){regeneratorDefine(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},regeneratorDefine(e,r,n,t)}',
    {
      globals: ["Object"],
      locals: {
        regeneratorDefine: [
          "body.0.id",
          "body.0.body.body.2.expression.expressions.0.right.body.body.0.body.body.0.expression.callee",
          "body.0.body.body.2.expression.expressions.1.callee",
          "body.0.body.body.2.expression.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.2.expression.expressions.0"],
      exportName: "regeneratorDefine",
      dependencies: {},
      internal: true,
    },
  ),
  // size: 181, gzip size: 152
  regeneratorKeys: helper(
    "7.27.0",
    "function _regeneratorKeys(e){var n=Object(e),r=[];for(var t in n)r.unshift(t);return function e(){for(;r.length;)if((t=r.pop())in n)return e.value=t,e.done=!1,e;return e.done=!0,e}}",
    {
      globals: ["Object"],
      locals: { _regeneratorKeys: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_regeneratorKeys",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 327, gzip size: 234
  regeneratorValues: helper(
    "7.18.0",
    'function _regeneratorValues(e){if(null!=e){var t=e["function"==typeof Symbol&&Symbol.iterator||"@@iterator"],r=0;if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}}}throw new TypeError(typeof e+" is not iterable")}',
    {
      globals: ["Symbol", "isNaN", "TypeError"],
      locals: { _regeneratorValues: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_regeneratorValues",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 469, gzip size: 270
  set: helper(
    "7.0.0-beta.0",
    'function set(r,f,o,i){return set="undefined"!=typeof Reflect&&Reflect.set?Reflect.set:function(r,f,o,i){var n,p=e(r,f);if(p){if((n=Object.getOwnPropertyDescriptor(p,f)).set)return n.set.call(i,o),!0;if(!n.writable)return!1}if(n=Object.getOwnPropertyDescriptor(i,f)){if(!n.writable)return!1;n.value=o,Object.defineProperty(i,f,n)}else t(i,f,o);return!0},set(r,f,o,i)}function _set(e,t,r,f,o){if(!set(e,t,r,f||e)&&o)throw new TypeError("failed to set property");return r}',
    {
      globals: ["Reflect", "Object", "TypeError"],
      locals: {
        set: [
          "body.0.id",
          "body.0.body.body.0.argument.expressions.1.callee",
          "body.1.body.body.0.test.left.argument.callee",
          "body.0.body.body.0.argument.expressions.0.left",
        ],
        _set: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_set",
      dependencies: {
        superPropBase: [
          "body.0.body.body.0.argument.expressions.0.right.alternate.body.body.0.declarations.1.init.callee",
        ],
        defineProperty: [
          "body.0.body.body.0.argument.expressions.0.right.alternate.body.body.2.alternate.expression.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 178, gzip size: 166
  setFunctionName: helper(
    "7.23.6",
    'function setFunctionName(e,t,n){"symbol"==typeof t&&(t=(t=t.description)?"["+t+"]":"");try{Object.defineProperty(e,"name",{configurable:!0,value:n?n+" "+t:t})}catch(e){}return e}',
    {
      globals: ["Object"],
      locals: { setFunctionName: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "setFunctionName",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 163, gzip size: 102
  setPrototypeOf: helper(
    "7.0.0-beta.0",
    "function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_setPrototypeOf(t,e)}",
    {
      globals: ["Object"],
      locals: {
        _setPrototypeOf: [
          "body.0.id",
          "body.0.body.body.0.argument.expressions.1.callee",
          "body.0.body.body.0.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.argument.expressions.0"],
      exportName: "_setPrototypeOf",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 103, gzip size: 107
  skipFirstGeneratorNext: helper(
    "7.0.0-beta.0",
    "function _skipFirstGeneratorNext(t){return function(){var r=t.apply(this,arguments);return r.next(),r}}",
    {
      globals: [],
      locals: { _skipFirstGeneratorNext: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_skipFirstGeneratorNext",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 56, gzip size: 67
  slicedToArray: helper(
    "7.0.0-beta.0",
    "function _slicedToArray(e,i){return r(e,i)||o(e,i)||t()}",
    {
      globals: [],
      locals: { _slicedToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_slicedToArray",
      dependencies: {
        iterableToArrayLimit: ["body.0.body.body.0.argument.left.left.callee"],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableRest: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),
  // size: 91, gzip size: 105
  superPropBase: helper(
    "7.0.0-beta.0",
    "function _superPropBase(o,t){for(;!{}.hasOwnProperty.call(o,t)&&null!==(o=r(o)););return o}",
    {
      globals: [],
      locals: { _superPropBase: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_superPropBase",
      dependencies: {
        getPrototypeOf: ["body.0.body.body.0.test.right.right.right.callee"],
      },
      internal: false,
    },
  ),
  // size: 134, gzip size: 127
  superPropGet: helper(
    "7.25.0",
    'function _superPropGet(r,e,p,f){var n=t(o(1&f?r.prototype:r),e,p);return 2&f&&"function"==typeof n?function(t){return n.apply(p,t)}:n}',
    {
      globals: [],
      locals: { _superPropGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_superPropGet",
      dependencies: {
        get: ["body.0.body.body.0.declarations.0.init.callee"],
        getPrototypeOf: [
          "body.0.body.body.0.declarations.0.init.arguments.0.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 73, gzip size: 87
  superPropSet: helper(
    "7.25.0",
    "function _superPropSet(r,e,p,f,m,u){return t(o(u?r.prototype:r),e,p,f,m)}",
    {
      globals: [],
      locals: { _superPropSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_superPropSet",
      dependencies: {
        set: ["body.0.body.body.0.argument.callee"],
        getPrototypeOf: ["body.0.body.body.0.argument.arguments.0.callee"],
      },
      internal: false,
    },
  ),
  // size: 135, gzip size: 128
  taggedTemplateLiteral: helper(
    "7.0.0-beta.0",
    "function _taggedTemplateLiteral(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}",
    {
      globals: ["Object"],
      locals: { _taggedTemplateLiteral: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_taggedTemplateLiteral",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 77, gzip size: 94
  taggedTemplateLiteralLoose: helper(
    "7.0.0-beta.0",
    "function _taggedTemplateLiteralLoose(e,t){return t||(t=e.slice(0)),e.raw=t,e}",
    {
      globals: [],
      locals: { _taggedTemplateLiteralLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_taggedTemplateLiteralLoose",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 89, gzip size: 97
  tdz: helper(
    "7.5.5",
    'function _tdzError(e){throw new ReferenceError(e+" is not defined - temporal dead zone")}',
    {
      globals: ["ReferenceError"],
      locals: { _tdzError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_tdzError",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 47, gzip size: 67
  temporalRef: helper(
    "7.0.0-beta.0",
    "function _temporalRef(e,o){return e===r?t(o):e}",
    {
      globals: [],
      locals: { _temporalRef: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_temporalRef",
      dependencies: {
        temporalUndefined: ["body.0.body.body.0.argument.test.right"],
        tdz: ["body.0.body.body.0.argument.consequent.callee"],
      },
      internal: false,
    },
  ),
  // size: 31, gzip size: 51
  temporalUndefined: helper("7.0.0-beta.0", "function _temporalUndefined(){}", {
    globals: [],
    locals: { _temporalUndefined: ["body.0.id"] },
    exportBindingAssignments: [],
    exportName: "_temporalUndefined",
    dependencies: {},
    internal: false,
  }),
  // size: 44, gzip size: 60
  toArray: helper(
    "7.0.0-beta.0",
    "function _toArray(e){return r(e)||o(e)||t()}",
    {
      globals: [],
      locals: { _toArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_toArray",
      dependencies: {
        iterableToArray: ["body.0.body.body.0.argument.left.left.callee"],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableRest: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),
  // size: 60, gzip size: 73
  toConsumableArray: helper(
    "7.0.0-beta.0",
    "function _toConsumableArray(a){return r(a)||o(a)||t(a)||e()}",
    {
      globals: [],
      locals: { _toConsumableArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_toConsumableArray",
      dependencies: {
        arrayWithoutHoles: [
          "body.0.body.body.0.argument.left.left.left.callee",
        ],
        iterableToArray: ["body.0.body.body.0.argument.left.left.right.callee"],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableSpread: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),
  // size: 300, gzip size: 217
  toPrimitive: helper(
    "7.1.5",
    'function toPrimitive(t,e){if("object"!=typeof t||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}',
    {
      globals: ["Symbol", "TypeError", "String", "Number"],
      locals: { toPrimitive: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "toPrimitive",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 78, gzip size: 96
  toPropertyKey: helper(
    "7.1.5",
    'function toPropertyKey(r){var o=t(r,"string");return"symbol"==typeof o?o:o+""}',
    {
      globals: [],
      locals: { toPropertyKey: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "toPropertyKey",
      dependencies: {
        toPrimitive: ["body.0.body.body.0.declarations.0.init.callee"],
      },
      internal: false,
    },
  ),
  // size: 129, gzip size: 133
  toSetter: helper(
    "7.24.0",
    'function _toSetter(t,e,n){e||(e=[]);var r=e.length++;return Object.defineProperty({},"_",{set:function(o){e[r]=o,t.apply(n,e)}})}',
    {
      globals: ["Object"],
      locals: { _toSetter: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_toSetter",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 241, gzip size: 209
  tsRewriteRelativeImportExtensions: helper(
    "7.27.0",
    'function tsRewriteRelativeImportExtensions(t,e){return"string"==typeof t&&/^\\.\\.?\\//.test(t)?t.replace(/\\.(tsx)$|((?:\\.d)?)((?:\\.[^./]+)?)\\.([cm]?)ts$/i,function(t,s,r,n,o){return s?e?".jsx":".js":!r||n&&o?r+n+"."+o.toLowerCase()+"js":t}):t}',
    {
      globals: [],
      locals: { tsRewriteRelativeImportExtensions: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "tsRewriteRelativeImportExtensions",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 274, gzip size: 157
  typeof: helper(
    "7.0.0-beta.0",
    'function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}',
    {
      globals: ["Symbol"],
      locals: {
        _typeof: [
          "body.0.id",
          "body.0.body.body.0.argument.expressions.1.callee",
          "body.0.body.body.0.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.argument.expressions.0"],
      exportName: "_typeof",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 298, gzip size: 240
  unsupportedIterableToArray: helper(
    "7.9.0",
    'function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return r(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?r(t,e):void 0}}',
    {
      globals: ["Array"],
      locals: { _unsupportedIterableToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_unsupportedIterableToArray",
      dependencies: {
        arrayLikeToArray: [
          "body.0.body.body.0.consequent.body.0.consequent.argument.callee",
          "body.0.body.body.0.consequent.body.2.argument.expressions.1.alternate.consequent.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 1117, gzip size: 548
  usingCtx: helper(
    "7.23.9",
    'function _usingCtx(){var r="function"==typeof SuppressedError?SuppressedError:function(r,e){var n=Error();return n.name="SuppressedError",n.error=r,n.suppressed=e,n},e={},n=[];function using(r,e){if(null!=e){if(Object(e)!==e)throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");if(r)var o=e[Symbol.asyncDispose||Symbol.for("Symbol.asyncDispose")];if(void 0===o&&(o=e[Symbol.dispose||Symbol.for("Symbol.dispose")],r))var t=o;if("function"!=typeof o)throw new TypeError("Object is not disposable.");t&&(o=function(){try{t.call(e)}catch(r){return Promise.reject(r)}}),n.push({v:e,d:o,a:r})}else r&&n.push({d:e,a:r});return e}return{e:e,u:using.bind(null,!1),a:using.bind(null,!0),d:function(){var o,t=this.e,s=0;function next(){for(;o=n.pop();)try{if(!o.a&&1===s)return s=0,n.push(o),Promise.resolve().then(next);if(o.d){var r=o.d.call(o.v);if(o.a)return s|=2,Promise.resolve(r).then(next,err)}else s|=1}catch(r){return err(r)}if(1===s)return t!==e?Promise.reject(t):Promise.resolve();if(t!==e)throw t}function err(n){return t=t!==e?new r(n,t):n,next()}return next()}}}',
    {
      globals: [
        "SuppressedError",
        "Error",
        "Object",
        "TypeError",
        "Symbol",
        "Promise",
      ],
      locals: { _usingCtx: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_usingCtx",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 1051, gzip size: 489
  wrapAsyncGenerator: helper(
    "7.0.0-beta.0",
    'function _wrapAsyncGenerator(e){return function(){return new AsyncGenerator(e.apply(this,arguments))}}function AsyncGenerator(t){var n,r;function resume(n,r){try{var o=t[n](r),u=o.value,i=u instanceof e;Promise.resolve(i?u.v:u).then(function(e){if(i){var r="return"===n&&u.k?n:"next";if(!u.k||e.done)return resume(r,e);e=t[r](e).value}settle(!!o.done,e)},function(e){resume("throw",e)})}catch(e){settle(2,e)}}function settle(e,t){2===e?n.reject(t):n.resolve({value:t,done:e}),(n=n.next)?resume(n.key,n.arg):r=null}this._invoke=function(e,t){return new Promise(function(o,u){var i={key:e,arg:t,resolve:o,reject:u,next:null};r?r=r.next=i:(n=r=i,resume(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}AsyncGenerator.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},AsyncGenerator.prototype.next=function(e){return this._invoke("next",e)},AsyncGenerator.prototype.throw=function(e){return this._invoke("throw",e)},AsyncGenerator.prototype.return=function(e){return this._invoke("return",e)};',
    {
      globals: ["Promise", "Symbol"],
      locals: {
        _wrapAsyncGenerator: ["body.0.id"],
        AsyncGenerator: [
          "body.1.id",
          "body.0.body.body.0.argument.body.body.0.argument.callee",
          "body.2.expression.expressions.0.left.object.object",
          "body.2.expression.expressions.1.left.object.object",
          "body.2.expression.expressions.2.left.object.object",
          "body.2.expression.expressions.3.left.object.object",
        ],
      },
      exportBindingAssignments: [],
      exportName: "_wrapAsyncGenerator",
      dependencies: {
        OverloadYield: [
          "body.1.body.body.1.body.body.0.block.body.0.declarations.2.init.right",
        ],
      },
      internal: false,
    },
  ),
  // size: 514, gzip size: 305
  wrapNativeSuper: helper(
    "7.0.0-beta.0",
    'function _wrapNativeSuper(p){var n="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(p){if(null===p||!e(p))return p;if("function"!=typeof p)throw new TypeError("Super expression must either be null or a function");if(void 0!==n){if(n.has(p))return n.get(p);n.set(p,Wrapper)}function Wrapper(){return o(p,arguments,r(this).constructor)}return Wrapper.prototype=Object.create(p.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),t(Wrapper,p)},_wrapNativeSuper(p)}',
    {
      globals: ["Map", "TypeError", "Object"],
      locals: {
        _wrapNativeSuper: [
          "body.0.id",
          "body.0.body.body.1.argument.expressions.1.callee",
          "body.0.body.body.1.argument.expressions.0.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.1.argument.expressions.0"],
      exportName: "_wrapNativeSuper",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.1.argument.expressions.0.right.body.body.3.body.body.0.argument.arguments.2.object.callee",
        ],
        setPrototypeOf: [
          "body.0.body.body.1.argument.expressions.0.right.body.body.4.argument.expressions.1.callee",
        ],
        isNativeFunction: [
          "body.0.body.body.1.argument.expressions.0.right.body.body.0.test.right.argument.callee",
        ],
        construct: [
          "body.0.body.body.1.argument.expressions.0.right.body.body.3.body.body.0.argument.callee",
        ],
      },
      internal: false,
    },
  ),
  // size: 1187, gzip size: 542
  wrapRegExp: helper(
    "7.19.0",
    'function _wrapRegExp(){_wrapRegExp=function(e,r){return new BabelRegExp(e,void 0,r)};var t=RegExp.prototype,p=new WeakMap;function BabelRegExp(r,t,o){var n=RegExp(r,t);return p.set(n,o||p.get(r)),e(n,BabelRegExp.prototype)}function buildGroups(e,r){var t=p.get(r);return Object.keys(t).reduce(function(r,p){var o=t[p];if("number"==typeof o)r[p]=e[o];else{for(var n=0;void 0===e[o[n]]&&n+1<o.length;)n++;r[p]=e[o[n]]}return r},Object.create(null))}return r(BabelRegExp,RegExp),BabelRegExp.prototype.exec=function(e){var r=t.exec.call(this,e);if(r){r.groups=buildGroups(r,this);var p=r.indices;p&&(p.groups=buildGroups(p,this))}return r},BabelRegExp.prototype[Symbol.replace]=function(e,r){if("string"==typeof r){var o=p.get(this);return t[Symbol.replace].call(this,e,r.replace(/\\$<([^>]+)(>|$)/g,function(e,r,t){if(""===t)return e;var p=o[r];return Array.isArray(p)?"$"+p.join("$"):"number"==typeof p?"$"+p:""}))}if("function"==typeof r){var n=this;return t[Symbol.replace].call(this,e,function(){var e=arguments;return"object"!=typeof e[e.length-1]&&(e=[].slice.call(e)).push(buildGroups(e,n)),r.apply(this,e)})}return t[Symbol.replace].call(this,e,r)},_wrapRegExp.apply(this,arguments)}',
    {
      globals: ["RegExp", "WeakMap", "Object", "Symbol", "Array"],
      locals: {
        _wrapRegExp: [
          "body.0.id",
          "body.0.body.body.4.argument.expressions.3.callee.object",
          "body.0.body.body.0.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.expression"],
      exportName: "_wrapRegExp",
      dependencies: {
        setPrototypeOf: [
          "body.0.body.body.2.body.body.1.argument.expressions.1.callee",
        ],
        inherits: ["body.0.body.body.4.argument.expressions.0.callee"],
      },
      internal: false,
    },
  ),
  // size: 73, gzip size: 86
  writeOnlyError: helper(
    "7.12.13",
    "function _writeOnlyError(r){throw new TypeError('\"'+r+'\" is write-only')}",
    {
      globals: ["TypeError"],
      locals: { _writeOnlyError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_writeOnlyError",
      dependencies: {},
      internal: false,
    },
  ),
};
