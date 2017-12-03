/*
 * Copyright 2014 The Closure Compiler Authors.
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
 * @fileoverview Externs for ui-router.
 *
 * API Reference: http://angular-ui.github.io/ui-router/site/#/api/ui.router
 *
 * @externs
 */


/**
 * Suppresses the compiler warning when multiple externs files declare the
 * ui namespace.
 * @suppress {duplicate}
 * @noalias
 */
var ui = {};


/**
 * @const
 */
ui.router = {};


/** @typedef {!Object} */
ui.router.StateParams;


/** @typedef {!ui.router.StateParams} */
ui.router.$stateParams;


/**
 * This is the state configuration object that is getting passed to
 * $stateProvider.state() method.
 * @record
 */
ui.router.StateConfig = function() {};


/** @type {boolean|undefined} */
ui.router.StateConfig.prototype.abstract;


/** @type {string|!angular.Injectable|undefined} */
ui.router.StateConfig.prototype.controller;


/** @type {string|undefined} */
ui.router.StateConfig.prototype.controllerAs;


/** @type {!angular.Injectable|undefined} */
ui.router.StateConfig.prototype.controllerProvider;


/** @type {!Object|undefined} */
ui.router.StateConfig.prototype.data;


/** @type {!angular.Injectable|undefined} */
ui.router.StateConfig.prototype.onEnter;


/** @type {!angular.Injectable|undefined} */
ui.router.StateConfig.prototype.onExit;


/** @type {!Object|undefined} */
ui.router.StateConfig.prototype.params;


/** @type {boolean|undefined} */
ui.router.StateConfig.prototype.reloadOnSearch;


/** @type {!Object<string, (!angular.Injectable|string)>|undefined} */
ui.router.StateConfig.prototype.resolve;


/** @type {string|undefined} */
ui.router.StateConfig.prototype.template;


/** @type {string|undefined} */
ui.router.StateConfig.prototype.templateUrl;


/** @type {function(...): (!angular.$q.Promise<string>|string)|undefined} */
ui.router.StateConfig.prototype.templateProvider;


/** @type {string|undefined} */
ui.router.StateConfig.prototype.url;


/** @type {!Object<string, !ui.router.State>|undefined} */
ui.router.StateConfig.prototype.views;


/**
 * This is the object that the ui-router passes to callback functions listening
 * on ui router events such as {@code $stateChangeStart} or
 * {@code $stateChangeError} as the {@code toState} and {@code fromState}.
 * Example:
 * $rootScope.$on('$stateChangeStart', function(
 *     event, toState, toParams, fromState, fromParams){ ... });
 * TODO(dtarasiuk): remove field duplication when @extends works for @record
 * @record
 */
ui.router.State = function() {};


/** @type {string} */
ui.router.State.prototype.name;


/** @type {boolean|undefined} */
ui.router.State.prototype.abstract;


/** @type {string|!angular.Injectable|undefined} */
ui.router.State.prototype.controller;


/** @type {string|undefined} */
ui.router.State.prototype.controllerAs;


/** @type {!Function|undefined} */
ui.router.State.prototype.controllerProvider;


/** @type {!Object|undefined} */
ui.router.State.prototype.data;


/** @type {!angular.Injectable|undefined} */
ui.router.State.prototype.onEnter;


/** @type {!angular.Injectable|undefined} */
ui.router.State.prototype.onExit;


/** @type {!Object|undefined} */
ui.router.State.prototype.params;


/** @type {boolean|undefined} */
ui.router.State.prototype.reloadOnSearch;


/** @type {!Object<string, (!angular.Injectable|string)>|undefined} */
ui.router.State.prototype.resolve;


/** @type {string|undefined} */
ui.router.State.prototype.template;


/** @type {string|undefined} */
ui.router.State.prototype.templateUrl;


/** @type {function(): string|undefined} */
ui.router.State.prototype.templateProvider;


/** @type {string|undefined} */
ui.router.State.prototype.url;


/** @type {!Object<string, !ui.router.State>|undefined} */
ui.router.State.prototype.views;


/** @record */
ui.router.$state = function() {};


/** @type {!ui.router.State} */
ui.router.$state.prototype.current;


/** @type {!Object} */
ui.router.$state.prototype.params;


/** @type {!Object} */
ui.router.$state.prototype.options;


/** @type {?angular.$q.Promise} */
ui.router.$state.prototype.transition;


/**
 * @param {VALUE=} opt_stateName
 * @return {RESULT}
 *
 * @template VALUE
 * @template RESULT :=
 *     cond(isUnknown(VALUE),
 *         type('Array', 'ui.router.State'),
 *         'ui.router.State')
 * =:
 */
ui.router.$state.prototype.get = function(opt_stateName) {};


