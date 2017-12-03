'use strict';

var getDescriptors = require('object.getownpropertydescriptors');
var entries = require('object.entries');
var values = require('object.values');

module.exports = {
	entries: entries,
	getOwnPropertyDescriptors: getDescriptors,
	shim: function shimObject() {
		getDescriptors.shim();
		entries.shim();
		values.shim();
	},
	values: values
};
