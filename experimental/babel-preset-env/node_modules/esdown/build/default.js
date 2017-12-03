import { spawn } from 'child_process';
import * as FS from 'fs';
import * as Path from 'path';

function buildRuntimeModule() {
  let outPath = Path.resolve(__dirname, '../src/Runtime.js');

  let files = {
    API: './esdown-runtime.js',
  };

  let output = 'export let Runtime = {};\n\n';

  Object.keys(files).forEach(function(key) {
    let source = FS.readFileSync(Path.resolve(__dirname, files[key]), {
      encoding: 'utf8',
    });

    // Remove signature and strict directive
    source = source.replace(/^'use strict'; /, '');
    output += 'Runtime.' + key + ' = \n\n`' + source + '`;\n\n';
  });

  FS.writeFileSync(outPath, output);
}

function runDown(args) {
  return new Promise(resolve => {
    let ts = +new Date;

    args = '../bin/esdown-cli.js - ' + args;
    process.stdout.write(`Running esdown...`);

    let opts = {
      stdio: 'inherit',
      env: process.env,
      cwd: __dirname
    };

    let child = spawn('node', args.split(/ /g), opts);

    child.on('close', () => {
      resolve();
      process.stdout.write(`finished in ${((+new Date) - ts) / 1000}s.\n`);
    });
  });
}

export async function main() {
  let args = process.argv.slice(2);

  if (args.length === 0)
    args.push('esdown');

  switch (args[0]) {
    case 'runtime':
      await runDown('../esdown-runtime/runtime.js ../esdown-runtime/esdown-runtime.js -g _esdown');
      await runDown('../esdown-runtime/runtime.js ./esdown-runtime.js');
      buildRuntimeModule();
      break;
    case 'esdown':
      await runDown('../src/default.js ../build/esdown.js -b -R --deep');
      break;
    default:
      console.log(`Unknown command '${ args[0]}'`);
      return;
  }
}
