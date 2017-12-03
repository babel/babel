/*
 * Copyright 2012 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for Angular 1.
 *
 * TODO: Mocks.
 * TODO: Remaining Services:
 *     $cookies
 *     $cookieStore
 *     $document
 *     $httpBackend
 *     $rootElement
 *     $rootScope
 *     $rootScopeProvider
 *
 * TODO: Resolve two issues with angular.$http
 *         1) angular.$http isn't declared as a
 *            callable type. It should be declared as a function, and properties
 *            added following the technique used by $timeout, $parse and
 *            $interval.
 *         2) angular.$http.delete cannot be added as an extern
 *            as it is a reserved keyword.
 *            Its use is potentially not supported in IE.
 *            It may be aliased as 'remove' in a future version.
 *
 * @see http://angularjs.org/
 * @externs
 */

/**
 * @typedef {(Window|Document|Element|Array.<Element>|string|!angular.JQLite|
 *     NodeList|{length: number})}
 */
var JQLiteSelector;

/**
 * @type {Object}
 * @const
 */
var angular = {};

/**
 * @param {T} self Specifies the object which this should point to when the
 *     function is run.
 * @param {?function(this:T, ...)} fn A function to partially apply.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked as a method of.
 * @param {...*} args Additional arguments that are partially applied to the
 *     function.
 * @template T
 */
angular.bind = function(self, fn, args) {};

/** @typedef {{strictDi: (boolean|undefined)}} */
angular.BootstrapOptions;

/**
 * @param {Element|HTMLDocument} element
 * @param {Array.<string|Function>=} opt_modules
 * @param {angular.BootstrapOptions=} opt_config
 * @return {!angular.$injector}
 */
angular.bootstrap = function(element, opt_modules, opt_config) {};

/**
 * @param {T} source
 * @param {(Object|Array)=} opt_dest
 * @return {T}
 * @template T
 */
angular.copy = function(source, opt_dest) {};

/**
 * @param {(JQLiteSelector|Object)} element
 * @param {(JQLiteSelector|Object)=} opt_context
 * @return {!angular.JQLite}
 */
angular.element = function(element, opt_context) {};

/**
 * @param {*} o1
 * @param {*} o2
 * @return {boolean}
 */
angular.equals = function(o1, o2) {};

/**
 * @param {Object} dest
 * @param {...Object} srcs
 */
angular.extend = function(dest, srcs) {};

/**
 * @param {Object|Array} obj
 * @param {Function} iterator
 * @param {Object=} opt_context
 * @return {Object|Array}
 */
angular.forEach = function(obj, iterator, opt_context) {};

/**
 * @param {string|T} json
 * @return {Object|Array|Date|T}
 * @template T
 */
angular.fromJson = function(json) {};

/**
 * @param {*} arg
 * @return {*}
 */
angular.identity = function(arg) {};

/**
 * @param {Array.<string|Function>} modules
 * @return {!angular.$injector}
 */
angular.injector = function(modules) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isArray = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isDate = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isDefined = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isElement = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isFunction = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isNumber = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isObject = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isString = function(value) {};

/**
 * @param {*} value
 * @return {boolean}
 */
angular.isUndefined = function(value) {};

/**
 * @param {string} s
 * @return {string}
 */
angular.lowercase = function(s) {};

angular.mock = {};

/**
 * @param {string} name
 * @param {Array.<string>=} opt_requires
 * @param {angular.Injectable=} opt_configFn
 * @return {!angular.Module}
 */
angular.module = function(name, opt_requires, opt_configFn) {};

angular.noop = function() {};

/**
 * @param {Object|Array|Date|string|number} obj
 * @param {boolean=} opt_pretty
 * @return {string}
 */
angular.toJson = function(obj, opt_pretty) {};

/**
 * @param {string} s
 * @return {string}
 */
angular.uppercase = function(s) {};

/**
 * @typedef {{
 *   animate: (function(!angular.JQLite, string, !Object, !Object, !Function,
 *       !Object=):(!Function|undefined)|undefined),
 *   enter: (function(!angular.JQLite, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   leave: (function(!angular.JQLite, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   move: (function(!angular.JQLite, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   beforeAddClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   addClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   beforeRemoveClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   removeClass: (function(!angular.JQLite, string, !Function, !Object=):
 *       (!Function|undefined)|undefined),
 *   beforeSetClass: (function(!angular.JQLite, string, string, !Function,
 *       !Object=):(!Function|undefined)|undefined),
 *   setClass: (function(!angular.JQLite, string, string, !Function, !Object=):
 *       (!Function|undefined)|undefined)
 *   }}
 */
