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
 * @fileoverview Externs for v1_4 ngMock angular-mocks.js.
 * @externs
 *
 * TODO: Remaining Mocks:
 *     $browser
 *     $log
 *     angular.mock.TzDate
 *     angular.mock.dump
 *     $RAFDecorator
 *     $AsyncCallbackDecorator
 *     $RootElementProvider
 *     $httpBackendDecorator
 *     $RootScopeDecorator
 *     angular.mock.module
 */

angular.mock = {};



/** @constructor */
angular.mock.$httpBackend = function() {};



/** @constructor */
angular.mock.$httpBackend.RequestHandler = function() {};


/**
 * @param {(number|string|Object|function(string, string, Object, string):
 *     !Array.<(number|string|Object)>)} statusOrDataOrFunction
 * @param {(string|Object)=} opt_dataOrHeaders
 * @param {(Object|string)=} opt_headersOrStatusText
 * @param {string=} opt_statusText
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.RequestHandler.prototype.respond = function(
    statusOrDataOrFunction, opt_dataOrHeaders, opt_headersOrStatusText,
    opt_statusText) {};


/** @return {!angular.mock.$httpBackend.RequestHandler} */
angular.mock.$httpBackend.RequestHandler.prototype.passThrough = function() {};


/**
 * @param {string} method
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.when = function(
    method, url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenGET = function(url, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenHEAD = function(url, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenDELETE = function(url, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenPOST = function(
    url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenPUT = function(
    url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenPATCH = function(
    url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.whenJSONP = function(url) {};


/**
 * @param {string} method
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean|Object)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expect = function(
    method, url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectGET = function(url, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectHEAD = function(url, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectDELETE = function(
    url, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean|Object)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectPOST = function(
    url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean|Object)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectPUT = function(
    url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @param {(string|RegExp|function(string): boolean|Object)=} opt_data
 * @param {(Object|function(Object): boolean)=} opt_headers
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectPATCH = function(
    url, opt_data, opt_headers) {};


/**
 * @param {(string|RegExp|function(string): boolean)} url
 * @return {!angular.mock.$httpBackend.RequestHandler}
 */
angular.mock.$httpBackend.prototype.expectJSONP = function(url) {};


/**
 * @param {number=} opt_count
 * @return {void}
 */
angular.mock.$httpBackend.prototype.flush = function(opt_count) {};


/** @return {void} */
angular.mock.$httpBackend.prototype.verifyNoOutstandingExpectation =
    function() {};


/** @return {void} */
angular.mock.$httpBackend.prototype.verifyNoOutstandingRequest = function() {};


/** @return {void} */
angular.mock.$httpBackend.prototype.resetExpectations = function() {};

/** @constructor */
angular.mock.$interval = function() {};

/**
 * @param {!angular.$q.Promise} promise
 * @return {boolean}
 */
angular.mock.$interval.prototype.cancel = function(promise) {};

/**
 * @param {number=} opt_millis
 * @return {number}
 */
angular.mock.$interval.prototype.flush = function(opt_millis) {};

/** @constructor */
angular.mock.$TimeoutDecorator = function() {};


/** @param {number=} opt_delay */
angular.mock.$TimeoutDecorator.prototype.flush = function(opt_delay) {};


angular.mock.$TimeoutDecorator.prototype.verifyNoPendingTasks = function() {};


/** @constructor */
angular.mock.animate = function() {};


angular.mock.animate.prototype.flush = function() {};


/** @typedef {function((!Function|string), !Object, Object=): !Object} */
angular.mock.$controller;


/** @param {!Array|!Function} injectable */
angular.mock.inject = function(injectable) {};


/** @interface */
angular.mock.$exceptionHandler = function() {};


/** @type {!Array<?>} */
angular.mock.$exceptionHandler.prototype.errors;


/** @interface */
angular.mock.$exceptionHandlerProvider = function() {};


/** @param {string} mode */
angular.mock.$exceptionHandlerProvider.prototype.mode = function(mode) {};
