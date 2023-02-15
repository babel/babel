/**
 * @module
 */

import '../message-bus';

/**
 * @typedef {Function} PromiseResolveCb
 */
export type PromiseResolveCb<T> = (value?: T | PromiseLike<T>) => void;

/**
 * @typedef {Function} PromiseRejectCb
 */
export type PromiseRejectCb = (reason?: any) => void;