angular.Animation;

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Object} from
 * @param {!Object} to
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 */
angular.Animation.animate =
    function(element, className, from, to, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.enter = function(element, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.leave = function(element, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.move = function(element, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.beforeAddClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.addClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.beforeRemoveClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} className
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.removeClass =
    function(element, className, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} addedClass
 * @param {string} removedClass
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.beforeSetClass =
    function(element, addedClass, removedClass, doneFn, opt_options) {};

/**
 * @param {!angular.JQLite} element
 * @param {string} addedClass
 * @param {string} removedClass
 * @param {!Function} doneFn
 * @param {!Object=} opt_options
 * @return {(!Function|undefined)}
 */
angular.Animation.setClass =
    function(element, addedClass, removedClass, doneFn, opt_options) {};

/**
 * @typedef {{
 *   $attr: Object.<string,string>,
 *   $normalize: function(string): string,
 *   $observe: function(string, function(*)): function(),
 *   $set: function(string, ?(string|boolean), boolean=, string=)
 *   }}
 */
angular.Attributes;

/**
 * @type {Object.<string, string>}
 */
angular.Attributes.$attr;

/**
 * @param {string} classVal
 */
angular.Attributes.$addClass = function(classVal) {};

/**
 * @param {string} classVal
 */
angular.Attributes.$removeClass = function(classVal) {};

/**
 * @param {string} newClasses
 * @param {string} oldClasses
 */
angular.Attributes.$updateClass = function(newClasses, oldClasses) {};

/**
 * @param {string} name
 * @return {string}
 */
angular.Attributes.$normalize = function(name) {};

/**
 * @param {string} key
 * @param {function(*)} fn
 * @return {function()}
 */
angular.Attributes.$observe = function(key, fn) {};

/**
 * @param {string} key
 * @param {?(string|boolean)} value
 * @param {boolean=} opt_writeAttr
 * @param {string=} opt_attrName
 */
angular.Attributes.$set = function(key, value, opt_writeAttr, opt_attrName) {};

/**
 * @typedef {{
 *   pre: (function(
 *           !angular.Scope=,
 *           !angular.JQLite=,
 *           !angular.Attributes=,
 *           (!Object|!Array.<!Object>)=)|
 *       undefined),
 *   post: (function(
 *           !angular.Scope=,
 *           !angular.JQLite=,
 *           !angular.Attributes=,
 *           (!Object|Array.<!Object>)=)|
 *       undefined)
 *   }}
 */
angular.LinkingFunctions;

/**
 * @param {!angular.Scope=} scope
 * @param {!angular.JQLite=} iElement
 * @param {!angular.Attributes=} iAttrs
 * @param {(!Object|!Array.<!Object>)=} controller
 */
angular.LinkingFunctions.pre = function(scope, iElement, iAttrs, controller) {};

/**
 * @param {!angular.Scope=} scope
 * @param {!angular.JQLite=} iElement
 * @param {!angular.Attributes=} iAttrs
 * @param {(!Object|!Array.<!Object>)=} controller
 */
angular.LinkingFunctions.post = function(scope, iElement, iAttrs, controller) {
};

/**
 * @typedef {{
 *   bindToController: (boolean|undefined),
 *   compile: (function(
 *       !angular.JQLite=, !angular.Attributes=, Function=)|undefined),
 *   controller: (angular.Injectable|string|undefined),
 *   controllerAs: (string|undefined),
 *   link: (function(
 *       !angular.Scope=, !angular.JQLite=, !angular.Attributes=,
 *       (!Object|!Array.<!Object>)=)|
 *       !angular.LinkingFunctions|
 *       undefined),
 *   name: (string|undefined),
 *   priority: (number|undefined),
 *   replace: (boolean|undefined),
 *   require: (string|Array.<string>|undefined),
 *   restrict: (string|undefined),
 *   scope: (boolean|Object.<string, string>|undefined),
 *   template: (string|
 *       function(!angular.JQLite=,!angular.Attributes=): string|
 *       undefined),
 *   templateNamespace: (string|undefined),
 *   templateUrl: (string|!Object|
 *       function(!angular.JQLite=,!angular.Attributes=)|
 *       undefined),
 *   terminal: (boolean|undefined),
 *   transclude: (boolean|string|undefined)
 *   }}
 */
angular.Directive;

/**
 * @param {!angular.JQLite=} tElement
 * @param {!angular.Attributes=} tAttrs
 * @param {Function=} transclude
 * @return {Function|angular.LinkingFunctions|undefined}
 */
angular.Directive.compile = function(tElement, tAttrs, transclude) {};

angular.Directive.controller = function() {};

/**
 * @type {string|undefined}
 */
angular.Directive.controllerAs;

/**
 * @type {(
 *   function(!angular.Scope=, !angular.JQLite=, !angular.Attributes=,
 *     (!Object|!Array.<!Object>)=)|
 *   !angular.LinkingFunctions|
 *   undefined
 * )}
 */
angular.Directive.link;

/**
 * @type {(string|undefined)}
 */
angular.Directive.name;

/**
 * @type {(number|undefined)}
 */
angular.Directive.priority;

/**
 * @type {(boolean|undefined)}
 */
angular.Directive.replace;

/**
 * @type {(string|Array.<string>|undefined)}
 */
angular.Directive.require;

/**
 * @type {(string|undefined)}
 */
angular.Directive.restrict;

/**
 * @type {(boolean|Object.<string, string>|undefined)}
 */
angular.Directive.scope;

/**
 * @type {(
 *   string|
 *   function(!angular.JQLite=,!angular.Attributes=): string|
 *   undefined
 * )}
 */
angular.Directive.template;

/**
 * @type {(string|!Object|function(!angular.JQLite=,
 * !angular.Attributes=)|undefined)}
 */
angular.Directive.templateUrl;

/**
 * @type {(boolean|undefined)}
 */
angular.Directive.terminal;

/**
 * @type {(boolean|string|undefined)}
 */
angular.Directive.transclude;

/**
 * @typedef {(Function|Array.<string|Function>)}
 */
angular.Injectable;

/**
 * @typedef {{
 *   addClass: function(string): !angular.JQLite,
 *   after: function(JQLiteSelector): !angular.JQLite,
 *   append: function(JQLiteSelector): !angular.JQLite,
 *   attr: function(string, (string|boolean)=):
 *       (!angular.JQLite|string|boolean),
 *   bind: function(string, Function): !angular.JQLite,
 *   children: function(): !angular.JQLite,
 *   clone: function(): !angular.JQLite,
 *   contents: function(): !angular.JQLite,
 *   controller: function(string=): Object,
 *   css: function((string|!Object), string=): (!angular.JQLite|string),
 *   data: function(string=, *=): *,
 *   detach: function(): !angular.JQLite,
 *   empty: function(): !angular.JQLite,
 *   eq: function(number): !angular.JQLite,
 *   find: function(string): !angular.JQLite,
 *   hasClass: function(string): boolean,
 *   html: function(string=): (!angular.JQLite|string),
 *   inheritedData: function(string=, *=): *,
 *   injector: function(): !angular.$injector,
 *   isolateScope: function(): (!angular.Scope|undefined),
 *   length: number,
 *   next: function(): !angular.JQLite,
 *   on: function(string, Function): !angular.JQLite,
 *   off: function(string=, Function=): !angular.JQLite,
 *   one: function(string, Function): !angular.JQLite,
 *   parent: function(): !angular.JQLite,
 *   prepend: function(JQLiteSelector): !angular.JQLite,
 *   prop: function(string, *=): *,
 *   ready: function(Function): !angular.JQLite,
 *   remove: function(): !angular.JQLite,
 *   removeAttr: function(string): !angular.JQLite,
 *   removeClass: function(string): !angular.JQLite,
 *   removeData: function(string=): !angular.JQLite,
 *   replaceWith: function(JQLiteSelector): !angular.JQLite,
 *   scope: function(): !angular.Scope,
 *   text: function(string=): (!angular.JQLite|string),
 *   toggleClass: function(string, boolean=): !angular.JQLite,
 *   triggerHandler: function(string, *=): !angular.JQLite,
 *   unbind: function(string=, Function=): !angular.JQLite,
 *   val: function(string=): (!angular.JQLite|string),
 *   wrap: function(JQLiteSelector): !angular.JQLite
 *   }}
 */
angular.JQLite;

/**
 * @param {string} name
 * @return {!angular.JQLite}
 */
angular.JQLite.addClass = function(name) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.after = function(element) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.append = function(element) {};

/**
 * @param {string} name
 * @param {(string|boolean|null)=} opt_value
 * @return {!angular.JQLite|string|boolean}
 */
angular.JQLite.attr = function(name, opt_value) {};

/**
 * @param {string} type
 * @param {Function} fn
 * @return {!angular.JQLite}
 */
angular.JQLite.bind = function(type, fn) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.children = function() {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.clone = function() {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.contents = function() {};

/**
 * @param {string=} opt_name
 * @return {Object}
 */
angular.JQLite.controller = function(opt_name) {};

/**
 * @param {(string|!Object)} nameOrObject
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.css = function(nameOrObject, opt_value) {};

/**
 * @param {string=} opt_key
 * @param {*=} opt_value
 * @return {*}
 */
angular.JQLite.data = function(opt_key, opt_value) {};

/**
 * @param {number} index
 * @return {!angular.JQLite}
 */
angular.JQLite.eq = function(index) {};

/**
 * @param {string} selector
 * @return {!angular.JQLite}
 */
angular.JQLite.find = function(selector) {};

/**
 * @param {string} name
 * @return {boolean}
 */
angular.JQLite.hasClass = function(name) {};

/**
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.html = function(opt_value) {};

/**
 * @param {string=} opt_key
 * @param {*=} opt_value
 * @return {*}
 */
angular.JQLite.inheritedData = function(opt_key, opt_value) {};

/**
 * @return {!angular.$injector}
 */
angular.JQLite.injector = function() {};

/** @type {number} */
angular.JQLite.length;

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.next = function() {};

/**
 * @param {string} type
 * @param {Function} fn
 * @return {!angular.JQLite}
 */
angular.JQLite.on = function(type, fn) {};

/**
 * @param {string=} opt_type
 * @param {Function=} opt_fn
 * @return {!angular.JQLite}
 */
angular.JQLite.off = function(opt_type, opt_fn) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.parent = function() {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.prepend = function(element) {};

/**
 * @param {string} name
 * @param {*=} opt_value
 * @return {*}
 */
angular.JQLite.prop = function(name, opt_value) {};

/**
 * @param {Function} fn
 * @return {!angular.JQLite}
 */
angular.JQLite.ready = function(fn) {};

/**
 * @return {!angular.JQLite}
 */
angular.JQLite.remove = function() {};

/**
 * @param {string} name
 * @return {!angular.JQLite}
 */
angular.JQLite.removeAttr = function(name) {};

/**
 * @param {string} name
 * @return {!angular.JQLite}
 */
angular.JQLite.removeClass = function(name) {};

/**
 * @param {string=} opt_name
 * @return {!angular.JQLite}
 */
angular.JQLite.removeData = function(opt_name) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.replaceWith = function(element) {};

/**
 * @return {!angular.Scope}
 */
angular.JQLite.scope = function() {};

/**
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.text = function(opt_value) {};

/**
 * @param {string} name
 * @param {boolean=} opt_condition
 * @return {!angular.JQLite}
 */
angular.JQLite.toggleClass = function(name, opt_condition) {};

/**
 * @param {string} type
 * @param {*=} opt_value
 * @return {!angular.JQLite}
 */
angular.JQLite.triggerHandler = function(type, opt_value) {};

/**
 * @param {string=} opt_type
 * @param {Function=} opt_fn
 * @return {!angular.JQLite}
 */
angular.JQLite.unbind = function(opt_type, opt_fn) {};

/**
 * @param {string=} opt_value
 * @return {!angular.JQLite|string}
 */
angular.JQLite.val = function(opt_value) {};

/**
 * @param {JQLiteSelector} element
 * @return {!angular.JQLite}
 */
angular.JQLite.wrap = function(element) {};

/**
 * @typedef {{
 *   animation:
 *       function(string, angular.Injectable):!angular.Module,
 *   config: function(angular.Injectable):!angular.Module,
 *   constant: function(string, *):angular.Module,
 *   controller:
 *       (function(string, angular.Injectable):!angular.Module|
 *       function(!Object.<angular.Injectable>):!angular.Module),
 *   directive:
 *       (function(string, angular.Injectable):!angular.Module|
 *       function(!Object.<angular.Injectable>):!angular.Module),
 *   factory:
 *       function(string, angular.Injectable):!angular.Module,
 *   filter:
 *       function(string, angular.Injectable):!angular.Module,
 *   name: string,
 *   provider: function(string,
 *       (angular.$provide.Provider|angular.Injectable)):
 *       !angular.Module,
 *   requires: !Array.<string>,
 *   run: function(angular.Injectable):!angular.Module,
 *   service: function(string, angular.Injectable):!angular.Module,
 *   value: function(string, *):!angular.Module
 *   }}
 */
angular.Module;

/**
 * @param {string} name
 * @param {angular.Injectable} animationFactory
 */
angular.Module.animation = function(name, animationFactory) {};

/**
 * @param {angular.Injectable} configFn
 * @return {!angular.Module}
 */
angular.Module.config = function(configFn) {};

/**
 * @param {string} name
 * @param {*} object
 * @return {!angular.Module}
 */
angular.Module.constant = function(name, object) {};

/**
 * @param {string} name
 * @param {angular.Injectable} constructor
 * @return {!angular.Module}
 */
angular.Module.controller = function(name, constructor) {};

/**
 * @param {string} name
 * @param {angular.Injectable} directiveFactory
 * @return {!angular.Module}
 */
angular.Module.directive = function(name, directiveFactory) {};

/**
 * @param {string} name
 * @param {angular.Injectable} providerFunction
 * @return {!angular.Module}
 */
angular.Module.factory = function(name, providerFunction) {};

/**
 * @param {string} name
 * @param {angular.Injectable} filterFactory
 * @return {!angular.Module}
 */
angular.Module.filter = function(name, filterFactory) {};

/**
 * @param {string} name
 * @param {angular.$provide.Provider|angular.Injectable} providerType
 * @return {!angular.Module}
 */
angular.Module.provider = function(name, providerType) {};

/**
 * @param {angular.Injectable} initializationFn
 * @return {!angular.Module}
 */
angular.Module.run = function(initializationFn) {};

/**
 * @param {string} name
 * @param {angular.Injectable} constructor
 * @return {!angular.Module}
 */
angular.Module.service = function(name, constructor) {};

/**
 * @param {string} name
 * @param {*} object
 * @return {!angular.Module}
 */
angular.Module.value = function(name, object) {};

/**
 * @type {string}
 */
angular.Module.name = '';

/**
 * @type {Array.<string>}
 */
angular.Module.requires;

/**
 * @typedef {{
 *   $$phase: string,
 *   $apply: function((string|function(!angular.Scope))=):*,
 *   $applyAsync: function((string|function(!angular.Scope))=),
 *   $broadcast: function(string, ...*),
 *   $destroy: function(),
 *   $digest: function(),
 *   $emit: function(string, ...*),
 *   $eval: function((string|function(!angular.Scope))=, Object=):*,
 *   $evalAsync: function((string|function())=),
 *   $id: string,
 *   $new: function(boolean=):!angular.Scope,
 *   $on: function(string, function(!angular.Scope.Event, ...?)):function(),
 *   $parent: !angular.Scope,
 *   $root: !angular.Scope,
 *   $watch: function(
 *       (string|Function), (string|Function)=, boolean=):function(),
 *   $watchCollection: function(
 *       (string|Function), (string|Function)=):function(),
 *   $watchGroup: function(
 *       Array.<string|Function>, (string|Function)=):function()
 *   }}
 */
angular.Scope;

/** @type {string} */
angular.Scope.$$phase;

/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 * @return {*}
 */
angular.Scope.$apply = function(opt_exp) {};

/**
 * @param {(string|function(!angular.Scope))=} opt_exp
 */
angular.Scope.$applyAsync = function(opt_exp) {};

/**
 * @param {string} name
 * @param {...*} args
 */
angular.Scope.$broadcast = function(name, args) {};

angular.Scope.$destroy = function() {};

angular.Scope.$digest = function() {};

/**
 * @param {string} name
 * @param {...*} args
 */
angular.Scope.$emit = function(name, args) {};

/**
 * @param {(string|function())=} opt_exp
 * @param {Object=} opt_locals
 * @return {*}
 */
angular.Scope.$eval = function(opt_exp, opt_locals) {};

/**
 * @param {(string|function())=} opt_exp
 */
angular.Scope.$evalAsync = function(opt_exp) {};

/** @type {string} */
angular.Scope.$id;

/**
 * @param {boolean=} opt_isolate
 * @return {!angular.Scope}
 */
angular.Scope.$new = function(opt_isolate) {};

/**
 * @param {string} name
 * @param {function(!angular.Scope.Event, ...?)} listener
 * @return {function()}
 */
angular.Scope.$on = function(name, listener) {};

/** @type {!angular.Scope} */
angular.Scope.$parent;

/** @type {!angular.Scope} */
angular.Scope.$root;

/**
 * @param {string|!Function} exp
 * @param {(string|Function)=} opt_listener
 * @param {boolean=} opt_objectEquality
 * @return {function()}
 */
angular.Scope.$watch = function(exp, opt_listener, opt_objectEquality) {};

/**
 * @param {string|!Function} exp
 * @param {(string|Function)=} opt_listener
 * @return {function()}
 */
angular.Scope.$watchCollection = function(exp, opt_listener) {};

/**
 * @typedef {{
 *   currentScope: !angular.Scope,
 *   defaultPrevented: boolean,
 *   name: string,
 *   preventDefault: function(),
 *   stopPropagation: function(),
 *   targetScope: !angular.Scope
 *   }}
 */
angular.Scope.Event;

/** @type {!angular.Scope} */
angular.Scope.Event.currentScope;

/** @type {boolean} */
angular.Scope.Event.defaultPrevented;

/** @type {string} */
angular.Scope.Event.name;

angular.Scope.Event.preventDefault = function() {};

angular.Scope.Event.stopPropagation = function() {};

/** @type {!angular.Scope} */
angular.Scope.Event.targetScope;

/**
 * @type {Object}
 */
angular.version = {};

/**
 * @type {string}
 */
angular.version.full = '';

/**
 * @type {number}
 */
angular.version.major = 0;

/**
 * @type {number}
 */
angular.version.minor = 0;

/**
 * @type {number}
 */
angular.version.dot = 0;

/**
 * @type {string}
 */
angular.version.codeName = '';

/******************************************************************************
 * $anchorScroll Service
 *****************************************************************************/

/**
 * @typedef {function()}
 */
angular.$anchorScroll;

/******************************************************************************
 * $anchorScrollProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   disableAutoScrolling: function()
 *   }}
 */
angular.$anchorScrollProvider;

/**
 * @type {function()}
 */
angular.$anchorScrollProvider.disableAutoScrolling = function() {};

/******************************************************************************
 * $animate Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$animate = function() {};

/**
 * @param {JQLiteSelector} element
 * @param {Object} from
 * @param {Object} to
 * @param {string=} opt_className
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.animate = function(
    element, from, to, opt_className, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {JQLiteSelector} parentElement
 * @param {JQLiteSelector} afterElement
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.enter = function(
    element, parentElement, afterElement, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.leave = function(element, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {JQLiteSelector} parentElement
 * @param {JQLiteSelector} afterElement
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.move = function(
    element, parentElement, afterElement, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {string} className
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.addClass = function(
    element, className, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {string} className
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.removeClass = function(
    element, className, opt_options) {};

/**
 * @param {JQLiteSelector} element
 * @param {string} add
 * @param {string} remove
 * @param {Object.<string, *>=} opt_options
 * @return {!angular.$q.Promise}
 */
angular.$animate.prototype.setClass = function(
    element, add, remove, opt_options) {};

/**
 * @param {boolean=} opt_value
 * @param {JQLiteSelector=} opt_element
 * @return {boolean}
 */
angular.$animate.prototype.enabled = function(opt_value, opt_element) {};

/**
 * @param {angular.$q.Promise} animationPromise
 */
angular.$animate.prototype.cancel = function(animationPromise) {};

/******************************************************************************
 * $animateProvider Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$animateProvider = function() {};

/**
 * @param {string} name
 * @param {Function} factory
 */
angular.$animateProvider.prototype.register = function(name, factory) {};

/**
 * @param {RegExp=} opt_expression
 */
angular.$animateProvider.prototype.classNameFilter = function(
    opt_expression) {};

/******************************************************************************
 * $ariaProvider Service
 *****************************************************************************/

/**
 * @constructor
 */
angular.$ariaProvider = function() {};

/**
 * @param {!{
 *   ariaHidden: (boolean|undefined),
 *   ariaChecked: (boolean|undefined),
 *   ariaDisabled: (boolean|undefined),
 *   ariaRequired: (boolean|undefined),
 *   ariaInvalid: (boolean|undefined),
 *   ariaMultiline: (boolean|undefined),
 *   ariaValue: (boolean|undefined),
 *   tabindex: (boolean|undefined),
 *   bindKeypress: (boolean|undefined),
 *   bindRoleForClick: (boolean|undefined)
 * }} config
 */
angular.$ariaProvider.prototype.config = function(config) {};

/******************************************************************************
 * $compile Service
 *****************************************************************************/

/**
 * @typedef {
 *   function(
 *       (JQLiteSelector|Object),
 *       function(!angular.Scope, Function=)=, number=):
 *           function(!angular.Scope,
 *               function(!angular.JQLite, !angular.Scope=)=,
 *                   angular.$compile.LinkOptions=): !angular.JQLite}
 */
angular.$compile;

/**
 * @typedef {{
 *   parentBoundTranscludeFn: (Function|undefined),
 *   transcludeControllers: (Object|undefined),
 *   futureParentElement: (angular.JQLite|undefined)
 * }}
 */
angular.$compile.LinkOptions;

// TODO(martinprobst): remaining $compileProvider methods.

/**
 * @constructor
 */
angular.$compileProvider = function() {};

/**
 * @param {boolean=} opt_enabled
 * @return {boolean|!angular.$compileProvider}
 */
angular.$compileProvider.prototype.debugInfoEnabled = function(opt_enabled) {};

/******************************************************************************
 * $cacheFactory Service
 *****************************************************************************/

/**
 * @typedef {
 *   function(string, angular.$cacheFactory.Options=):
 *       !angular.$cacheFactory.Cache}
 */
angular.$cacheFactory;

/**
 * @typedef {function(string): ?angular.$cacheFactory.Cache}
 */
angular.$cacheFactory.get;

/** @typedef {{capacity: (number|undefined)}} */
angular.$cacheFactory.Options;

/**
 * @template T
 * @constructor
 */
angular.$cacheFactory.Cache = function() {};

/**
 * @return {!angular.$cacheFactory.Cache.Info}
 */
angular.$cacheFactory.Cache.prototype.info = function() {};

/**
 * @param {string} key
 * @param {T} value
 */
angular.$cacheFactory.Cache.prototype.put = function(key, value) {};

/**
 * @param {string} key
 * @return {T}
 */
angular.$cacheFactory.Cache.prototype.get = function(key) {};

/**
 * @param {string} key
 */
angular.$cacheFactory.Cache.prototype.remove = function(key) {};

angular.$cacheFactory.Cache.prototype.removeAll = function() {};
angular.$cacheFactory.Cache.prototype.destroy = function() {};

/**
 * @typedef {{
 *   id: string,
 *   size: number,
 *   options: angular.$cacheFactory.Options
 *   }}
 */
angular.$cacheFactory.Cache.Info;

/******************************************************************************
 * $controller Service
 *****************************************************************************/

/**
 * @typedef {function((Function|string), Object):Object}
 */
angular.$controller;

/******************************************************************************
 * $controllerProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   register: function((string|Object), angular.Injectable=),
 *   allowGlobals: function()
 *   }}
 */
angular.$controllerProvider;

/******************************************************************************
 * $exceptionHandler Service
 *****************************************************************************/

/**
 * @typedef {function(Error, string=)}
 */
angular.$exceptionHandler;

/******************************************************************************
 * $filter Service
 *****************************************************************************/

/**
 * @typedef {function(string): !Function}
 */
angular.$filter;

/**
 * The 'orderBy' filter is available through $filterProvider and AngularJS
 * injection; but is not accessed through a documented public API of AngularJS.
 * <p>In current AngularJS version the injection is satisfied by
 * angular.orderByFunction, where the implementation is found.
 * <p>See http://docs.angularjs.org/api/ng.filter:orderBy.
 * @typedef {function(Array,
 *     (string|function(?):*|Array.<(string|function(?):*)>),
 *     boolean=): Array}
 */
angular.$filter.orderBy;

/**
 * @typedef {function(Array,
 *     (string|Object|function(?):*),
 *     (function(?):*|boolean)=): Array}
 */
angular.$filter.filter;

/******************************************************************************
 * $filterProvider Service
 *****************************************************************************/

/**
 * @typedef {{register: function(string, angular.Injectable)}}
 */
angular.$filterProvider;

/**
 * @param {string} name
 * @param {angular.Injectable} fn
 */
angular.$filterProvider.register = function(name, fn) {};

/******************************************************************************
 * $http Service
 *****************************************************************************/

/**
 * This is a typedef because the closure compiler does not allow
 * defining a type that is a function with properties.
 * If you are trying to use the $http service as a function, try
 * using one of the helper functions instead.
 * @typedef {{
 *   delete: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   get: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   head: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   jsonp: function(string, angular.$http.Config=):!angular.$http.HttpPromise,
 *   patch: function(string, *, angular.$http.Config=):
 *       !angular.$http.HttpPromise,
 *   post: function(string, *, angular.$http.Config=):
 *       !angular.$http.HttpPromise,
 *   put: function(string, *, angular.$http.Config=):!angular.$http.HttpPromise,
 *   defaults: angular.$http.Config,
 *   pendingRequests: !Array.<angular.$http.Config>
 * }}
 */
angular.$http;

/**
 * @typedef {{
 *   cache: (boolean|!angular.$cacheFactory.Cache|undefined),
 *   data: (string|Object|undefined),
 *   headers: (Object|undefined),
 *   method: (string|undefined),
 *   params: (Object.<(string|Object)>|undefined),
 *   responseType: (string|undefined),
 *   timeout: (number|!angular.$q.Promise|undefined),
 *   transformRequest:
 *       (function((string|Object), Object):(string|Object)|
 *       Array.<function((string|Object), Object):(string|Object)>|undefined),
 *   transformResponse:
 *       (function((string|Object), Object):(string|Object)|
 *       Array.<function((string|Object), Object):(string|Object)>|undefined),
 *   url: (string|undefined),
 *   withCredentials: (boolean|undefined),
 *   xsrfCookieName: (string|undefined),
 *   xsrfHeaderName: (string|undefined)
 * }}
 */
angular.$http.Config;

angular.$http.Config.transformRequest;

angular.$http.Config.transformResponse;

// /**
//  * This extern is currently incomplete as delete is a reserved word.
//  * To use delete, index $http.
//  * Example: $http['delete'](url, opt_config);
//  * @param {string} url
//  * @param {angular.$http.Config=} opt_config
//  * @return {!angular.$http.HttpPromise}
//  */
// angular.$http.delete = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.get = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.head = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.jsonp = function(url, opt_config) {};

/**
 * @param {string} url
 * @param {*} data
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.patch = function(url, data, opt_config) {};

/**
 * @param {string} url
 * @param {*} data
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.post = function(url, data, opt_config) {};

/**
 * @param {string} url
 * @param {*} data
 * @param {angular.$http.Config=} opt_config
 * @return {!angular.$http.HttpPromise}
 */
angular.$http.put = function(url, data, opt_config) {};

/**
 * @type {angular.$http.Config}
 */
angular.$http.defaults;

/**
 * @type {Array.<angular.$http.Config>}
 * @const
 */
angular.$http.pendingRequests;

/**
 * @typedef {{
 *   request: (undefined|(function(!angular.$http.Config):
 *       !angular.$http.Config|!angular.$q.Promise.<!angular.$http.Config>)),
 *   requestError: (undefined|(function(Object): !angular.$q.Promise|Object)),
 *   response: (undefined|(function(!angular.$http.Response):
 *       !angular.$http.Response|!angular.$q.Promise.<!angular.$http.Response>)),
 *   responseError: (undefined|(function(Object): !angular.$q.Promise|Object))
 *   }}
 */
angular.$http.Interceptor;

/**
 * @typedef {{
 *   defaults: !angular.$http.Config,
 *   interceptors: !Array.<string|function(...?): !angular.$http.Interceptor>,
 *   useApplyAsync: function(boolean=):(boolean|!angular.$HttpProvider)
 * }}
 */
angular.$HttpProvider;

/**
 * @type {angular.$http.Config}
 */
angular.$HttpProvider.defaults;

/**
 * @type {!Array.<string|function(...?): !angular.$http.Interceptor>}
 */
angular.$HttpProvider.interceptors;

/**
 * @param {boolean=} opt_value
 * @return {boolean|!angular.$HttpProvider}
 */
angular.$HttpProvider.useApplyAsync = function(opt_value) {};

/******************************************************************************
 * $injector Service
 *****************************************************************************/

/**
 * @typedef {{
 *   annotate: function(angular.Injectable):Array.<string>,
 *   get: function(string):(?),
 *   has: function(string):boolean,
 *   instantiate: function(Function, Object=):Object,
 *   invoke: function(angular.Injectable, Object=, Object=):(?)
 *   }}
 */
angular.$injector;

/**
 * @param {angular.Injectable} fn
 * @return {Array.<string>}
 */
angular.$injector.annotate = function(fn) {};

/**
 * @param {string} name
 * @return {?}
 */
angular.$injector.get = function(name) {};

/**
 * @param {string} name
 * @return {boolean}
 */
angular.$injector.has = function(name) {};

/**
 * @param {!Function} type
 * @param {Object=} opt_locals
 * @return {Object}
 */
angular.$injector.instantiate = function(type, opt_locals) {};

/**
 * @param {angular.Injectable} fn
 * @param {Object=} opt_self
 * @param {Object=} opt_locals
 * @return {?}
 */
angular.$injector.invoke = function(fn, opt_self, opt_locals) {};

/******************************************************************************
 * $interpolateProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   startSymbol: function(string),
 *   endSymbol: function(string)
 *   }}
 */
angular.$interpolateProvider;

/** @type {function(string)} */
angular.$interpolateProvider.startSymbol;

/** @type {function(string)} */
angular.$interpolateProvider.endSymbol;

/******************************************************************************
 * $interpolate Service
 *****************************************************************************/

/**
 * @typedef {function(string, boolean=, string=, boolean=):?function(Object):*}
 */
angular.$interpolate;

/******************************************************************************
 * $interval Service
 *****************************************************************************/

/**
 * @typedef {
 *  function(function(), number=, number=, boolean=):!angular.$q.Promise
 * }
 */
angular.$interval;

/**
 * Augment the angular.$interval type definition by reopening the type via an
 * artificial angular.$interval instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {angular.$interval}
 */
angular.$interval_;

/**
 * @type {function(!angular.$q.Promise):boolean}
 */
angular.$interval_.cancel = function(promise) {};

/******************************************************************************
 * $locale Service
 *****************************************************************************/

/**
 * @interface
 */
angular.$locale = function() {};

/**
 * @type {string}
 */
angular.$locale.prototype.id;

/******************************************************************************
 * $location Service
 *****************************************************************************/

/**
 * @typedef {{
 *   absUrl: function():string,
 *   hash: function(string=):string,
 *   host: function():string,
 *   path: function(string=):(string|!angular.$location),
 *   port: function():number,
 *   protocol: function():string,
 *   replace: function(),
 *   search: function((string|Object.<string, string>)=,
 *       ?(string|Array.<string>|boolean|number)=): (!Object|angular.$location),
 *   url: function(string=):string
 *   }}
 */
angular.$location;

/**
 * @return {string}
 */
angular.$location.absUrl = function() {};

/**
 * @param {string=} opt_hash
 * @return {string}
 */
angular.$location.hash = function(opt_hash) {};

/**
 * @return {string}
 */
angular.$location.host = function() {};

/**
 * @param {string=} opt_path
 * @return {string|!angular.$location}
 */
angular.$location.path = function(opt_path) {};

/**
 * @return {number}
 */
angular.$location.port = function() {};

/**
 * @return {string}
 */
angular.$location.protocol = function() {};

/**
 * @type {function()}
 */
angular.$location.replace = function() {};

/**
 * @param {(string|Object.<string, string>)=} opt_search
 * @param {?(string|Array.<string>|boolean|number)=} opt_paramValue
 * @return {(!Object|angular.$location)}
 */
angular.$location.search = function(opt_search, opt_paramValue) {};

/**
 * @param {string=} opt_url
 * @return {string}
 */
angular.$location.url = function(opt_url) {};

/******************************************************************************
 * $locationProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   enabled: (boolean|undefined),
 *   requireBase: (boolean|undefined)
 * }}
 */
angular.$locationProvider.html5ModeConfig;

/**
 * @typedef {{
 *   hashPrefix:
 *       function(string=): (string|!angular.$locationProvider),
 *   html5Mode:
 *       function(
 *           (boolean|angular.$locationProvider.html5ModeConfig)=):
 *               (boolean|!angular.$locationProvider)
 *   }}
 */
angular.$locationProvider;

/**
 * @param {string=} opt_prefix
 * @return {string|!angular.$locationProvider}
 */
angular.$locationProvider.hashPrefix = function(opt_prefix) {};

/**
 * @param {(boolean|angular.$locationProvider.html5ModeConfig)=} opt_mode
 * @return {boolean|!angular.$locationProvider}
 */
angular.$locationProvider.html5Mode = function(opt_mode) {};

/******************************************************************************
 * $logProvider Service
 *****************************************************************************/

/** @constructor */
angular.$logProvider = function() {};

/**
 * @param {boolean=} opt_debugEnabled
 * @return {*}
 */
angular.$logProvider.prototype.debugEnabled = function(opt_debugEnabled) {};

/******************************************************************************
 * $log Service
 *****************************************************************************/

/**
 * @typedef {{
 *   error: function(...*),
 *   info: function(...*),
 *   log: function(...*),
 *   warn: function(...*)
 *   }}
 */
angular.$log;

/**
 * @param {...*} var_args
 */
angular.$log.error = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.info = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.log = function(var_args) {};

/**
 * @param {...*} var_args
 */
angular.$log.warn = function(var_args) {};

/******************************************************************************
 * NgModelController
 *****************************************************************************/

/**
 * @constructor
 */
angular.NgModelController = function() {};

/**
 * @type {?}
 */
angular.NgModelController.prototype.$modelValue;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$dirty;

/**
 * @type {!Object.<boolean>}
 */
angular.NgModelController.prototype.$error;

/**
 * @type {!Array.<function(?):*>}
 */
angular.NgModelController.prototype.$formatters;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$invalid;

/**
 * @type {!Array.<function(?):*>}
 */
angular.NgModelController.prototype.$parsers;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$pristine;

angular.NgModelController.prototype.$render = function() {};

/**
 * @param {string} key
 * @param {boolean} isValid
 */
angular.NgModelController.prototype.$setValidity = function(key, isValid) {};

/**
 * @param {?} value
 */
angular.NgModelController.prototype.$setViewValue = function(value) {};

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$valid;

/**
 * @type {!Array.<function()>}
 */
angular.NgModelController.prototype.$viewChangeListeners;

/**
 * @type {?}
 */
angular.NgModelController.prototype.$viewValue;

/**
 * @type {!Object.<string, function(?, ?):*>}
 */
angular.NgModelController.prototype.$validators;

/**
 * @type {Object.<string, function(?, ?):*>}
 */
angular.NgModelController.prototype.$asyncValidators;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$untouched;

/**
 * @type {boolean}
 */
angular.NgModelController.prototype.$touched;

/**
 * @param {?} value
 */
angular.NgModelController.prototype.$isEmpty = function(value) {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setPristine = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setDirty = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setUntouched = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$setTouched = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$rollbackViewValue = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$validate = function() {};

/**
 * @type {function()}
 */
angular.NgModelController.prototype.$commitViewValue = function() {};

/**
 * @type {!Object.<string, boolean>|undefined}
 */
angular.NgModelController.prototype.$pending;

/******************************************************************************
 * FormController
 *****************************************************************************/

/**
 * @constructor
 */
angular.FormController = function() {};

/**
 * @param {*} control
 */
angular.FormController.prototype.$addControl = function(control) {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$rollbackViewValue = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$commitViewValue = function() {};

/**
 * @type {boolean}
 */
angular.FormController.prototype.$dirty;

/**
 * @type {!Object.<boolean|!Array.<*>>}
 */
angular.FormController.prototype.$error;

/**
 * @type {boolean}
 */
angular.FormController.prototype.$invalid;

/**
 * @type {string}
 */
angular.FormController.prototype.$name;

/**
 * @type {boolean}
 */
angular.FormController.prototype.$pristine;

/**
 * @param {*} control
 */
angular.FormController.prototype.$removeControl = function(control) {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setDirty = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setPristine = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setUntouched = function() {};

/**
 * @type {function()}
 */
angular.FormController.prototype.$setSubmitted = function() {};

/**
 * @type {boolean}
 */
angular.FormController.prototype.$submitted;

/**
 * @param {string} validationToken
 * @param {boolean} isValid
 * @param {*} control
 */
angular.FormController.prototype.$setValidity = function(
    validationToken, isValid, control) {};

/**
 * @type {boolean}
 */
angular.FormController.prototype.$valid;

/******************************************************************************
 * $parse Service
 *****************************************************************************/

/**
 * @typedef {function(string):!angular.$parse.Expression}
 */
angular.$parse;

/**
 * @typedef {function((!angular.Scope|!Object), Object=):*}
 */
angular.$parse.Expression;

/**
 * Augment the angular.$parse.Expression type definition by reopening the type
 * via an artificial angular.$parse instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {angular.$parse.Expression}
 */
angular.$parse_;

/**
 * @type {function((!angular.Scope|!Object), *)}
 */
angular.$parse_.assign = function(scope, newValue) {};

/******************************************************************************
 * $provide Service
 *****************************************************************************/

/**
 * @typedef {{
 *   constant: function(string, *): Object,
 *   decorator: function(string, angular.Injectable),
 *   factory: function(string, angular.Injectable): Object,
 *   provider: function(string, (
 *       angular.Injectable|angular.$provide.Provider)): Object,
 *   service: function(string, angular.Injectable): Object,
 *   value: function(string, *): Object
 *   }}
 */
angular.$provide;

/** @typedef {{$get: (!Array.<string|!Function>|!Function)}} */
angular.$provide.Provider;

/** @typedef {(!Array.<string|!Function>|!Function)} */
angular.$provide.Provider.$get;

/**
 * @param {string} name
 * @param {*} object
 * @return {Object}
 */
angular.$provide.constant = function(name, object) {};

/**
 * @param {string} name
 * @param {angular.Injectable} decorator
 */
angular.$provide.decorator = function(name, decorator) {};

/**
 * @param {string} name
 * @param {angular.Injectable} providerFunction
 * @return {Object}
 */
angular.$provide.factory = function(name, providerFunction) {};

/**
 * @param {string} name
 * @param {angular.Injectable|angular.$provide.Provider} providerType
 * @return {Object}
 */
angular.$provide.provider = function(name, providerType) {};

/**
 * @param {string} name
 * @param {angular.Injectable} constructor
 * @return {Object}
 */
angular.$provide.service = function(name, constructor) {};

/**
 * @param {string} name
 * @param {*} object
 * @return {Object}
 */
angular.$provide.value = function(name, object) {};

/******************************************************************************
 * $route Service
 *****************************************************************************/

/**
 * @typedef {{
 *   reload: function(),
 *   updateParams: function(!Object<string,string>),
 *   current: !angular.$route.Route,
 *   routes: Array.<!angular.$route.Route>
 * }}
 */
angular.$route;

/** @type {function()} */
angular.$route.reload = function() {};

/**
 * @param {!Object<string,string>} object
 */
angular.$route.updateParams = function(object) {};

/** @type {!angular.$route.Route} */
angular.$route.current;

/** @type {Array.<!angular.$route.Route>} */
angular.$route.routes;

/**
 * @typedef {{
 *   $route: angular.$routeProvider.Params,
 *   locals: Object.<string, *>,
 *   params: Object.<string, string>,
 *   pathParams: Object.<string, string>,
 *   scope: Object.<string, *>,
 *   originalPath: (string|undefined),
 *   regexp: (RegExp|undefined)
 * }}
 */
angular.$route.Route;

/** @type {angular.$routeProvider.Params} */
angular.$route.Route.$route;

/** @type {Object.<string, *>} */
angular.$route.Route.locals;

/** @type {Object.<string, string>} */
angular.$route.Route.params;

/** @type {Object.<string, string>} */
angular.$route.Route.pathParams;

/** @type {Object.<string, *>} */
angular.$route.Route.scope;

/** @type {string|undefined} */
angular.$route.Route.originalPath;

/** @type {RegExp|undefined} */
angular.$route.Route.regexp;

/******************************************************************************
 * $routeParams Service
 *****************************************************************************/

// TODO: This should be !Object.<string|boolean> because valueless query params
// (without even an equal sign) come through as boolean "true".

/** @typedef {!Object.<string>} */
angular.$routeParams;

/******************************************************************************
 * $routeProvider Service
 *****************************************************************************/

/**
 * @typedef {{
 *   otherwise:
 *       function(
 *           (string|!angular.$routeProvider.Params)): !angular.$routeProvider,
 *   when:
 *       function(
 *           string, angular.$routeProvider.Params): !angular.$routeProvider
 *   }}
 */
angular.$routeProvider;

/**
 * @param {(string|!angular.$routeProvider.Params)} params
 * @return {!angular.$routeProvider}
 */
angular.$routeProvider.otherwise = function(params) {};

/**
 * @param {string} path
 * @param {angular.$routeProvider.Params} route
 * @return {!angular.$routeProvider}
 */
angular.$routeProvider.when = function(path, route) {};

/**
 * @typedef {{
 *   controller: (angular.Injectable|string|undefined),
 *   controllerAs: (string|undefined),
 *   template: (string|undefined),
 *   templateUrl: (string|!Object|function(!Object.<string,string>=)|undefined),
 *   resolve: (Object.<string, (
 *       string|angular.Injectable|!angular.$q.Promise
 *       )>|undefined),
 *   redirectTo: (
 *       string|function(Object.<string>, string, Object): string|undefined),
 *   reloadOnSearch: (boolean|undefined)
 *   }}
 */
angular.$routeProvider.Params;

/** @type {angular.Injectable|string} */
angular.$routeProvider.Params.controller;

/** @type {string} */
angular.$routeProvider.Params.controllerAs;

/** @type {string} */
angular.$routeProvider.Params.template;

/** @type {string|function(!Object.<string,string>=)} */
angular.$routeProvider.Params.templateUrl;

/** @type {Object.<string, (string|angular.Injectable|!angular.$q.Promise)>} */
angular.$routeProvider.Params.resolve;

/** @type {string|function(Object.<string>, string, Object): string} */
angular.$routeProvider.Params.redirectTo;

/** @type {boolean} */
angular.$routeProvider.Params.reloadOnSearch;

/******************************************************************************
 * $sanitize Service
 *****************************************************************************/

/** @typedef {function(string):string} */
angular.$sanitize;

/******************************************************************************
 * $sce Service
 *****************************************************************************/

/**
 * Ref: http://docs.angularjs.org/api/ng.$sce
 *
 * @typedef {{
 *   HTML: string,
 *   CSS: string,
 *   URL: string,
 *   JS: string,
 *   RESOURCE_URL: string,
 *   isEnabled: function(): boolean,
 *   parseAs: function(string, string): !angular.$parse.Expression,
 *   getTrusted: function(string, *): string,
 *   trustAs: function(string, string): *,
 *   parseAsHtml: function(string): !angular.$parse.Expression,
 *   parseAsCss: function(string): !angular.$parse.Expression,
 *   parseAsUrl: function(string): !angular.$parse.Expression,
 *   parseAsJs: function(string): !angular.$parse.Expression,
 *   parseAsResourceUrl: function(string): !angular.$parse.Expression,
 *   getTrustedHtml: function(*): string,
 *   getTrustedCss: function(*): string,
 *   getTrustedUrl: function(*): string,
 *   getTrustedJs: function(*): string,
 *   getTrustedResourceUrl: function(*): string,
 *   trustAsHtml: function(string): *,
 *   trustAsCss: function(string): *,
 *   trustAsUrl: function(string): *,
 *   trustAsJs: function(string): *,
 *   trustAsResourceUrl: function(string): *
 *   }}
 *****************************************************************************/
angular.$sce;


/** @const {string} */
angular.$sce.HTML;

/** @const {string} */
angular.$sce.CSS;

/** @const {string} */
angular.$sce.URL;

/** @const {string} */
angular.$sce.JS;

/** @const {string} */
angular.$sce.RESOURCE_URL;

/** @return {boolean} */
angular.$sce.isEnabled = function() {};

/**
 * @param {string} type
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAs = function(type, expression) {};

/**
 * @param {string} type
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrusted = function(type, maybeTrusted) {};

/**
 * @param {string} type
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAs = function(type, trustedValue) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsHtml = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsCss = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsUrl = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsJs = function(expression) {};

/**
 * @param {string} expression
 * @return {!angular.$parse.Expression}
 */
angular.$sce.parseAsResourceUrl = function(expression) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedHtml = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedCss = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedUrl = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedJs = function(maybeTrusted) {};

/**
 * @param {*} maybeTrusted
 * @return {string}
 */
angular.$sce.getTrustedResourceUrl = function(maybeTrusted) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsHtml = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsCss = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsUrl = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsJs = function(trustedValue) {};

/**
 * @param {string} trustedValue
 * @return {*}
 */
angular.$sce.trustAsResourceUrl = function(trustedValue) {};

/******************************************************************************
 * $sceDelegate Service
 *****************************************************************************/

/**
 * Ref: http://docs.angularjs.org/api/ng/service/$sceDelegate
 *
 * @constructor
 */
angular.$sceDelegate = function() {};

/**
 * @param {string} type
 * @param {*} value
 * @return {*}
 */
angular.$sceDelegate.prototype.trustAs = function(type, value) {};

/**
 * Note: because this method overrides Object.prototype.valueOf, the value
 * parameter needs to be annotated as optional to keep the compiler happy (as
 * otherwise the signature won't match Object.prototype.valueOf).
 *
 * @override
 * @param {*=} value
 * @return {*}
 */
angular.$sceDelegate.prototype.valueOf = function(value) {};

/**
 * @param {string} type
 * @param {*} maybeTrusted
 * @return {*}
 */
angular.$sceDelegate.prototype.getTrusted = function(type, maybeTrusted) {};

/******************************************************************************
 * $sceDelegateProvider Service
 *****************************************************************************/

/**
 * Ref: http://docs.angularjs.org/api/ng/provider/$sceDelegateProvider
 *
 * @constructor
 */
angular.$sceDelegateProvider = function() {};

/**
 * @param {Array.<string>=} opt_whitelist
 * @return {!Array.<string>}
 */
angular.$sceDelegateProvider.prototype.resourceUrlWhitelist = function(
    opt_whitelist) {};

/**
 * @param {Array.<string>=} opt_blacklist
 * @return {!Array.<string>}
 */
angular.$sceDelegateProvider.prototype.resourceUrlBlacklist = function(
    opt_blacklist) {};

/******************************************************************************
 * $templateCache Service
 *****************************************************************************/

/**
 * @typedef {!angular.$cacheFactory.Cache.<string>}
 */
angular.$templateCache;

/******************************************************************************
 * $timeout Service
 *****************************************************************************/

/**
 * @typedef {function(function(), number=, boolean=):!angular.$q.Promise}
 */
angular.$timeout;

/**
 * Augment the angular.$timeout type definition by reopening the type via an
 * artificial angular.$timeout instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {angular.$timeout}
 */
angular.$timeout_;

/**
 * @type {function(angular.$q.Promise=):boolean}
 */
angular.$timeout_.cancel = function(promise) {};

/******************************************************************************
 * $window Service
 *****************************************************************************/

/** @typedef {!Window} */
angular.$window;
