"use strict";

bar[Symbol.referenceGet](foo).call(foo);
bar[Symbol.referenceGet](foo).call(foo, "arg");
