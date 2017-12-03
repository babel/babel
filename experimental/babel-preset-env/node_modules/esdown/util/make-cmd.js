'use strict';
/*

Creates the 'esdown' command target dynamically when the package is installed.  This
(hack) was necessary for the following reasons:

1. For now, we always want esdown to run node with the '--harmony' flag.
2. We don't want to have to spin up an extra node process just to launch esdown.

On linux we can't specify command arguments on the shebang line, so we need to launch node
with a shell script.  The $0 variable isn't reliable through symlinks, so we inject the
script path directly into the shell script.  If you move package folder to a new location,
you can rerun this script to fix the script path.

For windows, NPM will create a 'cmd' file which proxies to the 'bin' file.  In that case,
arguments on the shebang line work fine so we just copy the 'esdown-cli.js' file and let
NPM point to that.

*/

const Path = require('path');
const FS = require('fs');

function makeCmd() {
  let platform = process.platform;
  let dir = Path.resolve(__dirname, '..', 'bin');
  let target = Path.join(dir, 'esdown');
  let source = 'esdown.sh';

  if (platform === 'win32') {
    copy(Path.join(dir, 'esdown-cli.js'));
  } else {
    copy(Path.join(dir, 'esdown.sh'), function(text) {
      return text.replace(/\$ESDOWN_BIN_DIR/g, Path.dirname(target));
    });
  }

  function copy(from, transform) {
    var text = FS.readFileSync(from, { encoding: 'utf-8' });

    if (transform)
      text = transform(text);

    FS.writeFileSync(target, text, { encoding: 'utf-8' });
    FS.chmodSync(target, '755');
  }
}

makeCmd();
