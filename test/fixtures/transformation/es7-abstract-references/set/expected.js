"use strict";

bar[Symbol.referenceSet](foo, baz);
if ((bar[Symbol.referenceSet](foo, baz), baz)) ;
