#!/usr/bin/env node

import mod from "node:module";
import "../lib/babel";

// Enable Node compile cache to speed up initialization
mod.enableCompileCache?.();
