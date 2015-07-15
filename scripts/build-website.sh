#!/bin/sh
set -e

if [ ! -d ./_babel.github.io ]; then
  git clone git@github.com:babel/babel.github.io.git _babel.github.io
fi

cd _babel.github.io

if [ ! -d ./_babel ]; then
  ln -s .. _babel
fi

git pull
make build
git commit -am "v`babel -V`"
git push
