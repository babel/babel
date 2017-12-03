'use strict';
/*

Archive the current esdown.js build file to the '_prev' folder.  Always run this before
building, since a bad build will clobber esdown.  If you create a bad build, you can
restore esdown.js using 'restore.js'.

*/

const FS = require('fs');
const Path = require('path');

copy();

function copy() {
  let source = Path.resolve(__dirname, '../build/esdown.js');
  let target = targetName();

  console.log('Archiving to [' + target + ']...');

  FS.writeFileSync(targetName(), FS.readFileSync(source, {
    encoding: 'utf8'
  }));

  console.log('Done.');
}

function targetName() {
  let dir = Path.resolve(__dirname, '../_archive');

  if (!FS.existsSync(dir))
    FS.mkdirSync(dir);

  let files = FS.readdirSync(dir);
  let now = new Date();
  let name = 'esdown-';
  let num = 0;

  name += [now.getFullYear(), pad2(now.getMonth() + 1), pad2(now.getDate())].join('');

  while (files.indexOf(name + '-' + pad2(num) + '.js') !== -1)
    num++;

  name += '-' + pad2(num) + '.js';

  return Path.resolve(dir, name);
}

function pad2(n) {
  n = String(n);

  while (n.length < 2)
    n = '0' + n;

  return n;
}
