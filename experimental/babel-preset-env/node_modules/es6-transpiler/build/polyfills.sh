#!/bin/sh
echo "beginning polyfills build"

mkdir es5
rm -rf es5/polyfills
mkdir es5/polyfills
mkdir es5/polyfills/lib
mkdir es5/polyfills/test
mkdir es5/polyfills/test/specs

declare -a polyfills=($(find ../polyfills/* -type f))
for i in ${polyfills[@]}
do
  echo "building $i into es5/polyfills/$i"
  node --harmony ../es6toes5.js $i es5/polyfills/$i --features no-symbols,no-iterators,no-generators
done
