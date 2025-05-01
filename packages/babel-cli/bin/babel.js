#!/usr/bin/env node

// Enable Node compile cache to speed up initialization
const mod = require("node:module");
if (mod.enableCompileCache != null) mod.enableCompileCache();

require("../lib/babel");
