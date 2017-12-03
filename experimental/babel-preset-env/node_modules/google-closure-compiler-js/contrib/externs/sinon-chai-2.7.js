/*
 * Copyright 2016 The Closure Compiler Authors.
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
 * @fileoverview Externs definitions for the Sinon Chai library, 2.7.0 branch.
 *
 * This file defines some virtual types, please don't use these directly, but
 * follow the official API guidelines.
 *
 * @externs
 * @see https://github.com/domenic/sinon-chai/tree/2.7.0
 */

/** @type {!ExpectChain} */ ExpectChain.prototype.always;

/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.called;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.calledOnce;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.calledTwice;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.calledThrice;
/** @type {!ExpectChainTerminal} */ ExpectChain.prototype.calledWithNew;

/**
 * @param {number} n
 */
ExpectChain.prototype.callCount = function(n) {};

/**
 * @param {!SinonSpy} spy
 */
ExpectChain.prototype.calledBefore = function(spy) {};

/**
 * @param {!SinonSpy} spy
 */
ExpectChain.prototype.calledAfter = function(spy) {};

/**
 * @param {*} context
 */
ExpectChain.prototype.calledOn = function(context) {};

/**
 * @param {...*} args
 */
ExpectChain.prototype.calledWith = function(args) {};

/**
 * @param {...*} args
 */
ExpectChain.prototype.calledWithExactly = function(args) {};

/**
 * @param {...*} args
 */
ExpectChain.prototype.calledWithMatch = function(args) {};

/**
 * @param {*} obj
 */
ExpectChain.prototype.returned = function(obj) {};

/**
 * @param {*=} obj
 */
ExpectChain.prototype.thrown = function(obj) {};
