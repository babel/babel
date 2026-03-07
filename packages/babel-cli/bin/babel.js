#!/usr/bin/env node

import mod from "node:module";
import "../lib/babel/index.js";

// Enable Node compile cache to speed up initialization
mod.enableCompileCache?.();
