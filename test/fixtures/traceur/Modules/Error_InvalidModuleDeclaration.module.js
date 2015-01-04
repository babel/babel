// Error: File not found 'test/feature/Modules/resources/no_such_file.js'
// Error: Specified as ./resources/no_such_file.js.
// Error: Imported by test/feature/Modules/Error_InvalidModuleDeclaration.module.js.
// Error: Normalizes to test/feature/Modules/resources/no_such_file.js
// Error: locate resolved against base './'

import * as b from './resources/no_such_file.js';
