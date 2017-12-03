// PRE-BUILD

import { runTests } from 'moon-unit';
import { translate } from '../../src/Translator.js';

let FS = require('fs');
let Path = require('path');

let failFile = __dirname + '/_test-fail.js';

function statPath(path) {
  try { return FS.statSync(path); } catch (ex) {}
  return false;
}

function getFilePaths(dir) {
  return FS
    .readdirSync(dir)
    .filter(name => name[0] !== '.')
    .map(name => Path.resolve(dir, name))
    .map(path => ({ path: path, stat: statPath(path) }))
    .filter(item => item.stat.isFile())
    .map(item => item.path);
}

export function main(args) {
  let inputFiles = [];
  let outputFiles = [];
  let stop = {};

  if (FS.existsSync(failFile))
    FS.unlinkSync(failFile);

  getFilePaths(__dirname + '/input').forEach(path => {
    if (path.slice(-3) === '.js') {
      if (path.slice(-7) === '.out.js') outputFiles.push(path);
      else inputFiles.push(path);
    }
  });

  return runTests({

    'Translation' (test) {
      try {
        inputFiles.forEach(path => {
          let input = FS.readFileSync(path, 'utf8');
          let output = translate(input, { noWrap: true, module: true });
          let expected = FS.readFileSync(path.replace(/\.js$/, '.out.js'), 'utf8');
          let ok = output === expected;

          test.name(Path.basename(path).replace(/-/g, ' ').replace(/\.js$/, '')).assert(ok);

          if (!ok) {
            FS.writeFileSync(failFile, output);
            console.log('');
            console.log(output);
            console.log('');
            throw stop;
          }
        });

      } catch(x) {
        if (x !== stop)
          throw x;
      }
    },

  });

}
