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
  locals: { [name: string]: string[] };
  dependencies: { [name: string]: string[] };
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

export { helpers as default, helpersUncompressed };
const helpers: Record<string, Helper> = {
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
  // size: 447, gzip size: 270
  applyDecoratedDescriptor: helper(
    "7.0.0-beta.0",
    'function _applyDecoratedDescriptor(i,e,r,n,l){var a={};return Object.keys(n).forEach((function(i){a[i]=n[i]})),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=r.slice().reverse().reduce((function(r,n){return n(i,e,r)||r}),a),l&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(l):void 0,a.initializer=void 0),void 0===a.initializer?(Object.defineProperty(i,e,a),null):a}',
    {
      globals: ["Object"],
      locals: { _applyDecoratedDescriptor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_applyDecoratedDescriptor",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 2840, gzip size: 1469
  applyDecs2311: helper(
    "7.24.0",
    'function applyDecs2311(e,t,n,r,o,i){var a,c,u,s,f,l,p,d=Symbol.metadata||Symbol.for("Symbol.metadata"),m=Object.defineProperty,h=Object.create,y=[h(null),h(null)],v=t.length;function g(t,n,r){return function(o,i){n&&(i=o,o=e);for(var a=0;a<t.length;a++)i=t[a].apply(o,r?[i]:[]);return r?i:o}}function b(e,t,n,r){if("function"!=typeof e&&(r||void 0!==e))throw new TypeError(t+" must "+(n||"be")+" a function"+(r?"":" or undefined"));return e}function applyDec(e,t,n,r,o,i,u,s,f,l,p){function d(e){if(!p(e))throw new TypeError("Attempted to access private element on non-instance")}var h=[].concat(t[0]),v=t[3],w=!u,D=1===o,S=3===o,j=4===o,E=2===o;function I(t,n,r){return function(o,i){return n&&(i=o,o=e),r&&r(o),P[t].call(o,i)}}if(!w){var P={},k=[],F=S?"get":j||D?"set":"value";if(f?(l||D?P={get:setFunctionName((function(){return v(this)}),r,"get"),set:function(e){t[4](this,e)}}:P[F]=v,l||setFunctionName(P[F],r,E?"":F)):l||(P=Object.getOwnPropertyDescriptor(e,r)),!l&&!f){if((c=y[+s][r])&&7!=(c^o))throw Error("Decorating two elements with the same name ("+P[F].name+") is not supported yet");y[+s][r]=o<3?1:o}}for(var N=e,O=h.length-1;O>=0;O-=n?2:1){var T=b(h[O],"A decorator","be",!0),z=n?h[O-1]:void 0,A={},H={kind:["field","accessor","method","getter","setter","class"][o],name:r,metadata:a,addInitializer:function(e,t){if(e.v)throw new TypeError("attempted to call addInitializer after decoration was finished");b(t,"An initializer","be",!0),i.push(t)}.bind(null,A)};if(w)c=T.call(z,N,H),A.v=1,b(c,"class decorators","return")&&(N=c);else if(H.static=s,H.private=f,c=H.access={has:f?p.bind():function(e){return r in e}},j||(c.get=f?E?function(e){return d(e),P.value}:I("get",0,d):function(e){return e[r]}),E||S||(c.set=f?I("set",0,d):function(e,t){e[r]=t}),N=T.call(z,D?{get:P.get,set:P.set}:P[F],H),A.v=1,D){if("object"==typeof N&&N)(c=b(N.get,"accessor.get"))&&(P.get=c),(c=b(N.set,"accessor.set"))&&(P.set=c),(c=b(N.init,"accessor.init"))&&k.unshift(c);else if(void 0!==N)throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined")}else b(N,(l?"field":"method")+" decorators","return")&&(l?k.unshift(N):P[F]=N)}return o<2&&u.push(g(k,s,1),g(i,s,0)),l||w||(f?D?u.splice(-1,0,I("get",s),I("set",s)):u.push(E?P[F]:b.call.bind(P[F])):m(e,r,P)),N}function w(e){return m(e,d,{configurable:!0,enumerable:!0,value:a})}return void 0!==i&&(a=i[d]),a=h(null==a?null:a),f=[],l=function(e){e&&f.push(g(e))},p=function(t,r){for(var i=0;i<n.length;i++){var a=n[i],c=a[1],l=7&c;if((8&c)==t&&!l==r){var p=a[2],d=!!a[3],m=16&c;applyDec(t?e:e.prototype,a,m,d?"#"+p:toPropertyKey(p),l,l<2?[]:t?s=s||[]:u=u||[],f,!!t,d,r,t&&d?function(t){return checkInRHS(t)===e}:o)}}},p(8,0),p(0,0),p(8,1),p(0,1),l(u),l(s),c=f,v||w(e),{e:c,get c(){var n=[];return v&&[w(e=applyDec(e,[t],r,e.name,5,n)),g(n,1)]}}}',
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
  // size: 57, gzip size: 71
  arrayWithHoles: helper(
    "7.0.0-beta.0",
    "function _arrayWithHoles(r){if(Array.isArray(r))return r}",
    {
      globals: ["Array"],
      locals: { _arrayWithHoles: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayWithHoles",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 78, gzip size: 83
  arrayWithoutHoles: helper(
    "7.0.0-beta.0",
    "function _arrayWithoutHoles(r){if(Array.isArray(r))return arrayLikeToArray(r)}",
    {
      globals: ["Array"],
      locals: { _arrayWithoutHoles: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayWithoutHoles",
      dependencies: {
        arrayLikeToArray: ["body.0.body.body.0.consequent.argument.callee"],
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
  // size: 488, gzip size: 278
  asyncGeneratorDelegate: helper(
    "7.0.0-beta.0",
    'function _asyncGeneratorDelegate(t){var e={},n=!1;function pump(e,r){return n=!0,r=new Promise((function(n){n(t[e](r))})),{done:!1,value:new OverloadYield(r,1)}}return e["undefined"!=typeof Symbol&&Symbol.iterator||"@@iterator"]=function(){return this},e.next=function(t){return n?(n=!1,t):pump("next",t)},"function"==typeof t.throw&&(e.throw=function(t){if(n)throw n=!1,t;return pump("throw",t)}),"function"==typeof t.return&&(e.return=function(t){return n?(n=!1,t):pump("return",t)}),e}',
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
  // size: 1081, gzip size: 431
  asyncIterator: helper(
    "7.15.9",
    'function _asyncIterator(r){var n,t,o,e=2;for("undefined"!=typeof Symbol&&(t=Symbol.asyncIterator,o=Symbol.iterator);e--;){if(t&&null!=(n=r[t]))return n.call(r);if(o&&null!=(n=r[o]))return new AsyncFromSyncIterator(n.call(r));t="@@asyncIterator",o="@@iterator"}throw new TypeError("Object is not async iterable")}function AsyncFromSyncIterator(r){function AsyncFromSyncIteratorContinuation(r){if(Object(r)!==r)return Promise.reject(new TypeError(r+" is not an object."));var n=r.done;return Promise.resolve(r.value).then((function(r){return{value:r,done:n}}))}return AsyncFromSyncIterator=function(r){this.s=r,this.n=r.next},AsyncFromSyncIterator.prototype={s:null,n:null,next:function(){return AsyncFromSyncIteratorContinuation(this.n.apply(this.s,arguments))},return:function(r){var n=this.s.return;return void 0===n?Promise.resolve({value:r,done:!0}):AsyncFromSyncIteratorContinuation(n.apply(this.s,arguments))},throw:function(r){var n=this.s.return;return void 0===n?Promise.reject(r):AsyncFromSyncIteratorContinuation(n.apply(this.s,arguments))}},new AsyncFromSyncIterator(r)}',
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
  // size: 414, gzip size: 240
  asyncToGenerator: helper(
    "7.0.0-beta.0",
    'function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise((function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)}))}}',
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
  // size: 63, gzip size: 83
  awaitAsyncGenerator: helper(
    "7.0.0-beta.0",
    "function _awaitAsyncGenerator(e){return new OverloadYield(e,0)}",
    {
      globals: [],
      locals: { _awaitAsyncGenerator: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_awaitAsyncGenerator",
      dependencies: { OverloadYield: ["body.0.body.body.0.argument.callee"] },
      internal: false,
    },
  ),
  // size: 180, gzip size: 144
  callSuper: helper(
    "7.23.8",
    "function _callSuper(t,o,e){return o=getPrototypeOf(o),possibleConstructorReturn(t,isNativeReflectConstruct()?Reflect.construct(o,e||[],getPrototypeOf(t).constructor):o.apply(t,e))}",
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
  // size: 73, gzip size: 88
  classPrivateFieldGet2: helper(
    "7.24.0",
    "function _classPrivateFieldGet2(s,a){return s.get(assertClassBrand(s,a))}",
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
  // size: 85, gzip size: 96
  classPrivateFieldInitSpec: helper(
    "7.14.1",
    "function _classPrivateFieldInitSpec(e,t,a){checkPrivateRedeclaration(e,t),t.set(e,a)}",
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
  // size: 73, gzip size: 89
  classPrivateFieldLooseKey: helper(
    "7.0.0-beta.0",
    'var id=0;function _classPrivateFieldKey(e){return"__private_"+id+++"_"+e}',
    {
      globals: [],
      locals: {
        id: [
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
  // size: 79, gzip size: 95
  classPrivateFieldSet2: helper(
    "7.24.0",
    "function _classPrivateFieldSet2(s,a,r){return s.set(assertClassBrand(s,a),r),r}",
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
  // size: 68, gzip size: 84
  classPrivateGetter: helper(
    "7.24.0",
    "function _classPrivateGetter(s,r,a){return a(assertClassBrand(s,r))}",
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
  // size: 82, gzip size: 91
  classPrivateMethodInitSpec: helper(
    "7.14.1",
    "function _classPrivateMethodInitSpec(e,a){checkPrivateRedeclaration(e,a),a.add(e)}",
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
  // size: 74, gzip size: 89
  classPrivateSetter: helper(
    "7.24.0",
    "function _classPrivateSetter(s,r,a,t){return r(assertClassBrand(s,a),t),t}",
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
  // size: 76, gzip size: 94
  classStaticPrivateMethodGet: helper(
    "7.3.2",
    "function _classStaticPrivateMethodGet(s,a,t){return assertClassBrand(a,s),t}",
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
  // size: 206, gzip size: 160
  construct: helper(
    "7.0.0-beta.0",
    "function _construct(t,e,r){if(isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var o=[null];o.push.apply(o,e);var p=new(t.bind.apply(t,o));return r&&setPrototypeOf(p,r.prototype),p}",
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
  // size: 348, gzip size: 220
  createClass: helper(
    "7.0.0-beta.0",
    'function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,toPropertyKey(o.key),o)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}',
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
  // size: 692, gzip size: 423
  createForOfIteratorHelper: helper(
    "7.9.0",
    'function _createForOfIteratorHelper(r,e){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!t){if(Array.isArray(r)||(t=unsupportedIterableToArray(r))||e&&r&&"number"==typeof r.length){t&&(r=t);var n=0,F=function(){};return{s:F,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){t=t.call(r)},n:function(){var r=t.next();return a=r.done,r},e:function(r){u=!0,o=r},f:function(){try{a||null==t.return||t.return()}finally{if(u)throw o}}}}',
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
  // size: 488, gzip size: 335
  createForOfIteratorHelperLoose: helper(
    "7.9.0",
    'function _createForOfIteratorHelperLoose(r,e){var t="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(t)return(t=t.call(r)).next.bind(t);if(Array.isArray(r)||(t=unsupportedIterableToArray(r))||e&&r&&"number"==typeof r.length){t&&(r=t);var o=0;return function(){return o>=r.length?{done:!0}:{done:!1,value:r[o++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}',
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
  // size: 255, gzip size: 172
  createSuper: helper(
    "7.9.0",
    "function _createSuper(t){var r=isNativeReflectConstruct();return function(){var e,o=getPrototypeOf(t);if(r){var s=getPrototypeOf(this).constructor;e=Reflect.construct(o,arguments,s)}else e=o.apply(this,arguments);return possibleConstructorReturn(this,e)}}",
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
  // size: 7029, gzip size: 2057
  decorate: helper(
    "7.1.5",
    'function _decorate(e,r,t,i){var o=_getDecoratorsApi();if(i)for(var n=0;n<i.length;n++)o=i[n](o);var s=r((function(e){o.initializeInstanceElements(e,a.elements)}),t),a=o.decorateClass(_coalesceClassElements(s.d.map(_createElementDescriptor)),e);return o.initializeClassElements(s.F,a.elements),o.runClassFinishers(s.F,a.finishers)}function _getDecoratorsApi(){_getDecoratorsApi=function(){return e};var e={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(e,r){["method","field"].forEach((function(t){r.forEach((function(r){r.kind===t&&"own"===r.placement&&this.defineClassElement(e,r)}),this)}),this)},initializeClassElements:function(e,r){var t=e.prototype;["method","field"].forEach((function(i){r.forEach((function(r){var o=r.placement;if(r.kind===i&&("static"===o||"prototype"===o)){var n="static"===o?e:t;this.defineClassElement(n,r)}}),this)}),this)},defineClassElement:function(e,r){var t=r.descriptor;if("field"===r.kind){var i=r.initializer;t={enumerable:t.enumerable,writable:t.writable,configurable:t.configurable,value:void 0===i?void 0:i.call(e)}}Object.defineProperty(e,r.key,t)},decorateClass:function(e,r){var t=[],i=[],o={static:[],prototype:[],own:[]};if(e.forEach((function(e){this.addElementPlacement(e,o)}),this),e.forEach((function(e){if(!_hasDecorators(e))return t.push(e);var r=this.decorateElement(e,o);t.push(r.element),t.push.apply(t,r.extras),i.push.apply(i,r.finishers)}),this),!r)return{elements:t,finishers:i};var n=this.decorateConstructor(t,r);return i.push.apply(i,n.finishers),n.finishers=i,n},addElementPlacement:function(e,r,t){var i=r[e.placement];if(!t&&-1!==i.indexOf(e.key))throw new TypeError("Duplicated element ("+e.key+")");i.push(e.key)},decorateElement:function(e,r){for(var t=[],i=[],o=e.decorators,n=o.length-1;n>=0;n--){var s=r[e.placement];s.splice(s.indexOf(e.key),1);var a=this.fromElementDescriptor(e),l=this.toElementFinisherExtras((0,o[n])(a)||a);e=l.element,this.addElementPlacement(e,r),l.finisher&&i.push(l.finisher);var c=l.extras;if(c){for(var p=0;p<c.length;p++)this.addElementPlacement(c[p],r);t.push.apply(t,c)}}return{element:e,finishers:i,extras:t}},decorateConstructor:function(e,r){for(var t=[],i=r.length-1;i>=0;i--){var o=this.fromClassDescriptor(e),n=this.toClassDescriptor((0,r[i])(o)||o);if(void 0!==n.finisher&&t.push(n.finisher),void 0!==n.elements){e=n.elements;for(var s=0;s<e.length-1;s++)for(var a=s+1;a<e.length;a++)if(e[s].key===e[a].key&&e[s].placement===e[a].placement)throw new TypeError("Duplicated element ("+e[s].key+")")}}return{elements:e,finishers:t}},fromElementDescriptor:function(e){var r={kind:e.kind,key:e.key,placement:e.placement,descriptor:e.descriptor};return Object.defineProperty(r,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),"field"===e.kind&&(r.initializer=e.initializer),r},toElementDescriptors:function(e){if(void 0!==e)return toArray(e).map((function(e){var r=this.toElementDescriptor(e);return this.disallowProperty(e,"finisher","An element descriptor"),this.disallowProperty(e,"extras","An element descriptor"),r}),this)},toElementDescriptor:function(e){var r=e.kind+"";if("method"!==r&&"field"!==r)throw new TypeError(\'An element descriptor\\\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "\'+r+\'"\');var t=toPropertyKey(e.key),i=e.placement+"";if("static"!==i&&"prototype"!==i&&"own"!==i)throw new TypeError(\'An element descriptor\\\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "\'+i+\'"\');var o=e.descriptor;this.disallowProperty(e,"elements","An element descriptor");var n={kind:r,key:t,placement:i,descriptor:Object.assign({},o)};return"field"!==r?this.disallowProperty(e,"initializer","A method descriptor"):(this.disallowProperty(o,"get","The property descriptor of a field descriptor"),this.disallowProperty(o,"set","The property descriptor of a field descriptor"),this.disallowProperty(o,"value","The property descriptor of a field descriptor"),n.initializer=e.initializer),n},toElementFinisherExtras:function(e){return{element:this.toElementDescriptor(e),finisher:_optionalCallableProperty(e,"finisher"),extras:this.toElementDescriptors(e.extras)}},fromClassDescriptor:function(e){var r={kind:"class",elements:e.map(this.fromElementDescriptor,this)};return Object.defineProperty(r,Symbol.toStringTag,{value:"Descriptor",configurable:!0}),r},toClassDescriptor:function(e){var r=e.kind+"";if("class"!==r)throw new TypeError(\'A class descriptor\\\'s .kind property must be "class", but a decorator created a class descriptor with .kind "\'+r+\'"\');this.disallowProperty(e,"key","A class descriptor"),this.disallowProperty(e,"placement","A class descriptor"),this.disallowProperty(e,"descriptor","A class descriptor"),this.disallowProperty(e,"initializer","A class descriptor"),this.disallowProperty(e,"extras","A class descriptor");var t=_optionalCallableProperty(e,"finisher");return{elements:this.toElementDescriptors(e.elements),finisher:t}},runClassFinishers:function(e,r){for(var t=0;t<r.length;t++){var i=(0,r[t])(e);if(void 0!==i){if("function"!=typeof i)throw new TypeError("Finishers must return a constructor.");e=i}}return e},disallowProperty:function(e,r,t){if(void 0!==e[r])throw new TypeError(t+" can\'t have a ."+r+" property.")}};return e}function _createElementDescriptor(e){var r,t=toPropertyKey(e.key);"method"===e.kind?r={value:e.value,writable:!0,configurable:!0,enumerable:!1}:"get"===e.kind?r={get:e.value,configurable:!0,enumerable:!1}:"set"===e.kind?r={set:e.value,configurable:!0,enumerable:!1}:"field"===e.kind&&(r={configurable:!0,writable:!0,enumerable:!0});var i={kind:"field"===e.kind?"field":"method",key:t,placement:e.static?"static":"field"===e.kind?"own":"prototype",descriptor:r};return e.decorators&&(i.decorators=e.decorators),"field"===e.kind&&(i.initializer=e.value),i}function _coalesceGetterSetter(e,r){void 0!==e.descriptor.get?r.descriptor.get=e.descriptor.get:r.descriptor.set=e.descriptor.set}function _coalesceClassElements(e){for(var r=[],isSameElement=function(e){return"method"===e.kind&&e.key===o.key&&e.placement===o.placement},t=0;t<e.length;t++){var i,o=e[t];if("method"===o.kind&&(i=r.find(isSameElement)))if(_isDataDescriptor(o.descriptor)||_isDataDescriptor(i.descriptor)){if(_hasDecorators(o)||_hasDecorators(i))throw new ReferenceError("Duplicated methods ("+o.key+") can\'t be decorated.");i.descriptor=o.descriptor}else{if(_hasDecorators(o)){if(_hasDecorators(i))throw new ReferenceError("Decorators can\'t be placed on different accessors with for the same property ("+o.key+").");i.decorators=o.decorators}_coalesceGetterSetter(o,i)}else r.push(o)}return r}function _hasDecorators(e){return e.decorators&&e.decorators.length}function _isDataDescriptor(e){return void 0!==e&&!(void 0===e.value&&void 0===e.writable)}function _optionalCallableProperty(e,r){var t=e[r];if(void 0!==t&&"function"!=typeof t)throw new TypeError("Expected \'"+r+"\' to be a function");return t}',
    {
      globals: ["Object", "TypeError", "Symbol", "ReferenceError"],
      locals: {
        _decorate: ["body.0.id"],
        _getDecoratorsApi: [
          "body.1.id",
          "body.0.body.body.0.declarations.0.init.callee",
          "body.1.body.body.0.expression.left",
        ],
        _createElementDescriptor: [
          "body.2.id",
          "body.0.body.body.2.declarations.1.init.arguments.0.arguments.0.arguments.0",
        ],
        _coalesceGetterSetter: [
          "body.3.id",
          "body.4.body.body.0.body.body.1.consequent.alternate.body.1.expression.callee",
        ],
        _coalesceClassElements: [
          "body.4.id",
          "body.0.body.body.2.declarations.1.init.arguments.0.callee",
        ],
        _hasDecorators: [
          "body.5.id",
          "body.1.body.body.1.declarations.0.init.properties.4.value.body.body.1.test.expressions.1.arguments.0.body.body.0.test.argument.callee",
          "body.4.body.body.0.body.body.1.consequent.consequent.body.0.test.left.callee",
          "body.4.body.body.0.body.body.1.consequent.consequent.body.0.test.right.callee",
          "body.4.body.body.0.body.body.1.consequent.alternate.body.0.test.callee",
          "body.4.body.body.0.body.body.1.consequent.alternate.body.0.consequent.body.0.test.callee",
        ],
        _isDataDescriptor: [
          "body.6.id",
          "body.4.body.body.0.body.body.1.consequent.test.left.callee",
          "body.4.body.body.0.body.body.1.consequent.test.right.callee",
        ],
        _optionalCallableProperty: [
          "body.7.id",
          "body.1.body.body.1.declarations.0.init.properties.11.value.body.body.0.argument.properties.1.value.callee",
          "body.1.body.body.1.declarations.0.init.properties.13.value.body.body.3.declarations.0.init.callee",
        ],
      },
      exportBindingAssignments: [],
      exportName: "_decorate",
      dependencies: {
        toArray: [
          "body.1.body.body.1.declarations.0.init.properties.9.value.body.body.0.consequent.argument.callee.object.callee",
        ],
        toPropertyKey: [
          "body.1.body.body.1.declarations.0.init.properties.10.value.body.body.2.declarations.0.init.callee",
          "body.2.body.body.0.declarations.1.init.callee",
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
  // size: 151, gzip size: 130
  defineProperty: helper(
    "7.0.0-beta.0",
    "function _defineProperty(e,r,t){return(r=toPropertyKey(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}",
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
  // size: 263, gzip size: 202
  get: helper(
    "7.0.0-beta.0",
    'function _get(){return _get="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var p=superPropBase(e,t);if(p){var n=Object.getOwnPropertyDescriptor(p,t);return n.get?n.get.call(arguments.length<3?e:r):n.value}},_get.apply(null,arguments)}',
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
  // size: 300, gzip size: 219
  inherits: helper(
    "7.0.0-beta.0",
    'function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&setPrototypeOf(t,e)}',
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
  // size: 114, gzip size: 105
  inheritsLoose: helper(
    "7.0.0-beta.0",
    "function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,setPrototypeOf(t,o)}",
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
  // size: 510, gzip size: 310
  interopRequireWildcard: helper(
    "7.14.0",
    'function _interopRequireWildcard(e,t){if("function"==typeof WeakMap)var r=new WeakMap,n=new WeakMap;return(_interopRequireWildcard=function(e,t){if(!t&&e&&e.__esModule)return e;var o,i,f={__proto__:null,default:e};if(null===e||"object"!=typeof e&&"function"!=typeof e)return f;if(o=t?n:r){if(o.has(e))return o.get(e);o.set(e,f)}for(const t in e)"default"!==t&&{}.hasOwnProperty.call(e,t)&&((i=(o=Object.defineProperty)&&Object.getOwnPropertyDescriptor(e,t))&&(i.get||i.set)?o(f,t,i):f[t]=e[t]);return f})(e,t)}',
    {
      globals: ["WeakMap", "Object"],
      locals: {
        _interopRequireWildcard: [
          "body.0.id",
          "body.0.body.body.1.argument.callee.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.1.argument.callee"],
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
  // size: 193, gzip size: 144
  isNativeReflectConstruct: helper(
    "7.9.0",
    "function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function(){return!!t})()}",
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
  // size: 129, gzip size: 124
  iterableToArray: helper(
    "7.0.0-beta.0",
    'function _iterableToArray(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)}',
    {
      globals: ["Symbol", "Array"],
      locals: { _iterableToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_iterableToArray",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 416, gzip size: 293
  iterableToArrayLimit: helper(
    "7.0.0-beta.0",
    'function _iterableToArrayLimit(r,l){var t=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=t){var e,n,i,u,a=[],f=!0,o=!1;try{if(i=(t=t.call(r)).next,0===l){if(Object(t)!==t)return;f=!1}else for(;!(f=(e=i.call(t)).done)&&(a.push(e.value),a.length!==l);f=!0);}catch(r){o=!0,n=r}finally{try{if(!f&&null!=t.return&&(u=t.return(),Object(u)!==u))return}finally{if(o)throw n}}return a}}',
    {
      globals: ["Symbol", "Object"],
      locals: { _iterableToArrayLimit: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_iterableToArrayLimit",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 520, gzip size: 341
  jsx: helper(
    "7.0.0-beta.0",
    'var REACT_ELEMENT_TYPE;function _createRawReactElement(e,r,E,l){REACT_ELEMENT_TYPE||(REACT_ELEMENT_TYPE="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,n=arguments.length-3;if(r||0===n||(r={children:void 0}),1===n)r.children=l;else if(n>1){for(var t=Array(n),f=0;f<n;f++)t[f]=arguments[f+3];r.children=t}if(r&&o)for(var i in o)void 0===r[i]&&(r[i]=o[i]);else r||(r=o||{});return{$$typeof:REACT_ELEMENT_TYPE,type:e,key:void 0===E?null:""+E,ref:null,props:r,_owner:null}}',
    {
      globals: ["Symbol", "Array"],
      locals: {
        REACT_ELEMENT_TYPE: [
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
  // size: 160, gzip size: 144
  maybeArrayLike: helper(
    "7.9.0",
    'function _maybeArrayLike(r,a,e){if(a&&!Array.isArray(a)&&"number"==typeof a.length){var y=a.length;return arrayLikeToArray(a,void 0!==e&&e<y?e:y)}return r(a,e)}',
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
  // size: 619, gzip size: 295
  objectSpread2: helper(
    "7.5.0",
    "function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}",
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
  // size: 279, gzip size: 205
  objectWithoutProperties: helper(
    "7.0.0-beta.0",
    "function _objectWithoutProperties(e,t){if(null==e)return{};var o,r,i=objectWithoutPropertiesLoose(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],-1===t.indexOf(o)&&{}.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}",
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
  // size: 225, gzip size: 180
  possibleConstructorReturn: helper(
    "7.0.0-beta.0",
    'function _possibleConstructorReturn(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return assertThisInitialized(t)}',
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
  // size: 2305, gzip size: 1090
  regenerator: helper(
    "7.27.0",
    'function _regenerator(){\n/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */\nvar e,t,r="function"==typeof Symbol?Symbol:{},n=r.iterator||"@@iterator",o=r.toStringTag||"@@toStringTag";function i(r,n,o,i){var c=n&&n.prototype instanceof Generator?n:Generator,u=Object.create(c.prototype);return define(u,"_invoke",function(r,n,o){var i,c,u,f=0,p=o||[],y=!1,G={p:0,n:0,v:e,a:d,f:d.bind(e,4),d:function(t,r){return i=t,c=0,u=e,G.n=r,a}};function d(r,n){for(c=r,u=n,t=0;!y&&f&&!o&&t<p.length;t++){var o,i=p[t],d=G.p,l=i[2];r>3?(o=l===n)&&(u=i[(c=i[4])?5:(c=3,3)],i[4]=i[5]=e):i[0]<=d&&((o=r<2&&d<i[1])?(c=0,G.v=n,G.n=i[1]):d<l&&(o=r<3||i[0]>n||n>l)&&(i[4]=r,i[5]=n,G.n=l,c=0))}if(o||r>1)return a;throw y=!0,n}return function(o,p,l){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&d(p,l),c=p,u=l;(t=c<2?e:u)||!y;){i||(c?c<3?(c>1&&(G.n=-1),d(c,u)):G.n=u:G.v=u);try{if(f=2,i){if(c||(o="next"),t=i[o]){if(!(t=t.call(i,u)))throw TypeError("iterator result is not an object");if(!t.done)return t;u=t.value,c<2&&(c=0)}else 1===c&&(t=i.return)&&t.call(i),c<2&&(u=TypeError("The iterator does not provide a \'"+o+"\' method"),c=1);i=e}else if((t=(y=G.n<0)?u:r.call(n,G))!==a)break}catch(t){i=e,c=1,u=t}finally{f=1}}return{value:t,done:y}}}(r,o,i),!0),u}var a={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}t=Object.getPrototypeOf;var c=[][n]?t(t([][n]())):(define(t={},n,(function(){return this})),t),u=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(c);function f(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,GeneratorFunctionPrototype):(e.__proto__=GeneratorFunctionPrototype,define(e,o,"GeneratorFunction")),e.prototype=Object.create(u),e}return GeneratorFunction.prototype=GeneratorFunctionPrototype,define(u,"constructor",GeneratorFunctionPrototype),define(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",define(GeneratorFunctionPrototype,o,"GeneratorFunction"),define(u),define(u,o,"Generator"),define(u,n,(function(){return this})),define(u,"toString",(function(){return"[object Generator]"})),(_regenerator=function(){return{w:i,m:f}})()}',
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
  // size: 132, gzip size: 119
  regeneratorAsync: helper(
    "7.27.0",
    "function _regeneratorAsync(n,e,r,t,o){var a=asyncGen(n,e,r,t,o);return a.next().then((function(n){return n.done?n.value:a.next()}))}",
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
  // size: 114, gzip size: 101
  regeneratorAsyncGen: helper(
    "7.27.0",
    "function _regeneratorAsyncGen(r,e,t,o,n){return new regeneratorAsyncIterator(regenerator().w(r,e,t,o),n||Promise)}",
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
  // size: 599, gzip size: 306
  regeneratorAsyncIterator: helper(
    "7.27.0",
    'function AsyncIterator(t,e){function n(r,o,i,f){try{var c=t[r](o),u=c.value;return u instanceof OverloadYield?e.resolve(u.v).then((function(t){n("next",t,i,f)}),(function(t){n("throw",t,i,f)})):e.resolve(u).then((function(t){c.value=t,i(c)}),(function(t){return n("throw",t,i,f)}))}catch(t){f(t)}}var r;this.next||(define(AsyncIterator.prototype),define(AsyncIterator.prototype,"function"==typeof Symbol&&Symbol.asyncIterator||"@asyncIterator",(function(){return this}))),define(this,"_invoke",(function(t,o,i){function f(){return new e((function(e,r){n(t,i,e,r)}))}return r=r?r.then(f,f):f()}),!0)}',
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
  // size: 349, gzip size: 222
  regeneratorDefine: helper(
    "7.27.0",
    'function regeneratorDefine(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}regeneratorDefine=function(e,r,n,t){function o(r,n){regeneratorDefine(e,r,(function(e){return this._invoke(r,n,e)}))}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},regeneratorDefine(e,r,n,t)}',
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
  // size: 494, gzip size: 274
  set: helper(
    "7.0.0-beta.0",
    'function set(e,r,t,o){return set="undefined"!=typeof Reflect&&Reflect.set?Reflect.set:function(e,r,t,o){var f,i=superPropBase(e,r);if(i){if((f=Object.getOwnPropertyDescriptor(i,r)).set)return f.set.call(o,t),!0;if(!f.writable)return!1}if(f=Object.getOwnPropertyDescriptor(o,r)){if(!f.writable)return!1;f.value=t,Object.defineProperty(o,r,f)}else defineProperty(o,r,t);return!0},set(e,r,t,o)}function _set(e,r,t,o,f){if(!set(e,r,t,o||e)&&f)throw new TypeError("failed to set property");return t}',
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
  // size: 133, gzip size: 117
  slicedToArray: helper(
    "7.0.0-beta.0",
    "function _slicedToArray(r,e){return arrayWithHoles(r)||iterableToArrayLimit(r,e)||unsupportedIterableToArray(r,e)||nonIterableRest()}",
    {
      globals: [],
      locals: { _slicedToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_slicedToArray",
      dependencies: {
        arrayWithHoles: ["body.0.body.body.0.argument.left.left.left.callee"],
        iterableToArrayLimit: [
          "body.0.body.body.0.argument.left.left.right.callee",
        ],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableRest: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),
  // size: 104, gzip size: 113
  superPropBase: helper(
    "7.0.0-beta.0",
    "function _superPropBase(t,o){for(;!{}.hasOwnProperty.call(t,o)&&null!==(t=getPrototypeOf(t)););return t}",
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
  // size: 149, gzip size: 134
  superPropGet: helper(
    "7.25.0",
    'function _superPropGet(t,o,e,r){var p=get(getPrototypeOf(1&r?t.prototype:t),o,e);return 2&r&&"function"==typeof p?function(t){return p.apply(e,t)}:p}',
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
  // size: 88, gzip size: 95
  superPropSet: helper(
    "7.25.0",
    "function _superPropSet(t,e,o,r,p,f){return set(getPrototypeOf(f?t.prototype:t),e,o,r,p)}",
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
  // size: 53, gzip size: 73
  temporalRef: helper(
    "7.0.0-beta.0",
    "function _temporalRef(r,e){return r===undef?err(e):r}",
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
  // size: 116, gzip size: 102
  toArray: helper(
    "7.0.0-beta.0",
    "function _toArray(r){return arrayWithHoles(r)||iterableToArray(r)||unsupportedIterableToArray(r)||nonIterableRest()}",
    {
      globals: [],
      locals: { _toArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_toArray",
      dependencies: {
        arrayWithHoles: ["body.0.body.body.0.argument.left.left.left.callee"],
        iterableToArray: ["body.0.body.body.0.argument.left.left.right.callee"],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableRest: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),
  // size: 131, gzip size: 114
  toConsumableArray: helper(
    "7.0.0-beta.0",
    "function _toConsumableArray(r){return arrayWithoutHoles(r)||iterableToArray(r)||unsupportedIterableToArray(r)||nonIterableSpread()}",
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
  // size: 270, gzip size: 201
  toPrimitive: helper(
    "7.1.5",
    'function toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}',
    {
      globals: ["Symbol", "TypeError", "String", "Number"],
      locals: { toPrimitive: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "toPrimitive",
      dependencies: {},
      internal: false,
    },
  ),
  // size: 88, gzip size: 102
  toPropertyKey: helper(
    "7.1.5",
    'function toPropertyKey(t){var i=toPrimitive(t,"string");return"symbol"==typeof i?i:i+""}',
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
  // size: 243, gzip size: 210
  tsRewriteRelativeImportExtensions: helper(
    "7.27.0",
    'function tsRewriteRelativeImportExtensions(t,e){return"string"==typeof t&&/^\\.\\.?\\//.test(t)?t.replace(/\\.(tsx)$|((?:\\.d)?)((?:\\.[^./]+)?)\\.([cm]?)ts$/i,(function(t,s,r,n,o){return s?e?".jsx":".js":!r||n&&o?r+n+"."+o.toLowerCase()+"js":t})):t}',
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
  // size: 328, gzip size: 247
  unsupportedIterableToArray: helper(
    "7.9.0",
    'function _unsupportedIterableToArray(r,a){if(r){if("string"==typeof r)return arrayLikeToArray(r,a);var t={}.toString.call(r).slice(8,-1);return"Object"===t&&r.constructor&&(t=r.constructor.name),"Map"===t||"Set"===t?Array.from(r):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?arrayLikeToArray(r,a):void 0}}',
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
  // size: 1172, gzip size: 526
  wrapAsyncGenerator: helper(
    "7.0.0-beta.0",
    'function _wrapAsyncGenerator(e){return function(){return new AsyncGenerator(e.apply(this,arguments))}}function AsyncGenerator(e){var r,t;function resume(r,t){try{var n=e[r](t),o=n.value,u=o instanceof OverloadYield;Promise.resolve(u?o.v:o).then((function(t){if(u){var i="return"===r?"return":"next";if(!o.k||t.done)return resume(i,t);t=e[i](t).value}settle(n.done?"return":"normal",t)}),(function(e){resume("throw",e)}))}catch(e){settle("throw",e)}}function settle(e,n){switch(e){case"return":r.resolve({value:n,done:!0});break;case"throw":r.reject(n);break;default:r.resolve({value:n,done:!1})}(r=r.next)?resume(r.key,r.arg):t=null}this._invoke=function(e,n){return new Promise((function(o,u){var i={key:e,arg:n,resolve:o,reject:u,next:null};t?t=t.next=i:(r=t=i,resume(e,n))}))},"function"!=typeof e.return&&(this.return=void 0)}AsyncGenerator.prototype["function"==typeof Symbol&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},AsyncGenerator.prototype.next=function(e){return this._invoke("next",e)},AsyncGenerator.prototype.throw=function(e){return this._invoke("throw",e)},AsyncGenerator.prototype.return=function(e){return this._invoke("return",e)};',
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
  // size: 563, gzip size: 318
  wrapNativeSuper: helper(
    "7.0.0-beta.0",
    'function _wrapNativeSuper(t){var r="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(t){if(null===t||!isNativeFunction(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,Wrapper)}function Wrapper(){return construct(t,arguments,getPrototypeOf(this).constructor)}return Wrapper.prototype=Object.create(t.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),setPrototypeOf(Wrapper,t)},_wrapNativeSuper(t)}',
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
  // size: 1213, gzip size: 560
  wrapRegExp: helper(
    "7.19.0",
    'function _wrapRegExp(){_wrapRegExp=function(e,r){return new BabelRegExp(e,void 0,r)};var e=RegExp.prototype,r=new WeakMap;function BabelRegExp(e,t,p){var o=RegExp(e,t);return r.set(o,p||r.get(e)),setPrototypeOf(o,BabelRegExp.prototype)}function buildGroups(e,t){var p=r.get(t);return Object.keys(p).reduce((function(r,t){var o=p[t];if("number"==typeof o)r[t]=e[o];else{for(var i=0;void 0===e[o[i]]&&i+1<o.length;)i++;r[t]=e[o[i]]}return r}),Object.create(null))}return inherits(BabelRegExp,RegExp),BabelRegExp.prototype.exec=function(r){var t=e.exec.call(this,r);if(t){t.groups=buildGroups(t,this);var p=t.indices;p&&(p.groups=buildGroups(p,this))}return t},BabelRegExp.prototype[Symbol.replace]=function(t,p){if("string"==typeof p){var o=r.get(this);return e[Symbol.replace].call(this,t,p.replace(/\\$<([^>]+)(>|$)/g,(function(e,r,t){if(""===t)return e;var p=o[r];return Array.isArray(p)?"$"+p.join("$"):"number"==typeof p?"$"+p:""})))}if("function"==typeof p){var i=this;return e[Symbol.replace].call(this,t,(function(){var e=arguments;return"object"!=typeof e[e.length-1]&&(e=[].slice.call(e)).push(buildGroups(e,i)),p.apply(this,e)}))}return e[Symbol.replace].call(this,t,p)},_wrapRegExp.apply(this,arguments)}',
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
const helpersUncompressed: Record<string, Helper> = {
  __proto__: null,
  AwaitValue: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n/* @onlyBabel7 */\n\nfunction _AwaitValue(value) {\n  this.wrapped = value;\n}",
    {
      globals: [],
      locals: { _AwaitValue: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_AwaitValue",
      dependencies: {},
      internal: false,
    },
  ),

  OverloadYield: helper(
    "7.18.14",
    "/* @minVersion 7.18.14 */\n\n// _OverloadYield is actually a class\n\n// The actual implementation of _OverloadYield starts here\nfunction _OverloadYield(value, kind) {\n  this.v = value;\n  this.k = kind;\n}\n",
    {
      globals: [],
      locals: { _OverloadYield: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_OverloadYield",
      dependencies: {},
      internal: false,
    },
  ),

  applyDecoratedDescriptor: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {\n  var desc = {};\n  Object.keys(descriptor).forEach(function (key) {\n    desc[key] = descriptor[key];\n  });\n  desc.enumerable = !!desc.enumerable;\n  desc.configurable = !!desc.configurable;\n  if ("value" in desc || desc.initializer) {\n    desc.writable = true;\n  }\n  desc = decorators.slice().reverse().reduce(function (desc, decorator) {\n    return decorator(target, property, desc) || desc;\n  }, desc);\n  if (context && desc.initializer !== void 0) {\n    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;\n    desc.initializer = void 0;\n  }\n  if (desc.initializer === void 0) {\n    Object.defineProperty(target, property, desc);\n    return null;\n  }\n  return desc;\n}',
    {
      globals: ["Object"],
      locals: { _applyDecoratedDescriptor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_applyDecoratedDescriptor",
      dependencies: {},
      internal: false,
    },
  ),

  applyDecs: helper(
    "7.17.8",
    '/* @minVersion 7.17.8 */\n/* @onlyBabel7 */\n\n\n\n/**\n * NOTE: This is an old version of the helper, used for 2021-12 decorators.\n * Updates should be done in applyDecs2203R.js.\n */\n\n/**\n  Enums are used in this file, but not assigned to vars to avoid non-hoistable values\n\n  CONSTRUCTOR = 0;\n  PUBLIC = 1;\n  PRIVATE = 2;\n\n  FIELD = 0;\n  ACCESSOR = 1;\n  METHOD = 2;\n  GETTER = 3;\n  SETTER = 4;\n\n  STATIC = 5;\n\n  CLASS = 10; // only used in assertValidReturnValue\n*/\n\nfunction old_createMetadataMethodsForProperty(metadataMap, kind, property, decoratorFinishedRef) {\n  return {\n    getMetadata: function (key) {\n      old_assertNotFinished(decoratorFinishedRef, "getMetadata");\n      old_assertMetadataKey(key);\n      var metadataForKey = metadataMap[key];\n      if (metadataForKey === void 0) return void 0;\n      if (kind === 1 /* PUBLIC */) {\n        var pub = metadataForKey.public;\n        if (pub !== void 0) {\n          return pub[property];\n        }\n      } else if (kind === 2 /* PRIVATE */) {\n        var priv = metadataForKey.private;\n        if (priv !== void 0) {\n          return priv.get(property);\n        }\n      } else if (Object.hasOwnProperty.call(metadataForKey, "constructor")) {\n        return metadataForKey.constructor;\n      }\n    },\n    setMetadata: function (key, value) {\n      old_assertNotFinished(decoratorFinishedRef, "setMetadata");\n      old_assertMetadataKey(key);\n      var metadataForKey = metadataMap[key];\n      if (metadataForKey === void 0) {\n        metadataForKey = metadataMap[key] = {};\n      }\n      if (kind === 1 /* PUBLIC */) {\n        var pub = metadataForKey.public;\n        if (pub === void 0) {\n          pub = metadataForKey.public = {};\n        }\n        pub[property] = value;\n      } else if (kind === 2 /* PRIVATE */) {\n        var priv = metadataForKey.priv;\n        if (priv === void 0) {\n          priv = metadataForKey.private = new Map();\n        }\n        priv.set(property, value);\n      } else {\n        metadataForKey.constructor = value;\n      }\n    }\n  };\n}\nfunction old_convertMetadataMapToFinal(obj, metadataMap) {\n  var parentMetadataMap = obj[Symbol.metadata || Symbol.for("Symbol.metadata")];\n  var metadataKeys = Object.getOwnPropertySymbols(metadataMap);\n  if (metadataKeys.length === 0) return;\n  for (var i = 0; i < metadataKeys.length; i++) {\n    var key = metadataKeys[i];\n    var metaForKey = metadataMap[key];\n    var parentMetaForKey = parentMetadataMap ? parentMetadataMap[key] : null;\n    var pub = metaForKey.public;\n    var parentPub = parentMetaForKey ? parentMetaForKey.public : null;\n    if (pub && parentPub) {\n      Object.setPrototypeOf(pub, parentPub);\n    }\n    var priv = metaForKey.private;\n    if (priv) {\n      var privArr = Array.from(priv.values());\n      var parentPriv = parentMetaForKey ? parentMetaForKey.private : null;\n      if (parentPriv) {\n        privArr = privArr.concat(parentPriv);\n      }\n      metaForKey.private = privArr;\n    }\n    if (parentMetaForKey) {\n      Object.setPrototypeOf(metaForKey, parentMetaForKey);\n    }\n  }\n  if (parentMetadataMap) {\n    Object.setPrototypeOf(metadataMap, parentMetadataMap);\n  }\n  obj[Symbol.metadata || Symbol.for("Symbol.metadata")] = metadataMap;\n}\nfunction old_createAddInitializerMethod(initializers, decoratorFinishedRef) {\n  return function addInitializer(initializer) {\n    old_assertNotFinished(decoratorFinishedRef, "addInitializer");\n    old_assertCallable(initializer, "An initializer");\n    initializers.push(initializer);\n  };\n}\nfunction old_memberDec(dec, name, desc, metadataMap, initializers, kind, isStatic, isPrivate, value) {\n  var kindStr;\n  switch (kind) {\n    case 1 /* ACCESSOR */:\n      kindStr = "accessor";\n      break;\n    case 2 /* METHOD */:\n      kindStr = "method";\n      break;\n    case 3 /* GETTER */:\n      kindStr = "getter";\n      break;\n    case 4 /* SETTER */:\n      kindStr = "setter";\n      break;\n    default:\n      kindStr = "field";\n  }\n  var ctx = {\n    kind: kindStr,\n    name: isPrivate ? "#" + name : toPropertyKey(name),\n    isStatic: isStatic,\n    isPrivate: isPrivate\n  };\n  var decoratorFinishedRef = {\n    v: false\n  };\n  if (kind !== 0 /* FIELD */) {\n    ctx.addInitializer = old_createAddInitializerMethod(initializers, decoratorFinishedRef);\n  }\n  var metadataKind, metadataName;\n  if (isPrivate) {\n    metadataKind = 2 /* PRIVATE */;\n    metadataName = Symbol(name);\n    var access = {};\n    if (kind === 0 /* FIELD */) {\n      access.get = desc.get;\n      access.set = desc.set;\n    } else if (kind === 2 /* METHOD */) {\n      access.get = function () {\n        return desc.value;\n      };\n    } else {\n      // replace with values that will go through the final getter and setter\n      if (kind === 1 /* ACCESSOR */ || kind === 3 /* GETTER */) {\n        access.get = function () {\n          return desc.get.call(this);\n        };\n      }\n      if (kind === 1 /* ACCESSOR */ || kind === 4 /* SETTER */) {\n        access.set = function (v) {\n          desc.set.call(this, v);\n        };\n      }\n    }\n    ctx.access = access;\n  } else {\n    metadataKind = 1 /* PUBLIC */;\n    metadataName = name;\n  }\n  try {\n    return dec(value, Object.assign(ctx, old_createMetadataMethodsForProperty(metadataMap, metadataKind, metadataName, decoratorFinishedRef)));\n  } finally {\n    decoratorFinishedRef.v = true;\n  }\n}\nfunction old_assertNotFinished(decoratorFinishedRef, fnName) {\n  if (decoratorFinishedRef.v) {\n    throw new Error("attempted to call " + fnName + " after decoration was finished");\n  }\n}\nfunction old_assertMetadataKey(key) {\n  if (typeof key !== "symbol") {\n    throw new TypeError("Metadata keys must be symbols, received: " + key);\n  }\n}\nfunction old_assertCallable(fn, hint) {\n  if (typeof fn !== "function") {\n    throw new TypeError(hint + " must be a function");\n  }\n}\nfunction old_assertValidReturnValue(kind, value) {\n  var type = typeof value;\n  if (kind === 1 /* ACCESSOR */) {\n    if (type !== "object" || value === null) {\n      throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");\n    }\n    if (value.get !== undefined) {\n      old_assertCallable(value.get, "accessor.get");\n    }\n    if (value.set !== undefined) {\n      old_assertCallable(value.set, "accessor.set");\n    }\n    if (value.init !== undefined) {\n      old_assertCallable(value.init, "accessor.init");\n    }\n    if (value.initializer !== undefined) {\n      old_assertCallable(value.initializer, "accessor.initializer");\n    }\n  } else if (type !== "function") {\n    var hint;\n    if (kind === 0 /* FIELD */) {\n      hint = "field";\n    } else if (kind === 10 /* CLASS */) {\n      hint = "class";\n    } else {\n      hint = "method";\n    }\n    throw new TypeError(hint + " decorators must return a function or void 0");\n  }\n}\nfunction old_getInit(desc) {\n  var initializer;\n  if ((initializer = desc.init) == null && (initializer = desc.initializer) && typeof console !== "undefined") {\n    console.warn(".initializer has been renamed to .init as of March 2022");\n  }\n  return initializer;\n}\nfunction old_applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, metadataMap, initializers) {\n  var decs = decInfo[0];\n  var desc, initializer, prefix, value;\n  if (isPrivate) {\n    if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n      desc = {\n        get: decInfo[3],\n        set: decInfo[4]\n      };\n      prefix = "get";\n    } else if (kind === 3 /* GETTER */) {\n      desc = {\n        get: decInfo[3]\n      };\n      prefix = "get";\n    } else if (kind === 4 /* SETTER */) {\n      desc = {\n        set: decInfo[3]\n      };\n      prefix = "set";\n    } else {\n      desc = {\n        value: decInfo[3]\n      };\n    }\n    if (kind !== 0 /* FIELD */) {\n      if (kind === 1 /* ACCESSOR */) {\n        setFunctionName(decInfo[4], "#" + name, "set");\n      }\n      setFunctionName(decInfo[3], "#" + name, prefix);\n    }\n  } else if (kind !== 0 /* FIELD */) {\n    desc = Object.getOwnPropertyDescriptor(base, name);\n  }\n  if (kind === 1 /* ACCESSOR */) {\n    value = {\n      get: desc.get,\n      set: desc.set\n    };\n  } else if (kind === 2 /* METHOD */) {\n    value = desc.value;\n  } else if (kind === 3 /* GETTER */) {\n    value = desc.get;\n  } else if (kind === 4 /* SETTER */) {\n    value = desc.set;\n  }\n  var newValue, get, set;\n  if (typeof decs === "function") {\n    newValue = old_memberDec(decs, name, desc, metadataMap, initializers, kind, isStatic, isPrivate, value);\n    if (newValue !== void 0) {\n      old_assertValidReturnValue(kind, newValue);\n      if (kind === 0 /* FIELD */) {\n        initializer = newValue;\n      } else if (kind === 1 /* ACCESSOR */) {\n        initializer = old_getInit(newValue);\n        get = newValue.get || value.get;\n        set = newValue.set || value.set;\n        value = {\n          get: get,\n          set: set\n        };\n      } else {\n        value = newValue;\n      }\n    }\n  } else {\n    for (var i = decs.length - 1; i >= 0; i--) {\n      var dec = decs[i];\n      newValue = old_memberDec(dec, name, desc, metadataMap, initializers, kind, isStatic, isPrivate, value);\n      if (newValue !== void 0) {\n        old_assertValidReturnValue(kind, newValue);\n        var newInit;\n        if (kind === 0 /* FIELD */) {\n          newInit = newValue;\n        } else if (kind === 1 /* ACCESSOR */) {\n          newInit = old_getInit(newValue);\n          get = newValue.get || value.get;\n          set = newValue.set || value.set;\n          value = {\n            get: get,\n            set: set\n          };\n        } else {\n          value = newValue;\n        }\n        if (newInit !== void 0) {\n          if (initializer === void 0) {\n            initializer = newInit;\n          } else if (typeof initializer === "function") {\n            initializer = [initializer, newInit];\n          } else {\n            initializer.push(newInit);\n          }\n        }\n      }\n    }\n  }\n  if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n    if (initializer === void 0) {\n      // If the initializer was void 0, sub in a dummy initializer\n      initializer = function (instance, init) {\n        return init;\n      };\n    } else if (typeof initializer !== "function") {\n      var ownInitializers = initializer;\n      initializer = function (instance, init) {\n        var value = init;\n        for (var i = 0; i < ownInitializers.length; i++) {\n          value = ownInitializers[i].call(instance, value);\n        }\n        return value;\n      };\n    } else {\n      var originalInitializer = initializer;\n      initializer = function (instance, init) {\n        return originalInitializer.call(instance, init);\n      };\n    }\n    ret.push(initializer);\n  }\n  if (kind !== 0 /* FIELD */) {\n    if (kind === 1 /* ACCESSOR */) {\n      desc.get = value.get;\n      desc.set = value.set;\n    } else if (kind === 2 /* METHOD */) {\n      desc.value = value;\n    } else if (kind === 3 /* GETTER */) {\n      desc.get = value;\n    } else if (kind === 4 /* SETTER */) {\n      desc.set = value;\n    }\n    if (isPrivate) {\n      if (kind === 1 /* ACCESSOR */) {\n        ret.push(function (instance, args) {\n          return value.get.call(instance, args);\n        });\n        ret.push(function (instance, args) {\n          return value.set.call(instance, args);\n        });\n      } else if (kind === 2 /* METHOD */) {\n        ret.push(value);\n      } else {\n        ret.push(function (instance, args) {\n          return value.call(instance, args);\n        });\n      }\n    } else {\n      Object.defineProperty(base, name, desc);\n    }\n  }\n}\nfunction old_applyMemberDecs(ret, Class, protoMetadataMap, staticMetadataMap, decInfos) {\n  var protoInitializers;\n  var staticInitializers;\n  var existingProtoNonFields = new Map();\n  var existingStaticNonFields = new Map();\n  for (var i = 0; i < decInfos.length; i++) {\n    var decInfo = decInfos[i];\n\n    // skip computed property names\n    if (!Array.isArray(decInfo)) continue;\n    var kind = decInfo[1];\n    var name = decInfo[2];\n    var isPrivate = decInfo.length > 3;\n    var isStatic = kind >= 5; /* STATIC */\n    var base;\n    var metadataMap;\n    var initializers;\n    if (isStatic) {\n      base = Class;\n      metadataMap = staticMetadataMap;\n      kind = kind - 5 /* STATIC */;\n      // initialize staticInitializers when we see a non-field static member\n      if (kind !== 0 /* FIELD */) {\n        staticInitializers = staticInitializers || [];\n        initializers = staticInitializers;\n      }\n    } else {\n      base = Class.prototype;\n      metadataMap = protoMetadataMap;\n      // initialize protoInitializers when we see a non-field member\n      if (kind !== 0 /* FIELD */) {\n        protoInitializers = protoInitializers || [];\n        initializers = protoInitializers;\n      }\n    }\n    if (kind !== 0 /* FIELD */ && !isPrivate) {\n      var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields;\n      var existingKind = existingNonFields.get(name) || 0;\n      if (existingKind === true || existingKind === 3 /* GETTER */ && kind !== 4 /* SETTER */ || existingKind === 4 /* SETTER */ && kind !== 3 /* GETTER */) {\n        throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);\n      } else if (!existingKind && kind > 2 /* METHOD */) {\n        existingNonFields.set(name, kind);\n      } else {\n        existingNonFields.set(name, true);\n      }\n    }\n    old_applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, metadataMap, initializers);\n  }\n  old_pushInitializers(ret, protoInitializers);\n  old_pushInitializers(ret, staticInitializers);\n}\nfunction old_pushInitializers(ret, initializers) {\n  if (initializers) {\n    ret.push(function (instance) {\n      for (var i = 0; i < initializers.length; i++) {\n        initializers[i].call(instance);\n      }\n      return instance;\n    });\n  }\n}\nfunction old_applyClassDecs(ret, targetClass, metadataMap, classDecs) {\n  if (classDecs.length > 0) {\n    var initializers = [];\n    var newClass = targetClass;\n    var name = targetClass.name;\n    for (var i = classDecs.length - 1; i >= 0; i--) {\n      var decoratorFinishedRef = {\n        v: false\n      };\n      try {\n        var ctx = Object.assign({\n          kind: "class",\n          name: name,\n          addInitializer: old_createAddInitializerMethod(initializers, decoratorFinishedRef)\n        }, old_createMetadataMethodsForProperty(metadataMap, 0 /* CONSTRUCTOR */, name, decoratorFinishedRef));\n        var nextNewClass = classDecs[i](newClass, ctx);\n      } finally {\n        decoratorFinishedRef.v = true;\n      }\n      if (nextNewClass !== undefined) {\n        old_assertValidReturnValue(10 /* CLASS */, nextNewClass);\n        newClass = nextNewClass;\n      }\n    }\n    ret.push(newClass, function () {\n      for (var i = 0; i < initializers.length; i++) {\n        initializers[i].call(newClass);\n      }\n    });\n  }\n}\n\n/**\n  Basic usage:\n\n  applyDecs(\n    Class,\n    [\n      // member decorators\n      [\n        dec,                // dec or array of decs\n        0,                  // kind of value being decorated\n        \'prop\',             // name of public prop on class containing the value being decorated,\n        \'#p\',               // the name of the private property (if is private, void 0 otherwise),\n      ]\n    ],\n    [\n      // class decorators\n      dec1, dec2\n    ]\n  )\n  ```\n\n  Fully transpiled example:\n\n  ```js\n  @dec\n  class Class {\n    @dec\n    a = 123;\n\n    @dec\n    #a = 123;\n\n    @dec\n    @dec2\n    accessor b = 123;\n\n    @dec\n    accessor #b = 123;\n\n    @dec\n    c() { console.log(\'c\'); }\n\n    @dec\n    #c() { console.log(\'privC\'); }\n\n    @dec\n    get d() { console.log(\'d\'); }\n\n    @dec\n    get #d() { console.log(\'privD\'); }\n\n    @dec\n    set e(v) { console.log(\'e\'); }\n\n    @dec\n    set #e(v) { console.log(\'privE\'); }\n  }\n\n\n  // becomes\n  let initializeInstance;\n  let initializeClass;\n\n  let initA;\n  let initPrivA;\n\n  let initB;\n  let initPrivB, getPrivB, setPrivB;\n\n  let privC;\n  let privD;\n  let privE;\n\n  let Class;\n  class _Class {\n    static {\n      let ret = applyDecs(\n        this,\n        [\n          [dec, 0, \'a\'],\n          [dec, 0, \'a\', (i) => i.#a, (i, v) => i.#a = v],\n          [[dec, dec2], 1, \'b\'],\n          [dec, 1, \'b\', (i) => i.#privBData, (i, v) => i.#privBData = v],\n          [dec, 2, \'c\'],\n          [dec, 2, \'c\', () => console.log(\'privC\')],\n          [dec, 3, \'d\'],\n          [dec, 3, \'d\', () => console.log(\'privD\')],\n          [dec, 4, \'e\'],\n          [dec, 4, \'e\', () => console.log(\'privE\')],\n        ],\n        [\n          dec\n        ]\n      )\n\n      initA = ret[0];\n\n      initPrivA = ret[1];\n\n      initB = ret[2];\n\n      initPrivB = ret[3];\n      getPrivB = ret[4];\n      setPrivB = ret[5];\n\n      privC = ret[6];\n\n      privD = ret[7];\n\n      privE = ret[8];\n\n      initializeInstance = ret[9];\n\n      Class = ret[10]\n\n      initializeClass = ret[11];\n    }\n\n    a = (initializeInstance(this), initA(this, 123));\n\n    #a = initPrivA(this, 123);\n\n    #bData = initB(this, 123);\n    get b() { return this.#bData }\n    set b(v) { this.#bData = v }\n\n    #privBData = initPrivB(this, 123);\n    get #b() { return getPrivB(this); }\n    set #b(v) { setPrivB(this, v); }\n\n    c() { console.log(\'c\'); }\n\n    #c(...args) { return privC(this, ...args) }\n\n    get d() { console.log(\'d\'); }\n\n    get #d() { return privD(this); }\n\n    set e(v) { console.log(\'e\'); }\n\n    set #e(v) { privE(this, v); }\n  }\n\n  initializeClass(Class);\n */\nfunction applyDecs(targetClass, memberDecs, classDecs) {\n  var ret = [];\n  var staticMetadataMap = {};\n  var protoMetadataMap = {};\n  old_applyMemberDecs(ret, targetClass, protoMetadataMap, staticMetadataMap, memberDecs);\n  old_convertMetadataMapToFinal(targetClass.prototype, protoMetadataMap);\n  old_applyClassDecs(ret, targetClass, staticMetadataMap, classDecs);\n  old_convertMetadataMapToFinal(targetClass, staticMetadataMap);\n  return ret;\n}',
    {
      globals: [
        "Object",
        "Map",
        "Symbol",
        "Array",
        "Error",
        "TypeError",
        "undefined",
        "console",
      ],
      locals: {
        old_createMetadataMethodsForProperty: [
          "body.0.id",
          "body.3.body.body.7.block.body.0.argument.arguments.1.arguments.1.callee",
          "body.12.body.body.0.consequent.body.3.body.body.1.block.body.0.declarations.0.init.arguments.1.callee",
        ],
        old_convertMetadataMapToFinal: [
          "body.1.id",
          "body.13.body.body.4.expression.callee",
          "body.13.body.body.6.expression.callee",
        ],
        old_createAddInitializerMethod: [
          "body.2.id",
          "body.3.body.body.4.consequent.body.0.expression.right.callee",
          "body.12.body.body.0.consequent.body.3.body.body.1.block.body.0.declarations.0.init.arguments.0.properties.2.value.callee",
        ],
        old_memberDec: [
          "body.3.id",
          "body.9.body.body.5.consequent.body.0.expression.right.callee",
          "body.9.body.body.5.alternate.body.0.body.body.1.expression.right.callee",
        ],
        old_assertNotFinished: [
          "body.4.id",
          "body.0.body.body.0.argument.properties.0.value.body.body.0.expression.callee",
          "body.0.body.body.0.argument.properties.1.value.body.body.0.expression.callee",
          "body.2.body.body.0.argument.body.body.0.expression.callee",
        ],
        old_assertMetadataKey: [
          "body.5.id",
          "body.0.body.body.0.argument.properties.0.value.body.body.1.expression.callee",
          "body.0.body.body.0.argument.properties.1.value.body.body.1.expression.callee",
        ],
        old_assertCallable: [
          "body.6.id",
          "body.2.body.body.0.argument.body.body.1.expression.callee",
          "body.7.body.body.1.consequent.body.1.consequent.body.0.expression.callee",
          "body.7.body.body.1.consequent.body.2.consequent.body.0.expression.callee",
          "body.7.body.body.1.consequent.body.3.consequent.body.0.expression.callee",
          "body.7.body.body.1.consequent.body.4.consequent.body.0.expression.callee",
        ],
        old_assertValidReturnValue: [
          "body.7.id",
          "body.9.body.body.5.consequent.body.1.consequent.body.0.expression.callee",
          "body.9.body.body.5.alternate.body.0.body.body.2.consequent.body.0.expression.callee",
          "body.12.body.body.0.consequent.body.3.body.body.2.consequent.body.0.expression.callee",
        ],
        old_getInit: [
          "body.8.id",
          "body.9.body.body.5.consequent.body.1.consequent.body.1.alternate.consequent.body.0.expression.right.callee",
          "body.9.body.body.5.alternate.body.0.body.body.2.consequent.body.2.alternate.consequent.body.0.expression.right.callee",
        ],
        old_applyMemberDec: [
          "body.9.id",
          "body.10.body.body.4.body.body.11.expression.callee",
        ],
        old_applyMemberDecs: [
          "body.10.id",
          "body.13.body.body.3.expression.callee",
        ],
        old_pushInitializers: [
          "body.11.id",
          "body.10.body.body.5.expression.callee",
          "body.10.body.body.6.expression.callee",
        ],
        old_applyClassDecs: [
          "body.12.id",
          "body.13.body.body.5.expression.callee",
        ],
        applyDecs: ["body.13.id"],
      },
      exportBindingAssignments: [],
      exportName: "applyDecs",
      dependencies: {
        setFunctionName: [
          "body.9.body.body.2.consequent.body.1.consequent.body.0.consequent.body.0.expression.callee",
          "body.9.body.body.2.consequent.body.1.consequent.body.1.expression.callee",
        ],
        toPropertyKey: [
          "body.3.body.body.2.declarations.0.init.properties.1.value.alternate.callee",
        ],
      },
      internal: false,
    },
  ),

  applyDecs2203: helper(
    "7.19.0",
    '/* @minVersion 7.19.0 */\n/* @onlyBabel7 */\n\n/**\n * NOTE: This is an old version of the helper, used for 2022-03 decorators.\n * Updates should be done in applyDecs2203R.js.\n */\n\n/**\n  Enums are used in this file, but not assigned to vars to avoid non-hoistable values\n\n  CONSTRUCTOR = 0;\n  PUBLIC = 1;\n  PRIVATE = 2;\n\n  FIELD = 0;\n  ACCESSOR = 1;\n  METHOD = 2;\n  GETTER = 3;\n  SETTER = 4;\n\n  STATIC = 5;\n\n  CLASS = 10; // only used in assertValidReturnValue\n*/\nfunction applyDecs2203Factory() {\n  function createAddInitializerMethod(initializers, decoratorFinishedRef) {\n    return function addInitializer(initializer) {\n      assertNotFinished(decoratorFinishedRef, "addInitializer");\n      assertCallable(initializer, "An initializer");\n      initializers.push(initializer);\n    };\n  }\n  function memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value) {\n    var kindStr;\n    switch (kind) {\n      case 1 /* ACCESSOR */:\n        kindStr = "accessor";\n        break;\n      case 2 /* METHOD */:\n        kindStr = "method";\n        break;\n      case 3 /* GETTER */:\n        kindStr = "getter";\n        break;\n      case 4 /* SETTER */:\n        kindStr = "setter";\n        break;\n      default:\n        kindStr = "field";\n    }\n    var ctx = {\n      kind: kindStr,\n      name: isPrivate ? "#" + name : name,\n      static: isStatic,\n      private: isPrivate\n    };\n    var decoratorFinishedRef = {\n      v: false\n    };\n    if (kind !== 0 /* FIELD */) {\n      ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef);\n    }\n    var get, set;\n    if (kind === 0 /* FIELD */) {\n      if (isPrivate) {\n        get = desc.get;\n        set = desc.set;\n      } else {\n        get = function () {\n          return this[name];\n        };\n        set = function (v) {\n          this[name] = v;\n        };\n      }\n    } else if (kind === 2 /* METHOD */) {\n      get = function () {\n        return desc.value;\n      };\n    } else {\n      // replace with values that will go through the final getter and setter\n      if (kind === 1 /* ACCESSOR */ || kind === 3 /* GETTER */) {\n        get = function () {\n          return desc.get.call(this);\n        };\n      }\n      if (kind === 1 /* ACCESSOR */ || kind === 4 /* SETTER */) {\n        set = function (v) {\n          desc.set.call(this, v);\n        };\n      }\n    }\n    ctx.access = get && set ? {\n      get: get,\n      set: set\n    } : get ? {\n      get: get\n    } : {\n      set: set\n    };\n    try {\n      return dec(value, ctx);\n    } finally {\n      decoratorFinishedRef.v = true;\n    }\n  }\n  function assertNotFinished(decoratorFinishedRef, fnName) {\n    if (decoratorFinishedRef.v) {\n      throw new Error("attempted to call " + fnName + " after decoration was finished");\n    }\n  }\n  function assertCallable(fn, hint) {\n    if (typeof fn !== "function") {\n      throw new TypeError(hint + " must be a function");\n    }\n  }\n  function assertValidReturnValue(kind, value) {\n    var type = typeof value;\n    if (kind === 1 /* ACCESSOR */) {\n      if (type !== "object" || value === null) {\n        throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");\n      }\n      if (value.get !== undefined) {\n        assertCallable(value.get, "accessor.get");\n      }\n      if (value.set !== undefined) {\n        assertCallable(value.set, "accessor.set");\n      }\n      if (value.init !== undefined) {\n        assertCallable(value.init, "accessor.init");\n      }\n    } else if (type !== "function") {\n      var hint;\n      if (kind === 0 /* FIELD */) {\n        hint = "field";\n      } else if (kind === 10 /* CLASS */) {\n        hint = "class";\n      } else {\n        hint = "method";\n      }\n      throw new TypeError(hint + " decorators must return a function or void 0");\n    }\n  }\n  function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers) {\n    var decs = decInfo[0];\n    var desc, init, value;\n    if (isPrivate) {\n      if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n        desc = {\n          get: decInfo[3],\n          set: decInfo[4]\n        };\n      } else if (kind === 3 /* GETTER */) {\n        desc = {\n          get: decInfo[3]\n        };\n      } else if (kind === 4 /* SETTER */) {\n        desc = {\n          set: decInfo[3]\n        };\n      } else {\n        desc = {\n          value: decInfo[3]\n        };\n      }\n    } else if (kind !== 0 /* FIELD */) {\n      desc = Object.getOwnPropertyDescriptor(base, name);\n    }\n    if (kind === 1 /* ACCESSOR */) {\n      value = {\n        get: desc.get,\n        set: desc.set\n      };\n    } else if (kind === 2 /* METHOD */) {\n      value = desc.value;\n    } else if (kind === 3 /* GETTER */) {\n      value = desc.get;\n    } else if (kind === 4 /* SETTER */) {\n      value = desc.set;\n    }\n    var newValue, get, set;\n    if (typeof decs === "function") {\n      newValue = memberDec(decs, name, desc, initializers, kind, isStatic, isPrivate, value);\n      if (newValue !== void 0) {\n        assertValidReturnValue(kind, newValue);\n        if (kind === 0 /* FIELD */) {\n          init = newValue;\n        } else if (kind === 1 /* ACCESSOR */) {\n          init = newValue.init;\n          get = newValue.get || value.get;\n          set = newValue.set || value.set;\n          value = {\n            get: get,\n            set: set\n          };\n        } else {\n          value = newValue;\n        }\n      }\n    } else {\n      for (var i = decs.length - 1; i >= 0; i--) {\n        var dec = decs[i];\n        newValue = memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value);\n        if (newValue !== void 0) {\n          assertValidReturnValue(kind, newValue);\n          var newInit;\n          if (kind === 0 /* FIELD */) {\n            newInit = newValue;\n          } else if (kind === 1 /* ACCESSOR */) {\n            newInit = newValue.init;\n            get = newValue.get || value.get;\n            set = newValue.set || value.set;\n            value = {\n              get: get,\n              set: set\n            };\n          } else {\n            value = newValue;\n          }\n          if (newInit !== void 0) {\n            if (init === void 0) {\n              init = newInit;\n            } else if (typeof init === "function") {\n              init = [init, newInit];\n            } else {\n              init.push(newInit);\n            }\n          }\n        }\n      }\n    }\n    if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n      if (init === void 0) {\n        // If the initializer was void 0, sub in a dummy initializer\n        init = function (instance, init) {\n          return init;\n        };\n      } else if (typeof init !== "function") {\n        var ownInitializers = init;\n        init = function (instance, init) {\n          var value = init;\n          for (var i = 0; i < ownInitializers.length; i++) {\n            value = ownInitializers[i].call(instance, value);\n          }\n          return value;\n        };\n      } else {\n        var originalInitializer = init;\n        init = function (instance, init) {\n          return originalInitializer.call(instance, init);\n        };\n      }\n      ret.push(init);\n    }\n    if (kind !== 0 /* FIELD */) {\n      if (kind === 1 /* ACCESSOR */) {\n        desc.get = value.get;\n        desc.set = value.set;\n      } else if (kind === 2 /* METHOD */) {\n        desc.value = value;\n      } else if (kind === 3 /* GETTER */) {\n        desc.get = value;\n      } else if (kind === 4 /* SETTER */) {\n        desc.set = value;\n      }\n      if (isPrivate) {\n        if (kind === 1 /* ACCESSOR */) {\n          ret.push(function (instance, args) {\n            return value.get.call(instance, args);\n          });\n          ret.push(function (instance, args) {\n            return value.set.call(instance, args);\n          });\n        } else if (kind === 2 /* METHOD */) {\n          ret.push(value);\n        } else {\n          ret.push(function (instance, args) {\n            return value.call(instance, args);\n          });\n        }\n      } else {\n        Object.defineProperty(base, name, desc);\n      }\n    }\n  }\n  function applyMemberDecs(ret, Class, decInfos) {\n    var protoInitializers;\n    var staticInitializers;\n    var existingProtoNonFields = new Map();\n    var existingStaticNonFields = new Map();\n    for (var i = 0; i < decInfos.length; i++) {\n      var decInfo = decInfos[i];\n\n      // skip computed property names\n      if (!Array.isArray(decInfo)) continue;\n      var kind = decInfo[1];\n      var name = decInfo[2];\n      var isPrivate = decInfo.length > 3;\n      var isStatic = kind >= 5; /* STATIC */\n      var base;\n      var initializers;\n      if (isStatic) {\n        base = Class;\n        kind = kind - 5 /* STATIC */;\n        // initialize staticInitializers when we see a non-field static member\n        if (kind !== 0 /* FIELD */) {\n          staticInitializers = staticInitializers || [];\n          initializers = staticInitializers;\n        }\n      } else {\n        base = Class.prototype;\n        // initialize protoInitializers when we see a non-field member\n        if (kind !== 0 /* FIELD */) {\n          protoInitializers = protoInitializers || [];\n          initializers = protoInitializers;\n        }\n      }\n      if (kind !== 0 /* FIELD */ && !isPrivate) {\n        var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields;\n        var existingKind = existingNonFields.get(name) || 0;\n        if (existingKind === true || existingKind === 3 /* GETTER */ && kind !== 4 /* SETTER */ || existingKind === 4 /* SETTER */ && kind !== 3 /* GETTER */) {\n          throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);\n        } else if (!existingKind && kind > 2 /* METHOD */) {\n          existingNonFields.set(name, kind);\n        } else {\n          existingNonFields.set(name, true);\n        }\n      }\n      applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers);\n    }\n    pushInitializers(ret, protoInitializers);\n    pushInitializers(ret, staticInitializers);\n  }\n  function pushInitializers(ret, initializers) {\n    if (initializers) {\n      ret.push(function (instance) {\n        for (var i = 0; i < initializers.length; i++) {\n          initializers[i].call(instance);\n        }\n        return instance;\n      });\n    }\n  }\n  function applyClassDecs(ret, targetClass, classDecs) {\n    if (classDecs.length > 0) {\n      var initializers = [];\n      var newClass = targetClass;\n      var name = targetClass.name;\n      for (var i = classDecs.length - 1; i >= 0; i--) {\n        var decoratorFinishedRef = {\n          v: false\n        };\n        try {\n          var nextNewClass = classDecs[i](newClass, {\n            kind: "class",\n            name: name,\n            addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef)\n          });\n        } finally {\n          decoratorFinishedRef.v = true;\n        }\n        if (nextNewClass !== undefined) {\n          assertValidReturnValue(10 /* CLASS */, nextNewClass);\n          newClass = nextNewClass;\n        }\n      }\n      ret.push(newClass, function () {\n        for (var i = 0; i < initializers.length; i++) {\n          initializers[i].call(newClass);\n        }\n      });\n    }\n  }\n\n  /**\n  Basic usage:\n   applyDecs(\n    Class,\n    [\n      // member decorators\n      [\n        dec,                // dec or array of decs\n        0,                  // kind of value being decorated\n        \'prop\',             // name of public prop on class containing the value being decorated,\n        \'#p\',               // the name of the private property (if is private, void 0 otherwise),\n      ]\n    ],\n    [\n      // class decorators\n      dec1, dec2\n    ]\n  )\n  ```\n   Fully transpiled example:\n   ```js\n  @dec\n  class Class {\n    @dec\n    a = 123;\n     @dec\n    #a = 123;\n     @dec\n    @dec2\n    accessor b = 123;\n     @dec\n    accessor #b = 123;\n     @dec\n    c() { console.log(\'c\'); }\n     @dec\n    #c() { console.log(\'privC\'); }\n     @dec\n    get d() { console.log(\'d\'); }\n     @dec\n    get #d() { console.log(\'privD\'); }\n     @dec\n    set e(v) { console.log(\'e\'); }\n     @dec\n    set #e(v) { console.log(\'privE\'); }\n  }\n    // becomes\n  let initializeInstance;\n  let initializeClass;\n   let initA;\n  let initPrivA;\n   let initB;\n  let initPrivB, getPrivB, setPrivB;\n   let privC;\n  let privD;\n  let privE;\n   let Class;\n  class _Class {\n    static {\n      let ret = applyDecs(\n        this,\n        [\n          [dec, 0, \'a\'],\n          [dec, 0, \'a\', (i) => i.#a, (i, v) => i.#a = v],\n          [[dec, dec2], 1, \'b\'],\n          [dec, 1, \'b\', (i) => i.#privBData, (i, v) => i.#privBData = v],\n          [dec, 2, \'c\'],\n          [dec, 2, \'c\', () => console.log(\'privC\')],\n          [dec, 3, \'d\'],\n          [dec, 3, \'d\', () => console.log(\'privD\')],\n          [dec, 4, \'e\'],\n          [dec, 4, \'e\', () => console.log(\'privE\')],\n        ],\n        [\n          dec\n        ]\n      )\n       initA = ret[0];\n       initPrivA = ret[1];\n       initB = ret[2];\n       initPrivB = ret[3];\n      getPrivB = ret[4];\n      setPrivB = ret[5];\n       privC = ret[6];\n       privD = ret[7];\n       privE = ret[8];\n       initializeInstance = ret[9];\n       Class = ret[10]\n       initializeClass = ret[11];\n    }\n     a = (initializeInstance(this), initA(this, 123));\n     #a = initPrivA(this, 123);\n     #bData = initB(this, 123);\n    get b() { return this.#bData }\n    set b(v) { this.#bData = v }\n     #privBData = initPrivB(this, 123);\n    get #b() { return getPrivB(this); }\n    set #b(v) { setPrivB(this, v); }\n     c() { console.log(\'c\'); }\n     #c(...args) { return privC(this, ...args) }\n     get d() { console.log(\'d\'); }\n     get #d() { return privD(this); }\n     set e(v) { console.log(\'e\'); }\n     set #e(v) { privE(this, v); }\n  }\n   initializeClass(Class);\n  */\n\n  return function applyDecs2203Impl(targetClass, memberDecs, classDecs) {\n    var ret = [];\n    applyMemberDecs(ret, targetClass, memberDecs);\n    applyClassDecs(ret, targetClass, classDecs);\n    return ret;\n  };\n}\nvar applyDecs2203Impl;\nfunction applyDecs2203(targetClass, memberDecs, classDecs) {\n  applyDecs2203Impl = applyDecs2203Impl || applyDecs2203Factory();\n  return applyDecs2203Impl(targetClass, memberDecs, classDecs);\n}',
    {
      globals: ["Error", "TypeError", "undefined", "Object", "Map", "Array"],
      locals: {
        applyDecs2203Factory: [
          "body.0.id",
          "body.2.body.body.0.expression.right.right.callee",
        ],
        applyDecs2203Impl: [
          "body.1.declarations.0.id",
          "body.2.body.body.0.expression.right.left",
          "body.2.body.body.1.argument.callee",
          "body.2.body.body.0.expression.left",
        ],
        applyDecs2203: ["body.2.id"],
      },
      exportBindingAssignments: [],
      exportName: "applyDecs2203",
      dependencies: {},
      internal: false,
    },
  ),

  applyDecs2203R: helper(
    "7.20.0",
    '/* @minVersion 7.20.0 */\n/* @onlyBabel7 */\n\n\n\n\n/**\n  Enums are used in this file, but not assigned to vars to avoid non-hoistable values\n\n  CONSTRUCTOR = 0;\n  PUBLIC = 1;\n  PRIVATE = 2;\n\n  FIELD = 0;\n  ACCESSOR = 1;\n  METHOD = 2;\n  GETTER = 3;\n  SETTER = 4;\n\n  STATIC = 5;\n\n  CLASS = 10; // only used in assertValidReturnValue\n*/\n\nfunction applyDecs2203RFactory() {\n  function createAddInitializerMethod(initializers, decoratorFinishedRef) {\n    return function addInitializer(initializer) {\n      assertNotFinished(decoratorFinishedRef, "addInitializer");\n      assertCallable(initializer, "An initializer");\n      initializers.push(initializer);\n    };\n  }\n  function memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value) {\n    var kindStr;\n    switch (kind) {\n      case 1 /* ACCESSOR */:\n        kindStr = "accessor";\n        break;\n      case 2 /* METHOD */:\n        kindStr = "method";\n        break;\n      case 3 /* GETTER */:\n        kindStr = "getter";\n        break;\n      case 4 /* SETTER */:\n        kindStr = "setter";\n        break;\n      default:\n        kindStr = "field";\n    }\n    var ctx = {\n      kind: kindStr,\n      name: isPrivate ? "#" + name : toPropertyKey(name),\n      static: isStatic,\n      private: isPrivate\n    };\n    var decoratorFinishedRef = {\n      v: false\n    };\n    if (kind !== 0 /* FIELD */) {\n      ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef);\n    }\n    var get, set;\n    if (kind === 0 /* FIELD */) {\n      if (isPrivate) {\n        get = desc.get;\n        set = desc.set;\n      } else {\n        get = function () {\n          return this[name];\n        };\n        set = function (v) {\n          this[name] = v;\n        };\n      }\n    } else if (kind === 2 /* METHOD */) {\n      get = function () {\n        return desc.value;\n      };\n    } else {\n      // replace with values that will go through the final getter and setter\n      if (kind === 1 /* ACCESSOR */ || kind === 3 /* GETTER */) {\n        get = function () {\n          return desc.get.call(this);\n        };\n      }\n      if (kind === 1 /* ACCESSOR */ || kind === 4 /* SETTER */) {\n        set = function (v) {\n          desc.set.call(this, v);\n        };\n      }\n    }\n    ctx.access = get && set ? {\n      get: get,\n      set: set\n    } : get ? {\n      get: get\n    } : {\n      set: set\n    };\n    try {\n      return dec(value, ctx);\n    } finally {\n      decoratorFinishedRef.v = true;\n    }\n  }\n  function assertNotFinished(decoratorFinishedRef, fnName) {\n    if (decoratorFinishedRef.v) {\n      throw new Error("attempted to call " + fnName + " after decoration was finished");\n    }\n  }\n  function assertCallable(fn, hint) {\n    if (typeof fn !== "function") {\n      throw new TypeError(hint + " must be a function");\n    }\n  }\n  function assertValidReturnValue(kind, value) {\n    var type = typeof value;\n    if (kind === 1 /* ACCESSOR */) {\n      if (type !== "object" || value === null) {\n        throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");\n      }\n      if (value.get !== undefined) {\n        assertCallable(value.get, "accessor.get");\n      }\n      if (value.set !== undefined) {\n        assertCallable(value.set, "accessor.set");\n      }\n      if (value.init !== undefined) {\n        assertCallable(value.init, "accessor.init");\n      }\n    } else if (type !== "function") {\n      var hint;\n      if (kind === 0 /* FIELD */) {\n        hint = "field";\n      } else if (kind === 10 /* CLASS */) {\n        hint = "class";\n      } else {\n        hint = "method";\n      }\n      throw new TypeError(hint + " decorators must return a function or void 0");\n    }\n  }\n  function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers) {\n    var decs = decInfo[0];\n    var desc, init, prefix, value;\n    if (isPrivate) {\n      if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n        desc = {\n          get: decInfo[3],\n          set: decInfo[4]\n        };\n        prefix = "get";\n      } else if (kind === 3 /* GETTER */) {\n        desc = {\n          get: decInfo[3]\n        };\n        prefix = "get";\n      } else if (kind === 4 /* SETTER */) {\n        desc = {\n          set: decInfo[3]\n        };\n        prefix = "set";\n      } else {\n        desc = {\n          value: decInfo[3]\n        };\n      }\n      if (kind !== 0 /* FIELD */) {\n        if (kind === 1 /* ACCESSOR */) {\n          setFunctionName(decInfo[4], "#" + name, "set");\n        }\n        setFunctionName(decInfo[3], "#" + name, prefix);\n      }\n    } else if (kind !== 0 /* FIELD */) {\n      desc = Object.getOwnPropertyDescriptor(base, name);\n    }\n    if (kind === 1 /* ACCESSOR */) {\n      value = {\n        get: desc.get,\n        set: desc.set\n      };\n    } else if (kind === 2 /* METHOD */) {\n      value = desc.value;\n    } else if (kind === 3 /* GETTER */) {\n      value = desc.get;\n    } else if (kind === 4 /* SETTER */) {\n      value = desc.set;\n    }\n    var newValue, get, set;\n    if (typeof decs === "function") {\n      newValue = memberDec(decs, name, desc, initializers, kind, isStatic, isPrivate, value);\n      if (newValue !== void 0) {\n        assertValidReturnValue(kind, newValue);\n        if (kind === 0 /* FIELD */) {\n          init = newValue;\n        } else if (kind === 1 /* ACCESSOR */) {\n          init = newValue.init;\n          get = newValue.get || value.get;\n          set = newValue.set || value.set;\n          value = {\n            get: get,\n            set: set\n          };\n        } else {\n          value = newValue;\n        }\n      }\n    } else {\n      for (var i = decs.length - 1; i >= 0; i--) {\n        var dec = decs[i];\n        newValue = memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value);\n        if (newValue !== void 0) {\n          assertValidReturnValue(kind, newValue);\n          var newInit;\n          if (kind === 0 /* FIELD */) {\n            newInit = newValue;\n          } else if (kind === 1 /* ACCESSOR */) {\n            newInit = newValue.init;\n            get = newValue.get || value.get;\n            set = newValue.set || value.set;\n            value = {\n              get: get,\n              set: set\n            };\n          } else {\n            value = newValue;\n          }\n          if (newInit !== void 0) {\n            if (init === void 0) {\n              init = newInit;\n            } else if (typeof init === "function") {\n              init = [init, newInit];\n            } else {\n              init.push(newInit);\n            }\n          }\n        }\n      }\n    }\n    if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n      if (init === void 0) {\n        // If the initializer was void 0, sub in a dummy initializer\n        init = function (instance, init) {\n          return init;\n        };\n      } else if (typeof init !== "function") {\n        var ownInitializers = init;\n        init = function (instance, init) {\n          var value = init;\n          for (var i = 0; i < ownInitializers.length; i++) {\n            value = ownInitializers[i].call(instance, value);\n          }\n          return value;\n        };\n      } else {\n        var originalInitializer = init;\n        init = function (instance, init) {\n          return originalInitializer.call(instance, init);\n        };\n      }\n      ret.push(init);\n    }\n    if (kind !== 0 /* FIELD */) {\n      if (kind === 1 /* ACCESSOR */) {\n        desc.get = value.get;\n        desc.set = value.set;\n      } else if (kind === 2 /* METHOD */) {\n        desc.value = value;\n      } else if (kind === 3 /* GETTER */) {\n        desc.get = value;\n      } else if (kind === 4 /* SETTER */) {\n        desc.set = value;\n      }\n      if (isPrivate) {\n        if (kind === 1 /* ACCESSOR */) {\n          ret.push(function (instance, args) {\n            return value.get.call(instance, args);\n          });\n          ret.push(function (instance, args) {\n            return value.set.call(instance, args);\n          });\n        } else if (kind === 2 /* METHOD */) {\n          ret.push(value);\n        } else {\n          ret.push(function (instance, args) {\n            return value.call(instance, args);\n          });\n        }\n      } else {\n        Object.defineProperty(base, name, desc);\n      }\n    }\n  }\n  function applyMemberDecs(Class, decInfos) {\n    var ret = [];\n    var protoInitializers;\n    var staticInitializers;\n    var existingProtoNonFields = new Map();\n    var existingStaticNonFields = new Map();\n    for (var i = 0; i < decInfos.length; i++) {\n      var decInfo = decInfos[i];\n\n      // skip computed property names\n      if (!Array.isArray(decInfo)) continue;\n      var kind = decInfo[1];\n      var name = decInfo[2];\n      var isPrivate = decInfo.length > 3;\n      var isStatic = kind >= 5; /* STATIC */\n      var base;\n      var initializers;\n      if (isStatic) {\n        base = Class;\n        kind = kind - 5 /* STATIC */;\n        // initialize staticInitializers when we see a non-field static member\n        if (kind !== 0 /* FIELD */) {\n          staticInitializers = staticInitializers || [];\n          initializers = staticInitializers;\n        }\n      } else {\n        base = Class.prototype;\n        // initialize protoInitializers when we see a non-field member\n        if (kind !== 0 /* FIELD */) {\n          protoInitializers = protoInitializers || [];\n          initializers = protoInitializers;\n        }\n      }\n      if (kind !== 0 /* FIELD */ && !isPrivate) {\n        var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields;\n        var existingKind = existingNonFields.get(name) || 0;\n        if (existingKind === true || existingKind === 3 /* GETTER */ && kind !== 4 /* SETTER */ || existingKind === 4 /* SETTER */ && kind !== 3 /* GETTER */) {\n          throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);\n        } else if (!existingKind && kind > 2 /* METHOD */) {\n          existingNonFields.set(name, kind);\n        } else {\n          existingNonFields.set(name, true);\n        }\n      }\n      applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers);\n    }\n    pushInitializers(ret, protoInitializers);\n    pushInitializers(ret, staticInitializers);\n    return ret;\n  }\n  function pushInitializers(ret, initializers) {\n    if (initializers) {\n      ret.push(function (instance) {\n        for (var i = 0; i < initializers.length; i++) {\n          initializers[i].call(instance);\n        }\n        return instance;\n      });\n    }\n  }\n  function applyClassDecs(targetClass, classDecs) {\n    if (classDecs.length > 0) {\n      var initializers = [];\n      var newClass = targetClass;\n      var name = targetClass.name;\n      for (var i = classDecs.length - 1; i >= 0; i--) {\n        var decoratorFinishedRef = {\n          v: false\n        };\n        try {\n          var nextNewClass = classDecs[i](newClass, {\n            kind: "class",\n            name: name,\n            addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef)\n          });\n        } finally {\n          decoratorFinishedRef.v = true;\n        }\n        if (nextNewClass !== undefined) {\n          assertValidReturnValue(10 /* CLASS */, nextNewClass);\n          newClass = nextNewClass;\n        }\n      }\n      return [newClass, function () {\n        for (var i = 0; i < initializers.length; i++) {\n          initializers[i].call(newClass);\n        }\n      }];\n    }\n    // The transformer will not emit assignment when there are no class decorators,\n    // so we don\'t have to return an empty array here.\n  }\n\n  /**\n  Basic usage:\n   applyDecs(\n    Class,\n    [\n      // member decorators\n      [\n        dec,                // dec or array of decs\n        0,                  // kind of value being decorated\n        \'prop\',             // name of public prop on class containing the value being decorated,\n        \'#p\',               // the name of the private property (if is private, void 0 otherwise),\n      ]\n    ],\n    [\n      // class decorators\n      dec1, dec2\n    ]\n  )\n  ```\n   Fully transpiled example:\n   ```js\n  @dec\n  class Class {\n    @dec\n    a = 123;\n     @dec\n    #a = 123;\n     @dec\n    @dec2\n    accessor b = 123;\n     @dec\n    accessor #b = 123;\n     @dec\n    c() { console.log(\'c\'); }\n     @dec\n    #c() { console.log(\'privC\'); }\n     @dec\n    get d() { console.log(\'d\'); }\n     @dec\n    get #d() { console.log(\'privD\'); }\n     @dec\n    set e(v) { console.log(\'e\'); }\n     @dec\n    set #e(v) { console.log(\'privE\'); }\n  }\n    // becomes\n  let initializeInstance;\n  let initializeClass;\n   let initA;\n  let initPrivA;\n   let initB;\n  let initPrivB, getPrivB, setPrivB;\n   let privC;\n  let privD;\n  let privE;\n   let Class;\n  class _Class {\n    static {\n      let ret = applyDecs(\n        this,\n        [\n          [dec, 0, \'a\'],\n          [dec, 0, \'a\', (i) => i.#a, (i, v) => i.#a = v],\n          [[dec, dec2], 1, \'b\'],\n          [dec, 1, \'b\', (i) => i.#privBData, (i, v) => i.#privBData = v],\n          [dec, 2, \'c\'],\n          [dec, 2, \'c\', () => console.log(\'privC\')],\n          [dec, 3, \'d\'],\n          [dec, 3, \'d\', () => console.log(\'privD\')],\n          [dec, 4, \'e\'],\n          [dec, 4, \'e\', () => console.log(\'privE\')],\n        ],\n        [\n          dec\n        ]\n      )\n       initA = ret[0];\n       initPrivA = ret[1];\n       initB = ret[2];\n       initPrivB = ret[3];\n      getPrivB = ret[4];\n      setPrivB = ret[5];\n       privC = ret[6];\n       privD = ret[7];\n       privE = ret[8];\n       initializeInstance = ret[9];\n       Class = ret[10]\n       initializeClass = ret[11];\n    }\n     a = (initializeInstance(this), initA(this, 123));\n     #a = initPrivA(this, 123);\n     #bData = initB(this, 123);\n    get b() { return this.#bData }\n    set b(v) { this.#bData = v }\n     #privBData = initPrivB(this, 123);\n    get #b() { return getPrivB(this); }\n    set #b(v) { setPrivB(this, v); }\n     c() { console.log(\'c\'); }\n     #c(...args) { return privC(this, ...args) }\n     get d() { console.log(\'d\'); }\n     get #d() { return privD(this); }\n     set e(v) { console.log(\'e\'); }\n     set #e(v) { privE(this, v); }\n  }\n   initializeClass(Class);\n  */\n\n  return function applyDecs2203R(targetClass, memberDecs, classDecs) {\n    return {\n      e: applyMemberDecs(targetClass, memberDecs),\n      // Lazily apply class decorations so that member init locals can be properly bound.\n      get c() {\n        return applyClassDecs(targetClass, classDecs);\n      }\n    };\n  };\n}\nfunction applyDecs2203R(targetClass, memberDecs, classDecs) {\n  return (applyDecs2203R = applyDecs2203RFactory())(targetClass, memberDecs, classDecs);\n}',
    {
      globals: ["Error", "TypeError", "undefined", "Object", "Map", "Array"],
      locals: {
        applyDecs2203RFactory: [
          "body.0.id",
          "body.1.body.body.0.argument.callee.right.callee",
        ],
        applyDecs2203R: [
          "body.1.id",
          "body.1.body.body.0.argument.callee.left",
        ],
      },
      exportBindingAssignments: ["body.1.body.body.0.argument.callee"],
      exportName: "applyDecs2203R",
      dependencies: {
        setFunctionName: [
          "body.0.body.body.5.body.body.2.consequent.body.1.consequent.body.0.consequent.body.0.expression.callee",
          "body.0.body.body.5.body.body.2.consequent.body.1.consequent.body.1.expression.callee",
        ],
        toPropertyKey: [
          "body.0.body.body.1.body.body.2.declarations.0.init.properties.1.value.alternate.callee",
        ],
      },
      internal: false,
    },
  ),

  applyDecs2301: helper(
    "7.21.0",
    '/* @minVersion 7.21.0 */\n/* @onlyBabel7 */\n\n\n\n\n\n/**\n  Enums are used in this file, but not assigned to vars to avoid non-hoistable values\n\n  CONSTRUCTOR = 0;\n  PUBLIC = 1;\n  PRIVATE = 2;\n\n  FIELD = 0;\n  ACCESSOR = 1;\n  METHOD = 2;\n  GETTER = 3;\n  SETTER = 4;\n\n  STATIC = 5;\n\n  CLASS = 10; // only used in assertValidReturnValue\n*/\n\nfunction applyDecs2301Factory() {\n  function createAddInitializerMethod(initializers, decoratorFinishedRef) {\n    return function addInitializer(initializer) {\n      assertNotFinished(decoratorFinishedRef, "addInitializer");\n      assertCallable(initializer, "An initializer");\n      initializers.push(initializer);\n    };\n  }\n  function assertInstanceIfPrivate(has, target) {\n    if (!has(target)) {\n      throw new TypeError("Attempted to access private element on non-instance");\n    }\n  }\n  function memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value, hasPrivateBrand) {\n    var kindStr;\n    switch (kind) {\n      case 1 /* ACCESSOR */:\n        kindStr = "accessor";\n        break;\n      case 2 /* METHOD */:\n        kindStr = "method";\n        break;\n      case 3 /* GETTER */:\n        kindStr = "getter";\n        break;\n      case 4 /* SETTER */:\n        kindStr = "setter";\n        break;\n      default:\n        kindStr = "field";\n    }\n    var ctx = {\n      kind: kindStr,\n      name: isPrivate ? "#" + name : toPropertyKey(name),\n      static: isStatic,\n      private: isPrivate\n    };\n    var decoratorFinishedRef = {\n      v: false\n    };\n    if (kind !== 0 /* FIELD */) {\n      ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef);\n    }\n    var get, set;\n    if (!isPrivate && (kind === 0 /* FIELD */ || kind === 2) /* METHOD */) {\n      get = function (target) {\n        return target[name];\n      };\n      if (kind === 0 /* FIELD */) {\n        set = function (target, v) {\n          target[name] = v;\n        };\n      }\n    } else if (kind === 2 /* METHOD */) {\n      // Assert: isPrivate is true.\n      get = function (target) {\n        assertInstanceIfPrivate(hasPrivateBrand, target);\n        return desc.value;\n      };\n    } else {\n      // Assert: If kind === 0, then isPrivate is true.\n      var t = kind === 0 /* FIELD */ || kind === 1; /* ACCESSOR */\n      if (t || kind === 3 /* GETTER */) {\n        if (isPrivate) {\n          get = function (target) {\n            assertInstanceIfPrivate(hasPrivateBrand, target);\n            return desc.get.call(target);\n          };\n        } else {\n          get = function (target) {\n            return desc.get.call(target);\n          };\n        }\n      }\n      if (t || kind === 4 /* SETTER */) {\n        if (isPrivate) {\n          set = function (target, value) {\n            assertInstanceIfPrivate(hasPrivateBrand, target);\n            desc.set.call(target, value);\n          };\n        } else {\n          set = function (target, value) {\n            desc.set.call(target, value);\n          };\n        }\n      }\n    }\n    var has = isPrivate ? hasPrivateBrand.bind() : function (target) {\n      return name in target;\n    };\n    ctx.access = get && set ? {\n      get: get,\n      set: set,\n      has: has\n    } : get ? {\n      get: get,\n      has: has\n    } : {\n      set: set,\n      has: has\n    };\n    try {\n      return dec(value, ctx);\n    } finally {\n      decoratorFinishedRef.v = true;\n    }\n  }\n  function assertNotFinished(decoratorFinishedRef, fnName) {\n    if (decoratorFinishedRef.v) {\n      throw new Error("attempted to call " + fnName + " after decoration was finished");\n    }\n  }\n  function assertCallable(fn, hint) {\n    if (typeof fn !== "function") {\n      throw new TypeError(hint + " must be a function");\n    }\n  }\n  function assertValidReturnValue(kind, value) {\n    var type = typeof value;\n    if (kind === 1 /* ACCESSOR */) {\n      if (type !== "object" || value === null) {\n        throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");\n      }\n      if (value.get !== undefined) {\n        assertCallable(value.get, "accessor.get");\n      }\n      if (value.set !== undefined) {\n        assertCallable(value.set, "accessor.set");\n      }\n      if (value.init !== undefined) {\n        assertCallable(value.init, "accessor.init");\n      }\n    } else if (type !== "function") {\n      var hint;\n      if (kind === 0 /* FIELD */) {\n        hint = "field";\n      } else if (kind === 10 /* CLASS */) {\n        hint = "class";\n      } else {\n        hint = "method";\n      }\n      throw new TypeError(hint + " decorators must return a function or void 0");\n    }\n  }\n  function curryThis1(fn) {\n    return function () {\n      return fn(this);\n    };\n  }\n  function curryThis2(fn) {\n    return function (value) {\n      fn(this, value);\n    };\n  }\n  function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers, hasPrivateBrand) {\n    var decs = decInfo[0];\n    var desc, init, prefix, value;\n    if (isPrivate) {\n      if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n        desc = {\n          get: curryThis1(decInfo[3]),\n          set: curryThis2(decInfo[4])\n        };\n        prefix = "get";\n      } else {\n        if (kind === 3 /* GETTER */) {\n          desc = {\n            get: decInfo[3]\n          };\n          prefix = "get";\n        } else if (kind === 4 /* SETTER */) {\n          desc = {\n            set: decInfo[3]\n          };\n          prefix = "set";\n        } else {\n          desc = {\n            value: decInfo[3]\n          };\n        }\n      }\n      if (kind !== 0 /* FIELD */) {\n        if (kind === 1 /* ACCESSOR */) {\n          setFunctionName(desc.set, "#" + name, "set");\n        }\n        setFunctionName(desc[prefix || "value"], "#" + name, prefix);\n      }\n    } else if (kind !== 0 /* FIELD */) {\n      desc = Object.getOwnPropertyDescriptor(base, name);\n    }\n    if (kind === 1 /* ACCESSOR */) {\n      value = {\n        get: desc.get,\n        set: desc.set\n      };\n    } else if (kind === 2 /* METHOD */) {\n      value = desc.value;\n    } else if (kind === 3 /* GETTER */) {\n      value = desc.get;\n    } else if (kind === 4 /* SETTER */) {\n      value = desc.set;\n    }\n    var newValue, get, set;\n    if (typeof decs === "function") {\n      newValue = memberDec(decs, name, desc, initializers, kind, isStatic, isPrivate, value, hasPrivateBrand);\n      if (newValue !== void 0) {\n        assertValidReturnValue(kind, newValue);\n        if (kind === 0 /* FIELD */) {\n          init = newValue;\n        } else if (kind === 1 /* ACCESSOR */) {\n          init = newValue.init;\n          get = newValue.get || value.get;\n          set = newValue.set || value.set;\n          value = {\n            get: get,\n            set: set\n          };\n        } else {\n          value = newValue;\n        }\n      }\n    } else {\n      for (var i = decs.length - 1; i >= 0; i--) {\n        var dec = decs[i];\n        newValue = memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, value, hasPrivateBrand);\n        if (newValue !== void 0) {\n          assertValidReturnValue(kind, newValue);\n          var newInit;\n          if (kind === 0 /* FIELD */) {\n            newInit = newValue;\n          } else if (kind === 1 /* ACCESSOR */) {\n            newInit = newValue.init;\n            get = newValue.get || value.get;\n            set = newValue.set || value.set;\n            value = {\n              get: get,\n              set: set\n            };\n          } else {\n            value = newValue;\n          }\n          if (newInit !== void 0) {\n            if (init === void 0) {\n              init = newInit;\n            } else if (typeof init === "function") {\n              init = [init, newInit];\n            } else {\n              init.push(newInit);\n            }\n          }\n        }\n      }\n    }\n    if (kind === 0 /* FIELD */ || kind === 1 /* ACCESSOR */) {\n      if (init === void 0) {\n        // If the initializer was void 0, sub in a dummy initializer\n        init = function (instance, init) {\n          return init;\n        };\n      } else if (typeof init !== "function") {\n        var ownInitializers = init;\n        init = function (instance, init) {\n          var value = init;\n          for (var i = 0; i < ownInitializers.length; i++) {\n            value = ownInitializers[i].call(instance, value);\n          }\n          return value;\n        };\n      } else {\n        var originalInitializer = init;\n        init = function (instance, init) {\n          return originalInitializer.call(instance, init);\n        };\n      }\n      ret.push(init);\n    }\n    if (kind !== 0 /* FIELD */) {\n      if (kind === 1 /* ACCESSOR */) {\n        desc.get = value.get;\n        desc.set = value.set;\n      } else if (kind === 2 /* METHOD */) {\n        desc.value = value;\n      } else if (kind === 3 /* GETTER */) {\n        desc.get = value;\n      } else if (kind === 4 /* SETTER */) {\n        desc.set = value;\n      }\n      if (isPrivate) {\n        if (kind === 1 /* ACCESSOR */) {\n          ret.push(function (instance, args) {\n            return value.get.call(instance, args);\n          });\n          ret.push(function (instance, args) {\n            return value.set.call(instance, args);\n          });\n        } else if (kind === 2 /* METHOD */) {\n          ret.push(value);\n        } else {\n          ret.push(function (instance, args) {\n            return value.call(instance, args);\n          });\n        }\n      } else {\n        Object.defineProperty(base, name, desc);\n      }\n    }\n  }\n  function applyMemberDecs(Class, decInfos, instanceBrand) {\n    var ret = [];\n    var protoInitializers;\n    var staticInitializers;\n    var staticBrand;\n    var existingProtoNonFields = new Map();\n    var existingStaticNonFields = new Map();\n    for (var i = 0; i < decInfos.length; i++) {\n      var decInfo = decInfos[i];\n\n      // skip computed property names\n      if (!Array.isArray(decInfo)) continue;\n      var kind = decInfo[1];\n      var name = decInfo[2];\n      var isPrivate = decInfo.length > 3;\n      var isStatic = kind >= 5; /* STATIC */\n      var base;\n      var initializers;\n      var hasPrivateBrand = instanceBrand;\n      if (isStatic) {\n        base = Class;\n        kind = kind - 5 /* STATIC */;\n        // initialize staticInitializers when we see a non-field static member\n        if (kind !== 0 /* FIELD */) {\n          staticInitializers = staticInitializers || [];\n          initializers = staticInitializers;\n        }\n        if (isPrivate && !staticBrand) {\n          staticBrand = function (_) {\n            return checkInRHS(_) === Class;\n          };\n        }\n        hasPrivateBrand = staticBrand;\n      } else {\n        base = Class.prototype;\n        // initialize protoInitializers when we see a non-field member\n        if (kind !== 0 /* FIELD */) {\n          protoInitializers = protoInitializers || [];\n          initializers = protoInitializers;\n        }\n      }\n      if (kind !== 0 /* FIELD */ && !isPrivate) {\n        var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields;\n        var existingKind = existingNonFields.get(name) || 0;\n        if (existingKind === true || existingKind === 3 /* GETTER */ && kind !== 4 /* SETTER */ || existingKind === 4 /* SETTER */ && kind !== 3 /* GETTER */) {\n          throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);\n        } else if (!existingKind && kind > 2 /* METHOD */) {\n          existingNonFields.set(name, kind);\n        } else {\n          existingNonFields.set(name, true);\n        }\n      }\n      applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers, hasPrivateBrand);\n    }\n    pushInitializers(ret, protoInitializers);\n    pushInitializers(ret, staticInitializers);\n    return ret;\n  }\n  function pushInitializers(ret, initializers) {\n    if (initializers) {\n      ret.push(function (instance) {\n        for (var i = 0; i < initializers.length; i++) {\n          initializers[i].call(instance);\n        }\n        return instance;\n      });\n    }\n  }\n  function applyClassDecs(targetClass, classDecs) {\n    if (classDecs.length > 0) {\n      var initializers = [];\n      var newClass = targetClass;\n      var name = targetClass.name;\n      for (var i = classDecs.length - 1; i >= 0; i--) {\n        var decoratorFinishedRef = {\n          v: false\n        };\n        try {\n          var nextNewClass = classDecs[i](newClass, {\n            kind: "class",\n            name: name,\n            addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef)\n          });\n        } finally {\n          decoratorFinishedRef.v = true;\n        }\n        if (nextNewClass !== undefined) {\n          assertValidReturnValue(10 /* CLASS */, nextNewClass);\n          newClass = nextNewClass;\n        }\n      }\n      return [newClass, function () {\n        for (var i = 0; i < initializers.length; i++) {\n          initializers[i].call(newClass);\n        }\n      }];\n    }\n    // The transformer will not emit assignment when there are no class decorators,\n    // so we don\'t have to return an empty array here.\n  }\n\n  /**\n    Basic usage:\n     applyDecs(\n      Class,\n      [\n        // member decorators\n        [\n          dec,                // dec or array of decs\n          0,                  // kind of value being decorated\n          \'prop\',             // name of public prop on class containing the value being decorated,\n          \'#p\',               // the name of the private property (if is private, void 0 otherwise),\n        ]\n      ],\n      [\n        // class decorators\n        dec1, dec2\n      ]\n    )\n    ```\n     Fully transpiled example:\n     ```js\n    @dec\n    class Class {\n      @dec\n      a = 123;\n       @dec\n      #a = 123;\n       @dec\n      @dec2\n      accessor b = 123;\n       @dec\n      accessor #b = 123;\n       @dec\n      c() { console.log(\'c\'); }\n       @dec\n      #c() { console.log(\'privC\'); }\n       @dec\n      get d() { console.log(\'d\'); }\n       @dec\n      get #d() { console.log(\'privD\'); }\n       @dec\n      set e(v) { console.log(\'e\'); }\n       @dec\n      set #e(v) { console.log(\'privE\'); }\n    }\n      // becomes\n    let initializeInstance;\n    let initializeClass;\n     let initA;\n    let initPrivA;\n     let initB;\n    let initPrivB, getPrivB, setPrivB;\n     let privC;\n    let privD;\n    let privE;\n     let Class;\n    class _Class {\n      static {\n        let ret = applyDecs(\n          this,\n          [\n            [dec, 0, \'a\'],\n            [dec, 0, \'a\', (i) => i.#a, (i, v) => i.#a = v],\n            [[dec, dec2], 1, \'b\'],\n            [dec, 1, \'b\', (i) => i.#privBData, (i, v) => i.#privBData = v],\n            [dec, 2, \'c\'],\n            [dec, 2, \'c\', () => console.log(\'privC\')],\n            [dec, 3, \'d\'],\n            [dec, 3, \'d\', () => console.log(\'privD\')],\n            [dec, 4, \'e\'],\n            [dec, 4, \'e\', () => console.log(\'privE\')],\n          ],\n          [\n            dec\n          ]\n        )\n         initA = ret[0];\n         initPrivA = ret[1];\n         initB = ret[2];\n         initPrivB = ret[3];\n        getPrivB = ret[4];\n        setPrivB = ret[5];\n         privC = ret[6];\n         privD = ret[7];\n         privE = ret[8];\n         initializeInstance = ret[9];\n         Class = ret[10]\n         initializeClass = ret[11];\n      }\n       a = (initializeInstance(this), initA(this, 123));\n       #a = initPrivA(this, 123);\n       #bData = initB(this, 123);\n      get b() { return this.#bData }\n      set b(v) { this.#bData = v }\n       #privBData = initPrivB(this, 123);\n      get #b() { return getPrivB(this); }\n      set #b(v) { setPrivB(this, v); }\n       c() { console.log(\'c\'); }\n       #c(...args) { return privC(this, ...args) }\n       get d() { console.log(\'d\'); }\n       get #d() { return privD(this); }\n       set e(v) { console.log(\'e\'); }\n       set #e(v) { privE(this, v); }\n    }\n     initializeClass(Class);\n  */\n  return function applyDecs2301(targetClass, memberDecs, classDecs, instanceBrand) {\n    return {\n      e: applyMemberDecs(targetClass, memberDecs, instanceBrand),\n      // Lazily apply class decorations so that member init locals can be properly bound.\n      get c() {\n        return applyClassDecs(targetClass, classDecs);\n      }\n    };\n  };\n}\nfunction applyDecs2301(targetClass, memberDecs, classDecs, instanceBrand) {\n  return (applyDecs2301 = applyDecs2301Factory())(targetClass, memberDecs, classDecs, instanceBrand);\n}',
    {
      globals: ["TypeError", "Error", "undefined", "Object", "Map", "Array"],
      locals: {
        applyDecs2301Factory: [
          "body.0.id",
          "body.1.body.body.0.argument.callee.right.callee",
        ],
        applyDecs2301: ["body.1.id", "body.1.body.body.0.argument.callee.left"],
      },
      exportBindingAssignments: ["body.1.body.body.0.argument.callee"],
      exportName: "applyDecs2301",
      dependencies: {
        checkInRHS: [
          "body.0.body.body.9.body.body.6.body.body.9.consequent.body.3.consequent.body.0.expression.right.body.body.0.argument.left.callee",
        ],
        setFunctionName: [
          "body.0.body.body.8.body.body.2.consequent.body.1.consequent.body.0.consequent.body.0.expression.callee",
          "body.0.body.body.8.body.body.2.consequent.body.1.consequent.body.1.expression.callee",
        ],
        toPropertyKey: [
          "body.0.body.body.2.body.body.2.declarations.0.init.properties.1.value.alternate.callee",
        ],
      },
      internal: false,
    },
  ),

  applyDecs2305: helper(
    "7.21.0",
    '/* @minVersion 7.21.0 */\n/* @mangleFns */\n/* @onlyBabel7 */\n\n\n\n\n/**\n  Basic usage:\n\n  applyDecs(\n    Class,\n    [\n      // member decorators\n      [\n        decs,               // dec, or array of decs, or array of this values and decs\n        0,                  // kind of value being decorated\n        \'prop\',             // name of public prop on class containing the value being decorated,\n        \'#p\',               // the name of the private property (if is private, void 0 otherwise),\n      ]\n    ],\n    [\n      // class decorators\n      dec1, dec2\n    ]\n  )\n  ```\n\n  Fully transpiled example:\n\n  ```js\n  @dec\n  class Class {\n    @dec\n    a = 123;\n\n    @dec\n    #a = 123;\n\n    @dec\n    @dec2\n    accessor b = 123;\n\n    @dec\n    accessor #b = 123;\n\n    @dec\n    c() { console.log(\'c\'); }\n\n    @dec\n    #c() { console.log(\'privC\'); }\n\n    @dec\n    get d() { console.log(\'d\'); }\n\n    @dec\n    get #d() { console.log(\'privD\'); }\n\n    @dec\n    set e(v) { console.log(\'e\'); }\n\n    @dec\n    set #e(v) { console.log(\'privE\'); }\n  }\n\n\n  // becomes\n  let initializeInstance;\n  let initializeClass;\n\n  let initA;\n  let initPrivA;\n\n  let initB;\n  let initPrivB, getPrivB, setPrivB;\n\n  let privC;\n  let privD;\n  let privE;\n\n  let Class;\n  class _Class {\n    static {\n      let ret = applyDecs(\n        this,\n        [\n          [dec, 0, \'a\'],\n          [dec, 0, \'a\', (i) => i.#a, (i, v) => i.#a = v],\n          [[dec, dec2], 1, \'b\'],\n          [dec, 1, \'b\', (i) => i.#privBData, (i, v) => i.#privBData = v],\n          [dec, 2, \'c\'],\n          [dec, 2, \'c\', () => console.log(\'privC\')],\n          [dec, 3, \'d\'],\n          [dec, 3, \'d\', () => console.log(\'privD\')],\n          [dec, 4, \'e\'],\n          [dec, 4, \'e\', () => console.log(\'privE\')],\n        ],\n        [\n          dec\n        ]\n      );\n\n      initA = ret[0];\n\n      initPrivA = ret[1];\n\n      initB = ret[2];\n\n      initPrivB = ret[3];\n      getPrivB = ret[4];\n      setPrivB = ret[5];\n\n      privC = ret[6];\n\n      privD = ret[7];\n\n      privE = ret[8];\n\n      initializeInstance = ret[9];\n\n      Class = ret[10]\n\n      initializeClass = ret[11];\n    }\n\n    a = (initializeInstance(this), initA(this, 123));\n\n    #a = initPrivA(this, 123);\n\n    #bData = initB(this, 123);\n    get b() { return this.#bData }\n    set b(v) { this.#bData = v }\n\n    #privBData = initPrivB(this, 123);\n    get #b() { return getPrivB(this); }\n    set #b(v) { setPrivB(this, v); }\n\n    c() { console.log(\'c\'); }\n\n    #c(...args) { return privC(this, ...args) }\n\n    get d() { console.log(\'d\'); }\n\n    get #d() { return privD(this); }\n\n    set e(v) { console.log(\'e\'); }\n\n    set #e(v) { privE(this, v); }\n  }\n\n  initializeClass(Class);\n */\n\nfunction applyDecs2305(targetClass, memberDecs, classDecs, classDecsHaveThis, instanceBrand, parentClass) {\n  function _bindPropCall(obj, name, before) {\n    return function (_this, value) {\n      if (before) {\n        before(_this);\n      }\n      return obj[name].call(_this, value);\n    };\n  }\n  function runInitializers(initializers, value) {\n    for (var i = 0; i < initializers.length; i++) {\n      initializers[i].call(value);\n    }\n    return value;\n  }\n  function assertCallable(fn, hint1, hint2, throwUndefined) {\n    if (typeof fn !== "function") {\n      if (throwUndefined || fn !== void 0) {\n        throw new TypeError(hint1 + " must " + (hint2 || "be") + " a function" + (throwUndefined ? "" : " or undefined"));\n      }\n    }\n    return fn;\n  }\n\n  /* @no-mangle */\n  function applyDec(Class, decInfo, decoratorsHaveThis, name, kind, metadata, initializers, ret, isStatic, isPrivate, isField, isAccessor, hasPrivateBrand) {\n    function assertInstanceIfPrivate(target) {\n      if (!hasPrivateBrand(target)) {\n        throw new TypeError("Attempted to access private element on non-instance");\n      }\n    }\n    var decs = decInfo[0],\n      decVal = decInfo[3],\n      _,\n      isClass = !ret;\n    if (!isClass) {\n      if (!decoratorsHaveThis && !Array.isArray(decs)) {\n        decs = [decs];\n      }\n      var desc = {},\n        init = [],\n        key = kind === 3 ? "get" : kind === 4 || isAccessor ? "set" : "value";\n      if (isPrivate) {\n        if (isField || isAccessor) {\n          desc = {\n            get: setFunctionName(function () {\n              return decVal(this);\n            }, name, "get"),\n            set: function (value) {\n              decInfo[4](this, value);\n            }\n          };\n        } else {\n          desc[key] = decVal;\n        }\n        if (!isField) {\n          setFunctionName(desc[key], name, kind === 2 ? "" : key);\n        }\n      } else if (!isField) {\n        desc = Object.getOwnPropertyDescriptor(Class, name);\n      }\n    }\n    var newValue = Class;\n    for (var i = decs.length - 1; i >= 0; i -= decoratorsHaveThis ? 2 : 1) {\n      var dec = decs[i],\n        decThis = decoratorsHaveThis ? decs[i - 1] : void 0;\n      var decoratorFinishedRef = {};\n      var ctx = {\n        kind: ["field", "accessor", "method", "getter", "setter", "class"][kind],\n        name: name,\n        metadata: metadata,\n        addInitializer: function (decoratorFinishedRef, initializer) {\n          if (decoratorFinishedRef.v) {\n            throw new Error("attempted to call addInitializer after decoration was finished");\n          }\n          assertCallable(initializer, "An initializer", "be", true);\n          initializers.push(initializer);\n        }.bind(null, decoratorFinishedRef)\n      };\n      try {\n        if (isClass) {\n          if (_ = assertCallable(dec.call(decThis, newValue, ctx), "class decorators", "return")) {\n            newValue = _;\n          }\n        } else {\n          ctx["static"] = isStatic;\n          ctx["private"] = isPrivate;\n          var get, set;\n          if (!isPrivate) {\n            get = function (target) {\n              return target[name];\n            };\n            if (kind < 2 || kind === 4) {\n              set = function (target, v) {\n                target[name] = v;\n              };\n            }\n          } else if (kind === 2) {\n            get = function (_this) {\n              assertInstanceIfPrivate(_this);\n              return desc.value;\n            };\n          } else {\n            if (kind < 4) {\n              get = _bindPropCall(desc, "get", assertInstanceIfPrivate);\n            }\n            if (kind !== 3) {\n              set = _bindPropCall(desc, "set", assertInstanceIfPrivate);\n            }\n          }\n          var access = ctx.access = {\n            has: isPrivate ?\n            // @ts-expect-error no thisArg\n            hasPrivateBrand.bind() : function (target) {\n              return name in target;\n            }\n          };\n          if (get) access.get = get;\n          if (set) access.set = set;\n          newValue = dec.call(decThis, isAccessor ? {\n            get: desc.get,\n            set: desc.set\n          } : desc[key], ctx);\n          if (isAccessor) {\n            if (typeof newValue === "object" && newValue) {\n              if (_ = assertCallable(newValue.get, "accessor.get")) {\n                desc.get = _;\n              }\n              if (_ = assertCallable(newValue.set, "accessor.set")) {\n                desc.set = _;\n              }\n              if (_ = assertCallable(newValue.init, "accessor.init")) {\n                init.push(_);\n              }\n            } else if (newValue !== void 0) {\n              throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");\n            }\n          } else if (assertCallable(newValue, (isField ? "field" : "method") + " decorators", "return")) {\n            if (isField) {\n              init.push(newValue);\n            } else {\n              desc[key] = newValue;\n            }\n          }\n        }\n      } finally {\n        decoratorFinishedRef.v = true;\n      }\n    }\n    if (isField || isAccessor) {\n      ret.push(function (instance, value) {\n        for (var i = init.length - 1; i >= 0; i--) {\n          value = init[i].call(instance, value);\n        }\n        return value;\n      });\n    }\n    if (!isField && !isClass) {\n      if (isPrivate) {\n        if (isAccessor) {\n          ret.push(_bindPropCall(desc, "get"), _bindPropCall(desc, "set"));\n        } else {\n          ret.push(kind === 2 ? desc[key] : _bindPropCall.call.bind(desc[key]));\n        }\n      } else {\n        Object.defineProperty(Class, name, desc);\n      }\n    }\n    return newValue;\n  }\n\n  /* @no-mangle */\n  function applyMemberDecs(Class, decInfos, instanceBrand, metadata) {\n    var ret = [];\n    var protoInitializers;\n    var staticInitializers;\n    var staticBrand = function (_) {\n      return checkInRHS(_) === Class;\n    };\n    var existingNonFields = new Map();\n    function pushInitializers(initializers) {\n      if (initializers) {\n        ret.push(runInitializers.bind(null, initializers));\n      }\n    }\n    for (var i = 0; i < decInfos.length; i++) {\n      var decInfo = decInfos[i];\n\n      // skip computed property names\n      if (!Array.isArray(decInfo)) continue;\n      var kind = decInfo[1];\n      var name = decInfo[2];\n      var isPrivate = decInfo.length > 3;\n      var decoratorsHaveThis = kind & 16;\n      var isStatic = !!(kind & 8);\n      kind &= 7; /* 0b111 */\n\n      var isField = kind === 0;\n      var key = name + "/" + isStatic;\n      if (!isField && !isPrivate) {\n        var existingKind = existingNonFields.get(key);\n        if (existingKind === true || existingKind === 3 && kind !== 4 || existingKind === 4 && kind !== 3) {\n          throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);\n        }\n        existingNonFields.set(key, kind > 2 ? kind : true);\n      }\n      applyDec(isStatic ? Class : Class.prototype, decInfo, decoratorsHaveThis, isPrivate ? "#" + name : toPropertyKey(name), kind, metadata, isStatic ? staticInitializers = staticInitializers || [] : protoInitializers = protoInitializers || [], ret, isStatic, isPrivate, isField, kind === 1, isStatic && isPrivate ? staticBrand : instanceBrand);\n    }\n    pushInitializers(protoInitializers);\n    pushInitializers(staticInitializers);\n    return ret;\n  }\n  function defineMetadata(Class, metadata) {\n    return Object.defineProperty(Class, Symbol.metadata || Symbol["for"]("Symbol.metadata"), {\n      configurable: true,\n      enumerable: true,\n      value: metadata\n    });\n  }\n  if (arguments.length >= 6) {\n    var parentMetadata = parentClass[Symbol.metadata || Symbol["for"]("Symbol.metadata")];\n  }\n  var metadata = Object.create(parentMetadata == null ? null : parentMetadata);\n  var e = applyMemberDecs(targetClass, memberDecs, instanceBrand, metadata);\n  if (!classDecs.length) defineMetadata(targetClass, metadata);\n  return {\n    e: e,\n    // Lazily apply class decorations so that member init locals can be properly bound.\n    get c() {\n      // The transformer will not emit assignment when there are no class decorators,\n      // so we don\'t have to return an empty array here.\n      var initializers = [];\n      return classDecs.length && [defineMetadata(applyDec(targetClass, [classDecs], classDecsHaveThis, targetClass.name, 5, metadata, initializers), metadata), runInitializers.bind(null, initializers, targetClass)];\n    }\n  };\n}',
    {
      globals: ["TypeError", "Array", "Object", "Error", "Map", "Symbol"],
      locals: { applyDecs2305: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "applyDecs2305",
      dependencies: {
        checkInRHS: [
          "body.0.body.body.4.body.body.3.declarations.0.init.body.body.0.argument.left.callee",
        ],
        setFunctionName: [
          "body.0.body.body.3.body.body.2.consequent.body.2.consequent.body.0.consequent.body.0.expression.right.properties.0.value.callee",
          "body.0.body.body.3.body.body.2.consequent.body.2.consequent.body.1.consequent.body.0.expression.callee",
        ],
        toPropertyKey: [
          "body.0.body.body.4.body.body.6.body.body.11.expression.arguments.3.alternate.callee",
        ],
      },
      internal: false,
    },
  ),

  applyDecs2311: helper(
    "7.24.0",
    '/* @minVersion 7.24.0 */\n/* @mangleFns */\n\n/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion -- `typescript-eslint` complains when using `!` */\n\n\n\n\n/**\n  Basic usage:\n\n  applyDecs(\n    Class,\n    [\n      // member decorators\n      [\n        decs,               // dec, or array of decs, or array of this values and decs\n        0,                  // kind of value being decorated\n        \'prop\',             // name of public prop on class containing the value being decorated,\n        \'#p\',               // the name of the private property (if is private, void 0 otherwise),\n      ]\n    ],\n    [\n      // class decorators\n      dec1, dec2\n    ]\n  )\n  ```\n\n  Fully transpiled example:\n\n  ```js\n  @dec\n  class Class {\n    @dec\n    a = 123;\n\n    @dec\n    #a = 123;\n\n    @dec\n    @dec2\n    accessor b = 123;\n\n    @dec\n    accessor #b = 123;\n\n    @dec\n    c() { console.log(\'c\'); }\n\n    @dec\n    #c() { console.log(\'privC\'); }\n\n    @dec\n    get d() { console.log(\'d\'); }\n\n    @dec\n    get #d() { console.log(\'privD\'); }\n\n    @dec\n    set e(v) { console.log(\'e\'); }\n\n    @dec\n    set #e(v) { console.log(\'privE\'); }\n  }\n\n\n  // becomes\n  let initializeInstance;\n  let initializeClass;\n\n  let initA;\n  let initPrivA;\n\n  let initB;\n  let initPrivB, getPrivB, setPrivB;\n\n  let privC;\n  let privD;\n  let privE;\n\n  let Class;\n  class _Class {\n    static {\n      let ret = applyDecs(\n        this,\n        [\n          [dec, 0, \'a\'],\n          [dec, 0, \'a\', (i) => i.#a, (i, v) => i.#a = v],\n          [[dec, dec2], 1, \'b\'],\n          [dec, 1, \'b\', (i) => i.#privBData, (i, v) => i.#privBData = v],\n          [dec, 2, \'c\'],\n          [dec, 2, \'c\', () => console.log(\'privC\')],\n          [dec, 3, \'d\'],\n          [dec, 3, \'d\', () => console.log(\'privD\')],\n          [dec, 4, \'e\'],\n          [dec, 4, \'e\', () => console.log(\'privE\')],\n        ],\n        [\n          dec\n        ]\n      );\n\n      initA = ret[0];\n\n      initPrivA = ret[1];\n\n      initB = ret[2];\n\n      initPrivB = ret[3];\n      getPrivB = ret[4];\n      setPrivB = ret[5];\n\n      privC = ret[6];\n\n      privD = ret[7];\n\n      privE = ret[8];\n\n      initializeInstance = ret[9];\n\n      Class = ret[10]\n\n      initializeClass = ret[11];\n    }\n\n    a = (initializeInstance(this), initA(this, 123));\n\n    #a = initPrivA(this, 123);\n\n    #bData = initB(this, 123);\n    get b() { return this.#bData }\n    set b(v) { this.#bData = v }\n\n    #privBData = initPrivB(this, 123);\n    get #b() { return getPrivB(this); }\n    set #b(v) { setPrivB(this, v); }\n\n    c() { console.log(\'c\'); }\n\n    #c(...args) { return privC(this, ...args) }\n\n    get d() { console.log(\'d\'); }\n\n    get #d() { return privD(this); }\n\n    set e(v) { console.log(\'e\'); }\n\n    set #e(v) { privE(this, v); }\n  }\n\n  initializeClass(Class);\n */\n\nfunction applyDecs2311(targetClass, classDecs, memberDecs, classDecsHaveThis, instanceBrand, parentClass) {\n  var symbolMetadata = Symbol.metadata || Symbol["for"]("Symbol.metadata");\n  var defineProperty = Object.defineProperty;\n  var create = Object.create;\n  var metadata;\n  // Use both as and satisfies to ensure that we only use non-zero values\n  var existingNonFields = [create(null), create(null)];\n  var hasClassDecs = classDecs.length;\n  // This is a temporary variable for smaller helper size\n  var _;\n  function createRunInitializers(initializers, useStaticThis, hasValue) {\n    return function (thisArg, value) {\n      if (useStaticThis) {\n        value = thisArg;\n        thisArg = targetClass;\n      }\n      for (var i = 0; i < initializers.length; i++) {\n        value = initializers[i].apply(thisArg, hasValue ? [value] : []);\n      }\n      return hasValue ? value : thisArg;\n    };\n  }\n  function assertCallable(fn, hint1, hint2, throwUndefined) {\n    if (typeof fn !== "function") {\n      if (throwUndefined || fn !== void 0) {\n        throw new TypeError(hint1 + " must " + (hint2 || "be") + " a function" + (throwUndefined ? "" : " or undefined"));\n      }\n    }\n    return fn;\n  }\n\n  /* @no-mangle */\n  function applyDec(Class, decInfo, decoratorsHaveThis, name, kind, initializers, ret, isStatic, isPrivate, isField, hasPrivateBrand) {\n    function assertInstanceIfPrivate(target) {\n      if (!hasPrivateBrand(target)) {\n        throw new TypeError("Attempted to access private element on non-instance");\n      }\n    }\n    var decs = [].concat(decInfo[0]),\n      decVal = decInfo[3],\n      isClass = !ret;\n    var isAccessor = kind === 1;\n    var isGetter = kind === 3;\n    var isSetter = kind === 4;\n    var isMethod = kind === 2;\n    function _bindPropCall(name, useStaticThis, before) {\n      return function (_this, value) {\n        if (useStaticThis) {\n          value = _this;\n          _this = Class;\n        }\n        if (before) {\n          before(_this);\n        }\n        // eslint-disable-next-line @typescript-eslint/no-use-before-define\n        return desc[name].call(_this, value);\n      };\n    }\n    if (!isClass) {\n      var desc = {},\n        init = [],\n        key = isGetter ? "get" : isSetter || isAccessor ? "set" : "value";\n      if (isPrivate) {\n        if (isField || isAccessor) {\n          desc = {\n            get: setFunctionName(function () {\n              return decVal(this);\n            }, name, "get"),\n            set: function (value) {\n              decInfo[4](this, value);\n            }\n          };\n        } else {\n          desc[key] = decVal;\n        }\n        if (!isField) {\n          setFunctionName(desc[key], name, isMethod ? "" : key);\n        }\n      } else if (!isField) {\n        desc = Object.getOwnPropertyDescriptor(Class, name);\n      }\n      if (!isField && !isPrivate) {\n        _ = existingNonFields[+isStatic][name];\n        // flag is 1, 3, or 4; kind is 0, 1, 2, 3, or 4\n        // flag ^ kind is 7 if and only if one of them is 3 and the other one is 4.\n        if (_ && (_ ^ kind) !== 7) {\n          throw new Error("Decorating two elements with the same name (" + desc[key].name + ") is not supported yet");\n        }\n        // We use PROP_KIND.ACCESSOR to mark a name as "fully used":\n        // either a get/set pair, or a non-getter/setter.\n        existingNonFields[+isStatic][name] = kind < 3 ? 1 : kind;\n      }\n    }\n    var newValue = Class;\n    for (var i = decs.length - 1; i >= 0; i -= decoratorsHaveThis ? 2 : 1) {\n      var dec = assertCallable(decs[i], "A decorator", "be", true),\n        decThis = decoratorsHaveThis ? decs[i - 1] : void 0;\n      var decoratorFinishedRef = {};\n      var ctx = {\n        kind: ["field", "accessor", "method", "getter", "setter", "class"][kind],\n        name: name,\n        metadata: metadata,\n        addInitializer: function (decoratorFinishedRef, initializer) {\n          if (decoratorFinishedRef.v) {\n            throw new TypeError("attempted to call addInitializer after decoration was finished");\n          }\n          assertCallable(initializer, "An initializer", "be", true);\n          initializers.push(initializer);\n        }.bind(null, decoratorFinishedRef)\n      };\n      if (isClass) {\n        _ = dec.call(decThis, newValue, ctx);\n        decoratorFinishedRef.v = 1;\n        if (assertCallable(_, "class decorators", "return")) {\n          newValue = _;\n        }\n      } else {\n        ctx["static"] = isStatic;\n        ctx["private"] = isPrivate;\n        _ = ctx.access = {\n          has: isPrivate ?\n          // @ts-expect-error no thisArg\n          hasPrivateBrand.bind() : function (target) {\n            return name in target;\n          }\n        };\n        if (!isSetter) {\n          _.get = isPrivate ? isMethod ? function (_this) {\n            assertInstanceIfPrivate(_this);\n            return desc.value;\n          } : _bindPropCall("get", 0, assertInstanceIfPrivate) : function (target) {\n            return target[name];\n          };\n        }\n        if (!isMethod && !isGetter) {\n          _.set = isPrivate ? _bindPropCall("set", 0, assertInstanceIfPrivate) : function (target, v) {\n            target[name] = v;\n          };\n        }\n        newValue = dec.call(decThis, isAccessor ? {\n          get: desc.get,\n          set: desc.set\n        } : desc[key], ctx);\n        decoratorFinishedRef.v = 1;\n        if (isAccessor) {\n          if (typeof newValue === "object" && newValue) {\n            if (_ = assertCallable(newValue.get, "accessor.get")) {\n              desc.get = _;\n            }\n            if (_ = assertCallable(newValue.set, "accessor.set")) {\n              desc.set = _;\n            }\n            if (_ = assertCallable(newValue.init, "accessor.init")) {\n              init.unshift(_);\n            }\n          } else if (newValue !== void 0) {\n            throw new TypeError("accessor decorators must return an object with get, set, or init properties or undefined");\n          }\n        } else if (assertCallable(newValue, (isField ? "field" : "method") + " decorators", "return")) {\n          if (isField) {\n            init.unshift(newValue);\n          } else {\n            desc[key] = newValue;\n          }\n        }\n      }\n    }\n\n    // isField || isAccessor\n    if (kind < 2) {\n      ret.push(\n      // init\n      createRunInitializers(init, isStatic, 1),\n      // init_extra\n      createRunInitializers(initializers, isStatic, 0));\n    }\n    if (!isField && !isClass) {\n      if (isPrivate) {\n        if (isAccessor) {\n          // get and set should be returned before init_extra\n          ret.splice(-1, 0, _bindPropCall("get", isStatic), _bindPropCall("set", isStatic));\n        } else {\n          ret.push(isMethod ? desc[key] :\n          // Equivalent to `Function.call`, just to reduce code size\n          assertCallable.call.bind(desc[key]));\n        }\n      } else {\n        defineProperty(Class, name, desc);\n      }\n    }\n    return newValue;\n  }\n\n  /* @no-mangle */\n  function applyMemberDecs() {\n    var ret = [];\n    var protoInitializers;\n    var staticInitializers;\n    var pushInitializers = function (initializers) {\n      if (initializers) {\n        ret.push(createRunInitializers(initializers));\n      }\n    };\n    var applyMemberDecsOfKind = function (isStatic, isField) {\n      for (var i = 0; i < memberDecs.length; i++) {\n        var decInfo = memberDecs[i];\n        var kind = decInfo[1];\n        var kindOnly = kind & 7;\n        if (\n        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison, eqeqeq\n        (kind & 8) == isStatic &&\n        // @ts-expect-error comparing a boolean with 0 | 1\n        // eslint-disable-next-line eqeqeq\n        !kindOnly == isField) {\n          var name = decInfo[2];\n          var isPrivate = !!decInfo[3];\n          var decoratorsHaveThis = kind & 16;\n          applyDec(isStatic ? targetClass : targetClass.prototype, decInfo, decoratorsHaveThis, isPrivate ? "#" + name : toPropertyKey(name), kindOnly, kindOnly < 2 // isField || isAccessor\n          ? /* fieldInitializers */[] : isStatic ? staticInitializers = staticInitializers || [] : protoInitializers = protoInitializers || [], ret, !!isStatic, isPrivate, isField, isStatic && isPrivate ? function (_) {\n            return checkInRHS(_) === targetClass;\n          } : instanceBrand);\n        }\n      }\n    };\n    applyMemberDecsOfKind(8, 0);\n    applyMemberDecsOfKind(0, 0);\n    applyMemberDecsOfKind(8, 1);\n    applyMemberDecsOfKind(0, 1);\n    pushInitializers(protoInitializers);\n    pushInitializers(staticInitializers);\n    return ret;\n  }\n  function defineMetadata(Class) {\n    return defineProperty(Class, symbolMetadata, {\n      configurable: true,\n      enumerable: true,\n      value: metadata\n    });\n  }\n  if (parentClass !== undefined) {\n    metadata = parentClass[symbolMetadata];\n  }\n  metadata = create(metadata == null ? null : metadata);\n  _ = applyMemberDecs();\n  if (!hasClassDecs) defineMetadata(targetClass);\n  return {\n    e: _,\n    // Lazily apply class decorations so that member init locals can be properly bound.\n    get c() {\n      // The transformer will not emit assignment when there are no class decorators,\n      // so we don\'t have to return an empty array here.\n      var initializers = [];\n      return hasClassDecs && [defineMetadata(targetClass = applyDec(targetClass, [classDecs], classDecsHaveThis, targetClass.name, 5, initializers)), createRunInitializers(initializers, 1)];\n    }\n  };\n}',
    {
      globals: ["Symbol", "Object", "TypeError", "Error", "undefined"],
      locals: { applyDecs2311: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "applyDecs2311",
      dependencies: {
        checkInRHS: [
          "body.0.body.body.10.body.body.4.declarations.0.init.body.body.0.body.body.3.consequent.body.3.expression.arguments.10.consequent.body.body.0.argument.left.callee",
        ],
        setFunctionName: [
          "body.0.body.body.9.body.body.7.consequent.body.1.consequent.body.0.consequent.body.0.expression.right.properties.0.value.callee",
          "body.0.body.body.9.body.body.7.consequent.body.1.consequent.body.1.consequent.body.0.expression.callee",
        ],
        toPropertyKey: [
          "body.0.body.body.10.body.body.4.declarations.0.init.body.body.0.body.body.3.consequent.body.3.expression.arguments.3.alternate.callee",
        ],
      },
      internal: false,
    },
  ),

  arrayLikeToArray: helper(
    "7.9.0",
    "/* @minVersion 7.9.0 */\n\nfunction _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];\n  return arr2;\n}",
    {
      globals: ["Array"],
      locals: { _arrayLikeToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayLikeToArray",
      dependencies: {},
      internal: false,
    },
  ),

  arrayWithHoles: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}",
    {
      globals: ["Array"],
      locals: { _arrayWithHoles: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayWithHoles",
      dependencies: {},
      internal: false,
    },
  ),

  arrayWithoutHoles: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _arrayWithoutHoles(arr) {\n  if (Array.isArray(arr)) return arrayLikeToArray(arr);\n}",
    {
      globals: ["Array"],
      locals: { _arrayWithoutHoles: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_arrayWithoutHoles",
      dependencies: {
        arrayLikeToArray: ["body.0.body.body.0.consequent.argument.callee"],
      },
      internal: false,
    },
  ),

  assertClassBrand: helper(
    "7.24.0",
    '/* @minVersion 7.24.0 */\n\nfunction _assertClassBrand(brand, receiver, returnValue) {\n  if (typeof brand === "function" ? brand === receiver : brand.has(receiver)) {\n    return arguments.length < 3 ? receiver : returnValue;\n  }\n  throw new TypeError("Private element is not present on this object");\n}',
    {
      globals: ["TypeError"],
      locals: { _assertClassBrand: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_assertClassBrand",
      dependencies: {},
      internal: false,
    },
  ),

  assertThisInitialized: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n  return self;\n}",
    {
      globals: ["ReferenceError"],
      locals: { _assertThisInitialized: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_assertThisInitialized",
      dependencies: {},
      internal: false,
    },
  ),

  asyncGeneratorDelegate: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _asyncGeneratorDelegate(inner) {\n  var iter = {},\n    // See the comment in AsyncGenerator to understand what this is.\n    waiting = false;\n  function pump(key, value) {\n    waiting = true;\n    value = new Promise(function (resolve) {\n      resolve(inner[key](value));\n    });\n    return {\n      done: false,\n      value: new OverloadYield(value, /* kind: delegate */1)\n    };\n  }\n  iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () {\n    return this;\n  };\n  iter.next = function (value) {\n    if (waiting) {\n      waiting = false;\n      return value;\n    }\n    return pump("next", value);\n  };\n  if (typeof inner["throw"] === "function") {\n    iter["throw"] = function (value) {\n      if (waiting) {\n        waiting = false;\n        throw value;\n      }\n      return pump("throw", value);\n    };\n  }\n  if (typeof inner["return"] === "function") {\n    iter["return"] = function (value) {\n      if (waiting) {\n        waiting = false;\n        return value;\n      }\n      return pump("return", value);\n    };\n  }\n  return iter;\n}',
    {
      globals: ["Promise", "Symbol"],
      locals: { _asyncGeneratorDelegate: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_asyncGeneratorDelegate",
      dependencies: {
        OverloadYield: [
          "body.0.body.body.1.body.body.2.argument.properties.1.value.callee",
        ],
      },
      internal: false,
    },
  ),

  asyncIterator: helper(
    "7.15.9",
    '/* @minVersion 7.15.9 */\n\nfunction _asyncIterator(iterable) {\n  var method,\n    async,\n    sync,\n    retry = 2;\n  if (typeof Symbol !== "undefined") {\n    async = Symbol.asyncIterator;\n    sync = Symbol.iterator;\n  }\n  while (retry--) {\n    // TypeScript doesn\'t have in-function narrowing, and TypeScript can\'t narrow\n    // AsyncIterable<T> | Iterable<T> down to AsyncIterable<T>. So let\'s use any here.\n    if (async && (method = iterable[async]) != null) {\n      return method.call(iterable);\n    }\n    // Same here, TypeScript can\'t narrow AsyncIterable<T> | Iterable<T> down to Iterable<T>.\n    if (sync && (method = iterable[sync]) != null) {\n      return new AsyncFromSyncIterator(method.call(iterable));\n    }\n    async = "@@asyncIterator";\n    sync = "@@iterator";\n  }\n  throw new TypeError("Object is not async iterable");\n}\n\n// AsyncFromSyncIterator is actually a class that implements AsyncIterator interface\n\n// Actual implementation of AsyncFromSyncIterator starts here\n// class only exists in ES6, so we need to use the old school way\n// This makes ESLint and TypeScript complain a lot, but it\'s the only way\nfunction AsyncFromSyncIterator(s) {\n  // @ts-expect-error - Intentionally overriding the constructor.\n  AsyncFromSyncIterator = function (s) {\n    this.s = s;\n    this.n = s.next;\n  };\n  AsyncFromSyncIterator.prototype = {\n    // Initiating the "s" and "n", use "any" to prevent TS from complaining\n    /* SyncIterator */\n    s: null,\n    /* SyncIterator.[[Next]] */n: null,\n    next: function () {\n      return AsyncFromSyncIteratorContinuation(\n      // Use "arguments" here for better compatibility and smaller bundle size\n      // Itentionally casting "arguments" to an array for the type of func.apply\n      this.n.apply(this.s, arguments));\n    },\n    return: function (value) {\n      var ret = this.s["return"];\n      if (ret === undefined) {\n        return Promise.resolve({\n          // "TReturn | PromiseLike<TReturn>" should have been unwrapped by Awaited<T>,\n          // but TypeScript choked, let\'s just casting it away\n          value: value,\n          done: true\n        });\n      }\n      return AsyncFromSyncIteratorContinuation(ret.apply(this.s,\n      // Use "arguments" here for better compatibility and smaller bundle size\n      // Itentionally casting "arguments" to an array for the type of func.apply\n      arguments));\n    },\n    throw: function (maybeError) {\n      var thr = this.s["return"];\n      if (thr === undefined) {\n        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors\n        return Promise.reject(maybeError);\n      }\n      return AsyncFromSyncIteratorContinuation(\n      // Use "arguments" here for better compatibility and smaller bundle size\n      // Itentionally casting "arguments" to an array for the type of func.apply\n      thr.apply(this.s, arguments));\n    }\n  };\n  function AsyncFromSyncIteratorContinuation(r) {\n    // This step is _before_ calling AsyncFromSyncIteratorContinuation in the spec.\n    if (Object(r) !== r) {\n      return Promise.reject(new TypeError(r + " is not an object."));\n    }\n    var done = r.done;\n    return Promise.resolve(r.value).then(function (value) {\n      return {\n        value: value,\n        done: done\n      };\n    });\n  }\n  return new AsyncFromSyncIterator(s);\n}',
    {
      globals: ["Symbol", "TypeError", "undefined", "Promise", "Object"],
      locals: {
        _asyncIterator: ["body.0.id"],
        AsyncFromSyncIterator: [
          "body.1.id",
          "body.0.body.body.2.body.body.1.consequent.body.0.argument.callee",
          "body.1.body.body.1.expression.left.object",
          "body.1.body.body.3.argument.callee",
          "body.1.body.body.0.expression.left",
        ],
      },
      exportBindingAssignments: [],
      exportName: "_asyncIterator",
      dependencies: {},
      internal: false,
    },
  ),

  asyncToGenerator: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {\n  try {\n    var info = gen[key](arg);\n    var value = info.value;\n  } catch (error) {\n    reject(error);\n    return;\n  }\n  if (info.done) {\n    // The "value" variable is defined above before the "info.done" guard\n    // So TypeScript can\'t narrowing "value" to TReturn here\n    // If we use "info.value" here the type is narrowed correctly.\n    // Still requires manual casting for the smaller bundle size.\n    resolve(value);\n  } else {\n    // Same as above, TypeScript can\'t narrow "value" to TYield here\n    Promise.resolve(value).then(_next, _throw);\n  }\n}\nfunction _asyncToGenerator(fn) {\n  return function () {\n    var self = this,\n      args = arguments;\n    return new Promise(function (resolve, reject) {\n      // Casting "args" to "Args" is intentional since we are trying to avoid the spread operator (not ES5)\n      var gen = fn.apply(self, args);\n      function _next(value) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);\n      }\n      function _throw(err) {\n        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);\n      }\n      _next(undefined);\n    });\n  };\n}',
    {
      globals: ["Promise", "undefined"],
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

  awaitAsyncGenerator: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _awaitAsyncGenerator(value) {\n  return new OverloadYield(value, /* kind: await */0);\n}",
    {
      globals: [],
      locals: { _awaitAsyncGenerator: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_awaitAsyncGenerator",
      dependencies: { OverloadYield: ["body.0.body.body.0.argument.callee"] },
      internal: false,
    },
  ),

  callSuper: helper(
    "7.23.8",
    "/* @minVersion 7.23.8 */\n\n// This is duplicated to packages/babel-plugin-transform-classes/src/inline-callSuper-helpers.ts\n\n\n\n\nfunction _callSuper(_this, derived, args) {\n  // Super\n  derived = getPrototypeOf(derived);\n  return possibleConstructorReturn(_this, isNativeReflectConstruct() ?\n  // NOTE: This doesn't work if this.__proto__.constructor has been modified.\n  Reflect.construct(derived, args || [], getPrototypeOf(_this).constructor) : derived.apply(_this, args));\n}",
    {
      globals: ["Reflect"],
      locals: { _callSuper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_callSuper",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.0.expression.right.callee",
          "body.0.body.body.1.argument.arguments.1.consequent.arguments.2.object.callee",
        ],
        isNativeReflectConstruct: [
          "body.0.body.body.1.argument.arguments.1.test.callee",
        ],
        possibleConstructorReturn: ["body.0.body.body.1.argument.callee"],
      },
      internal: false,
    },
  ),

  checkInRHS: helper(
    "7.20.5",
    '/* @minVersion 7.20.5 */\n\nfunction _checkInRHS(value) {\n  if (Object(value) !== value) {\n    throw TypeError("right-hand side of \'in\' should be an object, got " + (value !== null ? typeof value : "null"));\n  }\n  return value;\n}',
    {
      globals: ["Object", "TypeError"],
      locals: { _checkInRHS: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_checkInRHS",
      dependencies: {},
      internal: false,
    },
  ),

  checkPrivateRedeclaration: helper(
    "7.14.1",
    '/* @minVersion 7.14.1 */\n\nfunction _checkPrivateRedeclaration(obj, privateCollection) {\n  if (privateCollection.has(obj)) {\n    throw new TypeError("Cannot initialize the same private elements twice on an object");\n  }\n}',
    {
      globals: ["TypeError"],
      locals: { _checkPrivateRedeclaration: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_checkPrivateRedeclaration",
      dependencies: {},
      internal: false,
    },
  ),

  classApplyDescriptorDestructureSet: helper(
    "7.13.10",
    '/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\nfunction _classApplyDescriptorDestructureSet(receiver, descriptor) {\n  if (descriptor.set) {\n    if (!("__destrObj" in descriptor)) {\n      descriptor.__destrObj = {\n        set value(v) {\n          descriptor.set.call(receiver, v);\n        }\n      };\n    }\n    return descriptor.__destrObj;\n  } else {\n    if (!descriptor.writable) {\n      // This should only throw in strict mode, but class bodies are\n      // always strict and private fields can only be used inside\n      // class bodies.\n      throw new TypeError("attempted to set read only private field");\n    }\n    return descriptor;\n  }\n}',
    {
      globals: ["TypeError"],
      locals: { _classApplyDescriptorDestructureSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classApplyDescriptorDestructureSet",
      dependencies: {},
      internal: false,
    },
  ),

  classApplyDescriptorGet: helper(
    "7.13.10",
    "/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\nfunction _classApplyDescriptorGet(receiver, descriptor) {\n  if (descriptor.get) {\n    return descriptor.get.call(receiver);\n  }\n  return descriptor.value;\n}",
    {
      globals: [],
      locals: { _classApplyDescriptorGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classApplyDescriptorGet",
      dependencies: {},
      internal: false,
    },
  ),

  classApplyDescriptorSet: helper(
    "7.13.10",
    '/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\nfunction _classApplyDescriptorSet(receiver, descriptor, value) {\n  if (descriptor.set) {\n    descriptor.set.call(receiver, value);\n  } else {\n    if (!descriptor.writable) {\n      // This should only throw in strict mode, but class bodies are\n      // always strict and private fields can only be used inside\n      // class bodies.\n      throw new TypeError("attempted to set read only private field");\n    }\n    descriptor.value = value;\n  }\n}',
    {
      globals: ["TypeError"],
      locals: { _classApplyDescriptorSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classApplyDescriptorSet",
      dependencies: {},
      internal: false,
    },
  ),

  classCallCheck: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError("Cannot call a class as a function");\n  }\n}',
    {
      globals: ["TypeError"],
      locals: { _classCallCheck: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classCallCheck",
      dependencies: {},
      internal: false,
    },
  ),

  classCheckPrivateStaticAccess: helper(
    "7.13.10",
    "/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\n\nfunction _classCheckPrivateStaticAccess(receiver, classConstructor, returnValue) {\n  return assertClassBrand(classConstructor, receiver, returnValue);\n}",
    {
      globals: [],
      locals: { _classCheckPrivateStaticAccess: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classCheckPrivateStaticAccess",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.argument.callee"],
      },
      internal: false,
    },
  ),

  classCheckPrivateStaticFieldDescriptor: helper(
    "7.13.10",
    '/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\nfunction _classCheckPrivateStaticFieldDescriptor(descriptor, action) {\n  if (descriptor === undefined) {\n    throw new TypeError("attempted to " + action + " private static field before its declaration");\n  }\n}',
    {
      globals: ["undefined", "TypeError"],
      locals: { _classCheckPrivateStaticFieldDescriptor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classCheckPrivateStaticFieldDescriptor",
      dependencies: {},
      internal: false,
    },
  ),

  classExtractFieldDescriptor: helper(
    "7.13.10",
    "/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\n\nfunction _classExtractFieldDescriptor(receiver, privateMap) {\n  return classPrivateFieldGet2(privateMap, receiver);\n}",
    {
      globals: [],
      locals: { _classExtractFieldDescriptor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classExtractFieldDescriptor",
      dependencies: {
        classPrivateFieldGet2: ["body.0.body.body.0.argument.callee"],
      },
      internal: false,
    },
  ),

  classNameTDZError: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _classNameTDZError(name) {\n  throw new ReferenceError('Class \"' + name + '\" cannot be referenced in computed property keys.');\n}",
    {
      globals: ["ReferenceError"],
      locals: { _classNameTDZError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classNameTDZError",
      dependencies: {},
      internal: false,
    },
  ),

  classPrivateFieldDestructureSet: helper(
    "7.4.4",
    "/* @minVersion 7.4.4 */\n/* @onlyBabel7 */\n\n\n\nfunction _classPrivateFieldDestructureSet(receiver, privateMap) {\n  var descriptor = classPrivateFieldGet2(privateMap, receiver);\n  return classApplyDescriptorDestructureSet(receiver, descriptor);\n}",
    {
      globals: [],
      locals: { _classPrivateFieldDestructureSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldDestructureSet",
      dependencies: {
        classApplyDescriptorDestructureSet: [
          "body.0.body.body.1.argument.callee",
        ],
        classPrivateFieldGet2: [
          "body.0.body.body.0.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),

  classPrivateFieldGet: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n/* @onlyBabel7 */\n\n\n\nfunction _classPrivateFieldGet(receiver, privateMap) {\n  var descriptor = classPrivateFieldGet2(privateMap, receiver);\n  return classApplyDescriptorGet(receiver, descriptor);\n}",
    {
      globals: [],
      locals: { _classPrivateFieldGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldGet",
      dependencies: {
        classApplyDescriptorGet: ["body.0.body.body.1.argument.callee"],
        classPrivateFieldGet2: [
          "body.0.body.body.0.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),

  classPrivateFieldGet2: helper(
    "7.24.0",
    "/* @minVersion 7.24.0 */\n\n\nfunction _classPrivateFieldGet2(privateMap, receiver) {\n  return privateMap.get(assertClassBrand(privateMap, receiver));\n}",
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

  classPrivateFieldInitSpec: helper(
    "7.14.1",
    "/* @minVersion 7.14.1 */\n\n\nfunction _classPrivateFieldInitSpec(obj, privateMap, value) {\n  checkPrivateRedeclaration(obj, privateMap);\n  privateMap.set(obj, value);\n}",
    {
      globals: [],
      locals: { _classPrivateFieldInitSpec: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldInitSpec",
      dependencies: {
        checkPrivateRedeclaration: ["body.0.body.body.0.expression.callee"],
      },
      internal: false,
    },
  ),

  classPrivateFieldLooseBase: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _classPrivateFieldBase(receiver, privateKey) {\n  if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {\n    throw new TypeError("attempted to use private field on non-instance");\n  }\n  return receiver;\n}',
    {
      globals: ["Object", "TypeError"],
      locals: { _classPrivateFieldBase: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldBase",
      dependencies: {},
      internal: false,
    },
  ),

  classPrivateFieldLooseKey: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nvar id = 0;\nfunction _classPrivateFieldKey(name) {\n  return "__private_" + id++ + "_" + name;\n}',
    {
      globals: [],
      locals: {
        id: [
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

  classPrivateFieldSet: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n/* @onlyBabel7 */\n\n\n\nfunction _classPrivateFieldSet(receiver, privateMap, value) {\n  var descriptor = classPrivateFieldGet2(privateMap, receiver);\n  classApplyDescriptorSet(receiver, descriptor, value);\n  return value;\n}",
    {
      globals: [],
      locals: { _classPrivateFieldSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldSet",
      dependencies: {
        classApplyDescriptorSet: ["body.0.body.body.1.expression.callee"],
        classPrivateFieldGet2: [
          "body.0.body.body.0.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),

  classPrivateFieldSet2: helper(
    "7.24.0",
    "/* @minVersion 7.24.0 */\n\n\nfunction _classPrivateFieldSet2(privateMap, receiver, value) {\n  privateMap.set(assertClassBrand(privateMap, receiver), value);\n  return value;\n}",
    {
      globals: [],
      locals: { _classPrivateFieldSet2: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateFieldSet2",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.expression.arguments.0.callee"],
      },
      internal: false,
    },
  ),

  classPrivateGetter: helper(
    "7.24.0",
    "/* @minVersion 7.24.0 */\n\n\nfunction _classPrivateGetter(privateMap, receiver, getter) {\n  return getter(assertClassBrand(privateMap, receiver));\n}",
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

  classPrivateMethodGet: helper(
    "7.1.6",
    "/* @minVersion 7.1.6 */\n/* @onlyBabel7 */\n\n\nfunction _classPrivateMethodGet(receiver, privateSet, fn) {\n  assertClassBrand(privateSet, receiver);\n  return fn;\n}",
    {
      globals: [],
      locals: { _classPrivateMethodGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateMethodGet",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.expression.callee"],
      },
      internal: false,
    },
  ),

  classPrivateMethodInitSpec: helper(
    "7.14.1",
    "/* @minVersion 7.14.1 */\n\n\nfunction _classPrivateMethodInitSpec(obj, privateSet) {\n  checkPrivateRedeclaration(obj, privateSet);\n  privateSet.add(obj);\n}",
    {
      globals: [],
      locals: { _classPrivateMethodInitSpec: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateMethodInitSpec",
      dependencies: {
        checkPrivateRedeclaration: ["body.0.body.body.0.expression.callee"],
      },
      internal: false,
    },
  ),

  classPrivateMethodSet: helper(
    "7.1.6",
    '/* @minVersion 7.1.6 */\n/* @onlyBabel7 */\n\n// use readOnlyError instead of attemptSet\n\nfunction _classPrivateMethodSet() {\n  throw new TypeError("attempted to reassign private method");\n}',
    {
      globals: ["TypeError"],
      locals: { _classPrivateMethodSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateMethodSet",
      dependencies: {},
      internal: false,
    },
  ),

  classPrivateSetter: helper(
    "7.24.0",
    "/* @minVersion 7.24.0 */\n\n\nfunction _classPrivateSetter(privateMap, setter, receiver, value) {\n  setter(assertClassBrand(privateMap, receiver), value);\n  return value;\n}",
    {
      globals: [],
      locals: { _classPrivateSetter: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classPrivateSetter",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.expression.arguments.0.callee"],
      },
      internal: false,
    },
  ),

  classStaticPrivateFieldDestructureSet: helper(
    "7.13.10",
    '/* @minVersion 7.13.10 */\n/* @onlyBabel7 */\n\n\n\n\nfunction _classStaticPrivateFieldDestructureSet(receiver, classConstructor, descriptor) {\n  assertClassBrand(classConstructor, receiver);\n  classCheckPrivateStaticFieldDescriptor(descriptor, "set");\n  return classApplyDescriptorDestructureSet(receiver, descriptor);\n}',
    {
      globals: [],
      locals: { _classStaticPrivateFieldDestructureSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classStaticPrivateFieldDestructureSet",
      dependencies: {
        classApplyDescriptorDestructureSet: [
          "body.0.body.body.2.argument.callee",
        ],
        assertClassBrand: ["body.0.body.body.0.expression.callee"],
        classCheckPrivateStaticFieldDescriptor: [
          "body.0.body.body.1.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  classStaticPrivateFieldSpecGet: helper(
    "7.0.2",
    '/* @minVersion 7.0.2 */\n/* @onlyBabel7 */\n\n\n\n\nfunction _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) {\n  assertClassBrand(classConstructor, receiver);\n  classCheckPrivateStaticFieldDescriptor(descriptor, "get");\n  return classApplyDescriptorGet(receiver, descriptor);\n}',
    {
      globals: [],
      locals: { _classStaticPrivateFieldSpecGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classStaticPrivateFieldSpecGet",
      dependencies: {
        classApplyDescriptorGet: ["body.0.body.body.2.argument.callee"],
        assertClassBrand: ["body.0.body.body.0.expression.callee"],
        classCheckPrivateStaticFieldDescriptor: [
          "body.0.body.body.1.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  classStaticPrivateFieldSpecSet: helper(
    "7.0.2",
    '/* @minVersion 7.0.2 */\n/* @onlyBabel7 */\n\n\n\n\nfunction _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) {\n  assertClassBrand(classConstructor, receiver);\n  classCheckPrivateStaticFieldDescriptor(descriptor, "set");\n  classApplyDescriptorSet(receiver, descriptor, value);\n  return value;\n}',
    {
      globals: [],
      locals: { _classStaticPrivateFieldSpecSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classStaticPrivateFieldSpecSet",
      dependencies: {
        classApplyDescriptorSet: ["body.0.body.body.2.expression.callee"],
        assertClassBrand: ["body.0.body.body.0.expression.callee"],
        classCheckPrivateStaticFieldDescriptor: [
          "body.0.body.body.1.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  classStaticPrivateMethodGet: helper(
    "7.3.2",
    "/* @minVersion 7.3.2 */\n\n\nfunction _classStaticPrivateMethodGet(receiver, classConstructor, method) {\n  assertClassBrand(classConstructor, receiver);\n  return method;\n}",
    {
      globals: [],
      locals: { _classStaticPrivateMethodGet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classStaticPrivateMethodGet",
      dependencies: {
        assertClassBrand: ["body.0.body.body.0.expression.callee"],
      },
      internal: false,
    },
  ),

  classStaticPrivateMethodSet: helper(
    "7.3.2",
    '/* @minVersion 7.3.2 */\n/* @onlyBabel7 */\n\nfunction _classStaticPrivateMethodSet() {\n  throw new TypeError("attempted to set read only static private field");\n}',
    {
      globals: ["TypeError"],
      locals: { _classStaticPrivateMethodSet: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_classStaticPrivateMethodSet",
      dependencies: {},
      internal: false,
    },
  ),

  construct: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\n\nfunction _construct(Parent, args, Class) {\n  if (isNativeReflectConstruct()) {\n    // Avoid issues with Class being present but undefined when it wasn't\n    // present in the original call.\n    return Reflect.construct.apply(null, arguments);\n  }\n  // NOTE: If Parent !== Class, the correct __proto__ is set *after*\n  //       calling the constructor.\n  var a = [null];\n  a.push.apply(a, args);\n  var instance = new (Parent.bind.apply(Parent, a))();\n  if (Class) setPrototypeOf(instance, Class.prototype);\n  return instance;\n}",
    {
      globals: ["Reflect"],
      locals: { _construct: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_construct",
      dependencies: {
        isNativeReflectConstruct: ["body.0.body.body.0.test.callee"],
        setPrototypeOf: ["body.0.body.body.4.consequent.expression.callee"],
      },
      internal: false,
    },
  ),

  createClass: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if ("value" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);\n  }\n}\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  Object.defineProperty(Constructor, "prototype", {\n    writable: false\n  });\n  return Constructor;\n}',
    {
      globals: ["Object"],
      locals: {
        _defineProperties: [
          "body.0.id",
          "body.1.body.body.0.consequent.expression.callee",
          "body.1.body.body.1.consequent.expression.callee",
        ],
        _createClass: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_createClass",
      dependencies: {
        toPropertyKey: [
          "body.0.body.body.0.body.body.4.expression.arguments.1.callee",
        ],
      },
      internal: false,
    },
  ),

  createForOfIteratorHelper: helper(
    "7.9.0",
    '/* @minVersion 7.9.0 */\n\n\nfunction _createForOfIteratorHelper(o, allowArrayLike) {\n  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];\n  if (!it) {\n    // Fallback for engines without symbol support\n    if (Array.isArray(o) || (\n    // union type doesn\'t work with function overload, have to use "as any".\n    it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {\n      if (it) o = it;\n      var i = 0;\n      var F = function () {};\n      return {\n        s: F,\n        n: function () {\n          // After "Array.isArray" check, unsupportedIterableToArray to array, and allow arraylike\n          // o is sure to be an array or arraylike, but TypeScript doesn\'t know that\n          if (i >= o.length) {\n            // explicit missing the "value" (undefined) to reduce the bundle size\n            return {\n              done: true\n            };\n          }\n          return {\n            done: false,\n            value: o[i++]\n          };\n        },\n        e: function (e) {\n          throw e;\n        },\n        f: F\n      };\n    }\n    throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");\n  }\n  var normalCompletion = true,\n    didErr = false,\n    err;\n\n  // "it" is being reassigned multiple times to reduce the variables (bundle size)\n  // thus TypeScript can\'t infer the correct type of the "it"\n  return {\n    s: function () {\n      it = it.call(o);\n    },\n    n: function () {\n      var step = it.next();\n      normalCompletion = step.done;\n      return step;\n    },\n    e: function (e) {\n      didErr = true;\n      err = e;\n    },\n    f: function () {\n      try {\n        if (!normalCompletion && it["return"] != null) {\n          it["return"]();\n        }\n      } finally {\n        // eslint-disable-next-line no-unsafe-finally\n        if (didErr) throw err;\n      }\n    }\n  };\n}',
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

  createForOfIteratorHelperLoose: helper(
    "7.9.0",
    '/* @minVersion 7.9.0 */\n\n\nfunction _createForOfIteratorHelperLoose(o, allowArrayLike) {\n  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];\n  if (it) return (it = it.call(o)).next.bind(it);\n\n  // Fallback for engines without symbol support\n  if (Array.isArray(o) || (\n  // union type doesn\'t work with function overload, have to use "as any".\n  it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {\n    if (it) o = it;\n    var i = 0;\n    return function () {\n      // After "Array.isArray" check, unsupportedIterableToArray to array, and allow arraylike\n      // o is sure to be an array or arraylike, but TypeScript doesn\'t know that\n      if (i >= o.length) {\n        // explicit missing the "value" (undefined) to reduce the bundle size\n        return {\n          done: true\n        };\n      }\n      return {\n        done: false,\n        value: o[i++]\n      };\n    };\n  }\n  throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");\n}',
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

  createSuper: helper(
    "7.9.0",
    "/* @minVersion 7.9.0 */\n\n\n\n\nfunction _createSuper(Derived) {\n  var hasNativeReflectConstruct = isNativeReflectConstruct();\n  return function _createSuperInternal() {\n    var Super = getPrototypeOf(Derived),\n      result;\n    if (hasNativeReflectConstruct) {\n      // NOTE: This doesn't work if this.__proto__.constructor has been modified.\n      var NewTarget = getPrototypeOf(this).constructor;\n      result = Reflect.construct(Super, arguments, NewTarget);\n    } else {\n      result = Super.apply(this, arguments);\n    }\n    return possibleConstructorReturn(this, result);\n  };\n}",
    {
      globals: ["Reflect"],
      locals: { _createSuper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_createSuper",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.1.argument.body.body.0.declarations.0.init.callee",
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

  decorate: helper(
    "7.1.5",
    '/* @minVersion 7.1.5 */\n\n// TODO: Only Babel 7\n\n\n\n\n/*::\n  type PropertyDescriptor =\n    | {\n        value: any,\n        writable: boolean,\n        configurable: boolean,\n        enumerable: boolean,\n      }\n    | {\n        get?: () => any,\n        set?: (v: any) => void,\n        configurable: boolean,\n        enumerable: boolean,\n      };\n\n  type FieldDescriptor ={\n    writable: boolean,\n    configurable: boolean,\n    enumerable: boolean,\n  };\n\n  type Placement = "static" | "prototype" | "own";\n  type Key = string | symbol; // PrivateName is not supported yet.\n\n  type ElementDescriptor =\n    | {\n        kind: "method",\n        key: Key,\n        placement: Placement,\n        descriptor: PropertyDescriptor\n      }\n    | {\n        kind: "field",\n        key: Key,\n        placement: Placement,\n        descriptor: FieldDescriptor,\n        initializer?: () => any,\n      };\n\n  // This is exposed to the user code\n  type ElementObjectInput = ElementDescriptor & {\n    [@@toStringTag]?: "Descriptor"\n  };\n\n  // This is exposed to the user code\n  type ElementObjectOutput = ElementDescriptor & {\n    [@@toStringTag]?: "Descriptor"\n    extras?: ElementDescriptor[],\n    finisher?: ClassFinisher,\n  };\n\n  // This is exposed to the user code\n  type ClassObject = {\n    [@@toStringTag]?: "Descriptor",\n    kind: "class",\n    elements: ElementDescriptor[],\n  };\n\n  type ElementDecorator = (descriptor: ElementObjectInput) => ?ElementObjectOutput;\n  type ClassDecorator = (descriptor: ClassObject) => ?ClassObject;\n  type ClassFinisher = <A, B>(cl: Class<A>) => Class<B>;\n\n  // Only used by Babel in the transform output, not part of the spec.\n  type ElementDefinition =\n    | {\n        kind: "method",\n        value: any,\n        key: Key,\n        static?: boolean,\n        decorators?: ElementDecorator[],\n      }\n    | {\n        kind: "field",\n        value: () => any,\n        key: Key,\n        static?: boolean,\n        decorators?: ElementDecorator[],\n    };\n\n  declare function ClassFactory<C>(initialize: (instance: C) => void): {\n    F: Class<C>,\n    d: ElementDefinition[]\n  }\n\n  */\n\n/*::\n  // Various combinations with/without extras and with one or many finishers\n\n  type ElementFinisherExtras = {\n    element: ElementDescriptor,\n    finisher?: ClassFinisher,\n    extras?: ElementDescriptor[],\n  };\n\n  type ElementFinishersExtras = {\n    element: ElementDescriptor,\n    finishers: ClassFinisher[],\n    extras: ElementDescriptor[],\n  };\n\n  type ElementsFinisher = {\n    elements: ElementDescriptor[],\n    finisher?: ClassFinisher,\n  };\n\n  type ElementsFinishers = {\n    elements: ElementDescriptor[],\n    finishers: ClassFinisher[],\n  };\n\n  */\n\n/*::\n\n  type Placements = {\n    static: Key[],\n    prototype: Key[],\n    own: Key[],\n  };\n\n  */\n\n// ClassDefinitionEvaluation (Steps 26-*)\nfunction _decorate(decorators /*: ClassDecorator[] */, factory /*: ClassFactory */, superClass /*: ?Class<*> */, mixins /*: ?Array<Function> */) /*: Class<*> */{\n  var api = _getDecoratorsApi();\n  if (mixins) {\n    for (var i = 0; i < mixins.length; i++) {\n      api = mixins[i](api);\n    }\n  }\n  var r = factory(function initialize(O) {\n    api.initializeInstanceElements(O, decorated.elements);\n  }, superClass);\n  var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators);\n  api.initializeClassElements(r.F, decorated.elements);\n  return api.runClassFinishers(r.F, decorated.finishers);\n}\nfunction _getDecoratorsApi() {\n  _getDecoratorsApi = function () {\n    return api;\n  };\n  var api = {\n    elementsDefinitionOrder: [["method"], ["field"]],\n    // InitializeInstanceElements\n    initializeInstanceElements: function (/*::<C>*/O /*: C */, elements /*: ElementDescriptor[] */) {\n      ["method", "field"].forEach(function (kind) {\n        elements.forEach(function (element /*: ElementDescriptor */) {\n          if (element.kind === kind && element.placement === "own") {\n            this.defineClassElement(O, element);\n          }\n        }, this);\n      }, this);\n    },\n    // InitializeClassElements\n    initializeClassElements: function (/*::<C>*/F /*: Class<C> */, elements /*: ElementDescriptor[] */) {\n      var proto = F.prototype;\n      ["method", "field"].forEach(function (kind) {\n        elements.forEach(function (element /*: ElementDescriptor */) {\n          var placement = element.placement;\n          if (element.kind === kind && (placement === "static" || placement === "prototype")) {\n            var receiver = placement === "static" ? F : proto;\n            this.defineClassElement(receiver, element);\n          }\n        }, this);\n      }, this);\n    },\n    // DefineClassElement\n    defineClassElement: function (/*::<C>*/receiver /*: C | Class<C> */, element /*: ElementDescriptor */) {\n      var descriptor /*: PropertyDescriptor */ = element.descriptor;\n      if (element.kind === "field") {\n        var initializer = element.initializer;\n        descriptor = {\n          enumerable: descriptor.enumerable,\n          writable: descriptor.writable,\n          configurable: descriptor.configurable,\n          value: initializer === void 0 ? void 0 : initializer.call(receiver)\n        };\n      }\n      Object.defineProperty(receiver, element.key, descriptor);\n    },\n    // DecorateClass\n    decorateClass: function (elements /*: ElementDescriptor[] */, decorators /*: ClassDecorator[] */) /*: ElementsFinishers */{\n      var newElements /*: ElementDescriptor[] */ = [];\n      var finishers /*: ClassFinisher[] */ = [];\n      var placements /*: Placements */ = {\n        static: [],\n        prototype: [],\n        own: []\n      };\n      elements.forEach(function (element /*: ElementDescriptor */) {\n        this.addElementPlacement(element, placements);\n      }, this);\n      elements.forEach(function (element /*: ElementDescriptor */) {\n        if (!_hasDecorators(element)) return newElements.push(element);\n        var elementFinishersExtras /*: ElementFinishersExtras */ = this.decorateElement(element, placements);\n        newElements.push(elementFinishersExtras.element);\n        newElements.push.apply(newElements, elementFinishersExtras.extras);\n        finishers.push.apply(finishers, elementFinishersExtras.finishers);\n      }, this);\n      if (!decorators) {\n        return {\n          elements: newElements,\n          finishers: finishers\n        };\n      }\n      var result /*: ElementsFinishers */ = this.decorateConstructor(newElements, decorators);\n      finishers.push.apply(finishers, result.finishers);\n      result.finishers = finishers;\n      return result;\n    },\n    // AddElementPlacement\n    addElementPlacement: function (element /*: ElementDescriptor */, placements /*: Placements */, silent /*: boolean */) {\n      var keys = placements[element.placement];\n      if (!silent && keys.indexOf(element.key) !== -1) {\n        throw new TypeError("Duplicated element (" + element.key + ")");\n      }\n      keys.push(element.key);\n    },\n    // DecorateElement\n    decorateElement: function (element /*: ElementDescriptor */, placements /*: Placements */) /*: ElementFinishersExtras */{\n      var extras /*: ElementDescriptor[] */ = [];\n      var finishers /*: ClassFinisher[] */ = [];\n      for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) {\n        // (inlined) RemoveElementPlacement\n        var keys = placements[element.placement];\n        keys.splice(keys.indexOf(element.key), 1);\n        var elementObject /*: ElementObjectInput */ = this.fromElementDescriptor(element);\n        var elementFinisherExtras /*: ElementFinisherExtras */ = this.toElementFinisherExtras((0, decorators[i])(elementObject) /*: ElementObjectOutput */ || elementObject);\n        element = elementFinisherExtras.element;\n        this.addElementPlacement(element, placements);\n        if (elementFinisherExtras.finisher) {\n          finishers.push(elementFinisherExtras.finisher);\n        }\n        var newExtras /*: ElementDescriptor[] | void */ = elementFinisherExtras.extras;\n        if (newExtras) {\n          for (var j = 0; j < newExtras.length; j++) {\n            this.addElementPlacement(newExtras[j], placements);\n          }\n          extras.push.apply(extras, newExtras);\n        }\n      }\n      return {\n        element: element,\n        finishers: finishers,\n        extras: extras\n      };\n    },\n    // DecorateConstructor\n    decorateConstructor: function (elements /*: ElementDescriptor[] */, decorators /*: ClassDecorator[] */) /*: ElementsFinishers */{\n      var finishers /*: ClassFinisher[] */ = [];\n      for (var i = decorators.length - 1; i >= 0; i--) {\n        var obj /*: ClassObject */ = this.fromClassDescriptor(elements);\n        var elementsAndFinisher /*: ElementsFinisher */ = this.toClassDescriptor((0, decorators[i])(obj) /*: ClassObject */ || obj);\n        if (elementsAndFinisher.finisher !== undefined) {\n          finishers.push(elementsAndFinisher.finisher);\n        }\n        if (elementsAndFinisher.elements !== undefined) {\n          elements = elementsAndFinisher.elements;\n          for (var j = 0; j < elements.length - 1; j++) {\n            for (var k = j + 1; k < elements.length; k++) {\n              if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) {\n                throw new TypeError("Duplicated element (" + elements[j].key + ")");\n              }\n            }\n          }\n        }\n      }\n      return {\n        elements: elements,\n        finishers: finishers\n      };\n    },\n    // FromElementDescriptor\n    fromElementDescriptor: function (element /*: ElementDescriptor */) /*: ElementObject */{\n      var obj /*: ElementObject */ = {\n        kind: element.kind,\n        key: element.key,\n        placement: element.placement,\n        descriptor: element.descriptor\n      };\n      var desc = {\n        value: "Descriptor",\n        configurable: true\n      };\n      Object.defineProperty(obj, Symbol.toStringTag, desc);\n      if (element.kind === "field") obj.initializer = element.initializer;\n      return obj;\n    },\n    // ToElementDescriptors\n    toElementDescriptors: function (elementObjects /*: ElementObject[] */) /*: ElementDescriptor[] */{\n      if (elementObjects === undefined) return;\n      return toArray(elementObjects).map(function (elementObject) {\n        var element = this.toElementDescriptor(elementObject);\n        this.disallowProperty(elementObject, "finisher", "An element descriptor");\n        this.disallowProperty(elementObject, "extras", "An element descriptor");\n        return element;\n      }, this);\n    },\n    // ToElementDescriptor\n    toElementDescriptor: function (elementObject /*: ElementObject */) /*: ElementDescriptor */{\n      var kind = String(elementObject.kind);\n      if (kind !== "method" && kind !== "field") {\n        throw new TypeError(\'An element descriptor\\\'s .kind property must be either "method" or\' + \' "field", but a decorator created an element descriptor with\' + \' .kind "\' + kind + \'"\');\n      }\n      var key = toPropertyKey(elementObject.key);\n      var placement = String(elementObject.placement);\n      if (placement !== "static" && placement !== "prototype" && placement !== "own") {\n        throw new TypeError(\'An element descriptor\\\'s .placement property must be one of "static",\' + \' "prototype" or "own", but a decorator created an element descriptor\' + \' with .placement "\' + placement + \'"\');\n      }\n      var descriptor /*: PropertyDescriptor */ = elementObject.descriptor;\n      this.disallowProperty(elementObject, "elements", "An element descriptor");\n      var element /*: ElementDescriptor */ = {\n        kind: kind,\n        key: key,\n        placement: placement,\n        descriptor: Object.assign({}, descriptor)\n      };\n      if (kind !== "field") {\n        this.disallowProperty(elementObject, "initializer", "A method descriptor");\n      } else {\n        this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor");\n        this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor");\n        this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor");\n        element.initializer = elementObject.initializer;\n      }\n      return element;\n    },\n    toElementFinisherExtras: function (elementObject /*: ElementObject */) /*: ElementFinisherExtras */{\n      var element /*: ElementDescriptor */ = this.toElementDescriptor(elementObject);\n      var finisher /*: ClassFinisher */ = _optionalCallableProperty(elementObject, "finisher");\n      var extras /*: ElementDescriptors[] */ = this.toElementDescriptors(elementObject.extras);\n      return {\n        element: element,\n        finisher: finisher,\n        extras: extras\n      };\n    },\n    // FromClassDescriptor\n    fromClassDescriptor: function (elements /*: ElementDescriptor[] */) /*: ClassObject */{\n      var obj = {\n        kind: "class",\n        elements: elements.map(this.fromElementDescriptor, this)\n      };\n      var desc = {\n        value: "Descriptor",\n        configurable: true\n      };\n      Object.defineProperty(obj, Symbol.toStringTag, desc);\n      return obj;\n    },\n    // ToClassDescriptor\n    toClassDescriptor: function (obj /*: ClassObject */) /*: ElementsFinisher */{\n      var kind = String(obj.kind);\n      if (kind !== "class") {\n        throw new TypeError(\'A class descriptor\\\'s .kind property must be "class", but a decorator\' + \' created a class descriptor with .kind "\' + kind + \'"\');\n      }\n      this.disallowProperty(obj, "key", "A class descriptor");\n      this.disallowProperty(obj, "placement", "A class descriptor");\n      this.disallowProperty(obj, "descriptor", "A class descriptor");\n      this.disallowProperty(obj, "initializer", "A class descriptor");\n      this.disallowProperty(obj, "extras", "A class descriptor");\n      var finisher = _optionalCallableProperty(obj, "finisher");\n      var elements = this.toElementDescriptors(obj.elements);\n      return {\n        elements: elements,\n        finisher: finisher\n      };\n    },\n    // RunClassFinishers\n    runClassFinishers: function (constructor /*: Class<*> */, finishers /*: ClassFinisher[] */) /*: Class<*> */{\n      for (var i = 0; i < finishers.length; i++) {\n        var newConstructor /*: ?Class<*> */ = (0, finishers[i])(constructor);\n        if (newConstructor !== undefined) {\n          // NOTE: This should check if IsConstructor(newConstructor) is false.\n          if (typeof newConstructor !== "function") {\n            throw new TypeError("Finishers must return a constructor.");\n          }\n          constructor = newConstructor;\n        }\n      }\n      return constructor;\n    },\n    disallowProperty: function (obj, name, objectType) {\n      if (obj[name] !== undefined) {\n        throw new TypeError(objectType + " can\'t have a ." + name + " property.");\n      }\n    }\n  };\n  return api;\n}\n\n// ClassElementEvaluation\nfunction _createElementDescriptor(def /*: ElementDefinition */) /*: ElementDescriptor */{\n  var key = toPropertyKey(def.key);\n  var descriptor /*: PropertyDescriptor */;\n  if (def.kind === "method") {\n    descriptor = {\n      value: def.value,\n      writable: true,\n      configurable: true,\n      enumerable: false\n    };\n  } else if (def.kind === "get") {\n    descriptor = {\n      get: def.value,\n      configurable: true,\n      enumerable: false\n    };\n  } else if (def.kind === "set") {\n    descriptor = {\n      set: def.value,\n      configurable: true,\n      enumerable: false\n    };\n  } else if (def.kind === "field") {\n    descriptor = {\n      configurable: true,\n      writable: true,\n      enumerable: true\n    };\n  }\n  var element /*: ElementDescriptor */ = {\n    kind: def.kind === "field" ? "field" : "method",\n    key: key,\n    placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype",\n    descriptor: descriptor\n  };\n  if (def.decorators) element.decorators = def.decorators;\n  if (def.kind === "field") element.initializer = def.value;\n  return element;\n}\n\n// CoalesceGetterSetter\nfunction _coalesceGetterSetter(element /*: ElementDescriptor */, other /*: ElementDescriptor */) {\n  if (element.descriptor.get !== undefined) {\n    other.descriptor.get = element.descriptor.get;\n  } else {\n    other.descriptor.set = element.descriptor.set;\n  }\n}\n\n// CoalesceClassElements\nfunction _coalesceClassElements(elements /*: ElementDescriptor[] */) /*: ElementDescriptor[] */{\n  var newElements /*: ElementDescriptor[] */ = [];\n  var isSameElement = function (other /*: ElementDescriptor */) /*: boolean */{\n    return other.kind === "method" && other.key === element.key && other.placement === element.placement;\n  };\n  for (var i = 0; i < elements.length; i++) {\n    var element /*: ElementDescriptor */ = elements[i];\n    var other /*: ElementDescriptor */;\n    if (element.kind === "method" && (other = newElements.find(isSameElement))) {\n      if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) {\n        if (_hasDecorators(element) || _hasDecorators(other)) {\n          throw new ReferenceError("Duplicated methods (" + element.key + ") can\'t be decorated.");\n        }\n        other.descriptor = element.descriptor;\n      } else {\n        if (_hasDecorators(element)) {\n          if (_hasDecorators(other)) {\n            throw new ReferenceError("Decorators can\'t be placed on different accessors with for " + "the same property (" + element.key + ").");\n          }\n          other.decorators = element.decorators;\n        }\n        _coalesceGetterSetter(element, other);\n      }\n    } else {\n      newElements.push(element);\n    }\n  }\n  return newElements;\n}\nfunction _hasDecorators(element /*: ElementDescriptor */) /*: boolean */{\n  return element.decorators && element.decorators.length;\n}\nfunction _isDataDescriptor(desc /*: PropertyDescriptor */) /*: boolean */{\n  return desc !== undefined && !(desc.value === undefined && desc.writable === undefined);\n}\nfunction _optionalCallableProperty /*::<T>*/(obj /*: T */, name /*: $Keys<T> */) /*: ?Function */{\n  var value = obj[name];\n  if (value !== undefined && typeof value !== "function") {\n    throw new TypeError("Expected \'" + name + "\' to be a function");\n  }\n  return value;\n}',
    {
      globals: [
        "Object",
        "TypeError",
        "undefined",
        "Symbol",
        "String",
        "ReferenceError",
      ],
      locals: {
        _decorate: ["body.0.id"],
        _getDecoratorsApi: [
          "body.1.id",
          "body.0.body.body.0.declarations.0.init.callee",
          "body.1.body.body.0.expression.left",
        ],
        _createElementDescriptor: [
          "body.2.id",
          "body.0.body.body.3.declarations.0.init.arguments.0.arguments.0.arguments.0",
        ],
        _coalesceGetterSetter: [
          "body.3.id",
          "body.4.body.body.2.body.body.2.consequent.body.0.alternate.body.1.expression.callee",
        ],
        _coalesceClassElements: [
          "body.4.id",
          "body.0.body.body.3.declarations.0.init.arguments.0.callee",
        ],
        _hasDecorators: [
          "body.5.id",
          "body.1.body.body.1.declarations.0.init.properties.4.value.body.body.4.expression.arguments.0.body.body.0.test.argument.callee",
          "body.4.body.body.2.body.body.2.consequent.body.0.consequent.body.0.test.left.callee",
          "body.4.body.body.2.body.body.2.consequent.body.0.consequent.body.0.test.right.callee",
          "body.4.body.body.2.body.body.2.consequent.body.0.alternate.body.0.test.callee",
          "body.4.body.body.2.body.body.2.consequent.body.0.alternate.body.0.consequent.body.0.test.callee",
        ],
        _isDataDescriptor: [
          "body.6.id",
          "body.4.body.body.2.body.body.2.consequent.body.0.test.left.callee",
          "body.4.body.body.2.body.body.2.consequent.body.0.test.right.callee",
        ],
        _optionalCallableProperty: [
          "body.7.id",
          "body.1.body.body.1.declarations.0.init.properties.11.value.body.body.1.declarations.0.init.callee",
          "body.1.body.body.1.declarations.0.init.properties.13.value.body.body.7.declarations.0.init.callee",
        ],
      },
      exportBindingAssignments: [],
      exportName: "_decorate",
      dependencies: {
        toArray: [
          "body.1.body.body.1.declarations.0.init.properties.9.value.body.body.1.argument.callee.object.callee",
        ],
        toPropertyKey: [
          "body.1.body.body.1.declarations.0.init.properties.10.value.body.body.2.declarations.0.init.callee",
          "body.2.body.body.0.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),

  defaults: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _defaults(obj, defaults) {\n  for (var keys = Object.getOwnPropertyNames(defaults), i = 0; i < keys.length; i++) {\n    var key = keys[i],\n      value = Object.getOwnPropertyDescriptor(defaults, key);\n    if (value && value.configurable && obj[key] === undefined) {\n      Object.defineProperty(obj, key, value);\n    }\n  }\n  return obj;\n}",
    {
      globals: ["Object", "undefined"],
      locals: { _defaults: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defaults",
      dependencies: {},
      internal: false,
    },
  ),

  defineAccessor: helper(
    "7.20.7",
    "/* @minVersion 7.20.7 */\n\nfunction _defineAccessor(type, obj, key, fn) {\n  var desc = {\n    configurable: true,\n    enumerable: true\n  };\n  desc[type] = fn;\n  return Object.defineProperty(obj, key, desc);\n}",
    {
      globals: ["Object"],
      locals: { _defineAccessor: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defineAccessor",
      dependencies: {},
      internal: false,
    },
  ),

  defineEnumerableProperties: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n/* @onlyBabel7 */\nfunction _defineEnumerableProperties(obj, descs) {\n  // eslint-disable-next-line guard-for-in\n  for (var key in descs) {\n    var desc = descs[key];\n    desc.configurable = desc.enumerable = true;\n    if ("value" in desc) desc.writable = true;\n    Object.defineProperty(obj, key, desc);\n  }\n\n  // Symbols are not enumerated over by for-in loops. If native\n  // Symbols are available, fetch all of the descs object\'s own\n  // symbol properties and define them on our target object too.\n  if (Object.getOwnPropertySymbols) {\n    var objectSymbols = Object.getOwnPropertySymbols(descs);\n    for (var i = 0; i < objectSymbols.length; i++) {\n      var sym = objectSymbols[i];\n      desc = descs[sym];\n      desc.configurable = desc.enumerable = true;\n      if ("value" in desc) desc.writable = true;\n      Object.defineProperty(obj, sym, desc);\n    }\n  }\n  return obj;\n}',
    {
      globals: ["Object"],
      locals: { _defineEnumerableProperties: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defineEnumerableProperties",
      dependencies: {},
      internal: false,
    },
  ),

  defineProperty: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _defineProperty(obj, key, value) {\n  key = toPropertyKey(key);\n  // Shortcircuit the slow defineProperty path when possible.\n  // We are trying to avoid issues where setters defined on the\n  // prototype cause side effects under the fast path of simple\n  // assignment. By checking for existence of the property with\n  // the in operator, we can optimize most of this overhead away.\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    // @ts-expect-error - Explicitly assigning to generic type key\n    obj[key] = value;\n  }\n  return obj;\n}",
    {
      globals: ["Object"],
      locals: { _defineProperty: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_defineProperty",
      dependencies: {
        toPropertyKey: ["body.0.body.body.0.expression.right.callee"],
      },
      internal: false,
    },
  ),

  dispose: helper(
    "7.22.0",
    '/* @minVersion 7.22.0 */\n/* @onlyBabel7 */\n\nfunction dispose_SuppressedError(error, suppressed) {\n  if (typeof SuppressedError !== "undefined") {\n    // eslint-disable-next-line no-undef\n    dispose_SuppressedError = SuppressedError;\n  } else {\n    dispose_SuppressedError = function SuppressedError(error, suppressed) {\n      this.suppressed = suppressed;\n      this.error = error;\n      this.stack = new Error().stack;\n    };\n    dispose_SuppressedError.prototype = Object.create(Error.prototype, {\n      constructor: {\n        value: dispose_SuppressedError,\n        writable: true,\n        configurable: true\n      }\n    });\n  }\n  return new dispose_SuppressedError(error, suppressed);\n}\nfunction _dispose(stack, error, hasError) {\n  function next() {\n    while (stack.length > 0) {\n      try {\n        var r = stack.pop();\n        var p = r.d.call(r.v);\n        if (r.a) return Promise.resolve(p).then(next, err);\n      } catch (e) {\n        return err(e);\n      }\n    }\n    if (hasError) throw error;\n  }\n  function err(e) {\n    error = hasError ? new dispose_SuppressedError(error, e) : e;\n    hasError = true;\n    return next();\n  }\n  return next();\n}',
    {
      globals: ["SuppressedError", "Error", "Object", "Promise"],
      locals: {
        dispose_SuppressedError: [
          "body.0.id",
          "body.0.body.body.0.alternate.body.1.expression.left.object",
          "body.0.body.body.0.alternate.body.1.expression.right.arguments.1.properties.0.value.properties.0.value",
          "body.0.body.body.1.argument.callee",
          "body.1.body.body.1.body.body.0.expression.right.consequent.callee",
          "body.0.body.body.0.consequent.body.0.expression.left",
          "body.0.body.body.0.alternate.body.0.expression.left",
        ],
        _dispose: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_dispose",
      dependencies: {},
      internal: false,
    },
  ),

  extends: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _extends() {\n  // @ts-expect-error explicitly assign to function\n  _extends = Object.assign ?\n  // need a bind because https://github.com/babel/babel/issues/14527\n  // @ts-expect-error -- intentionally omitting the argument\n  Object.assign.bind(/* undefined */) : function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n    return target;\n  };\n  return _extends.apply(null, arguments);\n}",
    {
      globals: ["Object"],
      locals: {
        _extends: [
          "body.0.id",
          "body.0.body.body.1.argument.callee.object",
          "body.0.body.body.0.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.expression"],
      exportName: "_extends",
      dependencies: {},
      internal: false,
    },
  ),

  get: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\n\n// https://tc39.es/ecma262/multipage/reflection.html#sec-reflect.get\n//\n//  28.1ak.5 Reflect.get ( target, propertyKey [ , receiver ] )\n\nfunction _get() {\n  if (typeof Reflect !== "undefined" && Reflect.get) {\n    // need a bind because https://github.com/babel/babel/issues/14527\n    // @ts-expect-error function reassign\n    _get = Reflect.get.bind(/* undefined */);\n  } else {\n    // @ts-expect-error function reassign\n    _get = function _get(target, property, receiver) {\n      var base = superPropBase(target, property);\n      if (!base) return;\n      var desc = Object.getOwnPropertyDescriptor(base, property);\n      if (desc.get) {\n        // STEP 3. If receiver is not present, then set receiver to target.\n        return desc.get.call(arguments.length < 3 ? target : receiver);\n      }\n      return desc.value;\n    };\n  }\n  return _get.apply(null, arguments);\n}',
    {
      globals: ["Reflect", "Object"],
      locals: {
        _get: [
          "body.0.id",
          "body.0.body.body.1.argument.callee.object",
          "body.0.body.body.0.consequent.body.0.expression.left",
          "body.0.body.body.0.alternate.body.0.expression.left",
        ],
      },
      exportBindingAssignments: [
        "body.0.body.body.0.alternate.body.0.expression",
        "body.0.body.body.0.consequent.body.0.expression",
      ],
      exportName: "_get",
      dependencies: {
        superPropBase: [
          "body.0.body.body.0.alternate.body.0.expression.right.body.body.0.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),

  getPrototypeOf: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _getPrototypeOf(o) {\n  // @ts-expect-error explicitly assign to function\n  _getPrototypeOf = Object.setPrototypeOf ?\n  // @ts-expect-error -- intentionally omitting the argument\n  Object.getPrototypeOf.bind(/* undefined */) : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}",
    {
      globals: ["Object"],
      locals: {
        _getPrototypeOf: [
          "body.0.id",
          "body.0.body.body.1.argument.callee",
          "body.0.body.body.0.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.expression"],
      exportName: "_getPrototypeOf",
      dependencies: {},
      internal: false,
    },
  ),

  identity: helper(
    "7.17.0",
    "/* @minVersion 7.17.0 */\n\nfunction _identity(x) {\n  return x;\n}",
    {
      globals: [],
      locals: { _identity: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_identity",
      dependencies: {},
      internal: false,
    },
  ),

  importDeferProxy: helper(
    "7.23.0",
    "/* @minVersion 7.23.0 */\n\nfunction _importDeferProxy(init) {\n  var ns = null;\n  var constValue = function (v) {\n    return function () {\n      return v;\n    };\n  };\n  var proxy = function (run) {\n    return function (_target, p, receiver) {\n      if (ns === null) ns = init();\n      return run(ns, p, receiver);\n    };\n  };\n  return new Proxy({}, {\n    defineProperty: constValue(false),\n    deleteProperty: constValue(false),\n    get: proxy(Reflect.get),\n    getOwnPropertyDescriptor: proxy(Reflect.getOwnPropertyDescriptor),\n    getPrototypeOf: constValue(null),\n    isExtensible: constValue(false),\n    has: proxy(Reflect.has),\n    ownKeys: proxy(Reflect.ownKeys),\n    preventExtensions: constValue(true),\n    set: constValue(false),\n    setPrototypeOf: constValue(false)\n  });\n}",
    {
      globals: ["Proxy", "Reflect"],
      locals: { _importDeferProxy: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_importDeferProxy",
      dependencies: {},
      internal: false,
    },
  ),

  inherits: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== "function" && superClass !== null) {\n    throw new TypeError("Super expression must either be null or a function");\n  }\n  // We can\'t use defineProperty to set the prototype in a single step because it\n  // doesn\'t work in Chrome <= 36. https://github.com/babel/babel/issues/14056\n  // V8 bug: https://bugs.chromium.org/p/v8/issues/detail?id=3334\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  Object.defineProperty(subClass, "prototype", {\n    writable: false\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}',
    {
      globals: ["TypeError", "Object"],
      locals: { _inherits: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_inherits",
      dependencies: {
        setPrototypeOf: ["body.0.body.body.3.consequent.expression.callee"],
      },
      internal: false,
    },
  ),

  inheritsLoose: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _inheritsLoose(subClass, superClass) {\n  subClass.prototype = Object.create(superClass.prototype);\n  subClass.prototype.constructor = subClass;\n  setPrototypeOf(subClass, superClass);\n}",
    {
      globals: ["Object"],
      locals: { _inheritsLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_inheritsLoose",
      dependencies: {
        setPrototypeOf: ["body.0.body.body.2.expression.callee"],
      },
      internal: false,
    },
  ),

  initializerDefineProperty: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _initializerDefineProperty(target, property, descriptor, context) {\n  if (!descriptor) return;\n  Object.defineProperty(target, property, {\n    enumerable: descriptor.enumerable,\n    configurable: descriptor.configurable,\n    writable: descriptor.writable,\n    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0\n  });\n}",
    {
      globals: ["Object"],
      locals: { _initializerDefineProperty: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_initializerDefineProperty",
      dependencies: {},
      internal: false,
    },
  ),

  initializerWarningHelper: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n/* eslint-disable @typescript-eslint/no-unused-vars */\nfunction _initializerWarningHelper(descriptor, context) {\n  throw new Error("Decorating class property failed. Please ensure that " + "transform-class-properties is enabled and runs after the decorators transform.");\n}',
    {
      globals: ["Error"],
      locals: { _initializerWarningHelper: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_initializerWarningHelper",
      dependencies: {},
      internal: false,
    },
  ),

  instanceof: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _instanceof(left, right) {\n  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {\n    return !!right[Symbol.hasInstance](left);\n  } else {\n    return left instanceof right;\n  }\n}',
    {
      globals: ["Symbol"],
      locals: { _instanceof: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_instanceof",
      dependencies: {},
      internal: false,
    },
  ),

  interopRequireDefault: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}",
    {
      globals: [],
      locals: { _interopRequireDefault: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_interopRequireDefault",
      dependencies: {},
      internal: false,
    },
  ),

  interopRequireWildcard: helper(
    "7.14.0",
    '/* @minVersion 7.14.0 */\n\nfunction _interopRequireWildcard(obj, nodeInterop) {\n  if (typeof WeakMap === "function") {\n    var cacheBabelInterop = new WeakMap();\n    var cacheNodeInterop = new WeakMap();\n  }\n\n  // @ts-expect-error: assign to function\n  return (_interopRequireWildcard = function (obj, nodeInterop) {\n    if (!nodeInterop && obj && obj.__esModule) {\n      return obj;\n    }\n    // Temporary variable for output size\n    var _;\n    var newObj = {\n      __proto__: null,\n      default: obj\n    };\n    var desc;\n    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {\n      return newObj;\n    }\n    _ = nodeInterop ? cacheNodeInterop : cacheBabelInterop;\n    if (_) {\n      if (_.has(obj)) return _.get(obj);\n      _.set(obj, newObj);\n    }\n    for (const key in obj) {\n      if (key !== "default" && {}.hasOwnProperty.call(obj, key)) {\n        desc = (_ = Object.defineProperty) && Object.getOwnPropertyDescriptor(obj, key);\n        if (desc && (desc.get || desc.set)) {\n          _(newObj, key, desc);\n        } else {\n          newObj[key] = obj[key];\n        }\n      }\n    }\n    return newObj;\n  })(obj, nodeInterop);\n}',
    {
      globals: ["WeakMap", "Object"],
      locals: {
        _interopRequireWildcard: [
          "body.0.id",
          "body.0.body.body.1.argument.callee.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.1.argument.callee"],
      exportName: "_interopRequireWildcard",
      dependencies: {},
      internal: false,
    },
  ),

  isNativeFunction: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _isNativeFunction(fn) {\n  // Note: This function returns "true" for core-js functions.\n  try {\n    return Function.toString.call(fn).indexOf("[native code]") !== -1;\n  } catch (_e) {\n    // Firefox 31 throws when "toString" is applied to an HTMLElement\n    return typeof fn === "function";\n  }\n}',
    {
      globals: ["Function"],
      locals: { _isNativeFunction: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_isNativeFunction",
      dependencies: {},
      internal: false,
    },
  ),

  isNativeReflectConstruct: helper(
    "7.9.0",
    "/* @minVersion 7.9.0 */\n\nfunction _isNativeReflectConstruct() {\n  // Since Reflect.construct can't be properly polyfilled, some\n  // implementations (e.g. core-js@2) don't set the correct internal slots.\n  // Those polyfills don't allow us to subclass built-ins, so we need to\n  // use our fallback implementation.\n  try {\n    // If the internal slots aren't set, this throws an error similar to\n    //   TypeError: this is not a Boolean object.\n    var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));\n  } catch (_) {}\n  // @ts-expect-error assign to function\n  return (_isNativeReflectConstruct = function () {\n    return !!result;\n  })();\n}",
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

  iterableToArray: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _iterableToArray(iter) {\n  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) {\n    return Array.from(iter);\n  }\n}',
    {
      globals: ["Symbol", "Array"],
      locals: { _iterableToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_iterableToArray",
      dependencies: {},
      internal: false,
    },
  ),

  iterableToArrayLimit: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _iterableToArrayLimit(arr, i) {\n  // this is an expanded form of \\`for...of\\` that properly supports abrupt completions of\n  // iterators etc.\n\n  var iterator = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];\n  if (iterator == null) return;\n  var _arr = [];\n  var iteratorNormalCompletion = true;\n  var didIteratorError = false;\n  var step, iteratorError, next, _return;\n  try {\n    next = (iterator = iterator.call(arr)).next;\n    if (i === 0) {\n      if (Object(iterator) !== iterator) return;\n      iteratorNormalCompletion = false;\n    } else {\n      for (; !(iteratorNormalCompletion = (step = next.call(iterator)).done); iteratorNormalCompletion = true) {\n        _arr.push(step.value);\n        if (_arr.length === i) break;\n      }\n    }\n  } catch (err) {\n    didIteratorError = true;\n    iteratorError = err;\n  } finally {\n    try {\n      if (!iteratorNormalCompletion && iterator["return"] != null) {\n        _return = iterator["return"]();\n        // eslint-disable-next-line no-unsafe-finally\n        if (Object(_return) !== _return) return;\n      }\n    } finally {\n      // eslint-disable-next-line no-unsafe-finally\n      if (didIteratorError) throw iteratorError;\n    }\n  }\n  return _arr;\n}',
    {
      globals: ["Symbol", "Object"],
      locals: { _iterableToArrayLimit: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_iterableToArrayLimit",
      dependencies: {},
      internal: false,
    },
  ),

  jsx: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nvar REACT_ELEMENT_TYPE;\nfunction _createRawReactElement(type, props, key, children) {\n  if (!REACT_ELEMENT_TYPE) {\n    REACT_ELEMENT_TYPE = typeof Symbol === "function" &&\n    // "for" is a reserved keyword in ES3 so escaping it here for backward compatibility\n    Symbol["for"] && Symbol["for"]("react.element") || 0xeac7;\n  }\n  var defaultProps = type && type.defaultProps;\n  var childrenLength = arguments.length - 3;\n  if (!props && childrenLength !== 0) {\n    // If we\'re going to assign props.children, we create a new object now\n    // to avoid mutating defaultProps.\n    props = {\n      children: void 0\n    };\n  }\n  if (childrenLength === 1) {\n    props.children = children;\n  } else if (childrenLength > 1) {\n    var childArray = new Array(childrenLength);\n    for (var i = 0; i < childrenLength; i++) {\n      childArray[i] = arguments[i + 3];\n    }\n    props.children = childArray;\n  }\n  if (props && defaultProps) {\n    for (var propName in defaultProps) {\n      if (props[propName] === void 0) {\n        props[propName] = defaultProps[propName];\n      }\n    }\n  } else if (!props) {\n    props = defaultProps || {};\n  }\n  return {\n    $$typeof: REACT_ELEMENT_TYPE,\n    type: type,\n    key: key === undefined ? null : "" + key,\n    ref: null,\n    props: props,\n    _owner: null\n  };\n}',
    {
      globals: ["Symbol", "Array", "undefined"],
      locals: {
        REACT_ELEMENT_TYPE: [
          "body.0.declarations.0.id",
          "body.1.body.body.0.test.argument",
          "body.1.body.body.6.argument.properties.0.value",
          "body.1.body.body.0.consequent.body.0.expression.left",
        ],
        _createRawReactElement: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_createRawReactElement",
      dependencies: {},
      internal: false,
    },
  ),

  maybeArrayLike: helper(
    "7.9.0",
    '/* @minVersion 7.9.0 */\n\n\nfunction _maybeArrayLike(orElse, arr, i) {\n  if (arr && !Array.isArray(arr) && typeof arr.length === "number") {\n    var len = arr.length;\n    return arrayLikeToArray(arr, i !== void 0 && i < len ? i : len);\n  }\n  return orElse(arr, i);\n}',
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

  newArrowCheck: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _newArrowCheck(innerThis, boundThis) {\n  if (innerThis !== boundThis) {\n    throw new TypeError("Cannot instantiate an arrow function");\n  }\n}',
    {
      globals: ["TypeError"],
      locals: { _newArrowCheck: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_newArrowCheck",
      dependencies: {},
      internal: false,
    },
  ),

  nonIterableRest: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _nonIterableRest() {\n  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");\n}',
    {
      globals: ["TypeError"],
      locals: { _nonIterableRest: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_nonIterableRest",
      dependencies: {},
      internal: false,
    },
  ),

  nonIterableSpread: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _nonIterableSpread() {\n  throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");\n}',
    {
      globals: ["TypeError"],
      locals: { _nonIterableSpread: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_nonIterableSpread",
      dependencies: {},
      internal: false,
    },
  ),

  nullishReceiverError: helper(
    "7.22.6",
    '/* @minVersion 7.22.6 */\n\n// eslint-disable-next-line no-unused-vars\nfunction _nullishReceiverError(r) {\n  throw new TypeError("Cannot set property of null or undefined.");\n}',
    {
      globals: ["TypeError"],
      locals: { _nullishReceiverError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_nullishReceiverError",
      dependencies: {},
      internal: false,
    },
  ),

  objectDestructuringEmpty: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _objectDestructuringEmpty(obj) {\n  if (obj == null) throw new TypeError("Cannot destructure " + obj);\n}',
    {
      globals: ["TypeError"],
      locals: { _objectDestructuringEmpty: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectDestructuringEmpty",
      dependencies: {},
      internal: false,
    },
  ),

  objectSpread: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n/* @onlyBabel7 */\n\n\nfunction _objectSpread(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? Object(arguments[i]) : {};\n    var ownKeys = Object.keys(source);\n    if (typeof Object.getOwnPropertySymbols === "function") {\n      ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) {\n        // sym already comes from `Object.getOwnPropertySymbols`, so getOwnPropertyDescriptor should always be defined\n        return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n      }));\n    }\n    ownKeys.forEach(function (key) {\n      defineProperty(target, key, source[key]);\n    });\n  }\n  return target;\n}',
    {
      globals: ["Object"],
      locals: { _objectSpread: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectSpread",
      dependencies: {
        defineProperty: [
          "body.0.body.body.0.body.body.3.expression.arguments.0.body.body.0.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  objectSpread2: helper(
    "7.5.0",
    '/* @minVersion 7.5.0 */\n\n\n\n// This function is different to "Reflect.ownKeys". The enumerableOnly\n// filters on symbol properties only. Returned string properties are always\n// enumerable. It is good to use in objectSpread.\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    if (enumerableOnly) {\n      symbols = symbols.filter(function (sym) {\n        // sym already comes from `Object.getOwnPropertySymbols`, so getOwnPropertyDescriptor should always be defined\n        return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n      });\n    }\n    keys.push.apply(keys, symbols);\n  }\n  return keys;\n}\nfunction _objectSpread2(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = arguments[i] != null ? arguments[i] : {};\n    if (i % 2) {\n      ownKeys(Object(source), true).forEach(function (key) {\n        defineProperty(target, key, source[key]);\n      });\n    } else if (Object.getOwnPropertyDescriptors) {\n      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));\n    } else {\n      ownKeys(Object(source)).forEach(function (key) {\n        Object.defineProperty(target, key,\n        // key already comes from ownKeys, so getOwnPropertyDescriptor should always be defined\n        Object.getOwnPropertyDescriptor(source, key));\n      });\n    }\n  }\n  return target;\n}',
    {
      globals: ["Object"],
      locals: {
        ownKeys: [
          "body.0.id",
          "body.1.body.body.0.body.body.1.consequent.body.0.expression.callee.object.callee",
          "body.1.body.body.0.body.body.1.alternate.alternate.body.0.expression.callee.object.callee",
        ],
        _objectSpread2: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_objectSpread2",
      dependencies: {
        defineProperty: [
          "body.1.body.body.0.body.body.1.consequent.body.0.expression.arguments.0.body.body.0.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  objectWithoutProperties: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _objectWithoutProperties(source, excluded) {\n  if (source == null) return {};\n  var target = objectWithoutPropertiesLoose(source, excluded);\n  var key, i;\n  if (Object.getOwnPropertySymbols) {\n    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);\n    for (i = 0; i < sourceSymbolKeys.length; i++) {\n      key = sourceSymbolKeys[i];\n      if (excluded.indexOf(key) !== -1) continue;\n      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;\n      target[key] = source[key];\n    }\n  }\n  return target;\n}",
    {
      globals: ["Object"],
      locals: { _objectWithoutProperties: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectWithoutProperties",
      dependencies: {
        objectWithoutPropertiesLoose: [
          "body.0.body.body.1.declarations.0.init.callee",
        ],
      },
      internal: false,
    },
  ),

  objectWithoutPropertiesLoose: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _objectWithoutPropertiesLoose(source, excluded) {\n  if (source == null) return {};\n  var target = {};\n  for (var key in source) {\n    if (Object.prototype.hasOwnProperty.call(source, key)) {\n      if (excluded.indexOf(key) !== -1) continue;\n      target[key] = source[key];\n    }\n  }\n  return target;\n}",
    {
      globals: ["Object"],
      locals: { _objectWithoutPropertiesLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_objectWithoutPropertiesLoose",
      dependencies: {},
      internal: false,
    },
  ),

  possibleConstructorReturn: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _possibleConstructorReturn(self, value) {\n  if (value && (typeof value === "object" || typeof value === "function")) {\n    return value;\n  } else if (value !== void 0) {\n    throw new TypeError("Derived constructors may only return object or undefined");\n  }\n  return assertThisInitialized(self);\n}',
    {
      globals: ["TypeError"],
      locals: { _possibleConstructorReturn: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_possibleConstructorReturn",
      dependencies: {
        assertThisInitialized: ["body.0.body.body.1.argument.callee"],
      },
      internal: false,
    },
  ),

  readOnlyError: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _readOnlyError(name) {\n  throw new TypeError('\"' + name + '\" is read-only');\n}",
    {
      globals: ["TypeError"],
      locals: { _readOnlyError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_readOnlyError",
      dependencies: {},
      internal: false,
    },
  ),

  regenerator: helper(
    "7.27.0",
    '/* @minVersion 7.27.0 */\n/* @mangleFns */\n\n/* eslint-disable @typescript-eslint/no-use-before-define */\n/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */\n\n\nfunction /* @no-mangle */_regenerator() {\n  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */\n\n  var undefined; // More compressible than void 0.\n  var $Symbol = typeof Symbol === "function" ? Symbol : {};\n  var iteratorSymbol = $Symbol.iterator || "@@iterator";\n  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";\n  var _;\n  function wrap(innerFn, outerFn, self, tryLocsList) {\n    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.\n    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;\n    var generator = Object.create(protoGenerator.prototype);\n\n    // The ._invoke method unifies the implementations of the .next,\n    // .throw, and .return methods.\n    define(generator, "_invoke", makeInvokeMethod(innerFn, self, tryLocsList), true);\n    return generator;\n  }\n\n  // Returning this object from the innerFn has the same effect as\n  // breaking out of the dispatch switch statement.\n  var ContinueSentinel = {};\n\n  // Dummy constructor functions that we use as the .constructor and\n  // .constructor.prototype properties for functions that return Generator\n  // objects. For full spec compliance, you may wish to configure your\n  // minifier not to mangle the names of these two functions.\n  /* @no-mangle */\n  function Generator() {}\n  /* @no-mangle */\n  function GeneratorFunction() {}\n  /* @no-mangle */\n  function GeneratorFunctionPrototype() {}\n  _ = Object.getPrototypeOf;\n  var IteratorPrototype = [][iteratorSymbol] ?\n  // This environment has a native %IteratorPrototype%; use it instead\n  // of the polyfill.\n  _(_([][iteratorSymbol]())) : (\n  // This is a polyfill for %IteratorPrototype% for environments that\n  // don\'t natively support it.\n  define(_ = {}, iteratorSymbol, function () {\n    return this;\n  }), _);\n  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);\n  GeneratorFunction.prototype = GeneratorFunctionPrototype;\n  define(Gp, "constructor", GeneratorFunctionPrototype);\n  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);\n  GeneratorFunction.displayName = "GeneratorFunction";\n  define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");\n\n  // Define Generator.prototype.{next,throw,return} in terms of the\n  // unified ._invoke helper method.\n  define(Gp);\n  define(Gp, toStringTagSymbol, "Generator");\n\n  // A Generator should always return itself as the iterator object when the\n  // @@iterator function is called on it. Some browsers\' implementations of the\n  // iterator prototype chain incorrectly implement this, causing the Generator\n  // object to not be returned from this call. This ensures that doesn\'t happen.\n  // See https://github.com/facebook/regenerator/issues/274 for more details.\n  define(Gp, iteratorSymbol, function () {\n    return this;\n  });\n  define(Gp, "toString", function () {\n    return "[object Generator]";\n  });\n  function mark(genFun) {\n    if (Object.setPrototypeOf) {\n      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);\n    } else {\n      // @ts-expect-error assign to __proto__\n      genFun.__proto__ = GeneratorFunctionPrototype;\n      define(genFun, toStringTagSymbol, "GeneratorFunction");\n    }\n    genFun.prototype = Object.create(Gp);\n    return genFun;\n  }\n  function makeInvokeMethod(innerFn, self, tryLocsList) {\n    var state = 0;\n    function invoke(_methodName, _method, _arg) {\n      if (state > 1 /* Executing */) {\n        throw TypeError("Generator is already running");\n      } else if (done) {\n        if (_method === 1) {\n          Context_dispatchExceptionOrFinishOrAbrupt(_method, _arg);\n        }\n      }\n      method = _method;\n      arg = _arg;\n      while ((_ = method < 2 /* Next | Throw */ ? undefined : arg) || !done) {\n        if (!delegateIterator) {\n          if (!method /* Next */) {\n            ctx.v = arg;\n          } else if (method < 3 /* Throw | Return */) {\n            if (method > 1 /* Return */) ctx.n = -1;\n            Context_dispatchExceptionOrFinishOrAbrupt(method, arg);\n          } else {\n            /* Jump */\n            ctx.n = arg;\n          }\n        }\n        try {\n          state = 2;\n          if (delegateIterator) {\n            // Call delegate.iterator[context.method](context.arg) and handle the result\n\n            if (!method /* Next */) _methodName = "next";\n            if (_ = delegateIterator[_methodName]) {\n              if (!(_ = _.call(delegateIterator, arg))) {\n                throw TypeError("iterator result is not an object");\n              }\n              if (!_.done) {\n                // Re-yield the result returned by the delegate method.\n                return _;\n              }\n              arg = _.value;\n              // If context.method was "throw" but the delegate handled the\n              // exception, let the outer generator proceed normally. If\n              // context.method was "next", forget context.arg since it has been\n              // "consumed" by the delegate iterator. If context.method was\n              // "return", allow the original .return call to continue in the\n              // outer generator.\n              // method !== OperatorType.Return\n              if (method < 2 /* Throw */) {\n                method = 0;\n              }\n            } else {\n              // Note: ["return"] must be used for ES3 parsing compatibility.\n              if (method === 1 && (_ = delegateIterator["return"])) {\n                // If the delegate iterator has a return method, give it a\n                // chance to clean up.\n                _.call(delegateIterator);\n              }\n              if (method < 2 /* Next | Throw */) {\n                arg = TypeError("The iterator does not provide a \'" + _methodName + "\' method");\n                method = 1;\n              }\n            }\n\n            // The delegate iterator is finished, so forget it and continue with\n            // the outer generator.\n            // &\n            // A .throw or .return when the delegate iterator has no .throw\n            // method, or a missing .next method, always terminate the\n            // yield* loop.\n            delegateIterator = undefined;\n          } else {\n            if (done = ctx.n < 0 /* End */) {\n              _ = arg;\n            } else {\n              _ = innerFn.call(self, ctx);\n            }\n            if (_ !== ContinueSentinel) {\n              break;\n            }\n          }\n        } catch (e) {\n          delegateIterator = undefined;\n          method = 1;\n          arg = e;\n        } finally {\n          state = 1;\n        }\n      }\n      // Be forgiving, per GeneratorResume behavior specified since ES2015:\n      // ES2015 spec, step 3: https://262.ecma-international.org/6.0/#sec-generatorresume\n      // Latest spec, step 2: https://tc39.es/ecma262/#sec-generatorresume\n      return {\n        value: _,\n        done: done\n      };\n    }\n\n    // The root entry object (effectively a try statement without a catch\n    // or a finally block) gives us a place to store values thrown from\n    // locations where there is no enclosing try statement.\n    var tryEntries = tryLocsList || [];\n    var done = false;\n    var delegateIterator;\n    var method;\n    var arg;\n    var ctx = {\n      p: 0,\n      n: 0,\n      v: undefined,\n      // abrupt\n      a: Context_dispatchExceptionOrFinishOrAbrupt,\n      // finish\n      f: Context_dispatchExceptionOrFinishOrAbrupt.bind(undefined, 4),\n      // delegateYield\n      d: function (iterable, nextLoc) {\n        delegateIterator = iterable;\n\n        // Deliberately forget the last sent value so that we don\'t\n        // accidentally pass it on to the delegate.\n        method = 0;\n        arg = undefined;\n        ctx.n = nextLoc;\n        return ContinueSentinel;\n      }\n    };\n    function Context_dispatchExceptionOrFinishOrAbrupt(_type, _arg) {\n      method = _type;\n      arg = _arg;\n      for (_ = 0; !done && state /* state !== SuspendedStart */ && !shouldReturn && _ < tryEntries.length; _++) {\n        var entry = tryEntries[_];\n        var prev = ctx.p;\n        var finallyLoc = entry[2];\n        var shouldReturn;\n        if (_type > 3 /* Finish */) {\n          if (shouldReturn = finallyLoc === _arg) {\n            // The following code logic is equivalent to the commented code.\n            // if ((method = entry[4]!)) {\n            //   arg = entry[5];\n            // } else {\n            //   method = OperatorType.Jump;\n            //   arg = entry[3];\n            // }\n            arg = entry[\n            // eslint-disable-next-line no-cond-assign\n            (method = entry[4]) ? 5 : (method = 3, 3)];\n            entry[4] = entry[5] = undefined;\n          }\n        } else {\n          if (entry[0] <= prev) {\n            if (shouldReturn = _type < 2 /* Throw */ && prev < entry[1]) {\n              // If the dispatched exception was caught by a catch block,\n              // then let that catch block handle the exception normally.\n              method = 0;\n              ctx.v = _arg;\n              ctx.n = entry[1];\n            } else if (prev < finallyLoc) {\n              if (shouldReturn =\n              // Ignore the finally entry if control is not jumping to a\n              // location outside the try/catch block.\n              _type < 3 /* Throw | Return */ || entry[0] > _arg || _arg > finallyLoc) {\n                entry[4] = _type;\n                entry[5] = _arg;\n                ctx.n = finallyLoc;\n                method = 0;\n              }\n            }\n          }\n        }\n      }\n      if (shouldReturn || _type > 1 /* _type !== Throw */) {\n        return ContinueSentinel;\n      }\n      done = true;\n      throw _arg;\n    }\n    return invoke;\n  }\n\n  // @ts-expect-error explicit function assignment\n  return (_regenerator = function () {\n    return {\n      w: wrap,\n      m: mark\n    };\n  })();\n}',
    {
      globals: ["Symbol", "Object", "TypeError"],
      locals: {
        _regenerator: ["body.0.id", "body.0.body.body.24.argument.callee.left"],
      },
      exportBindingAssignments: ["body.0.body.body.24.argument.callee"],
      exportName: "_regenerator",
      dependencies: {
        regeneratorDefine: [
          "body.0.body.body.5.body.body.2.expression.callee",
          "body.0.body.body.11.declarations.0.init.alternate.expressions.0.callee",
          "body.0.body.body.14.expression.callee",
          "body.0.body.body.15.expression.callee",
          "body.0.body.body.17.expression.callee",
          "body.0.body.body.18.expression.callee",
          "body.0.body.body.19.expression.callee",
          "body.0.body.body.20.expression.callee",
          "body.0.body.body.21.expression.callee",
          "body.0.body.body.22.body.body.0.alternate.body.1.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  regeneratorAsync: helper(
    "7.27.0",
    "/* @minVersion 7.27.0 */\n\n\nfunction _regeneratorAsync(innerFn, outerFn, self, tryLocsList, PromiseImpl) {\n  var iter = asyncGen(innerFn, outerFn, self, tryLocsList, PromiseImpl);\n  return iter.next().then(function (result) {\n    return result.done ? result.value : iter.next();\n  });\n}",
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

  regeneratorAsyncGen: helper(
    "7.27.0",
    "/* @minVersion 7.27.0 */\n/* @mangleFns */\n\n\n\nfunction _regeneratorAsyncGen(innerFn, outerFn, self, tryLocsList, PromiseImpl) {\n  return new regeneratorAsyncIterator(regenerator().w(innerFn, outerFn, self, tryLocsList), PromiseImpl || Promise);\n}",
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

  regeneratorAsyncIterator: helper(
    "7.27.0",
    '/* @minVersion 7.27.0 */\n/* @mangleFns */\n/* @internal */\n\n\n\nfunction AsyncIterator(generator, PromiseImpl) {\n  if (!this.next) {\n    define(AsyncIterator.prototype);\n    define(AsyncIterator.prototype, typeof Symbol === "function" && Symbol.asyncIterator || "@asyncIterator", function () {\n      return this;\n    });\n  }\n  function invoke(method, arg, resolve, reject) {\n    try {\n      var result = generator[method](arg);\n      var value = result.value;\n      if (value instanceof OverloadYield) {\n        return PromiseImpl.resolve(value.v).then(function (value) {\n          invoke("next", value, resolve, reject);\n        }, function (err) {\n          invoke("throw", err, resolve, reject);\n        });\n      }\n      return PromiseImpl.resolve(value).then(function (unwrapped) {\n        // When a yielded Promise is resolved, its final value becomes\n        // the .value of the Promise<{value,done}> result for the\n        // current iteration.\n        result.value = unwrapped;\n        resolve(result);\n      }, function (error) {\n        // If a rejected Promise was yielded, throw the rejection back\n        // into the async generator function so it can be handled there.\n        return invoke("throw", error, resolve, reject);\n      });\n    } catch (error) {\n      reject(error);\n    }\n  }\n  var previousPromise;\n  function enqueue(method, i, arg) {\n    function callInvokeWithMethodAndArg() {\n      return new PromiseImpl(function (resolve, reject) {\n        invoke(method, arg, resolve, reject);\n      });\n    }\n    return previousPromise =\n    // If enqueue has been called before, then we want to wait until\n    // all previous Promises have been resolved before calling invoke,\n    // so that results are always delivered in the correct order. If\n    // enqueue has not been called before, then it is important to\n    // call invoke immediately, without waiting on a callback to fire,\n    // so that the async generator function has the opportunity to do\n    // any necessary setup in a predictable way. This predictability\n    // is why the Promise constructor synchronously invokes its\n    // executor callback, and why async functions synchronously\n    // execute code before the first await. Since we implement simple\n    // async functions in terms of async generators, it is especially\n    // important to get this right, even though it requires care.\n    previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,\n    // Avoid propagating failures to Promises returned by later\n    // invocations of the iterator.\n    callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();\n  }\n\n  // Define the unified helper method that is used to implement .next,\n  // .throw, and .return (see defineIteratorMethods).\n  define(this, "_invoke", enqueue, true);\n}',
    {
      globals: ["Symbol"],
      locals: {
        AsyncIterator: [
          "body.0.id",
          "body.0.body.body.0.consequent.body.0.expression.arguments.0.object",
          "body.0.body.body.0.consequent.body.1.expression.arguments.0.object",
        ],
      },
      exportBindingAssignments: [],
      exportName: "AsyncIterator",
      dependencies: {
        OverloadYield: [
          "body.0.body.body.1.body.body.0.block.body.2.test.right",
        ],
        regeneratorDefine: [
          "body.0.body.body.0.consequent.body.0.expression.callee",
          "body.0.body.body.0.consequent.body.1.expression.callee",
          "body.0.body.body.4.expression.callee",
        ],
      },
      internal: true,
    },
  ),

  regeneratorDefine: helper(
    "7.27.0",
    '/* @minVersion 7.27.0 */\n/* @mangleFns */\n/* @internal */\n\n// Also used to define Iterator Methods\n// Defining the .next, .throw, and .return methods of the Iterator interface in terms of a single ._invoke method.\nfunction regeneratorDefine(obj, key, value, noFlags) {\n  var define = Object.defineProperty;\n  try {\n    // IE 8 has a broken Object.defineProperty that only works on DOM objects.\n    define({}, "", {});\n  } catch (_) {\n    define = 0;\n  }\n\n  // @ts-expect-error explicit function reassign\n  regeneratorDefine = function (obj, key, value, noFlags) {\n    function defineIteratorMethod(method, i) {\n      regeneratorDefine(obj, method, function (arg) {\n        return this._invoke(method, i, arg);\n      });\n    }\n    if (!key) {\n      defineIteratorMethod("next", 0);\n      defineIteratorMethod("throw", 1);\n      defineIteratorMethod("return", 2);\n    } else {\n      if (define) {\n        define(obj, key, {\n          value: value,\n          enumerable: !noFlags,\n          configurable: !noFlags,\n          writable: !noFlags\n        });\n      } else {\n        obj[key] = value;\n      }\n    }\n  };\n  regeneratorDefine(obj, key, value, noFlags);\n}',
    {
      globals: ["Object"],
      locals: {
        regeneratorDefine: [
          "body.0.id",
          "body.0.body.body.2.expression.right.body.body.0.body.body.0.expression.callee",
          "body.0.body.body.3.expression.callee",
          "body.0.body.body.2.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.2.expression"],
      exportName: "regeneratorDefine",
      dependencies: {},
      internal: true,
    },
  ),

  regeneratorKeys: helper(
    "7.27.0",
    "/* @minVersion 7.27.0 */\n/* @mangleFns */\n\nfunction _regeneratorKeys(val) {\n  var object = Object(val);\n  var keys = [];\n  var key;\n  // eslint-disable-next-line guard-for-in\n  for (var key in object) {\n    keys.unshift(key);\n  }\n\n  // Rather than returning an object with a next method, we keep\n  // things simple and return the next function itself.\n  return function next() {\n    while (keys.length) {\n      key = keys.pop();\n      if (key in object) {\n        // @ts-expect-error assign to () => ...\n        next.value = key;\n        // @ts-expect-error assign to () => ...\n        next.done = false;\n        return next;\n      }\n    }\n\n    // To avoid creating an additional object, we just hang the .value\n    // and .done properties off the next function object itself. This\n    // also ensures that the minifier will not anonymize the function.\n    // @ts-expect-error assign to () => ...\n    next.done = true;\n    return next;\n  };\n}",
    {
      globals: ["Object"],
      locals: { _regeneratorKeys: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_regeneratorKeys",
      dependencies: {},
      internal: false,
    },
  ),

  regeneratorRuntime: helper(
    "7.18.0",
    '/* @minVersion 7.18.0 */\n/* @mangleFns */\n/* @onlyBabel7 */\n\n\n\n\n\n\n\n\nfunction /* @no-mangle */_regeneratorRuntime() {\n  "use strict";\n\n  var r = regenerator();\n  var gen = r.m(_regeneratorRuntime);\n  var GeneratorFunctionPrototype = Object.getPrototypeOf ? Object.getPrototypeOf(gen) : gen.__proto__;\n  var GeneratorFunction = GeneratorFunctionPrototype.constructor;\n  function isGeneratorFunction(genFun) {\n    var ctor = typeof genFun === "function" && genFun.constructor;\n    return ctor ? ctor === GeneratorFunction ||\n    // For the native GeneratorFunction constructor, the best we can\n    // do is to check its .name property.\n    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;\n  }\n  var abruptMap = {\n    throw: 1,\n    return: 2,\n    break: 3,\n    continue: 3\n  };\n  function wrapInnerFn(innerFn) {\n    var compatContext;\n    var callSyncState;\n    return function (context) {\n      if (!compatContext) {\n        // Shim the old context shape on top of the new one.\n        compatContext = {\n          stop: function () {\n            return callSyncState(context.a, 2);\n          },\n          catch: function () {\n            return context.v;\n          },\n          abrupt: function (type, arg) {\n            return callSyncState(context.a, abruptMap[type], arg);\n          },\n          delegateYield: function (iterable, resultName, nextLoc) {\n            compatContext.resultName = resultName;\n            return callSyncState(context.d, values(iterable), nextLoc);\n          },\n          finish: function (finallyLoc) {\n            return callSyncState(context.f, finallyLoc);\n          }\n        };\n        callSyncState = function (fn, a1, a2) {\n          context.p = compatContext.prev;\n          context.n = compatContext.next;\n          try {\n            return fn(a1, a2);\n          } finally {\n            compatContext.next = context.n;\n          }\n        };\n      }\n      if (compatContext.resultName) {\n        compatContext[compatContext.resultName] = context.v;\n        compatContext.resultName = undefined;\n      }\n      compatContext.sent = context.v;\n      compatContext.next = context.n;\n      try {\n        return innerFn.call(this, compatContext);\n      } finally {\n        context.p = compatContext.prev;\n        context.n = compatContext.next;\n      }\n    };\n  }\n\n  // @ts-expect-error explicit function assignment\n  return (_regeneratorRuntime = function () {\n    return {\n      wrap: function (innerFn, outerFn, self, tryLocsList) {\n        return r.w(wrapInnerFn(innerFn), outerFn, self, tryLocsList && tryLocsList.reverse());\n      },\n      isGeneratorFunction: isGeneratorFunction,\n      mark: r.m,\n      awrap: function (value, kind) {\n        return new OverloadYield(value, kind);\n      },\n      AsyncIterator: AsyncIterator,\n      async: function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {\n        return (isGeneratorFunction(outerFn) ? asyncGen : async)(wrapInnerFn(innerFn), outerFn, self, tryLocsList, PromiseImpl);\n      },\n      keys: keys,\n      values: values\n    };\n  })();\n}',
    {
      globals: ["Object", "undefined"],
      locals: {
        _regeneratorRuntime: [
          "body.0.id",
          "body.0.body.body.1.declarations.0.init.arguments.0",
          "body.0.body.body.7.argument.callee.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.7.argument.callee"],
      exportName: "_regeneratorRuntime",
      dependencies: {
        OverloadYield: [
          "body.0.body.body.7.argument.callee.right.body.body.0.argument.properties.3.value.body.body.0.argument.callee",
        ],
        regenerator: ["body.0.body.body.0.declarations.0.init.callee"],
        regeneratorAsync: [
          "body.0.body.body.7.argument.callee.right.body.body.0.argument.properties.5.value.body.body.0.argument.callee.alternate",
        ],
        regeneratorAsyncGen: [
          "body.0.body.body.7.argument.callee.right.body.body.0.argument.properties.5.value.body.body.0.argument.callee.consequent",
        ],
        regeneratorAsyncIterator: [
          "body.0.body.body.7.argument.callee.right.body.body.0.argument.properties.4.value",
        ],
        regeneratorKeys: [
          "body.0.body.body.7.argument.callee.right.body.body.0.argument.properties.6.value",
        ],
        regeneratorValues: [
          "body.0.body.body.6.body.body.2.argument.body.body.0.consequent.body.0.expression.right.properties.3.value.body.body.1.argument.arguments.1.callee",
          "body.0.body.body.7.argument.callee.right.body.body.0.argument.properties.7.value",
        ],
      },
      internal: false,
    },
  ),

  regeneratorValues: helper(
    "7.18.0",
    '/* @minVersion 7.18.0 */\n/* @mangleFns */\n\nfunction _regeneratorValues(iterable) {\n  if (iterable != null) {\n    var iteratorMethod = iterable[typeof Symbol === "function" && Symbol.iterator || "@@iterator"],\n      i = 0;\n    if (iteratorMethod) {\n      return iteratorMethod.call(iterable);\n    }\n    if (typeof iterable.next === "function") {\n      return iterable;\n    }\n    if (!isNaN(iterable.length)) {\n      return {\n        next: function () {\n          if (iterable && i >= iterable.length) iterable = undefined;\n          return {\n            value: iterable && iterable[i++],\n            done: !iterable\n          };\n        }\n      };\n    }\n  }\n  throw new TypeError(typeof iterable + " is not iterable");\n}',
    {
      globals: ["Symbol", "isNaN", "undefined", "TypeError"],
      locals: { _regeneratorValues: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_regeneratorValues",
      dependencies: {},
      internal: false,
    },
  ),

  set: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\n\nfunction set(target, property, value, receiver) {\n  if (typeof Reflect !== "undefined" && Reflect.set) {\n    // @ts-expect-error explicit function reassign\n    set = Reflect.set;\n  } else {\n    // @ts-expect-error explicit function reassign\n    set = function set(target, property, value, receiver) {\n      var base = superPropBase(target, property);\n      var desc;\n      if (base) {\n        desc = Object.getOwnPropertyDescriptor(base, property);\n        if (desc.set) {\n          desc.set.call(receiver, value);\n          return true;\n          // so getOwnPropertyDescriptor should always be defined\n        } else if (!desc.writable) {\n          // Both getter and non-writable fall into this.\n          return false;\n        }\n      }\n\n      // Without a super that defines the property, spec boils down to\n      // "define on receiver" for some reason.\n      desc = Object.getOwnPropertyDescriptor(receiver, property);\n      if (desc) {\n        if (!desc.writable) {\n          // Setter, getter, and non-writable fall into this.\n          return false;\n        }\n        desc.value = value;\n        Object.defineProperty(receiver, property, desc);\n      } else {\n        // Avoid setters that may be defined on Sub\'s prototype, but not on\n        // the instance.\n        defineProperty(receiver, property, value);\n      }\n      return true;\n    };\n  }\n  return set(target, property, value, receiver);\n}\nfunction _set(target, property, value, receiver, isStrict) {\n  var s = set(target, property, value, receiver || target);\n  if (!s && isStrict) {\n    throw new TypeError("failed to set property");\n  }\n  return value;\n}',
    {
      globals: ["Reflect", "Object", "TypeError"],
      locals: {
        set: [
          "body.0.id",
          "body.0.body.body.1.argument.callee",
          "body.1.body.body.0.declarations.0.init.callee",
          "body.0.body.body.0.consequent.body.0.expression.left",
          "body.0.body.body.0.alternate.body.0.expression.left",
        ],
        _set: ["body.1.id"],
      },
      exportBindingAssignments: [],
      exportName: "_set",
      dependencies: {
        superPropBase: [
          "body.0.body.body.0.alternate.body.0.expression.right.body.body.0.declarations.0.init.callee",
        ],
        defineProperty: [
          "body.0.body.body.0.alternate.body.0.expression.right.body.body.4.alternate.body.0.expression.callee",
        ],
      },
      internal: false,
    },
  ),

  setFunctionName: helper(
    "7.23.6",
    '/* @minVersion 7.23.6 */\n\n// https://tc39.es/ecma262/#sec-setfunctionname\nfunction setFunctionName(fn, name, prefix) {\n  if (typeof name === "symbol") {\n    // Here `undefined` is possible, we check for it in the next line.\n    name = name.description;\n    name = name ? "[" + name + "]" : "";\n  }\n  // In some older browsers .name was non-configurable, here we catch any\n  // errors thrown by defineProperty.\n  try {\n    Object.defineProperty(fn, "name", {\n      configurable: true,\n      value: prefix ? prefix + " " + name : name\n    });\n  } catch (_) {}\n  return fn;\n}',
    {
      globals: ["Object"],
      locals: { setFunctionName: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "setFunctionName",
      dependencies: {},
      internal: false,
    },
  ),

  setPrototypeOf: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _setPrototypeOf(o, p) {\n  // @ts-expect-error - assigning to function\n  _setPrototypeOf = Object.setPrototypeOf ?\n  // @ts-expect-error - intentionally omitted argument\n  Object.setPrototypeOf.bind(/* undefined */) : function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n  return _setPrototypeOf(o, p);\n}",
    {
      globals: ["Object"],
      locals: {
        _setPrototypeOf: [
          "body.0.id",
          "body.0.body.body.1.argument.callee",
          "body.0.body.body.0.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.expression"],
      exportName: "_setPrototypeOf",
      dependencies: {},
      internal: false,
    },
  ),

  skipFirstGeneratorNext: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _skipFirstGeneratorNext(fn) {\n  return function () {\n    var it = fn.apply(this, arguments);\n    it.next();\n    return it;\n  };\n}",
    {
      globals: [],
      locals: { _skipFirstGeneratorNext: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_skipFirstGeneratorNext",
      dependencies: {},
      internal: false,
    },
  ),

  slicedToArray: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\n\n\n// @ts-expect-error nonIterableRest is still being converted to TS.\n\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();\n}",
    {
      globals: [],
      locals: { _slicedToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_slicedToArray",
      dependencies: {
        arrayWithHoles: ["body.0.body.body.0.argument.left.left.left.callee"],
        iterableToArrayLimit: [
          "body.0.body.body.0.argument.left.left.right.callee",
        ],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableRest: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),

  superPropBase: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _superPropBase(object, property) {\n  // Yes, this throws if object is null to being with, that's on purpose.\n  while (!Object.prototype.hasOwnProperty.call(object, property)) {\n    object = getPrototypeOf(object);\n    if (object === null) break;\n  }\n  return object;\n}",
    {
      globals: ["Object"],
      locals: { _superPropBase: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_superPropBase",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.0.body.body.0.expression.right.callee",
        ],
      },
      internal: false,
    },
  ),

  superPropGet: helper(
    "7.25.0",
    '/* @minVersion 7.25.0 */\n\n\n\nfunction _superPropGet(classArg, property, receiver, flags) {\n  var result = get(getPrototypeOf(\n  // @ts-expect-error flags may be undefined\n  flags & 1 ? classArg.prototype : classArg), property, receiver);\n  // @ts-expect-error flags may be undefined\n  return flags & 2 && typeof result === "function" ? function (args) {\n    return result.apply(receiver, args);\n  } : result;\n}',
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

  superPropSet: helper(
    "7.25.0",
    "/* @minVersion 7.25.0 */\n\n\n\nfunction _superPropSet(classArg, property, value, receiver, isStrict, prototype) {\n  return set(getPrototypeOf(prototype ? classArg.prototype : classArg), property, value, receiver, isStrict);\n}",
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

  taggedTemplateLiteral: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _taggedTemplateLiteral(strings, raw) {\n  if (!raw) {\n    raw = strings.slice(0);\n  }\n  return Object.freeze(Object.defineProperties(strings, {\n    raw: {\n      value: Object.freeze(raw)\n    }\n  }));\n}",
    {
      globals: ["Object"],
      locals: { _taggedTemplateLiteral: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_taggedTemplateLiteral",
      dependencies: {},
      internal: false,
    },
  ),

  taggedTemplateLiteralLoose: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\nfunction _taggedTemplateLiteralLoose(strings, raw) {\n  if (!raw) {\n    raw = strings.slice(0);\n  }\n  // Loose: TemplateStringsArray['raw'] is readonly, so we have to cast it to any before assigning\n  strings.raw = raw;\n  return strings;\n}",
    {
      globals: [],
      locals: { _taggedTemplateLiteralLoose: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_taggedTemplateLiteralLoose",
      dependencies: {},
      internal: false,
    },
  ),

  tdz: helper(
    "7.5.5",
    '/* @minVersion 7.5.5 */\n\nfunction _tdzError(name) {\n  throw new ReferenceError(name + " is not defined - temporal dead zone");\n}',
    {
      globals: ["ReferenceError"],
      locals: { _tdzError: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_tdzError",
      dependencies: {},
      internal: false,
    },
  ),

  temporalRef: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\n\nfunction _temporalRef(val, name) {\n  return val === undef ? err(name) : val;\n}",
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

  temporalUndefined: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n// This function isn't mean to be called, but to be used as a reference.\n// We can't use a normal object because it isn't hoisted.\nfunction _temporalUndefined() {}",
    {
      globals: [],
      locals: { _temporalUndefined: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_temporalUndefined",
      dependencies: {},
      internal: false,
    },
  ),

  toArray: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\n\n\n// @ts-expect-error nonIterableRest is still being converted to TS.\n\nfunction _toArray(arr) {\n  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();\n}",
    {
      globals: [],
      locals: { _toArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_toArray",
      dependencies: {
        arrayWithHoles: ["body.0.body.body.0.argument.left.left.left.callee"],
        iterableToArray: ["body.0.body.body.0.argument.left.left.right.callee"],
        unsupportedIterableToArray: [
          "body.0.body.body.0.argument.left.right.callee",
        ],
        nonIterableRest: ["body.0.body.body.0.argument.right.callee"],
      },
      internal: false,
    },
  ),

  toConsumableArray: helper(
    "7.0.0-beta.0",
    "/* @minVersion 7.0.0-beta.0 */\n\n\n\n\n// @ts-expect-error nonIterableSpread is still being converted to TS.\n\nfunction _toConsumableArray(arr) {\n  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();\n}",
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

  toPrimitive: helper(
    "7.1.5",
    '/* @minVersion 7.1.5 */\n\n// https://tc39.es/ecma262/#sec-toprimitive\nfunction toPrimitive(input, hint) {\n  if (typeof input !== "object" || !input) return input;\n  // @ts-expect-error Symbol.toPrimitive might not index {}\n  var prim = input[Symbol.toPrimitive];\n  if (prim !== undefined) {\n    var res = prim.call(input, hint || "default");\n    if (typeof res !== "object") return res;\n    throw new TypeError("@@toPrimitive must return a primitive value.");\n  }\n  return (hint === "string" ? String : Number)(input);\n}',
    {
      globals: ["Symbol", "undefined", "TypeError", "String", "Number"],
      locals: { toPrimitive: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "toPrimitive",
      dependencies: {},
      internal: false,
    },
  ),

  toPropertyKey: helper(
    "7.1.5",
    '/* @minVersion 7.1.5 */\n\n// https://tc39.es/ecma262/#sec-topropertykey\n\n\nfunction toPropertyKey(arg) {\n  var key = toPrimitive(arg, "string");\n  return typeof key === "symbol" ? key : String(key);\n}',
    {
      globals: ["String"],
      locals: { toPropertyKey: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "toPropertyKey",
      dependencies: {
        toPrimitive: ["body.0.body.body.0.declarations.0.init.callee"],
      },
      internal: false,
    },
  ),

  toSetter: helper(
    "7.24.0",
    '/* @minVersion 7.24.0 */\n\nfunction _toSetter(fn, args, thisArg) {\n  if (!args) args = [];\n  var l = args.length++;\n  return Object.defineProperty({}, "_", {\n    set: function (v) {\n      args[l] = v;\n      fn.apply(thisArg, args);\n    }\n  });\n}',
    {
      globals: ["Object"],
      locals: { _toSetter: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_toSetter",
      dependencies: {},
      internal: false,
    },
  ),

  tsRewriteRelativeImportExtensions: helper(
    "7.27.0",
    '/* @minVersion 7.27.0 */\n\n// https://github.com/microsoft/TypeScript/blob/71716a2868c87248af5020e33a84a2178d41a2d6/src/compiler/factory/emitHelpers.ts#L1451\nfunction tsRewriteRelativeImportExtensions(path, preserveJsx) {\n  if (typeof path === "string" && /^\\.\\.?\\//.test(path)) {\n    return path.replace(/\\.(tsx)$|((?:\\.d)?)((?:\\.[^./]+)?)\\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {\n      return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";\n    });\n  }\n  return path;\n}',
    {
      globals: [],
      locals: { tsRewriteRelativeImportExtensions: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "tsRewriteRelativeImportExtensions",
      dependencies: {},
      internal: false,
    },
  ),

  typeof: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\nfunction _typeof(obj) {\n  "@babel/helpers - typeof";\n\n  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {\n    // @ts-expect-error -- deliberate re-defining typeof\n    _typeof = function (obj) {\n      return typeof obj;\n    };\n  } else {\n    // @ts-expect-error -- deliberate re-defining typeof\n    _typeof = function (obj) {\n      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;\n    };\n  }\n  return _typeof(obj);\n}',
    {
      globals: ["Symbol"],
      locals: {
        _typeof: [
          "body.0.id",
          "body.0.body.body.1.argument.callee",
          "body.0.body.body.0.consequent.body.0.expression.left",
          "body.0.body.body.0.alternate.body.0.expression.left",
        ],
      },
      exportBindingAssignments: [
        "body.0.body.body.0.alternate.body.0.expression",
        "body.0.body.body.0.consequent.body.0.expression",
      ],
      exportName: "_typeof",
      dependencies: {},
      internal: false,
    },
  ),

  unsupportedIterableToArray: helper(
    "7.9.0",
    '/* @minVersion 7.9.0 */\n\n\n\n// This is a specific overload added specifically for createForOfIteratorHelpers.ts\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === "string") return arrayLikeToArray(o, minLen);\n  var name = Object.prototype.toString.call(o).slice(8, -1);\n  if (name === "Object" && o.constructor) name = o.constructor.name;\n  if (name === "Map" || name === "Set") return Array.from(o);\n  if (name === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(name)) {\n    return arrayLikeToArray(o, minLen);\n  }\n}',
    {
      globals: ["Object", "Array"],
      locals: { _unsupportedIterableToArray: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_unsupportedIterableToArray",
      dependencies: {
        arrayLikeToArray: [
          "body.0.body.body.1.consequent.argument.callee",
          "body.0.body.body.5.consequent.body.0.argument.callee",
        ],
      },
      internal: false,
    },
  ),

  using: helper(
    "7.22.0",
    '/* @minVersion 7.22.0 */\n/* @onlyBabel7 */\n\nfunction _using(stack, value, isAwait) {\n  if (value === null || value === void 0) return value;\n  if (Object(value) !== value) {\n    throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");\n  }\n  // core-js-pure uses Symbol.for for polyfilling well-known symbols\n  if (isAwait) {\n    var dispose = value[Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")];\n  }\n  if (dispose === null || dispose === void 0) {\n    dispose = value[Symbol.dispose || Symbol.for("Symbol.dispose")];\n  }\n  if (typeof dispose !== "function") {\n    throw new TypeError(`Property [Symbol.dispose] is not a function.`);\n  }\n  stack.push({\n    v: value,\n    d: dispose,\n    a: isAwait\n  });\n  return value;\n}',
    {
      globals: ["Object", "TypeError", "Symbol"],
      locals: { _using: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_using",
      dependencies: {},
      internal: false,
    },
  ),

  usingCtx: helper(
    "7.23.9",
    '/* @minVersion 7.23.9 */\n\nfunction _usingCtx() {\n  var _disposeSuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed) {\n      var err = new Error();\n      err.name = "SuppressedError";\n      err.error = error;\n      err.suppressed = suppressed;\n      return err;\n    },\n    empty = {},\n    stack = [];\n  function using(isAwait, value) {\n    if (value != null) {\n      if (Object(value) !== value) {\n        throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");\n      }\n      // core-js-pure uses Symbol.for for polyfilling well-known symbols\n      if (isAwait) {\n        // value can either be an AsyncDisposable or a Disposable\n        // Try AsyncDisposable first\n        var dispose = value[Symbol.asyncDispose || Symbol["for"]("Symbol.asyncDispose")];\n      }\n      if (dispose === undefined) {\n        dispose = value[Symbol.dispose || Symbol["for"]("Symbol.dispose")];\n        if (isAwait) {\n          var inner = dispose;\n        }\n      }\n      if (typeof dispose !== "function") {\n        throw new TypeError("Object is not disposable.");\n      }\n      // @ts-expect-error use before assignment\n      if (inner) {\n        dispose = function () {\n          try {\n            inner.call(value);\n          } catch (e) {\n            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors\n            return Promise.reject(e);\n          }\n        };\n      }\n      stack.push({\n        v: value,\n        d: dispose,\n        a: isAwait\n      });\n    } else if (isAwait) {\n      // provide the nullish `value` as `d` for minification gain\n      stack.push({\n        d: value,\n        a: isAwait\n      });\n    }\n    return value;\n  }\n  return {\n    // error\n    e: empty,\n    // using\n    u: using.bind(null, false),\n    // await using\n    // full generic signature to avoid type widening\n    a: using.bind(null, true),\n    // dispose\n    d: function () {\n      var error = this.e,\n        state = 0,\n        resource;\n      function next() {\n        while (resource = stack.pop()) {\n          try {\n            if (!resource.a && state === 1) {\n              state = 0;\n              stack.push(resource);\n              return Promise.resolve().then(next);\n            }\n            if (resource.d) {\n              var disposalResult = resource.d.call(resource.v);\n              if (resource.a) {\n                state |= 2;\n                return Promise.resolve(disposalResult).then(next, err);\n              }\n            } else {\n              state |= 1;\n            }\n          } catch (e) {\n            return err(e);\n          }\n        }\n        if (state === 1) {\n          if (error !== empty) {\n            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors\n            return Promise.reject(error);\n          } else {\n            return Promise.resolve();\n          }\n        }\n        if (error !== empty) throw error;\n      }\n      function err(e) {\n        error = error !== empty ? new _disposeSuppressedError(e, error) : e;\n        return next();\n      }\n      return next();\n    }\n  };\n}',
    {
      globals: [
        "SuppressedError",
        "Error",
        "Object",
        "TypeError",
        "Symbol",
        "undefined",
        "Promise",
      ],
      locals: { _usingCtx: ["body.0.id"] },
      exportBindingAssignments: [],
      exportName: "_usingCtx",
      dependencies: {},
      internal: false,
    },
  ),

  wrapAsyncGenerator: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n\nfunction _wrapAsyncGenerator(fn) {\n  return function () {\n    // Use "arguments" here for better compatibility and smaller bundle size\n    return new AsyncGenerator(fn.apply(this, arguments));\n  };\n}\n\n/* == The implementation of the AsyncGenerator class == */\n\nfunction AsyncGenerator(gen) {\n  var front, back;\n  function send(key, arg) {\n    return new Promise(function (resolve, reject) {\n      var request = {\n        key: key,\n        arg: arg,\n        resolve: resolve,\n        reject: reject,\n        next: null\n      };\n      if (back) {\n        back = back.next = request;\n      } else {\n        front = back = request;\n        resume(key, arg);\n      }\n    });\n  }\n  function resume(key, arg) {\n    try {\n      var result = gen[key](arg);\n      var value = result.value;\n      var overloaded = value instanceof OverloadYield;\n      Promise.resolve(overloaded ? value.v : value).then(function (arg) {\n        if (overloaded) {\n          // Overloaded yield requires calling into the generator twice:\n          //  - first we get the iterator result wrapped in a promise\n          //    (the gen[key](arg) call above)\n          //  - then we await it (the Promise.resolve call above)\n          //  - then we give the result back to the iterator, so that it can:\n          //    * if it was an await, use its result\n          //    * if it was a yield*, possibly return the `done: true` signal\n          //      so that yield* knows that the iterator is finished.\n          //      This needs to happen in the second call, because in the\n          //      first one `done: true` was hidden in the promise and thus\n          //      not visible to the (sync) yield*.\n          //      The other part of this implementation is in asyncGeneratorDelegate.\n          var nextKey = key === "return" ? "return" : "next";\n          if (!value.k || arg.done) {\n            // await or end of yield*\n            // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -- smaller bundle size\n            return resume(nextKey, arg);\n          } else {\n            // yield*, not done\n            arg = gen[nextKey](arg).value;\n          }\n        }\n        settle(result.done ? "return" : "normal", arg);\n      }, function (err) {\n        resume("throw", err);\n      });\n    } catch (err) {\n      settle("throw", err);\n    }\n  }\n  function settle(type, value) {\n    switch (type) {\n      case "return":\n        front.resolve({\n          value: value,\n          done: true\n        });\n        break;\n      case "throw":\n        front.reject(value);\n        break;\n      default:\n        front.resolve({\n          value: value,\n          done: false\n        });\n        break;\n    }\n    front = front.next;\n    if (front) {\n      resume(front.key, front.arg);\n    } else {\n      back = null;\n    }\n  }\n  this._invoke = send;\n\n  // Hide "return" method if generator return is not supported\n  if (typeof gen["return"] !== "function") {\n    // @ts-expect-error -- intentionally remove "return" when not supported\n    this["return"] = undefined;\n  }\n}\nAsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {\n  return this;\n};\nAsyncGenerator.prototype.next = function (arg) {\n  return this._invoke("next", arg);\n};\nAsyncGenerator.prototype["throw"] = function (arg) {\n  return this._invoke("throw", arg);\n};\nAsyncGenerator.prototype["return"] = function (arg) {\n  return this._invoke("return", arg);\n};',
    {
      globals: ["Promise", "undefined", "Symbol"],
      locals: {
        _wrapAsyncGenerator: ["body.0.id"],
        AsyncGenerator: [
          "body.1.id",
          "body.0.body.body.0.argument.body.body.0.argument.callee",
          "body.2.expression.left.object.object",
          "body.3.expression.left.object.object",
          "body.4.expression.left.object.object",
          "body.5.expression.left.object.object",
        ],
      },
      exportBindingAssignments: [],
      exportName: "_wrapAsyncGenerator",
      dependencies: {
        OverloadYield: [
          "body.1.body.body.2.body.body.0.block.body.2.declarations.0.init.right",
        ],
      },
      internal: false,
    },
  ),

  wrapNativeSuper: helper(
    "7.0.0-beta.0",
    '/* @minVersion 7.0.0-beta.0 */\n\n// Based on https://github.com/WebReflection/babel-plugin-transform-builtin-classes\n\n\n\n\n\nfunction _wrapNativeSuper(Class) {\n  var _cache = typeof Map === "function" ? new Map() : undefined;\n\n  // @ts-expect-error -- reuse function id for helper size\n  _wrapNativeSuper = function _wrapNativeSuper(Class) {\n    if (Class === null || !isNativeFunction(Class)) return Class;\n    if (typeof Class !== "function") {\n      throw new TypeError("Super expression must either be null or a function");\n    }\n    if (_cache !== undefined) {\n      if (_cache.has(Class)) return _cache.get(Class);\n      _cache.set(Class, Wrapper);\n    }\n    function Wrapper() {\n      // @ts-expect-error -- we are sure Class is a function here\n      return construct(Class, arguments, getPrototypeOf(this).constructor);\n    }\n    Wrapper.prototype = Object.create(Class.prototype, {\n      constructor: {\n        value: Wrapper,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n    return setPrototypeOf(Wrapper, Class);\n  };\n  return _wrapNativeSuper(Class);\n}',
    {
      globals: ["Map", "undefined", "TypeError", "Object"],
      locals: {
        _wrapNativeSuper: [
          "body.0.id",
          "body.0.body.body.2.argument.callee",
          "body.0.body.body.1.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.1.expression"],
      exportName: "_wrapNativeSuper",
      dependencies: {
        getPrototypeOf: [
          "body.0.body.body.1.expression.right.body.body.3.body.body.0.argument.arguments.2.object.callee",
        ],
        setPrototypeOf: [
          "body.0.body.body.1.expression.right.body.body.5.argument.callee",
        ],
        isNativeFunction: [
          "body.0.body.body.1.expression.right.body.body.0.test.right.argument.callee",
        ],
        construct: [
          "body.0.body.body.1.expression.right.body.body.3.body.body.0.argument.callee",
        ],
      },
      internal: false,
    },
  ),

  wrapRegExp: helper(
    "7.19.0",
    '/* @minVersion 7.19.0 */\n\n\n\n\n// Define interfaces for clarity and type safety\n\nfunction _wrapRegExp() {\n  // @ts-expect-error -- deliberately re-assign\n  _wrapRegExp = function (re, groups) {\n    return new BabelRegExp(re, undefined, groups);\n  };\n  var _super = RegExp.prototype;\n  var _groups = new WeakMap();\n  function BabelRegExp(re, flags, groups) {\n    var _this = new RegExp(re, flags);\n    // if the regex is re-created with \'g\' flag\n    _groups.set(_this, groups || _groups.get(re));\n    return setPrototypeOf(_this, BabelRegExp.prototype);\n  }\n  inherits(BabelRegExp, RegExp);\n  BabelRegExp.prototype.exec = function (str) {\n    var result = _super.exec.call(this, str);\n    if (result) {\n      result.groups = buildGroups(result, this);\n      var indices = result.indices;\n      if (indices) indices.groups = buildGroups(indices, this);\n    }\n    return result;\n  };\n  BabelRegExp.prototype[Symbol.replace] = function (str, substitution) {\n    if (typeof substitution === "string") {\n      var groups = _groups.get(this);\n      return _super[Symbol.replace].call(this, str, substitution.replace(/\\$<([^>]+)(>|$)/g, function (match, name, end) {\n        if (end === "") {\n          // return unterminated group name as-is\n          return match;\n        } else {\n          var group = groups[name];\n          return Array.isArray(group) ? "$" + group.join("$") : typeof group === "number" ? "$" + group : "";\n        }\n      }));\n    } else if (typeof substitution === "function") {\n      var _this = this;\n      return _super[Symbol.replace].call(this, str, function () {\n        var args = arguments;\n        // Modern engines already pass result.groups returned by exec() as the last arg.\n        if (typeof args[args.length - 1] !== "object") {\n          args = [].slice.call(args);\n          args.push(buildGroups(args, _this));\n        }\n        return substitution.apply(this, args);\n      });\n    } else {\n      return _super[Symbol.replace].call(this, str, substitution);\n    }\n  };\n  function buildGroups(result, re) {\n    var g = _groups.get(re);\n    return Object.keys(g).reduce(function (groups, name) {\n      var i = g[name];\n      if (typeof i === "number") groups[name] = result[i];else {\n        var k = 0;\n        while (result[i[k]] === undefined && k + 1 < i.length) {\n          k++;\n        }\n        groups[name] = result[i[k]];\n      }\n      return groups;\n    }, Object.create(null));\n  }\n  return _wrapRegExp.apply(this, arguments);\n}',
    {
      globals: ["undefined", "RegExp", "WeakMap", "Symbol", "Array", "Object"],
      locals: {
        _wrapRegExp: [
          "body.0.id",
          "body.0.body.body.8.argument.callee.object",
          "body.0.body.body.0.expression.left",
        ],
      },
      exportBindingAssignments: ["body.0.body.body.0.expression"],
      exportName: "_wrapRegExp",
      dependencies: {
        setPrototypeOf: ["body.0.body.body.3.body.body.2.argument.callee"],
        inherits: ["body.0.body.body.4.expression.callee"],
      },
      internal: false,
    },
  ),

  writeOnlyError: helper(
    "7.12.13",
    "/* @minVersion 7.12.13 */\n\nfunction _writeOnlyError(name) {\n  throw new TypeError('\"' + name + '\" is write-only');\n}",
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

if (!process.env.BABEL_8_BREAKING) {
  Object.assign(helpers, {
    // size: 39, gzip size: 59
    AwaitValue: helper(
      "7.0.0-beta.0",
      "function _AwaitValue(t){this.wrapped=t}",
      {
        globals: [],
        locals: { _AwaitValue: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_AwaitValue",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 5767, gzip size: 2181
    applyDecs: helper(
      "7.17.8",
      'function old_createMetadataMethodsForProperty(e,t,a,r){return{getMetadata:function(o){old_assertNotFinished(r,"getMetadata"),old_assertMetadataKey(o);var i=e[o];if(void 0!==i)if(1===t){var n=i.public;if(void 0!==n)return n[a]}else if(2===t){var l=i.private;if(void 0!==l)return l.get(a)}else if(Object.hasOwnProperty.call(i,"constructor"))return i.constructor},setMetadata:function(o,i){old_assertNotFinished(r,"setMetadata"),old_assertMetadataKey(o);var n=e[o];if(void 0===n&&(n=e[o]={}),1===t){var l=n.public;void 0===l&&(l=n.public={}),l[a]=i}else if(2===t){var s=n.priv;void 0===s&&(s=n.private=new Map),s.set(a,i)}else n.constructor=i}}}function old_convertMetadataMapToFinal(e,t){var a=e[Symbol.metadata||Symbol.for("Symbol.metadata")],r=Object.getOwnPropertySymbols(t);if(0!==r.length){for(var o=0;o<r.length;o++){var i=r[o],n=t[i],l=a?a[i]:null,s=n.public,c=l?l.public:null;s&&c&&Object.setPrototypeOf(s,c);var d=n.private;if(d){var u=Array.from(d.values()),f=l?l.private:null;f&&(u=u.concat(f)),n.private=u}l&&Object.setPrototypeOf(n,l)}a&&Object.setPrototypeOf(t,a),e[Symbol.metadata||Symbol.for("Symbol.metadata")]=t}}function old_createAddInitializerMethod(e,t){return function(a){old_assertNotFinished(t,"addInitializer"),old_assertCallable(a,"An initializer"),e.push(a)}}function old_memberDec(e,t,a,r,o,i,n,l,s){var c;switch(i){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var d,u,f={kind:c,name:l?"#"+t:toPropertyKey(t),isStatic:n,isPrivate:l},p={v:!1};if(0!==i&&(f.addInitializer=old_createAddInitializerMethod(o,p)),l){d=2,u=Symbol(t);var v={};0===i?(v.get=a.get,v.set=a.set):2===i?v.get=function(){return a.value}:(1!==i&&3!==i||(v.get=function(){return a.get.call(this)}),1!==i&&4!==i||(v.set=function(e){a.set.call(this,e)})),f.access=v}else d=1,u=t;try{return e(s,Object.assign(f,old_createMetadataMethodsForProperty(r,d,u,p)))}finally{p.v=!0}}function old_assertNotFinished(e,t){if(e.v)throw Error("attempted to call "+t+" after decoration was finished")}function old_assertMetadataKey(e){if("symbol"!=typeof e)throw new TypeError("Metadata keys must be symbols, received: "+e)}function old_assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function old_assertValidReturnValue(e,t){var a=typeof t;if(1===e){if("object"!==a||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&old_assertCallable(t.get,"accessor.get"),void 0!==t.set&&old_assertCallable(t.set,"accessor.set"),void 0!==t.init&&old_assertCallable(t.init,"accessor.init"),void 0!==t.initializer&&old_assertCallable(t.initializer,"accessor.initializer")}else if("function"!==a)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function old_getInit(e){var t;return null==(t=e.init)&&(t=e.initializer)&&void 0!==console&&console.warn(".initializer has been renamed to .init as of March 2022"),t}function old_applyMemberDec(e,t,a,r,o,i,n,l,s){var c,d,u,f,p,v,y,h=a[0];if(n?(0===o||1===o?(c={get:a[3],set:a[4]},u="get"):3===o?(c={get:a[3]},u="get"):4===o?(c={set:a[3]},u="set"):c={value:a[3]},0!==o&&(1===o&&setFunctionName(a[4],"#"+r,"set"),setFunctionName(a[3],"#"+r,u))):0!==o&&(c=Object.getOwnPropertyDescriptor(t,r)),1===o?f={get:c.get,set:c.set}:2===o?f=c.value:3===o?f=c.get:4===o&&(f=c.set),"function"==typeof h)void 0!==(p=old_memberDec(h,r,c,l,s,o,i,n,f))&&(old_assertValidReturnValue(o,p),0===o?d=p:1===o?(d=old_getInit(p),v=p.get||f.get,y=p.set||f.set,f={get:v,set:y}):f=p);else for(var m=h.length-1;m>=0;m--){var b;void 0!==(p=old_memberDec(h[m],r,c,l,s,o,i,n,f))&&(old_assertValidReturnValue(o,p),0===o?b=p:1===o?(b=old_getInit(p),v=p.get||f.get,y=p.set||f.set,f={get:v,set:y}):f=p,void 0!==b&&(void 0===d?d=b:"function"==typeof d?d=[d,b]:d.push(b)))}if(0===o||1===o){if(void 0===d)d=function(e,t){return t};else if("function"!=typeof d){var g=d;d=function(e,t){for(var a=t,r=0;r<g.length;r++)a=g[r].call(e,a);return a}}else{var _=d;d=function(e,t){return _.call(e,t)}}e.push(d)}0!==o&&(1===o?(c.get=f.get,c.set=f.set):2===o?c.value=f:3===o?c.get=f:4===o&&(c.set=f),n?1===o?(e.push((function(e,t){return f.get.call(e,t)})),e.push((function(e,t){return f.set.call(e,t)}))):2===o?e.push(f):e.push((function(e,t){return f.call(e,t)})):Object.defineProperty(t,r,c))}function old_applyMemberDecs(e,t,a,r,o){for(var i,n,l=new Map,s=new Map,c=0;c<o.length;c++){var d=o[c];if(Array.isArray(d)){var u,f,p,v=d[1],y=d[2],h=d.length>3,m=v>=5;if(m?(u=t,f=r,0!=(v-=5)&&(p=n=n||[])):(u=t.prototype,f=a,0!==v&&(p=i=i||[])),0!==v&&!h){var b=m?s:l,g=b.get(y)||0;if(!0===g||3===g&&4!==v||4===g&&3!==v)throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+y);!g&&v>2?b.set(y,v):b.set(y,!0)}old_applyMemberDec(e,u,d,y,v,m,h,f,p)}}old_pushInitializers(e,i),old_pushInitializers(e,n)}function old_pushInitializers(e,t){t&&e.push((function(e){for(var a=0;a<t.length;a++)t[a].call(e);return e}))}function old_applyClassDecs(e,t,a,r){if(r.length>0){for(var o=[],i=t,n=t.name,l=r.length-1;l>=0;l--){var s={v:!1};try{var c=Object.assign({kind:"class",name:n,addInitializer:old_createAddInitializerMethod(o,s)},old_createMetadataMethodsForProperty(a,0,n,s)),d=r[l](i,c)}finally{s.v=!0}void 0!==d&&(old_assertValidReturnValue(10,d),i=d)}e.push(i,(function(){for(var e=0;e<o.length;e++)o[e].call(i)}))}}function applyDecs(e,t,a){var r=[],o={},i={};return old_applyMemberDecs(r,e,i,o,t),old_convertMetadataMapToFinal(e.prototype,i),old_applyClassDecs(r,e,o,a),old_convertMetadataMapToFinal(e,o),r}',
      {
        globals: [
          "Object",
          "Map",
          "Symbol",
          "Array",
          "Error",
          "TypeError",
          "console",
        ],
        locals: {
          old_createMetadataMethodsForProperty: [
            "body.0.id",
            "body.3.body.body.4.block.body.0.argument.arguments.1.arguments.1.callee",
            "body.12.body.body.0.consequent.body.0.body.body.1.block.body.0.declarations.0.init.arguments.1.callee",
          ],
          old_convertMetadataMapToFinal: [
            "body.1.id",
            "body.13.body.body.1.argument.expressions.1.callee",
            "body.13.body.body.1.argument.expressions.3.callee",
          ],
          old_createAddInitializerMethod: [
            "body.2.id",
            "body.3.body.body.3.test.expressions.0.right.right.callee",
            "body.12.body.body.0.consequent.body.0.body.body.1.block.body.0.declarations.0.init.arguments.0.properties.2.value.callee",
          ],
          old_memberDec: [
            "body.3.id",
            "body.9.body.body.1.consequent.expression.left.right.right.callee",
            "body.9.body.body.1.alternate.body.body.1.expression.left.right.right.callee",
          ],
          old_assertNotFinished: [
            "body.4.id",
            "body.0.body.body.0.argument.properties.0.value.body.body.0.expression.expressions.0.callee",
            "body.0.body.body.0.argument.properties.1.value.body.body.0.expression.expressions.0.callee",
            "body.2.body.body.0.argument.body.body.0.expression.expressions.0.callee",
          ],
          old_assertMetadataKey: [
            "body.5.id",
            "body.0.body.body.0.argument.properties.0.value.body.body.0.expression.expressions.1.callee",
            "body.0.body.body.0.argument.properties.1.value.body.body.0.expression.expressions.1.callee",
          ],
          old_assertCallable: [
            "body.6.id",
            "body.2.body.body.0.argument.body.body.0.expression.expressions.1.callee",
            "body.7.body.body.1.consequent.body.1.expression.expressions.0.right.callee",
            "body.7.body.body.1.consequent.body.1.expression.expressions.1.right.callee",
            "body.7.body.body.1.consequent.body.1.expression.expressions.2.right.callee",
            "body.7.body.body.1.consequent.body.1.expression.expressions.3.right.callee",
          ],
          old_assertValidReturnValue: [
            "body.7.id",
            "body.9.body.body.1.consequent.expression.right.expressions.0.callee",
            "body.9.body.body.1.alternate.body.body.1.expression.right.expressions.0.callee",
            "body.12.body.body.0.consequent.body.0.body.body.2.expression.right.expressions.0.callee",
          ],
          old_getInit: [
            "body.8.id",
            "body.9.body.body.1.consequent.expression.right.expressions.1.alternate.consequent.expressions.0.right.callee",
            "body.9.body.body.1.alternate.body.body.1.expression.right.expressions.1.alternate.consequent.expressions.0.right.callee",
          ],
          old_applyMemberDec: [
            "body.9.id",
            "body.10.body.body.0.body.body.1.consequent.body.2.expression.callee",
          ],
          old_applyMemberDecs: [
            "body.10.id",
            "body.13.body.body.1.argument.expressions.0.callee",
          ],
          old_pushInitializers: [
            "body.11.id",
            "body.10.body.body.1.expression.expressions.0.callee",
            "body.10.body.body.1.expression.expressions.1.callee",
          ],
          old_applyClassDecs: [
            "body.12.id",
            "body.13.body.body.1.argument.expressions.2.callee",
          ],
          applyDecs: ["body.13.id"],
        },
        exportBindingAssignments: [],
        exportName: "applyDecs",
        dependencies: {
          setFunctionName: [
            "body.9.body.body.1.test.expressions.0.consequent.expressions.1.right.expressions.0.right.callee",
            "body.9.body.body.1.test.expressions.0.consequent.expressions.1.right.expressions.1.callee",
          ],
          toPropertyKey: [
            "body.3.body.body.2.declarations.2.init.properties.1.value.alternate.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 3845, gzip size: 1570
    applyDecs2203: helper(
      "7.19.0",
      'function applyDecs2203Factory(){function createAddInitializerMethod(e,t){return function(r){!function(e,t){if(e.v)throw Error("attempted to call addInitializer after decoration was finished")}(t),assertCallable(r,"An initializer"),e.push(r)}}function memberDec(e,t,r,a,n,i,s,o){var c;switch(n){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var l,u,f={kind:c,name:s?"#"+t:t,static:i,private:s},p={v:!1};0!==n&&(f.addInitializer=createAddInitializerMethod(a,p)),0===n?s?(l=r.get,u=r.set):(l=function(){return this[t]},u=function(e){this[t]=e}):2===n?l=function(){return r.value}:(1!==n&&3!==n||(l=function(){return r.get.call(this)}),1!==n&&4!==n||(u=function(e){r.set.call(this,e)})),f.access=l&&u?{get:l,set:u}:l?{get:l}:{set:u};try{return e(o,f)}finally{p.v=!0}}function assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function assertValidReturnValue(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&assertCallable(t.get,"accessor.get"),void 0!==t.set&&assertCallable(t.set,"accessor.set"),void 0!==t.init&&assertCallable(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function applyMemberDec(e,t,r,a,n,i,s,o){var c,l,u,f,p,d,h=r[0];if(s?c=0===n||1===n?{get:r[3],set:r[4]}:3===n?{get:r[3]}:4===n?{set:r[3]}:{value:r[3]}:0!==n&&(c=Object.getOwnPropertyDescriptor(t,a)),1===n?u={get:c.get,set:c.set}:2===n?u=c.value:3===n?u=c.get:4===n&&(u=c.set),"function"==typeof h)void 0!==(f=memberDec(h,a,c,o,n,i,s,u))&&(assertValidReturnValue(n,f),0===n?l=f:1===n?(l=f.init,p=f.get||u.get,d=f.set||u.set,u={get:p,set:d}):u=f);else for(var v=h.length-1;v>=0;v--){var g;void 0!==(f=memberDec(h[v],a,c,o,n,i,s,u))&&(assertValidReturnValue(n,f),0===n?g=f:1===n?(g=f.init,p=f.get||u.get,d=f.set||u.set,u={get:p,set:d}):u=f,void 0!==g&&(void 0===l?l=g:"function"==typeof l?l=[l,g]:l.push(g)))}if(0===n||1===n){if(void 0===l)l=function(e,t){return t};else if("function"!=typeof l){var y=l;l=function(e,t){for(var r=t,a=0;a<y.length;a++)r=y[a].call(e,r);return r}}else{var m=l;l=function(e,t){return m.call(e,t)}}e.push(l)}0!==n&&(1===n?(c.get=u.get,c.set=u.set):2===n?c.value=u:3===n?c.get=u:4===n&&(c.set=u),s?1===n?(e.push((function(e,t){return u.get.call(e,t)})),e.push((function(e,t){return u.set.call(e,t)}))):2===n?e.push(u):e.push((function(e,t){return u.call(e,t)})):Object.defineProperty(t,a,c))}function pushInitializers(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}return function(e,t,r){var a=[];return function(e,t,r){for(var a,n,i=new Map,s=new Map,o=0;o<r.length;o++){var c=r[o];if(Array.isArray(c)){var l,u,f=c[1],p=c[2],d=c.length>3,h=f>=5;if(h?(l=t,0!=(f-=5)&&(u=n=n||[])):(l=t.prototype,0!==f&&(u=a=a||[])),0!==f&&!d){var v=h?s:i,g=v.get(p)||0;if(!0===g||3===g&&4!==f||4===g&&3!==f)throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!g&&f>2?v.set(p,f):v.set(p,!0)}applyMemberDec(e,l,c,p,f,h,d,u)}}pushInitializers(e,a),pushInitializers(e,n)}(a,e,t),function(e,t,r){if(r.length>0){for(var a=[],n=t,i=t.name,s=r.length-1;s>=0;s--){var o={v:!1};try{var c=r[s](n,{kind:"class",name:i,addInitializer:createAddInitializerMethod(a,o)})}finally{o.v=!0}void 0!==c&&(assertValidReturnValue(10,c),n=c)}e.push(n,(function(){for(var e=0;e<a.length;e++)a[e].call(n)}))}}(a,e,r),a}}var applyDecs2203Impl;function applyDecs2203(e,t,r){return(applyDecs2203Impl=applyDecs2203Impl||applyDecs2203Factory())(e,t,r)}',
      {
        globals: ["Error", "TypeError", "Object", "Map", "Array"],
        locals: {
          applyDecs2203Factory: [
            "body.0.id",
            "body.2.body.body.0.argument.callee.right.right.callee",
          ],
          applyDecs2203Impl: [
            "body.1.declarations.0.id",
            "body.2.body.body.0.argument.callee.right.left",
            "body.2.body.body.0.argument.callee.left",
          ],
          applyDecs2203: ["body.2.id"],
        },
        exportBindingAssignments: [],
        exportName: "applyDecs2203",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 3982, gzip size: 1621
    applyDecs2203R: helper(
      "7.20.0",
      'function applyDecs2203RFactory(){function createAddInitializerMethod(e,t){return function(r){!function(e,t){if(e.v)throw Error("attempted to call addInitializer after decoration was finished")}(t),assertCallable(r,"An initializer"),e.push(r)}}function memberDec(e,t,r,n,a,i,o,s){var c;switch(a){case 1:c="accessor";break;case 2:c="method";break;case 3:c="getter";break;case 4:c="setter";break;default:c="field"}var l,u,f={kind:c,name:o?"#"+t:toPropertyKey(t),static:i,private:o},p={v:!1};0!==a&&(f.addInitializer=createAddInitializerMethod(n,p)),0===a?o?(l=r.get,u=r.set):(l=function(){return this[t]},u=function(e){this[t]=e}):2===a?l=function(){return r.value}:(1!==a&&3!==a||(l=function(){return r.get.call(this)}),1!==a&&4!==a||(u=function(e){r.set.call(this,e)})),f.access=l&&u?{get:l,set:u}:l?{get:l}:{set:u};try{return e(s,f)}finally{p.v=!0}}function assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function assertValidReturnValue(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&assertCallable(t.get,"accessor.get"),void 0!==t.set&&assertCallable(t.set,"accessor.set"),void 0!==t.init&&assertCallable(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function applyMemberDec(e,t,r,n,a,i,o,s){var c,l,u,f,p,d,h,v=r[0];if(o?(0===a||1===a?(c={get:r[3],set:r[4]},u="get"):3===a?(c={get:r[3]},u="get"):4===a?(c={set:r[3]},u="set"):c={value:r[3]},0!==a&&(1===a&&setFunctionName(r[4],"#"+n,"set"),setFunctionName(r[3],"#"+n,u))):0!==a&&(c=Object.getOwnPropertyDescriptor(t,n)),1===a?f={get:c.get,set:c.set}:2===a?f=c.value:3===a?f=c.get:4===a&&(f=c.set),"function"==typeof v)void 0!==(p=memberDec(v,n,c,s,a,i,o,f))&&(assertValidReturnValue(a,p),0===a?l=p:1===a?(l=p.init,d=p.get||f.get,h=p.set||f.set,f={get:d,set:h}):f=p);else for(var g=v.length-1;g>=0;g--){var y;void 0!==(p=memberDec(v[g],n,c,s,a,i,o,f))&&(assertValidReturnValue(a,p),0===a?y=p:1===a?(y=p.init,d=p.get||f.get,h=p.set||f.set,f={get:d,set:h}):f=p,void 0!==y&&(void 0===l?l=y:"function"==typeof l?l=[l,y]:l.push(y)))}if(0===a||1===a){if(void 0===l)l=function(e,t){return t};else if("function"!=typeof l){var m=l;l=function(e,t){for(var r=t,n=0;n<m.length;n++)r=m[n].call(e,r);return r}}else{var b=l;l=function(e,t){return b.call(e,t)}}e.push(l)}0!==a&&(1===a?(c.get=f.get,c.set=f.set):2===a?c.value=f:3===a?c.get=f:4===a&&(c.set=f),o?1===a?(e.push((function(e,t){return f.get.call(e,t)})),e.push((function(e,t){return f.set.call(e,t)}))):2===a?e.push(f):e.push((function(e,t){return f.call(e,t)})):Object.defineProperty(t,n,c))}function applyMemberDecs(e,t){for(var r,n,a=[],i=new Map,o=new Map,s=0;s<t.length;s++){var c=t[s];if(Array.isArray(c)){var l,u,f=c[1],p=c[2],d=c.length>3,h=f>=5;if(h?(l=e,0!=(f-=5)&&(u=n=n||[])):(l=e.prototype,0!==f&&(u=r=r||[])),0!==f&&!d){var v=h?o:i,g=v.get(p)||0;if(!0===g||3===g&&4!==f||4===g&&3!==f)throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+p);!g&&f>2?v.set(p,f):v.set(p,!0)}applyMemberDec(a,l,c,p,f,h,d,u)}}return pushInitializers(a,r),pushInitializers(a,n),a}function pushInitializers(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}return function(e,t,r){return{e:applyMemberDecs(e,t),get c(){return function(e,t){if(t.length>0){for(var r=[],n=e,a=e.name,i=t.length-1;i>=0;i--){var o={v:!1};try{var s=t[i](n,{kind:"class",name:a,addInitializer:createAddInitializerMethod(r,o)})}finally{o.v=!0}void 0!==s&&(assertValidReturnValue(10,s),n=s)}return[n,function(){for(var e=0;e<r.length;e++)r[e].call(n)}]}}(e,r)}}}}function applyDecs2203R(e,t,r){return(applyDecs2203R=applyDecs2203RFactory())(e,t,r)}',
      {
        globals: ["Error", "TypeError", "Object", "Map", "Array"],
        locals: {
          applyDecs2203RFactory: [
            "body.0.id",
            "body.1.body.body.0.argument.callee.right.callee",
          ],
          applyDecs2203R: [
            "body.1.id",
            "body.1.body.body.0.argument.callee.left",
          ],
        },
        exportBindingAssignments: ["body.1.body.body.0.argument.callee"],
        exportName: "applyDecs2203R",
        dependencies: {
          setFunctionName: [
            "body.0.body.body.4.body.body.1.test.expressions.0.consequent.expressions.1.right.expressions.0.right.callee",
            "body.0.body.body.4.body.body.1.test.expressions.0.consequent.expressions.1.right.expressions.1.callee",
          ],
          toPropertyKey: [
            "body.0.body.body.1.body.body.2.declarations.2.init.properties.1.value.alternate.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 4526, gzip size: 1807
    applyDecs2301: helper(
      "7.21.0",
      'function applyDecs2301Factory(){function createAddInitializerMethod(e,t){return function(r){!function(e,t){if(e.v)throw Error("attempted to call addInitializer after decoration was finished")}(t),assertCallable(r,"An initializer"),e.push(r)}}function assertInstanceIfPrivate(e,t){if(!e(t))throw new TypeError("Attempted to access private element on non-instance")}function memberDec(e,t,r,n,a,i,s,o,c){var u;switch(a){case 1:u="accessor";break;case 2:u="method";break;case 3:u="getter";break;case 4:u="setter";break;default:u="field"}var l,f,p={kind:u,name:s?"#"+t:toPropertyKey(t),static:i,private:s},d={v:!1};if(0!==a&&(p.addInitializer=createAddInitializerMethod(n,d)),s||0!==a&&2!==a)if(2===a)l=function(e){return assertInstanceIfPrivate(c,e),r.value};else{var h=0===a||1===a;(h||3===a)&&(l=s?function(e){return assertInstanceIfPrivate(c,e),r.get.call(e)}:function(e){return r.get.call(e)}),(h||4===a)&&(f=s?function(e,t){assertInstanceIfPrivate(c,e),r.set.call(e,t)}:function(e,t){r.set.call(e,t)})}else l=function(e){return e[t]},0===a&&(f=function(e,r){e[t]=r});var v=s?c.bind():function(e){return t in e};p.access=l&&f?{get:l,set:f,has:v}:l?{get:l,has:v}:{set:f,has:v};try{return e(o,p)}finally{d.v=!0}}function assertCallable(e,t){if("function"!=typeof e)throw new TypeError(t+" must be a function")}function assertValidReturnValue(e,t){var r=typeof t;if(1===e){if("object"!==r||null===t)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");void 0!==t.get&&assertCallable(t.get,"accessor.get"),void 0!==t.set&&assertCallable(t.set,"accessor.set"),void 0!==t.init&&assertCallable(t.init,"accessor.init")}else if("function"!==r)throw new TypeError((0===e?"field":10===e?"class":"method")+" decorators must return a function or void 0")}function curryThis2(e){return function(t){e(this,t)}}function applyMemberDec(e,t,r,n,a,i,s,o,c){var u,l,f,p,d,h,v,y,g=r[0];if(s?(0===a||1===a?(u={get:(d=r[3],function(){return d(this)}),set:curryThis2(r[4])},f="get"):3===a?(u={get:r[3]},f="get"):4===a?(u={set:r[3]},f="set"):u={value:r[3]},0!==a&&(1===a&&setFunctionName(u.set,"#"+n,"set"),setFunctionName(u[f||"value"],"#"+n,f))):0!==a&&(u=Object.getOwnPropertyDescriptor(t,n)),1===a?p={get:u.get,set:u.set}:2===a?p=u.value:3===a?p=u.get:4===a&&(p=u.set),"function"==typeof g)void 0!==(h=memberDec(g,n,u,o,a,i,s,p,c))&&(assertValidReturnValue(a,h),0===a?l=h:1===a?(l=h.init,v=h.get||p.get,y=h.set||p.set,p={get:v,set:y}):p=h);else for(var m=g.length-1;m>=0;m--){var b;void 0!==(h=memberDec(g[m],n,u,o,a,i,s,p,c))&&(assertValidReturnValue(a,h),0===a?b=h:1===a?(b=h.init,v=h.get||p.get,y=h.set||p.set,p={get:v,set:y}):p=h,void 0!==b&&(void 0===l?l=b:"function"==typeof l?l=[l,b]:l.push(b)))}if(0===a||1===a){if(void 0===l)l=function(e,t){return t};else if("function"!=typeof l){var I=l;l=function(e,t){for(var r=t,n=0;n<I.length;n++)r=I[n].call(e,r);return r}}else{var w=l;l=function(e,t){return w.call(e,t)}}e.push(l)}0!==a&&(1===a?(u.get=p.get,u.set=p.set):2===a?u.value=p:3===a?u.get=p:4===a&&(u.set=p),s?1===a?(e.push((function(e,t){return p.get.call(e,t)})),e.push((function(e,t){return p.set.call(e,t)}))):2===a?e.push(p):e.push((function(e,t){return p.call(e,t)})):Object.defineProperty(t,n,u))}function applyMemberDecs(e,t,r){for(var n,a,i,s=[],o=new Map,c=new Map,u=0;u<t.length;u++){var l=t[u];if(Array.isArray(l)){var f,p,d=l[1],h=l[2],v=l.length>3,y=d>=5,g=r;if(y?(f=e,0!=(d-=5)&&(p=a=a||[]),v&&!i&&(i=function(t){return checkInRHS(t)===e}),g=i):(f=e.prototype,0!==d&&(p=n=n||[])),0!==d&&!v){var m=y?c:o,b=m.get(h)||0;if(!0===b||3===b&&4!==d||4===b&&3!==d)throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+h);!b&&d>2?m.set(h,d):m.set(h,!0)}applyMemberDec(s,f,l,h,d,y,v,p,g)}}return pushInitializers(s,n),pushInitializers(s,a),s}function pushInitializers(e,t){t&&e.push((function(e){for(var r=0;r<t.length;r++)t[r].call(e);return e}))}return function(e,t,r,n){return{e:applyMemberDecs(e,t,n),get c(){return function(e,t){if(t.length>0){for(var r=[],n=e,a=e.name,i=t.length-1;i>=0;i--){var s={v:!1};try{var o=t[i](n,{kind:"class",name:a,addInitializer:createAddInitializerMethod(r,s)})}finally{s.v=!0}void 0!==o&&(assertValidReturnValue(10,o),n=o)}return[n,function(){for(var e=0;e<r.length;e++)r[e].call(n)}]}}(e,r)}}}}function applyDecs2301(e,t,r,n){return(applyDecs2301=applyDecs2301Factory())(e,t,r,n)}',
      {
        globals: ["Error", "TypeError", "Object", "Map", "Array"],
        locals: {
          applyDecs2301Factory: [
            "body.0.id",
            "body.1.body.body.0.argument.callee.right.callee",
          ],
          applyDecs2301: [
            "body.1.id",
            "body.1.body.body.0.argument.callee.left",
          ],
        },
        exportBindingAssignments: ["body.1.body.body.0.argument.callee"],
        exportName: "applyDecs2301",
        dependencies: {
          checkInRHS: [
            "body.0.body.body.7.body.body.0.body.body.1.consequent.body.1.test.expressions.0.consequent.expressions.2.right.right.body.body.0.argument.left.callee",
          ],
          setFunctionName: [
            "body.0.body.body.6.body.body.1.test.expressions.0.consequent.expressions.1.right.expressions.0.right.callee",
            "body.0.body.body.6.body.body.1.test.expressions.0.consequent.expressions.1.right.expressions.1.callee",
          ],
          toPropertyKey: [
            "body.0.body.body.2.body.body.2.declarations.2.init.properties.1.value.alternate.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 3109, gzip size: 1569
    applyDecs2305: helper(
      "7.21.0",
      'function applyDecs2305(e,t,r,n,o,a){function i(e,t,r){return function(n,o){return r&&r(n),e[t].call(n,o)}}function c(e,t){for(var r=0;r<e.length;r++)e[r].call(t);return t}function s(e,t,r,n){if("function"!=typeof e&&(n||void 0!==e))throw new TypeError(t+" must "+(r||"be")+" a function"+(n?"":" or undefined"));return e}function applyDec(e,t,r,n,o,a,c,u,l,f,p,d,h){function m(e){if(!h(e))throw new TypeError("Attempted to access private element on non-instance")}var y,v=t[0],g=t[3],b=!u;if(!b){r||Array.isArray(v)||(v=[v]);var w={},S=[],A=3===o?"get":4===o||d?"set":"value";f?(p||d?w={get:setFunctionName((function(){return g(this)}),n,"get"),set:function(e){t[4](this,e)}}:w[A]=g,p||setFunctionName(w[A],n,2===o?"":A)):p||(w=Object.getOwnPropertyDescriptor(e,n))}for(var P=e,j=v.length-1;j>=0;j-=r?2:1){var D=v[j],E=r?v[j-1]:void 0,I={},O={kind:["field","accessor","method","getter","setter","class"][o],name:n,metadata:a,addInitializer:function(e,t){if(e.v)throw Error("attempted to call addInitializer after decoration was finished");s(t,"An initializer","be",!0),c.push(t)}.bind(null,I)};try{if(b)(y=s(D.call(E,P,O),"class decorators","return"))&&(P=y);else{var k,F;O.static=l,O.private=f,f?2===o?k=function(e){return m(e),w.value}:(o<4&&(k=i(w,"get",m)),3!==o&&(F=i(w,"set",m))):(k=function(e){return e[n]},(o<2||4===o)&&(F=function(e,t){e[n]=t}));var N=O.access={has:f?h.bind():function(e){return n in e}};if(k&&(N.get=k),F&&(N.set=F),P=D.call(E,d?{get:w.get,set:w.set}:w[A],O),d){if("object"==typeof P&&P)(y=s(P.get,"accessor.get"))&&(w.get=y),(y=s(P.set,"accessor.set"))&&(w.set=y),(y=s(P.init,"accessor.init"))&&S.push(y);else if(void 0!==P)throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0")}else s(P,(p?"field":"method")+" decorators","return")&&(p?S.push(P):w[A]=P)}}finally{I.v=!0}}return(p||d)&&u.push((function(e,t){for(var r=S.length-1;r>=0;r--)t=S[r].call(e,t);return t})),p||b||(f?d?u.push(i(w,"get"),i(w,"set")):u.push(2===o?w[A]:i.call.bind(w[A])):Object.defineProperty(e,n,w)),P}function u(e,t){return Object.defineProperty(e,Symbol.metadata||Symbol.for("Symbol.metadata"),{configurable:!0,enumerable:!0,value:t})}if(arguments.length>=6)var l=a[Symbol.metadata||Symbol.for("Symbol.metadata")];var f=Object.create(null==l?null:l),p=function(e,t,r,n){var o,a,i=[],s=function(t){return checkInRHS(t)===e},u=new Map;function l(e){e&&i.push(c.bind(null,e))}for(var f=0;f<t.length;f++){var p=t[f];if(Array.isArray(p)){var d=p[1],h=p[2],m=p.length>3,y=16&d,v=!!(8&d),g=0==(d&=7),b=h+"/"+v;if(!g&&!m){var w=u.get(b);if(!0===w||3===w&&4!==d||4===w&&3!==d)throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+h);u.set(b,!(d>2)||d)}applyDec(v?e:e.prototype,p,y,m?"#"+h:toPropertyKey(h),d,n,v?a=a||[]:o=o||[],i,v,m,g,1===d,v&&m?s:r)}}return l(o),l(a),i}(e,t,o,f);return r.length||u(e,f),{e:p,get c(){var t=[];return r.length&&[u(applyDec(e,[r],n,e.name,5,f,t),f),c.bind(null,t,e)]}}}',
      {
        globals: ["TypeError", "Array", "Object", "Error", "Symbol", "Map"],
        locals: { applyDecs2305: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "applyDecs2305",
        dependencies: {
          checkInRHS: [
            "body.0.body.body.6.declarations.1.init.callee.body.body.0.declarations.3.init.body.body.0.argument.left.callee",
          ],
          setFunctionName: [
            "body.0.body.body.3.body.body.2.consequent.body.2.expression.consequent.expressions.0.consequent.right.properties.0.value.callee",
            "body.0.body.body.3.body.body.2.consequent.body.2.expression.consequent.expressions.1.right.callee",
          ],
          toPropertyKey: [
            "body.0.body.body.6.declarations.1.init.callee.body.body.2.body.body.1.consequent.body.2.expression.arguments.3.alternate.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 231, gzip size: 189
    classApplyDescriptorDestructureSet: helper(
      "7.13.10",
      'function _classApplyDescriptorDestructureSet(e,t){if(t.set)return"__destrObj"in t||(t.__destrObj={set value(r){t.set.call(e,r)}}),t.__destrObj;if(!t.writable)throw new TypeError("attempted to set read only private field");return t}',
      {
        globals: ["TypeError"],
        locals: { _classApplyDescriptorDestructureSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classApplyDescriptorDestructureSet",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 74, gzip size: 90
    classApplyDescriptorGet: helper(
      "7.13.10",
      "function _classApplyDescriptorGet(e,t){return t.get?t.get.call(e):t.value}",
      {
        globals: [],
        locals: { _classApplyDescriptorGet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classApplyDescriptorGet",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 161, gzip size: 149
    classApplyDescriptorSet: helper(
      "7.13.10",
      'function _classApplyDescriptorSet(e,t,l){if(t.set)t.set.call(e,l);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=l}}',
      {
        globals: ["TypeError"],
        locals: { _classApplyDescriptorSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classApplyDescriptorSet",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 78, gzip size: 93
    classCheckPrivateStaticAccess: helper(
      "7.13.10",
      "function _classCheckPrivateStaticAccess(s,a,r){return assertClassBrand(a,s,r)}",
      {
        globals: [],
        locals: { _classCheckPrivateStaticAccess: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classCheckPrivateStaticAccess",
        dependencies: {
          assertClassBrand: ["body.0.body.body.0.argument.callee"],
        },
        internal: false,
      },
    ),
    // size: 154, gzip size: 145
    classCheckPrivateStaticFieldDescriptor: helper(
      "7.13.10",
      'function _classCheckPrivateStaticFieldDescriptor(t,e){if(void 0===t)throw new TypeError("attempted to "+e+" private static field before its declaration")}',
      {
        globals: ["TypeError"],
        locals: { _classCheckPrivateStaticFieldDescriptor: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classCheckPrivateStaticFieldDescriptor",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 77, gzip size: 91
    classExtractFieldDescriptor: helper(
      "7.13.10",
      "function _classExtractFieldDescriptor(e,t){return classPrivateFieldGet2(t,e)}",
      {
        globals: [],
        locals: { _classExtractFieldDescriptor: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classExtractFieldDescriptor",
        dependencies: {
          classPrivateFieldGet2: ["body.0.body.body.0.argument.callee"],
        },
        internal: false,
      },
    ),
    // size: 127, gzip size: 111
    classPrivateFieldDestructureSet: helper(
      "7.4.4",
      "function _classPrivateFieldDestructureSet(e,t){var r=classPrivateFieldGet2(t,e);return classApplyDescriptorDestructureSet(e,r)}",
      {
        globals: [],
        locals: { _classPrivateFieldDestructureSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classPrivateFieldDestructureSet",
        dependencies: {
          classApplyDescriptorDestructureSet: [
            "body.0.body.body.1.argument.callee",
          ],
          classPrivateFieldGet2: [
            "body.0.body.body.0.declarations.0.init.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 105, gzip size: 100
    classPrivateFieldGet: helper(
      "7.0.0-beta.0",
      "function _classPrivateFieldGet(e,t){var r=classPrivateFieldGet2(t,e);return classApplyDescriptorGet(e,r)}",
      {
        globals: [],
        locals: { _classPrivateFieldGet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classPrivateFieldGet",
        dependencies: {
          classApplyDescriptorGet: ["body.0.body.body.1.argument.callee"],
          classPrivateFieldGet2: [
            "body.0.body.body.0.declarations.0.init.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 111, gzip size: 109
    classPrivateFieldSet: helper(
      "7.0.0-beta.0",
      "function _classPrivateFieldSet(e,t,r){var s=classPrivateFieldGet2(t,e);return classApplyDescriptorSet(e,s,r),r}",
      {
        globals: [],
        locals: { _classPrivateFieldSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classPrivateFieldSet",
        dependencies: {
          classApplyDescriptorSet: [
            "body.0.body.body.1.argument.expressions.0.callee",
          ],
          classPrivateFieldGet2: [
            "body.0.body.body.0.declarations.0.init.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 70, gzip size: 88
    classPrivateMethodGet: helper(
      "7.1.6",
      "function _classPrivateMethodGet(s,a,r){return assertClassBrand(a,s),r}",
      {
        globals: [],
        locals: { _classPrivateMethodGet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classPrivateMethodGet",
        dependencies: {
          assertClassBrand: [
            "body.0.body.body.0.argument.expressions.0.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 94, gzip size: 102
    classPrivateMethodSet: helper(
      "7.1.6",
      'function _classPrivateMethodSet(){throw new TypeError("attempted to reassign private method")}',
      {
        globals: ["TypeError"],
        locals: { _classPrivateMethodSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classPrivateMethodSet",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 172, gzip size: 135
    classStaticPrivateFieldDestructureSet: helper(
      "7.13.10",
      'function _classStaticPrivateFieldDestructureSet(t,r,s){return assertClassBrand(r,t),classCheckPrivateStaticFieldDescriptor(s,"set"),classApplyDescriptorDestructureSet(t,s)}',
      {
        globals: [],
        locals: { _classStaticPrivateFieldDestructureSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classStaticPrivateFieldDestructureSet",
        dependencies: {
          classApplyDescriptorDestructureSet: [
            "body.0.body.body.0.argument.expressions.2.callee",
          ],
          assertClassBrand: [
            "body.0.body.body.0.argument.expressions.0.callee",
          ],
          classCheckPrivateStaticFieldDescriptor: [
            "body.0.body.body.0.argument.expressions.1.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 154, gzip size: 133
    classStaticPrivateFieldSpecGet: helper(
      "7.0.2",
      'function _classStaticPrivateFieldSpecGet(t,s,r){return assertClassBrand(s,t),classCheckPrivateStaticFieldDescriptor(r,"get"),classApplyDescriptorGet(t,r)}',
      {
        globals: [],
        locals: { _classStaticPrivateFieldSpecGet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classStaticPrivateFieldSpecGet",
        dependencies: {
          classApplyDescriptorGet: [
            "body.0.body.body.0.argument.expressions.2.callee",
          ],
          assertClassBrand: [
            "body.0.body.body.0.argument.expressions.0.callee",
          ],
          classCheckPrivateStaticFieldDescriptor: [
            "body.0.body.body.0.argument.expressions.1.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 160, gzip size: 134
    classStaticPrivateFieldSpecSet: helper(
      "7.0.2",
      'function _classStaticPrivateFieldSpecSet(s,t,r,e){return assertClassBrand(t,s),classCheckPrivateStaticFieldDescriptor(r,"set"),classApplyDescriptorSet(s,r,e),e}',
      {
        globals: [],
        locals: { _classStaticPrivateFieldSpecSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classStaticPrivateFieldSpecSet",
        dependencies: {
          classApplyDescriptorSet: [
            "body.0.body.body.0.argument.expressions.2.callee",
          ],
          assertClassBrand: [
            "body.0.body.body.0.argument.expressions.0.callee",
          ],
          classCheckPrivateStaticFieldDescriptor: [
            "body.0.body.body.0.argument.expressions.1.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 111, gzip size: 114
    classStaticPrivateMethodSet: helper(
      "7.3.2",
      'function _classStaticPrivateMethodSet(){throw new TypeError("attempted to set read only static private field")}',
      {
        globals: ["TypeError"],
        locals: { _classStaticPrivateMethodSet: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_classStaticPrivateMethodSet",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 368, gzip size: 204
    defineEnumerableProperties: helper(
      "7.0.0-beta.0",
      'function _defineEnumerableProperties(e,r){for(var t in r){var n=r[t];n.configurable=n.enumerable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,t,n)}if(Object.getOwnPropertySymbols)for(var a=Object.getOwnPropertySymbols(r),b=0;b<a.length;b++){var i=a[b];(n=r[i]).configurable=n.enumerable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,i,n)}return e}',
      {
        globals: ["Object"],
        locals: { _defineEnumerableProperties: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_defineEnumerableProperties",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 653, gzip size: 319
    dispose: helper(
      "7.22.0",
      'function dispose_SuppressedError(r,e){return"undefined"!=typeof SuppressedError?dispose_SuppressedError=SuppressedError:(dispose_SuppressedError=function(r,e){this.suppressed=e,this.error=r,this.stack=Error().stack},dispose_SuppressedError.prototype=Object.create(Error.prototype,{constructor:{value:dispose_SuppressedError,writable:!0,configurable:!0}})),new dispose_SuppressedError(r,e)}function _dispose(r,e,s){function next(){for(;r.length>0;)try{var o=r.pop(),p=o.d.call(o.v);if(o.a)return Promise.resolve(p).then(next,err)}catch(r){return err(r)}if(s)throw e}function err(r){return e=s?new dispose_SuppressedError(e,r):r,s=!0,next()}return next()}',
      {
        globals: ["SuppressedError", "Error", "Object", "Promise"],
        locals: {
          dispose_SuppressedError: [
            "body.0.id",
            "body.0.body.body.0.argument.expressions.0.alternate.expressions.1.left.object",
            "body.0.body.body.0.argument.expressions.0.alternate.expressions.1.right.arguments.1.properties.0.value.properties.0.value",
            "body.0.body.body.0.argument.expressions.1.callee",
            "body.1.body.body.1.body.body.0.argument.expressions.0.right.consequent.callee",
            "body.0.body.body.0.argument.expressions.0.consequent.left",
            "body.0.body.body.0.argument.expressions.0.alternate.expressions.0.left",
          ],
          _dispose: ["body.1.id"],
        },
        exportBindingAssignments: [],
        exportName: "_dispose",
        dependencies: {},
        internal: false,
      },
    ),
    // size: 363, gzip size: 237
    objectSpread: helper(
      "7.0.0-beta.0",
      'function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?Object(arguments[r]):{},o=Object.keys(t);"function"==typeof Object.getOwnPropertySymbols&&o.push.apply(o,Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach((function(r){defineProperty(e,r,t[r])}))}return e}',
      {
        globals: ["Object"],
        locals: { _objectSpread: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_objectSpread",
        dependencies: {
          defineProperty: [
            "body.0.body.body.0.body.body.1.expression.expressions.1.arguments.0.body.body.0.expression.callee",
          ],
        },
        internal: false,
      },
    ),
    // size: 1123, gzip size: 536
    regeneratorRuntime: helper(
      "7.18.0",
      'function _regeneratorRuntime(){"use strict";var r=regenerator(),e=r.m(_regeneratorRuntime),t=(Object.getPrototypeOf?Object.getPrototypeOf(e):e.__proto__).constructor;function n(r){var e="function"==typeof r&&r.constructor;return!!e&&(e===t||"GeneratorFunction"===(e.displayName||e.name))}var o={throw:1,return:2,break:3,continue:3};function a(r){var e,t;return function(n){e||(e={stop:function(){return t(n.a,2)},catch:function(){return n.v},abrupt:function(r,e){return t(n.a,o[r],e)},delegateYield:function(r,o,a){return e.resultName=o,t(n.d,values(r),a)},finish:function(r){return t(n.f,r)}},t=function(r,t,o){n.p=e.prev,n.n=e.next;try{return r(t,o)}finally{e.next=n.n}}),e.resultName&&(e[e.resultName]=n.v,e.resultName=void 0),e.sent=n.v,e.next=n.n;try{return r.call(this,e)}finally{n.p=e.prev,n.n=e.next}}}return(_regeneratorRuntime=function(){return{wrap:function(e,t,n,o){return r.w(a(e),t,n,o&&o.reverse())},isGeneratorFunction:n,mark:r.m,awrap:function(r,e){return new OverloadYield(r,e)},AsyncIterator:AsyncIterator,async:function(r,e,t,o,u){return(n(e)?asyncGen:async)(a(r),e,t,o,u)},keys:keys,values:values}})()}',
      {
        globals: ["Object"],
        locals: {
          _regeneratorRuntime: [
            "body.0.id",
            "body.0.body.body.0.declarations.1.init.arguments.0",
            "body.0.body.body.4.argument.callee.left",
          ],
        },
        exportBindingAssignments: ["body.0.body.body.4.argument.callee"],
        exportName: "_regeneratorRuntime",
        dependencies: {
          OverloadYield: [
            "body.0.body.body.4.argument.callee.right.body.body.0.argument.properties.3.value.body.body.0.argument.callee",
          ],
          regenerator: ["body.0.body.body.0.declarations.0.init.callee"],
          regeneratorAsync: [
            "body.0.body.body.4.argument.callee.right.body.body.0.argument.properties.5.value.body.body.0.argument.callee.alternate",
          ],
          regeneratorAsyncGen: [
            "body.0.body.body.4.argument.callee.right.body.body.0.argument.properties.5.value.body.body.0.argument.callee.consequent",
          ],
          regeneratorAsyncIterator: [
            "body.0.body.body.4.argument.callee.right.body.body.0.argument.properties.4.value",
          ],
          regeneratorKeys: [
            "body.0.body.body.4.argument.callee.right.body.body.0.argument.properties.6.value",
          ],
          regeneratorValues: [
            "body.0.body.body.3.body.body.1.argument.body.body.0.expression.expressions.0.right.expressions.0.right.properties.3.value.body.body.0.argument.expressions.1.arguments.1.callee",
            "body.0.body.body.4.argument.callee.right.body.body.0.argument.properties.7.value",
          ],
        },
        internal: false,
      },
    ),
    // size: 417, gzip size: 252
    using: helper(
      "7.22.0",
      'function _using(o,n,e){if(null==n)return n;if(Object(n)!==n)throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");if(e)var r=n[Symbol.asyncDispose||Symbol.for("Symbol.asyncDispose")];if(null==r&&(r=n[Symbol.dispose||Symbol.for("Symbol.dispose")]),"function"!=typeof r)throw new TypeError("Property [Symbol.dispose] is not a function.");return o.push({v:n,d:r,a:e}),n}',
      {
        globals: ["Object", "TypeError", "Symbol"],
        locals: { _using: ["body.0.id"] },
        exportBindingAssignments: [],
        exportName: "_using",
        dependencies: {},
        internal: false,
      },
    ),
  });
}
