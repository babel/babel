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
 * @fileoverview Externs for ui-bootstrap.
 *
 * API Reference: http://angular-ui.github.io/bootstrap/
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
ui.bootstrap = {};

/******************************************************************************
 * $transition Service
 *****************************************************************************/


/**
 * @typedef {function(!angular.JQLite, !(string|Object|Function),
 *     Object=):!angular.$q.Promise
 *     }
 */
ui.bootstrap.$transition;


/**
 * Augment the ui.bootstrap.$transition type definition by reopening the type
 * via an artificial ui.bootstrap.$transition instance.
 *
 * This allows us to define methods on function objects which is something
 * that can't be expressed via typical type annotations.
 *
 * @type {ui.bootstrap.$transition}
 */
ui.bootstrap.$transition_;


/**
 * @type {(string|undefined)}
 */
ui.bootstrap.$transition_.animationEndEventName;


/**
 * @type {(string|undefined)}
 */
ui.bootstrap.$transition_.transitionEndEventName;

/******************************************************************************
 * $modal service
 *****************************************************************************/


/**
 * @typedef {{
 *   close: function(*=),
 *   dismiss: function(*=),
 *   opened: !angular.$q.Promise,
 *   result: !angular.$q.Promise
 * }}
 */
ui.bootstrap.modalInstance;


/**
 * @param {*=} opt_result
 */
ui.bootstrap.modalInstance.close = function(opt_result) {};


/**
 * @param {*=} opt_reason
 */
ui.bootstrap.modalInstance.dismiss = function(opt_reason) {};


/**
 * @type {!angular.$q.Promise}
 */
ui.bootstrap.modalInstance.opened;


/**
 * @type {!angular.$q.Promise}
 */
ui.bootstrap.modalInstance.result;


/**
 * @typedef {{
 *   open: function(!Object)
 * }}
 */
ui.bootstrap.$modal;


/**
 * @param {!Object} modalOptions
 * @return {!ui.bootstrap.modalInstance}
 */
ui.bootstrap.$modal.open = function(modalOptions) {};

/******************************************************************************
 * $modalStack service
 *****************************************************************************/


/**
 * @typedef {{
 *   open: function(!Object, !Object),
 *   close: function(!Object, *=),
 *   dismiss: function(!Object, *=),
 *   dismissAll: function(*=),
 *   getTop: function()
 * }}
 */
ui.bootstrap.$modalStack;


/**
 * @param {!Object} modalInstance
 * @param {!Object} modal
 */
ui.bootstrap.$modalStack.open = function(modalInstance, modal) {};


/**
 * @param {!Object} modalInstance
 * @param {*=} opt_result
 */
ui.bootstrap.$modalStack.close = function(modalInstance, opt_result) {};


/**
 * @param {!Object} modalInstance
 * @param {*=} opt_reason
 */
ui.bootstrap.$modalStack.dismiss = function(modalInstance, opt_reason) {};


/**
 * @param {*=} opt_reason
 */
ui.bootstrap.$modalStack.dismissAll = function(opt_reason) {};


/**
 * @return {!ui.bootstrap.modalInstance}
 */
ui.bootstrap.$modalStack.getTop = function() {};



/******************************************************************************
 * $position service
 *****************************************************************************/


/**
 * @typedef {{
 *   position: function(!angular.JQLite),
 *   offset: function(!angular.JQLite),
 *   positionElements: function(!angular.JQLite, !angular.JQLite, string,
 *     (boolean|undefined))
 *   }}
 */
ui.bootstrap.$position;


/**
 * @param {!angular.JQLite} element
 * @return {{width:number, height:number, top:number, left:number}}
 */
ui.bootstrap.$position.position = function(element) {};


/**
 * @param {!angular.JQLite} element
 * @return {{width:number, height:number, top:number, left:number}}
 */
ui.bootstrap.$position.offset = function(element) {};


/**
 * @param {!angular.JQLite} hostEl
 * @param {!angular.JQLite} targetEl
 * @param {string} positionStr
 * @param {boolean=} opt_appendToBody
 * @return {{width:number, height:number, top:number, left:number}}
 */
ui.bootstrap.$position.positionElements = function(hostEl, targetEl,
    positionStr, opt_appendToBody) {};


/******************************************************************************
 * Tooltip
 *****************************************************************************/


/**
 * @typedef {{
 *   compile: (function(!angular.JQLite=, !angular.Attributes=)|undefined),
 *   restrict: (string|undefined)
 *   }}
 */
ui.bootstrap.Tooltip;


/**
 * @param {!angular.JQLite=} opt_element
 * @param {!angular.Attributes=} opt_attrs
 */
ui.bootstrap.Tooltip.compile = function(opt_element, opt_attrs) {};


/**
 * @type {(string|undefined)}
 */
ui.bootstrap.Tooltip.restrict;

/******************************************************************************
 * $tooltip service
 *****************************************************************************/


/**
 * @param {string} type
 * @param {string} prefix
 * @param {string} defaultTriggerShow
 * @return {!ui.bootstrap.Tooltip}
 */
ui.bootstrap.$tooltip = function(type, prefix, defaultTriggerShow) {};

/******************************************************************************
 * $tooltipProvider service
 *****************************************************************************/


/**
 * @typedef {{
 *   options: function(!Object.<string,(boolean|number|string)>=),
 *   setTriggers: function(!Object.<string,string>)
 *   }}
 */
ui.bootstrap.$tooltipProvider;


/**
 * @param {!Object.<string,(boolean|number|string)>=} opt_options
 */
ui.bootstrap.$tooltipProvider.options = function(opt_options) {};


/**
 * @param {!Object.<string, string>} triggers
 */
ui.bootstrap.$tooltipProvider.setTriggers = function(triggers) {};
