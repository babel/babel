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
 * @fileoverview Externs for Angular 1 ngResource.
 *
 * @see http://angularjs.org/
 * @externs
 */


/**
 * The $resource service is a factory for creating a resource class.
 *
 * @typedef {function(string, !Object=,
 *     !Object.<string, angular.ResourceAction>=):angular.Resource}
 */
angular.$resource;



/**
 * A hash declaring a custom action that can extend the default set of resource
 * actions. Defined as an interface so Closure doesn't rename the properties.
 * @interface
 */
angular.ResourceAction = function() {};


/**
 * HTTP request method. Valid methods are: GET, POST, PUT, DELETE, and JSONP
 * @type {string}
 */
angular.ResourceAction.prototype.method;


/**
 * Optional set of pre-bound parameters for this action. If any of the
 * parameter value is a function, it will be executed every time when a param
 * value needs to be obtained for a request (unless the param was overridden).
 * @type {Object|undefined}
 */
angular.ResourceAction.prototype.params;


/**
 * action specific url override. The url templating is supported just like for
 * the resource-level urls.
 * @type {string|undefined}
 */
angular.ResourceAction.prototype.url;


/**
 * If true then the returned object for this action is an array, see returns
 * section.
 * @type {boolean|undefined}
 */
angular.ResourceAction.prototype.isArray;


/**
 * transform function or an array of such functions. The transform function
 * takes the http request body and headers and returns its transformed
 * (typically serialized) version.
 * @type {function(Object, Object)|Array.<function(Object, Object)>|undefined}
 */
angular.ResourceAction.prototype.transformRequest;


/**
 * transform function or an array of such functions. The transform function
 * takes the http response body and headers and returns its transformed
 * (typically deserialized) version.
 * @type {function(Object, Object)|Array.<function(Object, Object)>|undefined}
 */
angular.ResourceAction.prototype.transformResponse;


/**
 * If true, a default $http cache will be used to cache the GET request,
 * otherwise if a cache instance built with $cacheFactory, this cache will be
 * used for caching.
 * @type {boolean|angular.$cacheFactory.Cache|undefined}
 */
angular.ResourceAction.prototype.cache;


/**
 * timeout in milliseconds, or promise that should abort the request when
 * resolved.
 * @type {number|!angular.$q.Promise|undefined}
 */
angular.ResourceAction.prototype.timeout;


/**
 * whether to set the withCredentials flag on the XHR object. See requests with
 * credentials for more information.
 * @type {boolean|undefined}
 */
angular.ResourceAction.prototype.withCredentials;


/**
 * see requestType.
 * @type {string|undefined}
 */
angular.ResourceAction.prototype.responseType;


/**
 * The interceptor object has two optional methods - response and
 * responseError. Both response and responseError interceptors get called
 * with http response object. See $http interceptors.
 * @type {Object|undefined}
 */
angular.ResourceAction.prototype.interceptor;


/**
 * A Resource can be used as a constructor to create a ResourceInstance. It also
 * has other functions for getting or querying for instances. Example usage:
 *
 * var Pony = $resource('/ponies');
 * var pony = new Pony({name: 'Duke'});
 *
 * @typedef {function(new:angular.ResourceInstance, Object=)}
 */
angular.Resource;


/**
 * Re-open the Resource type definition via an artificial target -- Resource_.
 * This lets us define functions on function objects, which is what Resource is.
 *
 * @type {angular.Resource}
 */
angular.Resource_;


/**
 * Usage: resourceClass.get([parameters], [success], [error])
 *
 * @param {angular.Resource.ParamsOrCallback=} opt_paramsOrCallback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 * @return {!angular.ResourceInstance} Empty resource instance.
 */
