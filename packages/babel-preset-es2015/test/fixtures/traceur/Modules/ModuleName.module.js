var re = /([^\s']+?)(?=test(?:[\/\\])feature(?:[\/\\]))/g;

expect(__moduleName.replace(re, '')).toBe('test/feature/Modules/ModuleName.module.js');
