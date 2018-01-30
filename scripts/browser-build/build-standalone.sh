#!/usr/bin/env bash

dst='./dist'
[ -d "$dst" ] && rm -rf "$dst"
mkdir -p "$dst"

dst=$(realpath "$dst")

# change to root directory of project
cd ../..

npm install

cd "packages/babel-standalone"
npm install
cd ../..
./node_modules/.bin/gulp build-babel-standalone
mv "packages/babel-standalone/babel.js"                           "$dst"
mv "packages/babel-standalone/babel.min.js"                       "$dst"

cd "packages/babel-preset-env-standalone"
npm install
cd ../..
./node_modules/.bin/gulp build-babel-preset-env-standalone
mv "packages/babel-preset-env-standalone/babel-preset-env.js"     "$dst"
mv "packages/babel-preset-env-standalone/babel-preset-env.min.js" "$dst"
