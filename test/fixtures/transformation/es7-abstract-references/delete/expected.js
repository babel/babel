"use strict";

bar[Symbol.referenceDelete](foo);

if ((bar[Symbol.referenceDelete](foo), true)) ;
