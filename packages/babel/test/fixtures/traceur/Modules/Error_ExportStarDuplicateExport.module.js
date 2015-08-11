// Error: test/feature/Modules/Error_ExportStarDuplicateExport.module.js:4:8: Duplicate export. 'a' was previously exported at test/feature/Modules/Error_ExportStarDuplicateExport.module.js:3:8

export * from './resources/a.js';
export * from './resources/a2.js';

assert.equal(1, 2);
