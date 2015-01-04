// Error: test/feature/Modules/Error_DuplicateImport.module.js:6:9: 'a' was previously imported at test/feature/Modules/Error_DuplicateImport.module.js:5:9
// Error: test/feature/Modules/Error_DuplicateImport.module.js:9:8: 'd' was previously imported at test/feature/Modules/Error_DuplicateImport.module.js:8:8
// Error: test/feature/Modules/Error_DuplicateImport.module.js:10:9: 'd' was previously imported at test/feature/Modules/Error_DuplicateImport.module.js:8:8

import {a} from './resources/a.js';
import {c as a} from './resources/c.js';

import d from './resources/default-class.js';
import d from './resources/default-name.js';
import {a as d} from './resources/a2.js';
