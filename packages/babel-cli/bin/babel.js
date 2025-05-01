#!/usr/bin/env node
/* eslint-disable unicorn/prefer-node-protocol */

// Enable Node compile cache to speed up initialization
const mod = require("module");
if (mod.enableCompileCache != null) mod.enableCompileCache();

require("../lib/babel");
