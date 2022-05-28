#!/bin/bash

#==============================================================================#
#                                  SETUP                                       #
#==============================================================================#

# Start in scripts/integration-tests/ even if run from root directory
cd "$(dirname "$0")" || exit
root="$PWD"

source utils/local-registry.sh
source utils/cleanup.sh

# Echo every command being executed
set -x

# Clone prettier
git clone --depth=1 https://github.com/prettier/prettier tmp/prettier
cd tmp/prettier || exit

# Update @babel/* dependencies
bump_deps="$root/utils/bump-babel-dependencies.js"
node "$bump_deps"

#==============================================================================#
#                                 ENVIRONMENT                                  #
#==============================================================================#
node -v
yarn --version

#==============================================================================#
#                                   TEST                                       #
#==============================================================================#

# Don't use Yarn 2
export YARN_IGNORE_PATH=1

startLocalRegistry "$root"/verdaccio-config.yml
yarn install

if [ "$BABEL_8_BREAKING" = true ] ; then
  # Prettier's tests use `>` in JSX, which is invalid syntax
  sed -i 's$<in T>() => {}</in>;$<in T>() = {}</in>;$g' tests/format/typescript/optional-variance/{with-jsx.tsx,__snapshots__/jsfmt.spec.js.snap}
  node -e '
    const filepath = "tests/format/typescript/optional-variance/__snapshots__/jsfmt.spec.js.snap";
    const file = fs.readFileSync(filepath, "utf8");
    const BEFORE_READ = "exports[`with-jsx.tsx [babel-ts] format 1`] = `";
    const END_READ = "`;";
    const BEFORE_WRITE = "exports[`with-jsx.tsx [typescript] format 1`] = `";
    const read_start = file.indexOf(BEFORE_READ) + BEFORE_READ.length;
    const read_end = file.indexOf(END_READ, read_start) + END_READ.length;
    const write_start = file.indexOf(BEFORE_WRITE) + BEFORE_WRITE.length;

    const newFile = file.slice(0, write_start) + file.slice(read_start, read_end);
    fs.writeFileSync(filepath, newFile);
  '
fi

# Only run js,jsx,misc format tests
# Without --runInBand CircleCI hangs.
yarn test "tests/format/(jsx?|misc)/" --update-snapshot --runInBand

cleanup
