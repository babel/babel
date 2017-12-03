#!/bin/sh
cd ..

rm -rf build/npm
mkdir build/npm

git archive master -o build/npm/es6-transpiler.tar --prefix=es6-transpiler/

cd build/npm

tar xf es6-transpiler.tar && rm es6-transpiler.tar

cd es6-transpiler
rm .gitignore

cd build
./build.sh

cd ../..
tar czf es6-transpiler.tgz es6-transpiler && rm -rf es6-transpiler
