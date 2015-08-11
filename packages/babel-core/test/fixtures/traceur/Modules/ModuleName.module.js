var re = /([^\s']+?)(?=test(?:[\/\\])feature(?:[\/\\]))/g;

assert.equal(__moduleName.replace(re, ''), 'test/feature/Modules/ModuleName.module.js');
