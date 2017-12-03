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
 * @fileoverview Externs for Stripe.js
 *
 * @see https://stripe.com/docs/stripe.js
 * @externs
 */

/** @const */
var Stripe = {};

/** @const */
Stripe.card = {};

/** @const */
Stripe.bankAccount = {};

/** @const */
Stripe.piiData = {};

/** @const */
Stripe.bitcoinReceiver = {};

/**
 * @param {string} publishableKey
 */
Stripe.setPublishableKey = function(publishableKey) {};

/**
 * @typedef {{
 *     id: string,
 *     card: {
 *         name: string,
 *         address_line1: string,
 *         address_line2: string,
 *         address_city: string,
 *         address_state: string,
 *         address_zip: string,
 *         address_country: string
 *     },
 *     error: {
 *         type: string,
 *         code: string,
 *         message: string,
 *         param: string
 *     },
 *     created: number,
 *     livemode: boolean,
 *     type: string,
 *     object: string,
 *     used: boolean
 * }}
 */
var StripeCardCreateResponse;

/**
 * @typedef {{
 *     number: string,
 *     exp_month: string,
 *     exp_year: string,
 *     cvc: (string|undefined),
 *     name: (string|undefined),
 *     address_line1: (string|undefined),
 *     address_line2: (string|undefined),
 *     address_city: (string|undefined),
 *     address_state: (string|undefined),
 *     address_zip: (string|undefined),
 *     address_country: (string|undefined)
 * }}
 */
var StripeCardData;

/**
 * @param {StripeCardData} cardData
 * @param {function(string, StripeCardCreateResponse)} callback
 */
Stripe.card.createToken = function(cardData, callback) {};

/**
 * @param {string} cardNumber
 */
Stripe.card.validateCardNumber = function(cardNumber) {};

/**
 * @param {string} month
 * @param {string} year
 */
Stripe.card.validateExpiry = function(month, year) {};

/**
 * @param {string} cvc
 */
Stripe.card.validateCVC = function(cvc) {};

/**
 * @param {string} cardType
 */
Stripe.card.cardType = function(cardType) {};

/**
 * @typedef {{
 *     country: string,
 *     currency: string,
 *     account_number: string,
 *     routing_number: (string|undefined),
 *     account_holder_name: (string|undefined),
 *     account_holder_type: (string|undefined)
 * }}
 */
var StripeAccountData;

/**
 * @typedef {{
 *     id: string,
 *     bank_account: {
 *         country: string,
 *         bank_name: string,
 *         last4: string,
 *         validated: boolean,
 *         object: string
 *     },
 *     error: {
 *         type: string,
 *         message: string,
 *         param: string
 *     },
 *     created: number,
 *     livemode: boolean,
 *     type: string,
 *     object: string,
 *     used: boolean
 * }}
 */
var StripeBankAccountCreateResponse;

/**
 * @param {StripeAccountData|Element} accountDataOrForm
 * @param {function(string, StripeBankAccountCreateResponse)} callback
 */
Stripe.bankAccount.createToken = function(accountDataOrForm, callback) {};

/**
 * @param {string} routingNumber
 * @param {string} country
 */
Stripe.bankAccount.validateRoutingNumber = function(routingNumber, country) {};

/**
 * @param {string} accountNumber
 * @param {string} country
 */
Stripe.bankAccount.validateAccountNumber = function(accountNumber, country) {};

/**
 * @typedef {{
 *     personal_id_number: string
 * }}
 */
var StripePIIData;

/**
 * @typedef {{
 *     id: string,
 *     error: {
 *         type: string,
 *         message: string,
 *         param: string
 *     },
 *     created: number,
 *     livemode: boolean,
 *     type: string,
 *     object: string,
 *     used: boolean
 * }}
 */
var StripePIIDataCreateResponse;

/**
 * @param {StripePIIData} piiData
 * @param {function(string, StripePIIDataCreateResponse)} callback
 */
Stripe.piiData.createToken = function(piiData, callback) {};

/**
 * @typedef {{
 *     amount: number,
 *     currency: string,
 *     description: string,
 *     email: string
 * }}
 */
var StripeBitcoinReceiverData;

/**
 * @typedef {{
 *     id: string,
 *     error: {
 *         type: string,
 *         message: string,
 *         param: string
 *     },
 *     object: string,
 *     active: boolean,
 *     amount: number,
 *     amount_received: number,
 *     bitcoin_amount: number,
 *     bitcoin_amount_received: number,
 *     bitcoin_uri: string,
 *     created: number,
 *     currency: string,
 *     description: string,
 *     email: string,
 *     filled: boolean,
 *     inbound_address: string,
 *     livemode: boolean,
 *     metadata: Object,
 *     refund_address: string,
 *     uncaptured_funds: boolean,
 *     used_for_payment: boolean
 * }}
 */
var StripeBitcoinReceiverResponse;

/**
 * @param {StripeBitcoinReceiverData} receiverData
 * @param {function(string, StripeBitcoinReceiverResponse)} callback
 */
Stripe.bitcoinReceiver.createReceiver = function(receiverData, callback) {};

/**
 * @param {string} receiverId
 * @param {function(string, StripeBitcoinReceiverResponse)} callback
 */
Stripe.bitcoinReceiver.pollReceiver = function(receiverId, callback) {};

/**
 * @param {string} receiverId
 */
Stripe.bitcoinReceiver.cancelReceiverPoll = function(receiverId) {};
