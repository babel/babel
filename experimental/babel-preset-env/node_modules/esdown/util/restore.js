'use strict';
/*

Restores esdown.js from the most recent copy in '_prev' created with 'archive.js'.

*/

const FS = require('fs');
const Path = require('path');

restore();

function restore() {
  let target = Path.resolve(__dirname, '../build/esdown.js');
  let source = sourceName();

  console.log('Restoring from [' + source + ']...');
  FS.writeFileSync(target, FS.readFileSync(source, { encoding: 'utf8' }));
  console.log('Done.');
}

function sourceName() {
  let dir = Path.resolve(__dirname, '../_archive');

  // Create the archive directory if it doesn't already exist
  if (!FS.existsSync(dir))
    FS.mkdirSync(dir);

  let files = FS.readdirSync(dir);

  files = files.filter(name => name.startsWith('esdown-'));
  files = files.sort();

  if (files.length === 0)
    throw new Error('No archived files were found.');

  return Path.resolve(dir, files[files.length - 1]);
}