/** @record */
ui.router.StateOptions = function() {};


/** @type {boolean|string|undefined} */
ui.router.StateOptions.prototype.location;


/** @type {boolean|undefined} */
ui.router.StateOptions.prototype.inherit;


/** @type {!ui.router.State|undefined} */
ui.router.StateOptions.prototype.relative;


/** @type {boolean|undefined} */
ui.router.StateOptions.prototype.notify;


/** @type {boolean|undefined} */
ui.router.StateOptions.prototype.reload;


/**
 * @param {string|!ui.router.State} to
 * @param {?ui.router.StateParams=} opt_toParams
 * @param {!ui.router.StateOptions=} opt_options
 * @return {!angular.$q.Promise}
 */
ui.router.$state.prototype.go = function(to, opt_toParams, opt_options) {};


/** @record */
ui.router.HrefOptions = function() {};


/** @type {boolean|undefined} */
ui.router.HrefOptions.prototype.lossy;


/** @type {boolean|undefined} */
ui.router.HrefOptions.prototype.inherit;


/** @type {!ui.router.State|undefined} */
ui.router.HrefOptions.prototype.relative;


/** @type {boolean|undefined} */
ui.router.HrefOptions.prototype.absolute;


/**
 * @param {string|!ui.router.State} stateOrName
 * @param {!ui.router.StateParams=} opt_params
 * @param {!ui.router.HrefOptions=} opt_options
 * @return {string} compiled state url
 */
ui.router.$state.prototype.href = function(
    stateOrName, opt_params, opt_options) {};


/**
 * @param {string|!ui.router.State} stateOrName
 * @param {!ui.router.StateParams=} opt_params
 */
ui.router.$state.prototype.includes = function(stateOrName, opt_params) {};


/**
 * @param {string|!ui.router.State} stateOrName
 * @param {!ui.router.StateParams=} opt_params
 * @return {boolean}
 */
ui.router.$state.prototype.is = function(stateOrName, opt_params) {};


/**
 * @param {string|!ui.router.State=} opt_stateOrName
 * @return {!angular.$q.Promise}
 */
ui.router.$state.prototype.reload = function(opt_stateOrName) {};


/**
 * @param {string|!ui.router.State} to
 * @param {!ui.router.StateParams=} opt_toParams
 * @param {!ui.router.StateOptions=} opt_options
 */
ui.router.$state.prototype.transitionTo = function(
    to, opt_toParams, opt_options) {};


/**
 * @interface
 */
ui.router.$urlRouter = function() {};


/**
 * @param {*=} opt_event
 * @return {void}
 */
ui.router.$urlRouter.prototype.sync = function(opt_event) {};


/**
 * @param {boolean=} opt_enabled
 * @return {function(...)}
 */
ui.router.$urlRouter.prototype.listen = function(opt_enabled) {};


/**
 * @interface
 */
ui.router.$urlMatcherFactory = function() {};


/**
 * @param {boolean} value
 * @return {boolean}
 */
ui.router.$urlMatcherFactory.prototype.strictMode = function(value) {};


/**
 * @interface
 * @param {!ui.router.$urlMatcherFactory} $urlMatcherFactory
 */
ui.router.$urlRouterProvider = function($urlMatcherFactory) {};


/**
 * @param {string|RegExp} url
 * @param {string|function(...)|Array<!Object>} route
 */
ui.router.$urlRouterProvider.prototype.when = function(url, route) {};


/**
 * @param {string|function(...)} path
 */
ui.router.$urlRouterProvider.prototype.otherwise = function(path) {};


/**
 * @param {function(...)} rule
 */
ui.router.$urlRouterProvider.prototype.rule = function(rule) {};


/**
 * @param {boolean=} opt_defer
 * @return {void}
 */
ui.router.$urlRouterProvider.prototype.deferIntercept = function(opt_defer) {};


/**
 * @interface
 * @param {!ui.router.$urlRouterProvider} $urlRouterProvider
 * @param {!ui.router.$urlMatcherFactory} $urlMatcherFactory
 * @param {!angular.$locationProvider} $locationProvider
 */
ui.router.$stateProvider = function(
    $urlRouterProvider, $urlMatcherFactory, $locationProvider) {};


/**
 * @param {!string} name
 * @param {!ui.router.StateConfig} stateConfig
 * @return {!ui.router.$stateProvider}
 */
ui.router.$stateProvider.prototype.state = function(name, stateConfig) {};


/**
 * @param {!string} name
 * @param {(function(!ui.router.State, !Function):
 *     Object<!ui.router.StateConfig>)=} opt_decoratorFn
 * @return {!ui.router.$stateProvider}
 */
ui.router.$stateProvider.prototype.decorator = function(
    name, opt_decoratorFn) {};
