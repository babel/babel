"use strict";

const text = String(require("fs").readFileSync(require.resolve("./x"))).replace(/^﻿/, ""),
  json = JSON.parse(require("fs").readFileSync(require.resolve("./x")));