angular.Resource_.prototype.get = function(
    opt_paramsOrCallback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resourceClass.query([parameters], [success], [error])
 *
 * @param {angular.Resource.ParamsOrCallback=} opt_paramsOrCallback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 * @return {!Array.<!angular.ResourceInstance>} Empty array of instances.
 */
angular.Resource_.prototype.query = function(
    opt_paramsOrCallback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resourceClass.save([parameters], postData, [success], [error])
 *
 * @param {!angular.Resource.ParamsDataOrCallback} paramsOrCallbackOrData
 * @param {angular.Resource.DataCallbackOrErrback=} opt_dataOrCallbackOrErrback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.Resource_.prototype.save = function(
    paramsOrCallbackOrData,
    opt_dataOrCallbackOrErrback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resourceClass.remove([parameters], postData, [success], [error])
 *
 * @param {!angular.Resource.ParamsDataOrCallback} paramsOrCallbackOrData
 * @param {angular.Resource.DataCallbackOrErrback=} opt_dataOrCallbackOrErrback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.Resource_.prototype.remove = function(
    paramsOrCallbackOrData,
    opt_dataOrCallbackOrErrback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resourceClass['delete']([parameters], postData, [success], [error])
 *
 * @param {!angular.Resource.ParamsDataOrCallback} paramsOrCallbackOrData
 * @param {angular.Resource.DataCallbackOrErrback=} opt_dataOrCallbackOrErrback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.Resource_.prototype['delete'] = function(
    paramsOrCallbackOrData,
    opt_dataOrCallbackOrErrback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Data you want to send along with a POST xhr.
 * @typedef {Object|Array|angular.ResourceInstance}
 */
angular.Resource.PostData;


/**
 * Callback when the resource is fetched. The first argument is the resource
 * instance or an array of resource instances.
 *
 * TODO(bourey): This can be cleaned up. The second argument is the header
 * getter function, which should really be defined in AngularJS externs.js.
 *
 * @typedef {function(!angular.ResourceInstanceOrCollection,
 *     function(string=): (string|Object|null))}
 */
angular.Resource.Callback;


/**
 * Errback when fetching resource failed. It is given the entire http response
 * object to play with.
 *
 * @typedef {function(!angular.$http.Response)}
 */
angular.Resource.Errback;


/** @typedef {Object|angular.Resource.Callback} */
angular.Resource.ParamsOrCallback;


/** @typedef {angular.Resource.ParamsOrCallback|angular.Resource.PostData} */
angular.Resource.ParamsDataOrCallback;


/** @typedef {angular.Resource.PostData|angular.Resource.CallbackOrErrback} */
angular.Resource.DataCallbackOrErrback;


/** @typedef {angular.Resource.Callback|angular.Resource.Errback} */
angular.Resource.CallbackOrErrback;


/** @typedef {!angular.ResourceInstance|!Array.<!angular.ResourceInstance>} */
angular.ResourceInstanceOrCollection;



/** @constructor */
angular.ResourceInstance = function() {};


/**
 * @type {!angular.$q.Promise}
 */
angular.ResourceInstance.prototype.$promise;


/**
 * @type {boolean}
 */
angular.ResourceInstance.prototype.$resolved;


/**
 * Usage: resource.$get([parameters], [success], [error])
 *
 * @param {angular.Resource.ParamsOrCallback=} opt_paramsOrCallback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.ResourceInstance.prototype.$get = function(
    opt_paramsOrCallback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resource.$save([parameters], [success], [error])
 *
 * @param {angular.Resource.ParamsOrCallback=} opt_paramsOrCallback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.ResourceInstance.prototype.$save = function(
    opt_paramsOrCallback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resource.$remove([parameters], [success], [error])
 *
 * @param {angular.Resource.ParamsOrCallback=} opt_paramsOrCallback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.ResourceInstance.prototype.$remove = function(
    opt_paramsOrCallback,
    opt_callbackOrErrback,
    opt_errback) {};


/**
 * Usage: resource.$delete([parameters], [success], [error])
 *
 * @param {angular.Resource.ParamsOrCallback=} opt_paramsOrCallback
 * @param {angular.Resource.CallbackOrErrback=} opt_callbackOrErrback
 * @param {angular.Resource.Errback=} opt_errback
 */
angular.ResourceInstance.prototype.$delete = function(
    opt_paramsOrCallback,
    opt_callbackOrErrback,
    opt_errback) {};
