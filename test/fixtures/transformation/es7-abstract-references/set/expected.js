"use strict";

var baz = "foo";
bar[Symbol.referenceSet](foo, baz);
if ((bar[Symbol.referenceSet](foo, baz), baz)) {}
