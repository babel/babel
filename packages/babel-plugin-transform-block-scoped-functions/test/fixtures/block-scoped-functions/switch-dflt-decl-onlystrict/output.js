"use strict";

// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-web-compat-functiondeclarationinstantiation
description: >
    AnnexB extension not honored in strict mode, Function declaration
    in the `default` clause of a `switch` statement in function code
info: |
    B.3.3.1 Changes to FunctionDeclarationInstantiation

    1. If strict is false, then
      ...

flags: [onlyStrict]
---*/
var err1, err2;
(function () {
  try {
    f;
  } catch (exception) {
    err1 = exception;
  }
  switch (1) {
    default:
      let f = function () {};
  }
  try {
    f;
  } catch (exception) {
    err2 = exception;
  }
})();
expect(err1.constructor).toBe(ReferenceError);
expect(err2.constructor).toBe(ReferenceError);
